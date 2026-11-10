// Downloads official developer imagery into public/img/projects/<slug>/
// Usage (on your own computer, Node 18+):
//   1. In src/data/projects.mjs put the developer's official project page URL(s) into `imagePages`
//   2. node scripts/fetch-images.mjs            (all projects)
//      node scripts/fetch-images.mjs lakun      (one project)
//   3. Open public/img/projects/<slug>/, delete anything off-brand (logos, plans, people), keep the best 6–10
//   4. npm run build
// Only use images you are entitled to use — ask the developer for their marketing pack / agent media kit.
import fs from 'node:fs';
import path from 'node:path';
import { projects } from '../src/data/projects.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const only = process.argv[2];
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const MAX = 12, MIN_BYTES = 60_000;

const abs = (u, base) => { try { return new URL(u.replace(/&amp;/g, '&'), base).href; } catch { return null; } };
const skip = /logo|icon|favicon|sprite|avatar|flag|whatsapp|facebook|instagram|linkedin|youtube|placeholder|loader|plano|plan[-_]|floor/i;

function candidates(html, base) {
  const set = new Set();
  const add = u => { const a = abs(u, base); if (a && /\.(jpe?g|webp|png)(\?|$)/i.test(a) && !skip.test(a)) set.add(a); };
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)/gi)) add(m[1]);
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi)) { const parts = m[1].split(',').map(s => s.trim().split(/\s+/)); parts.sort((a, b) => (parseInt(b[1]) || 0) - (parseInt(a[1]) || 0)); if (parts[0]) add(parts[0][0]); }
  for (const m of html.matchAll(/(?:data-src|data-lazy-src|data-bg|src)=["']([^"']+\.(?:jpe?g|webp|png)[^"']*)["']/gi)) add(m[1]);
  for (const m of html.matchAll(/url\(\s*['"]?([^'")]+\.(?:jpe?g|webp|png))/gi)) add(m[1]);
  return [...set];
}

for (const p of projects) {
  if (only && p.slug !== only) continue;
  if (!p.imagePages?.length) { console.log(`– ${p.slug}: no imagePages set, skipped`); continue; }
  const dir = path.join(ROOT, 'public/img/projects', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  let n = fs.readdirSync(dir).length, got = 0;
  for (const pageUrl of p.imagePages) {
    let html = '';
    try { html = await (await fetch(pageUrl, { headers: { 'user-agent': UA } })).text(); } catch (e) { console.log(`! ${p.slug}: cannot open ${pageUrl}`); continue; }
    for (const url of candidates(html, pageUrl)) {
      if (got >= MAX) break;
      try {
        const r = await fetch(url, { headers: { 'user-agent': UA, referer: pageUrl } });
        if (!r.ok) continue;
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length < MIN_BYTES) continue; // thumbnails & icons
        const ext = (url.match(/\.(jpe?g|webp|png)/i)?.[1] || 'jpg').toLowerCase().replace('jpeg', 'jpg');
        const file = path.join(dir, `${String(++n).padStart(2, '0')}.${ext}`);
        fs.writeFileSync(file, buf); got++;
        console.log(`  ✓ ${p.slug} ← ${url}`);
      } catch {}
    }
  }
  console.log(`${got ? '✔' : '–'} ${p.slug}: ${got} image(s)`);
}
console.log('\nNext: review the folders, remove anything unsuitable, then `npm run build`.');
