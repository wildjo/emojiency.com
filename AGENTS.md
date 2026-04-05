# Emojiency — Agent Operations Manual

This document tells AI agents (Claude Code, OpenAI Codex, or any future tool) how to set up, maintain, and publish content to emojiency.com.

## 1. Environment Setup (macOS)

### First-time setup

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.zshrc
nvm install --lts
nvm use --lts
git clone git@github.com:emojiency/emojiency.git
cd emojiency
npm install
npm run dev
```

Site is now at http://localhost:4321

### Returning to work

```bash
cd ~/path/to/emojiency
npm run dev
```

## 2. Project Structure

```
emojiency/
├── astro.config.mjs
├── package.json
├── public/
│   └── images/
│       ├── splash/
│       ├── articles/
│       └── news/
├── src/
│   ├── content.config.ts
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro          (home = splash + news feed)
│   │   ├── articles/
│   │   │   ├── index.astro      (article TOC)
│   │   │   └── [...id].astro   (article detail)
│   │   └── menu/
│   │       ├── index.astro
│   │       ├── about.astro
│   │       └── recommended.astro
│   ├── content/
│   │   ├── articles/            (long-form .md files)
│   │   └── news/                (short-form .md files)
│   ├── styles/
│   │   └── global.css
│   └── assets/images/splash/    (legacy, unused)
└── .github/workflows/
    └── deploy.yml
```

## 3. Creating a News Post

File location: `src/content/news/<slug>.md`

### Front matter

```yaml
---
title: "Optional headline"
date: 2026-04-03
images:
  - src: filename.png
    caption: "Optional caption"
link: https://example.com/article
draft: false
---

Body text in markdown. Can include [links](https://example.com).
```

All fields except `date` are optional. Need at least one of: images or body text.

### Image handling

1. Place image files in `public/images/news/`
2. Prefer a post-specific subfolder when a post has multiple images, e.g. `public/images/news/my-post/`
3. Reference images in front matter using the path relative to `public/images/news/`, e.g. `my-post/image-01.jpg`
4. Rename imported files to clean, slugged names so the news image directory stays organized
5. Multiple images become a slideshow
6. All images open in lightbox when clicked

### Example agent workflow

```bash
mkdir -p public/images/news/cool-find
cp ~/Downloads/screenshot.png public/images/news/cool-find/cool-find-01.png
cat > src/content/news/cool-find.md << 'EOF'
---
title: "Check this out"
date: 2026-04-05
images:
  - src: cool-find/cool-find-01.png
    caption: "A cool thing I found"
link: https://example.com/source
---

Brief commentary goes here.
EOF

git add .
git commit -m "news: cool find"
git push origin main
```

## 4. Creating an Article

File location: `src/content/articles/<slug>.md`

### Front matter

```yaml
---
title: "The Full Title of the Essay"
date: 2026-03-15
summary: "One or two sentence summary for the TOC."
hero: hero-image-filename.jpg
heroCaption: "Caption for lightbox"
draft: false
---

Full article body in markdown.
```

`title`, `date`, and `summary` are required. Others are optional.

### Image handling

1. Hero images go in `public/images/articles/`
2. Inline images also go in `public/images/articles/`
3. Reference hero by filename only in front matter

## 5. Conversational Posting Workflow

When the user says "Hey, here's a cool article" or shares images:

### For a news post:
1. Extract: title (if given), link, images, commentary
2. Generate slug from title or content
3. Set today's date
4. Save images to `public/images/news/<slug>/` when there are multiple images, using clean slugged filenames
5. Create markdown in `src/content/news/`
6. Commit: `news: <description>`
7. Push to main

### For an article:
1. User provides content (Word, RTF, markdown, plain text)
2. Convert to markdown if needed
3. Get or generate: title, summary, hero image
4. Save images to `public/images/articles/`
5. Create markdown in `src/content/articles/`
6. Commit: `article: <title>`
7. Push to main

### Detecting post type:
- Link with brief commentary → news
- Images with brief commentary → news
- Long-form document → article
- If ambiguous, ask

## 6. Updating Recommendations

1. Read all articles in `src/content/articles/`
2. Pick 3 best recent + 3 best from archives
3. Write 1-2 sentence summary of each
4. Update `src/pages/menu/recommended.astro`
5. Commit: `chore: update recommendations`
6. Push to main

## 7. Splash Screens

Splash images go in `public/images/splash/`. Each splash is registered in `public/images/splash/splashes.json`.

The homepage picks a splash at random from those matching the current date context, then animates it bouncing off the edges of the splash area (DVD-logo style).

### Manifest format (`splashes.json`)

```json
[
  {
    "id": "unique-id",
    "image": "filename.png",
    "rotate": 0,
    "scale": 0.45,
    "context": { "always": true }
  }
]
```

| Field   | Type   | Notes |
|---------|--------|-------|
| id      | string | Unique identifier |
| image   | string | Filename in `public/images/splash/` |
| rotate  | number | Degrees of rotation (0, 90, 180, 270) |
| scale   | number | Fraction of container width for sizing (e.g. 0.45 = 45%) |
| context | object | When this splash is eligible (see below) |

### Context matching

The client picks from splashes whose context matches the current date. Fields are combined with OR logic — matching any field makes the splash eligible.

| Context field | Type     | Example | Notes |
|---------------|----------|---------|-------|
| always        | boolean  | `true`  | Always eligible |
| months        | number[] | `[12, 1, 2]` | 1=Jan, 12=Dec |
| dates         | string[] | `["12-25", "01-01"]` | MM-DD format |
| weekdays      | number[] | `[0, 6]` | 0=Sunday, 6=Saturday |
| seasons       | string[] | `["winter"]` | spring, summer, fall, winter |

### Adding a new splash

1. Place image in `public/images/splash/`
2. Add entry to `splashes.json` with context rules
3. Set `rotate` for orientation (0 = normal, 90 = vertical)
4. Adjust `scale` to taste (0.3–0.5 typical)
5. Commit: `splash: <description>`

## 8. Deployment

Fully automated via GitHub Actions. Push to `main` and it builds and deploys.

### DNS (Mythic Beasts)
- CNAME: `www.emojiency.com` → `<username>.github.io`
- A records for apex → GitHub Pages IPs

## 9. Local Dev Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to dist/
npm run preview   # Preview production build
```

## 10. Content Schema Quick Reference

### News
| Field  | Type   | Required | Notes |
|--------|--------|----------|-------|
| title  | string | no | Omit for untitled posts |
| date   | date   | yes | ISO format |
| images | array  | no | Each: { src, caption? }, where `src` is relative to `public/images/news/` and may include subfolders |
| link   | URL    | no | External link |
| draft  | bool   | no | Default false |

### Articles
| Field       | Type   | Required | Notes |
|-------------|--------|----------|-------|
| title       | string | yes | Full title |
| date        | date   | yes | ISO format |
| summary     | string | yes | For TOC display |
| hero        | string | no | Filename in public/images/articles/ |
| heroCaption | string | no | Lightbox caption |
| draft       | bool   | no | Default false |
