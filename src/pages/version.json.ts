import { getCollection } from 'astro:content';
import { published } from '../lib/content';

export async function GET() {
  const posts = published(await getCollection('posts'));
  const latestArticle = posts.find((post) => post.data.kind === 'article');
  const latestNews = posts.find((post) => post.data.kind === 'news');

  return new Response(JSON.stringify({
    generatedAt: new Date().toISOString(),
    latest: {
      article: latestArticle ? {
        id: latestArticle.id,
        published: latestArticle.data.date.toISOString(),
      } : null,
      news: latestNews ? {
        id: latestNews.id,
        published: latestNews.data.date.toISOString(),
      } : null,
    },
  }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
