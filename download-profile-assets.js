const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = "https://www.figma.com/api/mcp/asset";

const publicAssets = path.join(__dirname, 'public', 'assets');
const publicIcons = path.join(publicAssets, 'icons');
const rootAssets = path.join(__dirname, 'assets');
const rootIcons = path.join(rootAssets, 'icons');

[publicAssets, publicIcons, rootAssets, rootIcons].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const items = [
  { name: 'logo.png', id: '9bb228c4-08d2-449f-a8c8-9570490e5f8c.png', isIcon: false },
  { name: 'wallet-coin.png', id: 'b428c879-8f0f-4e13-827a-d074c4750bd3.png', isIcon: false },
  { name: 'tiffin.png', id: '7a8ed2ee-1cb9-45fe-8961-e896ad588e10.png', isIcon: false },
  { name: 'location.svg', id: 'b2f495c1-d0e0-4c33-8b66-e95c1f853417.svg', isIcon: true },
  { name: 'search.svg', id: '9720881b-420a-4ae8-aaac-5d50e4ee3fba.svg', isIcon: true },
  { name: 'mic.svg', id: '0178ba1f-9956-4c01-b5e9-4afd5c6e775d.svg', isIcon: true },
  { name: 'heart.svg', id: 'e4c59ecc-22de-49ea-9a4e-7ad96f19456b.svg', isIcon: true },
  { name: 'cart.svg', id: '4894ec32-d442-4495-9b7f-fe079d212aa3.svg', isIcon: true },
  { name: 'bell.svg', id: 'e165c885-7d17-4863-bae5-c978d5e18584.svg', isIcon: true },
  { name: 'pencil.svg', id: '4b35ba33-693a-4e9e-9702-80a473fde56e.svg', isIcon: true },
  { name: 'chevron-down.svg', id: '11f25bf5-aafe-4290-b1df-d721f81374a7.svg', isIcon: true },
];

function download(item) {
  return new Promise((resolve) => {
    const url = `${BASE}/${item.id}`;
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
          handleData(res2, item, resolve);
        }).on('error', (err) => {
          console.error('Redirect err:', item.name, err.message);
          resolve(false);
        });
        return;
      }
      if (res.statusCode !== 200) {
        console.error('Failed:', item.name, res.statusCode);
        resolve(false);
        return;
      }
      handleData(res, item, resolve);
    }).on('error', (err) => {
      console.error('Request err:', item.name, err.message);
      resolve(false);
    });
  });
}

function handleData(stream, item, resolve) {
  const chunks = [];
  stream.on('data', chunk => chunks.push(chunk));
  stream.on('end', () => {
    const buffer = Buffer.concat(chunks);
    const pubDest = item.isIcon ? path.join(publicIcons, item.name) : path.join(publicAssets, item.name);
    const rootDest = item.isIcon ? path.join(rootIcons, item.name) : path.join(rootAssets, item.name);
    fs.writeFileSync(pubDest, buffer);
    fs.writeFileSync(rootDest, buffer);
    // Also save directly in publicAssets for convenience if referenced as /assets/item.name
    if (item.isIcon) {
      fs.writeFileSync(path.join(publicAssets, 'icon-' + item.name), buffer);
    }
    console.log('Saved:', item.name, buffer.length, 'bytes');
    resolve(true);
  });
  stream.on('error', (err) => {
    console.error('Stream err:', item.name, err.message);
    resolve(false);
  });
}

async function run() {
  console.log(`Downloading ${items.length} profile assets...`);
  for (const item of items) {
    await download(item);
  }
  console.log('Done downloading profile assets!');
}

run();
