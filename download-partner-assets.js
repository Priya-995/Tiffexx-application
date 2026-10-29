const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = "https://www.figma.com/api/mcp/asset";

const publicDir = path.join(__dirname, 'public', 'assets');
const assetsDir = path.join(__dirname, 'assets');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

const items = [
  { name: 'logo.png', id: '1a8e7f20-1987-40dc-8233-e5d5b4186378.png' },
  { name: 'flag.png', id: 'a2429070-42c6-4654-97cf-e5acafc9c2dc.png' },
  { name: 'hero.png', id: '1919f586-04ee-4613-9620-9d1399dd4af8.png' },
  { name: 'cuisine-1.png', id: '053cca3f-2483-4f4b-abf8-35e5d0bdaf26.png' },
  { name: 'cuisine-2.png', id: 'a093100e-a130-4283-96dc-0eca7c6d05cf.png' },
  { name: 'cuisine-3.png', id: '68d0041a-a2c9-4d31-9ea4-292617b5ba17.png' },
  { name: 'cuisine-4.png', id: '202d396c-2b1b-4da8-aa26-c31a818a78f0.png' },
  { name: 'cuisine-5.png', id: '9292188f-0fa4-45c4-8f73-fdad37c66102.png' },
  { name: 'cuisine-6.png', id: '85505c6c-9fc5-4409-ae3e-7b3161838d26.png' },
  { name: 'meal-lunch.png', id: 'd6c482b2-0cf1-4359-830b-687e284cde59.png' },
  { name: 'meal-dinner.png', id: 'ab3df770-776f-4a36-a6ac-11dd985d4c6d.png' },
  { name: 'thali.png', id: '4c8c3e9c-0f9c-464f-9309-9b0a884bf08d.png' },
  { name: 'avatar.png', id: '89e4ec31-d1d2-4511-90e2-6c0ee6db1384.png' },
  { name: 'plan-bg.png', id: '40de7946-7b8b-4c62-9b42-35f03270ba75.png' },
  { name: 'footer-logo.png', id: '0d1d22b8-d88d-471a-8415-b778ef1372d2.png' },
  { name: 'icon-pin.svg', id: 'c1a5fa04-84b0-4fa1-9125-9165812f33fc.svg' },
  { name: 'icon-search.svg', id: '00d3ac3a-9156-4e2a-9a33-4f8888603d72.svg' },
  { name: 'icon-divider.svg', id: '95e39181-1d42-40dd-8dba-12970b11010f.svg' },
  { name: 'icon-mic.svg', id: 'fea71f11-9cb0-445e-9499-bd73bd101549.svg' },
  { name: 'icon-heart.svg', id: '1043394c-11b2-484b-9f27-1a0077a4ceb9.svg' },
  { name: 'icon-cart.svg', id: '6f736d07-ddbc-4eaf-ae40-f1906e3b6e0b.svg' },
  { name: 'icon-bell.svg', id: '2302936d-657f-46fc-bbfe-265c9edf0b48.svg' },
  { name: 'icon-menu.svg', id: 'de657611-2d21-48f3-a677-341aa65e05fc.svg' },
  { name: 'icon-check-circle.svg', id: '427ce166-679c-446a-8965-80337649e91d.svg' },
  { name: 'icon-sun.svg', id: '2019191e-fc17-4b37-b4d5-b2ac5035e351.svg' },
  { name: 'icon-layers.svg', id: 'a7d27b3f-23fb-47a6-b602-f6f7aaf1f13f.svg' },
  { name: 'icon-leaf.svg', id: '9ea1fda7-ad85-4823-b244-dc6f638a3e1f.svg' },
  { name: 'icon-more-vertical.svg', id: '7bd83212-d0a9-4f49-bab3-c41980eef7a0.svg' },
  { name: 'icon-review-like.svg', id: 'fd467356-15a6-4d29-9b1a-4a14573e50e5.svg' },
  { name: 'icon-review-comment.svg', id: 'eac67360-9888-40e0-83c1-239887284014.svg' },
  { name: 'icon-review-save.svg', id: '3e0b840c-17c9-4ffa-aa1d-6da8fb86a519.svg' }
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
    fs.writeFileSync(path.join(publicDir, item.name), buffer);
    fs.writeFileSync(path.join(assetsDir, item.name), buffer);
    console.log('Saved:', item.name, buffer.length, 'bytes');
    resolve(true);
  });
  stream.on('error', (err) => {
    console.error('Stream err:', item.name, err.message);
    resolve(false);
  });
}

async function run() {
  console.log(`Downloading ${items.length} assets...`);
  for (const item of items) {
    await download(item);
  }
  console.log('Done downloading assets!');
}

run();
