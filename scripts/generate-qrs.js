const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://wedding-coral-eight.vercel.app/letter';
const OUTPUT_DIR = path.join(__dirname, '../public/qrcodes');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateQRCodes() {
  for (let i = 1; i <= 30; i++) {
    const url = `${BASE_URL}/${i}`;
    const filename = path.join(OUTPUT_DIR, `letter-${i}.png`);

    try {
      await QRCode.toFile(filename, url, {
        color: {
          dark: '#b56576', // הצבע הוורוד-כהה של האתר
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
