import { defineConfig } from 'astro/config';

export default defineConfig({
  // Defaults keep WordPress live while this build is reviewed on GitHub Pages.
  // For the eventual domain switch, build with SITE_URL=https://www.emojiency.com SITE_BASE=/.
  site: process.env.SITE_URL || 'https://wildjo.github.io',
  base: process.env.SITE_BASE || '/emojiency.com',
  output: 'static',
});
