import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    hero: z.string().optional(),
    heroCaption: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    images: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).optional(),
    link: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, news };
