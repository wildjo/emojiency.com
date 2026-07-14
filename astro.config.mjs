import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.emojiency.com',
  base: process.env.SITE_BASE || '/',
  output: 'static',
  vite: {
    cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  },
});
