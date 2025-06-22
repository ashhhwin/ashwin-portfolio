const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Read the SVG file
const svgContent = fs.readFileSync('public/favicon.svg', 'utf8');

// Convert SVG to PNG with different sizes
const sizes = [16, 32, 48, 64, 128, 256];

async function convertFavicon() {
  try {
    // Create favicon.ico (16x16 and 32x32 combined)
    const png16 = await sharp(Buffer.from(svgContent))
      .resize(16, 16)
      .png()
      .toBuffer();
    
    const png32 = await sharp(Buffer.from(svgContent))
      .resize(32, 32)
      .png()
      .toBuffer();
    
    // Save individual PNG files
    await sharp(Buffer.from(svgContent))
      .resize(16, 16)
      .png()
      .toFile('public/favicon-16x16.png');
    
    await sharp(Buffer.from(svgContent))
      .resize(32, 32)
      .png()
      .toFile('public/favicon-32x32.png');
    
    await sharp(Buffer.from(svgContent))
      .resize(48, 48)
      .png()
      .toFile('public/favicon-48x48.png');
    
    await sharp(Buffer.from(svgContent))
      .resize(64, 64)
      .png()
      .toFile('public/favicon-64x64.png');
    
    await sharp(Buffer.from(svgContent))
      .resize(128, 128)
      .png()
      .toFile('public/favicon-128x128.png');
    
    await sharp(Buffer.from(svgContent))
      .resize(256, 256)
      .png()
      .toFile('public/favicon-256x256.png');
    
    console.log('✅ Favicon PNG files created successfully!');
    console.log('Created files:');
    console.log('- favicon-16x16.png');
    console.log('- favicon-32x32.png');
    console.log('- favicon-48x48.png');
    console.log('- favicon-64x64.png');
    console.log('- favicon-128x128.png');
    console.log('- favicon-256x256.png');
    
  } catch (error) {
    console.error('Error converting favicon:', error);
  }
}

convertFavicon(); 