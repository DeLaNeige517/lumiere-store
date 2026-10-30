import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "public", "images");
const JOBS = [
  ["hero/hero.jpg", 1600, 86],
  ["promo/promo.jpg", 1500, 84],
  ["products/p-earbuds.jpg", 900, 84],
  ["products/p-headphone.jpg", 900, 84],
  ["products/p-watch.jpg", 900, 84],
  ["products/p-band.jpg", 900, 84],
  ["products/p-lamp.jpg", 900, 84],
  ["products/p-speaker.jpg", 900, 84],
  ["products/p-charger.jpg", 900, 84],
  ["products/p-projector.jpg", 900, 84],
  ["products/p-neckphone.jpg", 900, 84],
  ["collections/c-travel.jpg", 960, 82],
  ["collections/c-quiet.jpg", 960, 82],
  ["collections/c-health.jpg", 960, 82],
  ["collections/c-home.jpg", 960, 82],
  ["lifestyle/l-city.jpg", 1000, 82],
  ["lifestyle/l-efficient.jpg", 1000, 82],
  ["lifestyle/l-wellness.jpg", 1000, 82],
];

let before = 0;
let after = 0;
for (const [rel, width, quality] of JOBS) {
  const full = path.join(BASE, rel);
  const buf = await fs.readFile(full);
  before += buf.length;
  const out = await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await fs.writeFile(full, out);
  after += out.length;
  console.log(
    `${rel.padEnd(30)} ${(buf.length / 1024).toFixed(0).padStart(4)}kb -> ${(out.length / 1024).toFixed(0).padStart(4)}kb`,
  );
}

await fs.rm(path.join(BASE, "raw"), { recursive: true, force: true });
console.log(
  `\n总计 ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`,
);
