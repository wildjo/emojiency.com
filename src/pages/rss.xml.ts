import { getCollection } from 'astro:content';
import { plainText, postThumbnail, published } from '../lib/content';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(value: string) {
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export async function GET({ site }: { site?: URL }) {
  const origin = site || new URL('https://www.emojiency.com');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const homeUrl = new URL(`${base}/`, origin).href;
  const feedUrl = new URL(`${base}/rss.xml`, origin).href;
  const posts = published(await getCollection('posts'));

  const items = posts.map((post) => {
    const link = new URL(`${base}/${post.id}/`, origin).href;
    const description = post.data.summary || plainText(post.body || '').slice(0, 400);
    const thumbnail = postThumbnail(post, base);
    const image = thumbnail ? new URL(thumbnail.src, origin).href : undefined;
    const content = [
      image ? `<p><a href="${escapeXml(link)}"><img src="${escapeXml(image)}" alt="${escapeXml(thumbnail?.caption || '')}" /></a></p>` : '',
      description ? `<p>${escapeXml(description)}</p>` : '',
      `<p><a href="${escapeXml(link)}">Read on Emojiency.com →</a></p>`,
    ].join('');

    return `
      <item>
        <title>${escapeXml(post.data.title || post.id)}</title>
        <link>${escapeXml(link)}</link>
        <guid isPermaLink="true">${escapeXml(link)}</guid>
        <pubDate>${post.data.date.toUTCString()}</pubDate>
        <description>${cdata(description)}</description>
        <content:encoded>${cdata(content)}</content:encoded>
        <category>${escapeXml(post.data.kind)}</category>
        ${post.data.categories.map((category) => `<category>${escapeXml(category)}</category>`).join('')}
      </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Emojiency</title>
        <link>${escapeXml(homeUrl)}</link>
        <description>Fiction, autobiography, and all the gooey stuff in the middle.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
