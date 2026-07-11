import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().optional(),
    kind: z.enum(['article', 'news']),
    date: z.coerce.date(),
    timeZone: z.string().optional(),
    modified: z.coerce.date().optional(),
    summary: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    wordpressId: z.number().int().positive().optional(),
    legacyUrl: z.string().optional(),
    format: z.enum(['markdown', 'html']).default('markdown'),
    hero: z.string().optional(),
    heroCaption: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).optional(),
    link: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
