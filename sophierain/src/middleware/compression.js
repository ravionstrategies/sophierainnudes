import { defineMiddleware } from 'astro/middleware';
import compression from 'compression';

export const onRequest = defineMiddleware(async (context, next) => {
  // Enable compression for all responses
  const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  };

  const compressMiddleware = compression({
    filter: shouldCompress,
    level: 9, // Maximum compression level
    threshold: 0, // Compress all sizes
    strategy: compression.Z_RLE, // Use RLE strategy for better text compression
    flush: compression.Z_SYNC_FLUSH,
    chunkSize: 16 * 1024, // 16KB chunks for better mobile performance
    memLevel: 9, // Use maximum memory for compression
    windowBits: 15 + 16, // Enable gzip
    brotli: {
      enabled: true,
      zlib: {
        params: {
          [compression.constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
          [compression.constants.BROTLI_PARAM_LGWIN]: 24, // Maximum window size
          [compression.constants.BROTLI_PARAM_MODE]: compression.constants.BROTLI_MODE_TEXT
        }
      }
    }
  });

  // Apply compression
  await new Promise((resolve) => compressMiddleware(context.request, context.response, resolve));

  // Continue with the request
  return next();
}); 