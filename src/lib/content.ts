import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function published(posts: Post[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function postUrl(post: Post, base: string) {
  return `${base}/${post.id}/`;
}

export function formatPostDate(post: Post, style: 'short' | 'long' = 'long') {
  const options: Intl.DateTimeFormatOptions = {
    year: style === 'short' ? '2-digit' : 'numeric',
    month: style === 'short' ? '2-digit' : 'long',
    day: style === 'short' ? '2-digit' : 'numeric',
    timeZone: post.data.timeZone || 'UTC',
  };

  if (post.data.timeZone) {
    options.hour = 'numeric';
    options.minute = '2-digit';
    options.timeZoneName = 'short';
  }

  return new Intl.DateTimeFormat('en-US', options).format(post.data.date);
}

export function plainText(value: string) {
  return value
    .replace(/<!--.*?-->/gs, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function isPostTruncated(post: Post) {
  if (post.data.format !== 'html' || !post.data.summary) return false;
  return plainText(post.body || '').length > plainText(post.data.summary).length + 12;
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export function extractImportedImages(body: string, base: string): GalleryImage[] {
  const images: GalleryImage[] = [];
  const seen = new Set<string>();
  for (const match of body.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!src) continue;
    const localizedSrc = localizeImportedHtml(src, base);
    if (seen.has(localizedSrc)) continue;
    seen.add(localizedSrc);
    const caption = tag.match(/\b(?:alt|title)\s*=\s*(["'])(.*?)\1/i)?.[2] || '';
    images.push({ src: localizedSrc, caption });
  }
  return images;
}

export function postThumbnail(post: Post, base: string): GalleryImage | undefined {
  if (post.data.images?.length) {
    return {
      src: `${base}/images/news/${post.data.images[0].src}`,
      caption: post.data.images[0].caption || post.data.title || '',
    };
  }
  if (post.data.hero) {
    return {
      src: `${base}/images/articles/${post.data.hero}`,
      caption: post.data.heroCaption || post.data.title || '',
    };
  }
  if (post.data.format === 'html') {
    return extractImportedImages(post.body || '', base)[0];
  }
  return undefined;
}

export function localizeImportedHtml(body: string, base: string) {
  const externalMedia: string[] = [];
  const protectedBody = body.replace(
    /https?:\/\/(?:www\.)?emojiency\.com\/[^\s"'<>]*wp-content\/uploads\/[^\s"'<>]+\.(?:wav|zip)/gi,
    (url) => {
      externalMedia.push(url);
      return `__EMOJIENCY_EXTERNAL_MEDIA_${externalMedia.length - 1}__`;
    },
  );
  const localized = protectedBody
    .replaceAll('https://www.emojiency.com', base)
    .replaceAll('http://www.emojiency.com', base)
    .replaceAll('https://emojiency.com', base)
    .replaceAll('http://emojiency.com', base);
  const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return localized
    .replace(new RegExp(`${escapedBase}(?:/bloggityblogblog)?/\\d{4}/\\d{2}/([^/]+)/`, 'g'), `${base}/$1/`)
    .replace(/__EMOJIENCY_EXTERNAL_MEDIA_(\d+)__/g, (_, index) => externalMedia[Number(index)]);
}
