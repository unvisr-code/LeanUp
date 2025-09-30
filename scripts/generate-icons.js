const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const inputImage = path.join(__dirname, '../public/assets/main.png');
  const appDir = path.join(__dirname, '../app');

  // Generate favicon.ico (32x32)
  await sharp(inputImage)
    .resize(32, 32)
    .toFile(path.join(appDir, 'icon.png'));
  console.log('✅ Generated icon.png (32x32)');

  // Generate apple-icon.png (180x180)
  await sharp(inputImage)
    .resize(180, 180)
    .toFile(path.join(appDir, 'apple-icon.png'));
  console.log('✅ Generated apple-icon.png (180x180)');

  // Generate favicon.ico (48x48 for better quality)
  await sharp(inputImage)
    .resize(48, 48)
    .toFile(path.join(appDir, 'favicon.ico'));
  console.log('✅ Generated favicon.ico (48x48)');
}

generateIcons().catch(console.error);