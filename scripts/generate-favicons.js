const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/assets/main-radious-dark.png');
const outputDir = path.join(__dirname, '../app');

async function generateFavicons() {
  try {
    // 1. icon.png (512x512) - Next.js App Router용
    await sharp(inputFile)
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'icon.png'));
    console.log('✅ Generated icon.png (512x512)');

    // 2. apple-icon.png (180x180) - Apple 기기용
    await sharp(inputFile)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-icon.png'));
    console.log('✅ Generated apple-icon.png (180x180)');

    // 3. favicon.ico (32x32) - 브라우저 탭용
    await sharp(inputFile)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log('✅ Generated favicon.ico (32x32)');

    console.log('\n🎉 All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();