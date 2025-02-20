// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://sophierainnudes.com',
  output: 'static',
  adapter: vercel(),
  build: {
    assets: 'assets'
  },
  integrations: [
    sitemap()
  ]
});
