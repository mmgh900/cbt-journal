const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create directory if it doesn't exist
const iconDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// Source SVG
const svgPath = path.join(iconDir, 'icon.svg');

// Icon sizes to generate
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Additional special icons
const specialIcons = [
  { name: 'favicon.ico', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

// Generate regular size icons
async function generateIcons() {
  console.log('Generating PWA icons...');

  try {
    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error('SVG icon not found at:', svgPath);
      return;
    }

    // Generate standard size icons
    for (const size of sizes) {
      const outputPath = path.join(iconDir, `icon-${size}x${size}.png`);
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`Generated: ${outputPath}`);
    }

    // Generate special icons
    for (const icon of specialIcons) {
      const outputPath = path.join(iconDir, icon.name);
      await sharp(svgPath)
        .resize(icon.size, icon.size)
        .toFile(outputPath);
      console.log(`Generated: ${outputPath}`);
    }

    console.log('Icon generation complete!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
