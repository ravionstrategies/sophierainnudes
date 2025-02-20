import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const BREAKPOINTS = [20, 320, 640, 768, 1024, 1280];
const IMAGE_QUALITY = 80;
const INPUT_DIR = 'public/images/originals';
const OUTPUT_DIR = 'public/images';

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputDir = path.dirname(inputPath).replace(INPUT_DIR, OUTPUT_DIR);

  // Ensure output directory exists
  await ensureDirectoryExists(outputDir);

  // Create placeholder and responsive images
  for (const width of BREAKPOINTS) {
    // Generate WebP version
    const outputWebP = path.join(outputDir, `${filename}-${width}.webp`);
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: width === 20 ? 30 : IMAGE_QUALITY,
        effort: 6
      })
      .toFile(outputWebP);

    console.log(`Generated: ${outputWebP}`);

    // Generate original format version (if not already WebP)
    const originalExt = path.extname(inputPath).toLowerCase();
    if (originalExt !== '.webp') {
      const outputOriginal = path.join(outputDir, `${filename}-${width}${originalExt}`);
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputOriginal);

      console.log(`Generated: ${outputOriginal}`);
    }
  }

  // Create base WebP version
  const baseWebP = path.join(outputDir, `${filename}.webp`);
  await sharp(inputPath)
    .webp({ quality: IMAGE_QUALITY, effort: 6 })
    .toFile(baseWebP);

  console.log(`Generated base WebP: ${baseWebP}`);
}

async function processImages() {
  try {
    // Create required directories
    await ensureDirectoryExists(INPUT_DIR);
    await ensureDirectoryExists(OUTPUT_DIR);

    // Process all images
    const images = await glob(path.join(INPUT_DIR, '**/*.{jpg,jpeg,png,webp}'));
    console.log(`Found ${images.length} images to process`);
    
    for (const image of images) {
      await optimizeImage(image);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
    process.exit(1);
  }
}

// Create sample images if none exist
async function createSampleImages() {
  const sampleImagesDir = path.join(INPUT_DIR);
  await ensureDirectoryExists(sampleImagesDir);

  // Create hero image
  const heroPath = path.join(sampleImagesDir, 'hero.jpg');
  const heroExists = (await glob(heroPath)).length > 0;
  if (!heroExists) {
    await sharp({
      create: {
        width: 1920,
        height: 1080,
        channels: 4,
        background: { r: 255, g: 105, b: 180, alpha: 1 }
      }
    })
    .jpeg()
    .toFile(heroPath);
  }

  // Create gallery images
  for (let i = 1; i <= 6; i++) {
    const galleryPath = path.join(sampleImagesDir, `gallery-${i}.jpg`);
    const galleryExists = (await glob(galleryPath)).length > 0;
    if (!galleryExists) {
      await sharp({
        create: {
          width: 800,
          height: 800,
          channels: 4,
          background: { r: 255, g: 105, b: 180, alpha: 0.5 }
        }
      })
      .jpeg()
      .toFile(galleryPath);
    }
  }
}

// Run the script
(async () => {
  try {
    await createSampleImages();
    await processImages();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})(); 