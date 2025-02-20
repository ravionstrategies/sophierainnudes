// @ts-check
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

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
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      cssMinify: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
          passes: 3,
          unsafe_math: true,
          unsafe_methods: true,
          toplevel: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          reduce_vars: true
        },
        mangle: {
          toplevel: true,
          properties: false,
          keep_classnames: false,
          keep_fnames: false
        },
        format: {
          comments: false,
          ecma: 2020,
          wrap_iife: true,
          wrap_func_args: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('/components/')) {
              return 'components';
            }
            if (id.includes('/layouts/')) {
              return 'layouts';
            }
            if (id.includes('/utils/')) {
              return 'utils';
            }
          },
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          compact: true,
          minifyInternalExports: true
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/prism']
    },
    optimizeDeps: {
      include: ['@astrojs/prism']
    }
  }
});
