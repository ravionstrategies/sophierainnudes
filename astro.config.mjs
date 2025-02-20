import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://sophierainnudes.com',
  output: 'server',
  adapter: vercel(),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      },
      JavaScript: {
        terser: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      },
      Image: false,
      SVG: true
    }),
    sitemap()
  ]
}); 