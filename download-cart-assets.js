const fs = require('fs');
const path = require('path');
const https = require('https');

const CART = "https://www.figma.com/api/mcp/asset/669bb6a2-5a0d-49ac-ae14-8114b9022cdb";
const ADDR = "https://www.figma.com/api/mcp/asset/0d67ed5a-9d3a-42b0-9346-72091787c142";

const dir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const items = [
  { name: 'logo.png', url: `${CART}/22733.png` },
  { name: 'coin.png', url: `${CART}/48e3e.png` },
  { name: 'kitchen.png', url: `${CART}/c1214.png` },
  { name: 'step-cart.png', url: `${CART}/a289d.png` },
  { name: 'step-address.png', url: `${CART}/a297d.png` },
  { name: 'step-payment.png', url: `${CART}/d89b4.png` },
  { name: 'step-underline.svg', url: `${CART}/97ef4.svg` },
  { name: 'step-curve-1.svg', url: `${CART}/cf745.svg` },
  { name: 'step-curve-2.svg', url: `${CART}/510c1.svg` },
  { name: 'step-curve-3.svg', url: `${CART}/a39e8.svg` },
  { name: 'promo-hourglass.svg', url: `${CART}/0a770.svg` },
  { name: 'qty-minus.svg', url: `${CART}/642e0.svg` },
  { name: 'qty-plus.svg', url: `${CART}/db4bb.svg` },
  { name: 'remove.svg', url: `${CART}/8dff0.svg` },
  { name: 'heart.svg', url: `${CART}/1683a.svg` },
  { name: 'star.svg', url: `${CART}/c474c.svg` },
  { name: 'verified.svg', url: `${CART}/6a76b.svg` },
  { name: 'location-pin.svg', url: `${CART}/ebc60.svg` },
  { name: 'search.svg', url: `${CART}/8eebb.svg` },
  { name: 'divider-line.svg', url: `${CART}/5f49e.svg` },
  { name: 'mic.svg', url: `${CART}/df503.svg` },
  { name: 'wishlist.svg', url: `${CART}/57860.svg` },
  { name: 'cart.svg', url: `${CART}/74445.svg` },
  { name: 'bell.svg', url: `${CART}/fb8f3.svg` },
  { name: 'edit-pencil.svg', url: `${ADDR}/e7df0.svg` },
  { name: 'delivery-bolt.svg', url: `${ADDR}/df8a2.svg` },
  { name: 'chevron-right.svg', url: `${ADDR}/887d4.svg` }
];

function download(item) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, item.name);
    const file = fs.createWriteStream(filePath);
    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); console.log('ok:', item.name); resolve(true); });
        }).on('error', (err) => { console.error('err redirect:', item.name, err.message); resolve(false); });
        return;
      }
      if (response.statusCode !== 200) {
        console.error('failed:', item.name, response.statusCode);
        resolve(false);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); console.log('ok:', item.name); resolve(true); });
    }).on('error', (err) => {
      console.error('err:', item.name, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const it of items) {
    await download(it);
  }
}

run();
