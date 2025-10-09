// Composites src/assets/catImg.png centered over src/assets/coloredVector.png
// and overwrites coloredVector.png with the result.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compositeCatIntoColoredVector() {
  const assetsDir = path.resolve(__dirname, '..', 'src', 'assets');
  const basePath = path.join(assetsDir, 'coloredVector.png');
  const overlayPath = path.join(assetsDir, 'catImg.png');

  // Read base to determine dimensions
  const baseImage = sharp(basePath);
  const { width: baseW, height: baseH } = await baseImage.metadata();
  if (!baseW || !baseH) {
    throw new Error('Unable to read base image dimensions.');
  }

  // Prepare overlay: scale cat to fit within ~60% of base's smallest side
  const targetSide = Math.floor(Math.min(baseW, baseH) * 0.6);
  const resizedOverlayBuffer = await sharp(overlayPath)
    .resize({
      width: targetSide,
      height: targetSide,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  // Composite centered to a temp file to avoid same input/output
  const tempOutPath = path.join(assetsDir, `coloredVector.composited.tmp.png`);
  await sharp(basePath)
    .composite([
      {
        input: resizedOverlayBuffer,
        gravity: 'center',
      },
    ])
    .png()
    .toFile(tempOutPath);

  // Replace the original file atomically
  const fs = await import('node:fs/promises');
  await fs.rename(tempOutPath, basePath);

  console.log('Composite written to', basePath);
}

compositeCatIntoColoredVector().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


