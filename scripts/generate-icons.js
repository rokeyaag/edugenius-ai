import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, '../public/icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generate() {
  console.log('Generating PNG App Icons from SVG...');

  // 192x192 PNG for Android PWA
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/icon-192.png'));
  console.log('✓ Created public/icon-192.png');

  // 512x512 PNG for Android Splash & App Stores
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/icon-512.png'));
  console.log('✓ Created public/icon-512.png');

  // 180x180 PNG for Apple Touch Icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // 32x32 Favicon PNG
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  console.log('✓ Created public/favicon-32x32.png');

  console.log('All App Icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
