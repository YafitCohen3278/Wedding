const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://wedding-coral-eight.vercel.app';
const LETTERS_URL = `${BASE_URL}/letter`;
const OUTPUT_DIR = path.join(__dirname, '../public/qrcodes');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateQRCodes() {
  // יצירת ברקוד לאתר הראשי
  try {
    const mainFilename = path.join(OUTPUT_DIR, `main-website.png`);
    await QRCode.toFile(mainFilename, BASE_URL, {
      color: {
        dark: '#000000', // שחור
        light: '#ffffff',
      },
      width: 300,
      margin: 2,
    });
    console.log(`Generated QR code for the main website: ${mainFilename}`);
  } catch (err) {
    console.error(`Error generating QR code for the main website:`, err);
  }

  // יצירת ברקודים לכל המכתבים
  for (let i = 1; i <= 30; i++) {
    const url = `${LETTERS_URL}/${i}`;
    const filename = path.join(OUTPUT_DIR, `letter-${i}.png`);

    try {
      await QRCode.toFile(filename, url, {
        color: {
          dark: '#000000', // שחור
          light: '#ffffff',
        },
        width: 300,
        margin: 2,
      });
      console.log(`Generated QR code for letter ${i}: ${filename}`);
    } catch (err) {
      console.error(`Error generating QR code for letter ${i}:`, err);
    }
  }
}

generateQRCodes();
