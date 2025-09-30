const sharp = require('sharp');
const path = require('path');

async function generateOGImage() {
  const inputImage = path.join(__dirname, '../public/assets/main-dark.png');
  const outputPath = path.join(__dirname, '../public');

  // Generate OG image (1200x630) - standard size for social media
  await sharp(inputImage)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .toFile(path.join(outputPath, 'og-image.png'));
  console.log('✅ Generated og-image.png (1200x630)');

  // Generate Twitter card image (1200x600)
  await sharp(inputImage)
    .resize(1200, 600, {
      fit: 'cover',
      position: 'center'
    })
    .toFile(path.join(outputPath, 'twitter-image.png'));
  console.log('✅ Generated twitter-image.png (1200x600)');
}

generateOGImage().catch(console.error);