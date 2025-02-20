// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://sophierainnudes.com',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [
    compress({
      CSS: true,
      HTML: {
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
      JavaScript: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      Image: true,
      SVG: true
    }),
    sitemap()
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      cssMinify: true
    }
  }
});
