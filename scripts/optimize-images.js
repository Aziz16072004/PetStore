/*
 Image optimization script
 - Scans src/assets for png|jpg|jpeg|webp
 - Emits responsive WebP (and AVIF when possible) variants to public/images
 - Sizes: 320, 480, 640, 960, 1280
 Usage: node scripts/optimize-images.js
*/

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC_DIR = path.resolve('src/assets');
const OUT_DIR = path.resolve('public/images');
const SIZES = [320, 480, 640, 960, 1280];
const INPUT_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

function toSafeBase(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_\.]/g, '')
    .replace(/\.(png|jpg|jpeg|webp|gif|bmp|svg)$/i, '');
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!INPUT_EXT.has(ext)) return;

  const base = path.basename(filePath);
  const safe = toSafeBase(base);
  const buffer = await fs.promises.readFile(filePath);

  for (const width of SIZES) {
    const webpOut = path.join(OUT_DIR, `${safe}-${width}.webp`);
    const avifOut = path.join(OUT_DIR, `${safe}-${width}.avif`);

    // WebP
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(webpOut);

    // AVIF (smaller but more CPU; can be skipped if undesired)
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 50 })
      .toFile(avifOut);
  }
}

async function* walk(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const f of files) {
    const res = path.resolve(dir, f.name);
    if (f.isDirectory()) {
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

async function main() {
  await ensureDir(OUT_DIR);
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }
  let count = 0;
  for await (const file of walk(SRC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!INPUT_EXT.has(ext)) continue;
    console.log('Optimizing', path.relative(process.cwd(), file));
    try {
      await processImage(file);
      count++;
    } catch (e) {
      console.error('Failed to optimize', file, e);
    }
  }
  console.log(`Done. Optimized ${count} images into ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
