import fs from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'src', 'assets', 'fonts');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const families = [
  { name: 'Plus Jakarta Sans', query: 'Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500' },
  { name: 'Instrument Serif', query: 'Instrument+Serif:ital@0;1' },
];

const out = [];
for (const fam of families) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${fam.query}&display=swap`, { headers: { 'User-Agent': UA } })).text();
  const blocks = css.split('/*').slice(1);
  for (const b of blocks) {
    const subset = b.slice(0, b.indexOf('*/')).trim();
    if (!['latin', 'latin-ext'].includes(subset)) continue;
    const weight = (b.match(/font-weight:\s*(\d+)/) || [])[1] || '400';
    const style = (b.match(/font-style:\s*(\w+)/) || [])[1] || 'normal';
    const url = (b.match(/url\((https:[^)]+)\)/) || [])[1];
    if (!url) continue;
    const file = `${fam.name.replace(/\s+/g, '')}-${weight}${style === 'italic' ? 'i' : ''}-${subset}.woff2`;
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
    await fs.writeFile(path.join(OUT_DIR, file), buf);
    out.push({ family: fam.name, weight, style, file, size: buf.length });
  }
}
await fs.writeFile(path.join(OUT_DIR, 'fonts.json'), JSON.stringify(out, null, 2));
console.log(out.map(o => `${o.file} ${(o.size/1024).toFixed(1)}kb`).join('\n'));
