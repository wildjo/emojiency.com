#!/usr/bin/env python3
"""Import published WordPress posts from a WXR export into Astro.

Drafts and all non-post WordPress records are deliberately ignored. Imported
HTML is retained losslessly; Astro rewrites emojiency.com links to the current
deployment base when it renders an imported entry.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import html
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


WP = "http://wordpress.org/export/1.2/"
CONTENT = "http://purl.org/rss/1.0/modules/content/"
EXCERPT = "http://wordpress.org/export/1.2/excerpt/"
NS = {"wp": WP, "content": CONTENT, "excerpt": EXCERPT}

SHORT_FORM_CATEGORIES = {
    "low-poly-comix",
    "pic-a-day",
    "quick-hit",
    "quick-pic",
    "quotes",
    "video",
}
NEWS_SLUGS = {
    "the-onion-from-1989-penis-fear",
}
EXTERNAL_MEDIA_EXTENSIONS = {".wav", ".zip"}
UPLOAD_URL_RE = re.compile(
    r"https?://(?:www\.)?emojiency\.com/[^\s\"'<>]*wp-content/uploads/[^\s\"'<>]+",
    re.IGNORECASE,
)
TAG_RE = re.compile(r"<[^>]+>")
SPACE_RE = re.compile(r"\s+")


def text(item: ET.Element, path: str, default: str = "") -> str:
    return item.findtext(path, default=default, namespaces=NS) or default


def plain_text(value: str) -> str:
    value = re.sub(r"<!--.*?-->", " ", value, flags=re.DOTALL)
    value = TAG_RE.sub(" ", value)
    return SPACE_RE.sub(" ", html.unescape(value)).strip()


def word_count(value: str) -> int:
    return len(re.findall(r"\b[\w’'-]+\b", plain_text(value)))


def summary_for(item: ET.Element, body: str) -> str:
    excerpt = plain_text(text(item, "excerpt:encoded"))
    candidate = excerpt or plain_text(body)
    candidate = re.sub(r"\s*Continue reading.*$", "", candidate, flags=re.IGNORECASE)
    if len(candidate) <= 240:
        return candidate
    shortened = candidate[:237].rsplit(" ", 1)[0]
    return f"{shortened}…"


def terms_for(item: ET.Element, domain: str) -> list[str]:
    values = []
    for element in item.findall("category"):
        if element.get("domain") == domain and element.get("nicename"):
            values.append(element.get("nicename", ""))
    return sorted(set(values))


def classify(slug: str, title: str, categories: list[str], body: str) -> str:
    if slug in NEWS_SLUGS:
        return "news"
    category_set = set(categories)
    if category_set & SHORT_FORM_CATEGORIES:
        return "news"
    if title.lower().startswith(("quicklink:", "quick link:")):
        return "news"
    if "words" not in category_set and word_count(body) < 120:
        return "news"
    return "article"


def yaml_line(key: str, value: object) -> str:
    return f"{key}: {json.dumps(value, ensure_ascii=False)}"


def clean_body(value: str) -> str:
    value = value.replace("<!--more-->", "")
    return value.strip()


def post_markdown(item: ET.Element) -> tuple[Path, str, str]:
    slug = text(item, "wp:post_name").strip()
    if not slug:
        slug = f"wordpress-{text(item, 'wp:post_id')}"
    published = text(item, "wp:post_date")
    modified = text(item, "wp:post_modified") or published
    title = html.unescape(text(item, "title")).strip()
    body = clean_body(text(item, "content:encoded"))
    categories = terms_for(item, "category")
    tags = terms_for(item, "post_tag")
    kind = classify(slug, title, categories, body)
    legacy_link = text(item, "link")
    legacy_path = urllib.parse.urlparse(legacy_link).path or f"/{slug}/"

    lines = [
        "---",
        yaml_line("title", title),
        yaml_line("slug", slug),
        yaml_line("kind", kind),
        yaml_line("date", published[:10]),
        yaml_line("modified", modified[:10]),
        yaml_line("summary", summary_for(item, body)),
        yaml_line("categories", categories),
        yaml_line("tags", tags),
        yaml_line("wordpressId", int(text(item, "wp:post_id"))),
        yaml_line("legacyUrl", legacy_path),
        yaml_line("format", "html"),
        "draft: false",
        "---",
        "",
        body,
        "",
    ]
    year, month = published[:4], published[5:7]
    return Path(year) / month / slug / "index.md", "\n".join(lines), kind


def media_urls(published_bodies: list[str]) -> tuple[list[str], list[str]]:
    urls = set()
    for body in published_bodies:
        urls.update(html.unescape(match) for match in UPLOAD_URL_RE.findall(body))
    local, external = [], []
    for url in sorted(urls):
        suffix = Path(urllib.parse.unquote(urllib.parse.urlparse(url).path)).suffix.lower()
        (external if suffix in EXTERNAL_MEDIA_EXTENSIONS else local).append(url)
    return local, external


def destination_for(public_dir: Path, url: str) -> Path | None:
    parsed = urllib.parse.urlparse(url)
    if parsed.hostname not in {"emojiency.com", "www.emojiency.com"}:
        return None
    path = urllib.parse.unquote(parsed.path).lstrip("/")
    if "wp-content/uploads/" not in path or ".." in Path(path).parts:
        return None
    return public_dir / path


def download_media(public_dir: Path, urls: list[str]) -> tuple[int, list[str]]:
    def download_one(index_and_url: tuple[int, str]) -> tuple[str, str]:
        index, url = index_and_url
        destination = destination_for(public_dir, url)
        if destination is None:
            return "skipped", url
        if destination.exists() and destination.stat().st_size:
            return "cached", url
        destination.parent.mkdir(parents=True, exist_ok=True)
        request = urllib.request.Request(url, headers={"User-Agent": "Emojiency Astro migration/1.0"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                destination.write_bytes(response.read())
            print(f"media {index}/{len(urls)} {destination.relative_to(public_dir)}")
            return "downloaded", url
        except (OSError, urllib.error.URLError) as error:
            if destination.exists():
                destination.unlink()
            return "failed", f"{url}: {error}"

    downloaded = 0
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        for status, detail in executor.map(download_one, enumerate(urls, start=1)):
            if status == "downloaded":
                downloaded += 1
            elif status == "failed":
                failures.append(detail)
    return downloaded, failures


def prune_media(public_dir: Path, urls: list[str]) -> int:
    roots = [
        public_dir / "bloggityblogblog/wp-content/uploads",
        public_dir / "wp-content/uploads",
    ]
    keep = {
        destination.resolve()
        for url in urls
        if (destination := destination_for(public_dir, url)) is not None
    }
    removed = 0
    for root in roots:
        if not root.exists():
            continue
        for file in root.rglob("*"):
            if file.is_file() and file.resolve() not in keep:
                file.unlink()
                removed += 1
        for directory in sorted((path for path in root.rglob("*") if path.is_dir()), reverse=True):
            if not any(directory.iterdir()):
                directory.rmdir()
    return removed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("export", type=Path, help="WordPress WXR XML export")
    parser.add_argument("--project", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--download-media", action="store_true")
    parser.add_argument("--prune-media", action="store_true")
    args = parser.parse_args()

    root = ET.parse(args.export).getroot()
    posts_dir = args.project / "src/content/posts"
    public_dir = args.project / "public"
    report_dir = args.project / "reports"
    posts_dir.mkdir(parents=True, exist_ok=True)
    report_dir.mkdir(parents=True, exist_ok=True)

    counts = {"article": 0, "news": 0}
    published_bodies = []
    published_items = []
    for item in root.findall("./channel/item"):
        if text(item, "wp:post_type") != "post" or text(item, "wp:status") != "publish":
            continue
        published_items.append(item)

    for item in published_items:
        relative_path, markdown, kind = post_markdown(item)
        destination = posts_dir / relative_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(markdown, encoding="utf-8")
        counts[kind] += 1
        published_bodies.append(text(item, "content:encoded"))

    urls, external_urls = media_urls(published_bodies)
    downloaded = 0
    failures: list[str] = []
    if args.download_media:
        downloaded, failures = download_media(public_dir, urls)
    pruned = prune_media(public_dir, urls) if args.prune_media else 0

    report = {
        "publishedPosts": len(published_items),
        "articles": counts["article"],
        "news": counts["news"],
        "mediaUrlsFound": len(urls),
        "externalMediaUrls": len(external_urls),
        "mediaDownloadedThisRun": downloaded,
        "mediaPrunedThisRun": pruned,
        "mediaFailures": failures,
    }
    (report_dir / "wordpress-import.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
