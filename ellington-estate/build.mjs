// Ellington Estate — static site generator (no dependencies). Run: node build.mjs → ./dist
import fs from 'node:fs';
import path from 'node:path';
import { SITE, langs, L } from './src/data/i18n.mjs';
import { projects, towns, types, featureKeys } from './src/data/projects.mjs';
import { articles } from './src/blog/articles.mjs';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, 'dist');
const PUB = path.join(ROOT, 'public');
const VER = Date.now().toString(36);
const sitemap = [];

// ---------- helpers ----------
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (l, n) => new Intl.NumberFormat(L[l].locale.replace('_', '-'), { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const range = ([a, b]) => (a === b ? `${a}` : `${a}–${b}`);
const zoneOf = p => towns[p.town].zone;

const U = {
  home: l => `${L[l].prefix}/`,
  props: l => `${L[l].prefix}/${L[l].r.props}/`,
  zone: (l, z) => `${U.props(l)}${z}/`,
  town: (l, t) => `${U.zone(l, towns[t].zone)}${t}/`,
  type: (l, ty) => `${U.props(l)}${L[l].r.types[ty]}/`,
  project: (l, p) => `${U.town(l, p.town)}${p.slug}/`,
  blog: l => `${L[l].prefix}/${L[l].r.blog}/`,
  article: (l, a) => `${U.blog(l)}${a.slug[l]}/`,
  contact: l => `${L[l].prefix}/${L[l].r.contact}/`,
  about: l => `${L[l].prefix}/${L[l].r.about}/`,
  saved: l => `${L[l].prefix}/${L[l].r.saved}/`,
  privacy: l => `${L[l].prefix}/${L[l].r.privacy}/`,
};
const alts = fn => Object.fromEntries(langs.map(l => [l, fn(l)]));

// Images: every file in public/img/projects/<slug>/ (sorted) belongs to that project.
const imagesOf = slug => {
  const dir = path.join(PUB, 'img/projects', slug);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort().map(f => `/img/projects/${slug}/${f}`);
};
projects.forEach((p, i) => { p.images = imagesOf(p.slug); p.order = i; });
const heroImg = ['hero.jpg', 'hero.webp', 'hero.png'].map(f => fs.existsSync(path.join(PUB, 'img', f)) && `/img/${f}`).find(Boolean);

// ---------- art (used wherever a real photo is not yet available) ----------
const TONES = [['#d9b48f', '#2f6f86'], ['#e7c9a0', '#1f4e63'], ['#cfa57a', '#3f6e78'], ['#e3bf95', '#4b7d8a'], ['#c99a73', '#244a5a'], ['#ead2ad', '#356a7c']];
let artId = 0;
const art = (seed = 0, label = '') => {
  const [a, b] = TONES[Math.abs(seed) % TONES.length]; const id = `g${artId++}`;
  return `<div class="ph" aria-hidden="true"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".58" stop-color="#f3e2c7"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="#173a4b"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/><circle cx="${250 + (seed % 5) * 12}" cy="150" r="38" fill="#fbecd2" opacity=".85"/><g stroke="#fff" stroke-opacity=".22" fill="none"><path d="M0 200 Q100 194 200 200 T400 200"/><path d="M0 222 Q100 216 200 222 T400 222"/><path d="M0 246 Q100 240 200 246 T400 246"/></g><path d="M0 0h400v300H0z M60 300V140a140 140 0 0 1 280 0v160z" fill="#f7f2ea" fill-opacity=".08"/></svg>${label ? `<em>${esc(label)}</em>` : ''}</div>`;
};
const heroArt = () => `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9c79e"/><stop offset=".55" stop-color="#f6e4c8"/><stop offset=".56" stop-color="#2f6f86"/><stop offset="1" stop-color="#132f3d"/></linearGradient><radialGradient id="sun"><stop offset="0" stop-color="#fff6e4"/><stop offset="1" stop-color="#f3d3a3" stop-opacity="0"/></radialGradient></defs><rect width="400" height="500" fill="url(#hs)"/><circle cx="270" cy="250" r="120" fill="url(#sun)"/><circle cx="270" cy="250" r="46" fill="#fff3dc"/><g stroke="#fff" stroke-opacity=".25" fill="none">${[300, 330, 365, 405, 450].map(y => `<path d="M0 ${y} Q100 ${y - 7} 200 ${y} T400 ${y}"/>`).join('')}</g><path d="M40 280 q30-70 0-150 M40 130 q-30 10 -48 32 M40 130 q34 4 52 30 M40 130 q-8 -26 -36 -36 M40 130 q14 -24 44 -26" stroke="#1c2a32" stroke-opacity=".55" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="0" y="470" width="400" height="30" fill="#d8c3a2"/></svg>`;
const media = (src, alt, seed, label) => src ? `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">` : art(seed, label);

// ---------- icons ----------
const I = {
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18V7M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="2"/></svg>',
  bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.3-8.6C1 8.2 3 5 6.3 5c2 0 3.3 1.1 4 2.3h1.4C12.4 6.1 13.7 5 15.7 5 19 5 21 8.2 19.3 11.4 17 15.6 12 20 12 20z"/></svg>',
  arrow: '<svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  wa: '<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.2.9 3 .9 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5 0-.1-.3-.2-.6-.4z"/></svg>',
  logo: '<svg viewBox="0 0 34 40" aria-hidden="true"><path d="M2 39V17a15 15 0 0 1 30 0v22" fill="none" stroke="#1f4e63" stroke-width="1.6"/><path d="M7 39V18a10 10 0 0 1 20 0v21" fill="none" stroke="#b38d55" stroke-width="1.2"/><path d="M7 31q5-2 10 0t10 0" fill="none" stroke="#1f4e63" stroke-width="1.2"/><circle cx="17" cy="20" r="3.2" fill="#b38d55"/></svg>',
};

// ---------- layout ----------
const page = (l, o) => {
  const t = L[l].t, n = L[l].nav;
  const url = SITE.domain + o.path;
  const altLinks = langs.map(x => `<link rel="alternate" hreflang="${x}" href="${SITE.domain}${o.alts[x]}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${SITE.domain}${o.alts.en}">`;
  sitemap.push({ path: o.path, alts: o.alts, prio: o.prio || 0.6 });
  const navLink = (href, label, key) => `<a href="${href}"${o.nav === key ? ' aria-current="page"' : ''}>${label}</a>`;
  const ld = [].concat(o.ld || []).map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('');
  const ogImg = o.image ? SITE.domain + o.image : `${SITE.domain}/og.jpg`;
  return `<!doctype html><html lang="${l}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title><meta name="description" content="${esc(o.desc)}"><link rel="canonical" href="${url}">${altLinks}
<meta property="og:type" content="${o.ogType || 'website'}"><meta property="og:site_name" content="${SITE.name}"><meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ogImg}"><meta property="og:locale" content="${L[l].locale}"><meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f7f2ea"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css?v=${VER}">${ld}</head><body>
<header class="top"><div class="wrap">
<a class="logo" href="${U.home(l)}" aria-label="${SITE.name}">${I.logo}<span><b>Ellington</b><small>Estate</small></span></a>
<nav class="nav" id="nav">${navLink(U.props(l), n.props, 'props')}${navLink(U.zone(l, 'costa-blanca'), L[l].zones['costa-blanca'], 'costa-blanca')}${navLink(U.zone(l, 'costa-del-sol'), L[l].zones['costa-del-sol'], 'costa-del-sol')}${navLink(U.blog(l), n.blog, 'blog')}${navLink(U.about(l), n.about, 'about')}${navLink(U.contact(l), n.contact, 'contact')}</nav>
<div class="tools">
<div class="lang"><button aria-haspopup="true" aria-expanded="false" aria-label="${t.language}">${L[l].label}</button><ul>${langs.map(x => `<li><a href="${o.alts[x]}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ''}>${L[x].name}<span>${L[x].label}</span></a></li>`).join('')}</ul></div>
<a class="saved-link" href="${U.saved(l)}" aria-label="${n.saved}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-9.3-8.6C1 8.2 3 5 6.3 5c2 0 3.3 1.1 4 2.3h1.4C12.4 6.1 13.7 5 15.7 5 19 5 21 8.2 19.3 11.4 17 15.6 12 20 12 20z"/></svg><span class="count"></span></a>
<a class="btn" href="${U.contact(l)}">${t.talk}</a>
<button class="burger" aria-label="${t.menu}" aria-controls="nav" aria-expanded="false"><span></span><span></span><span></span></button>
</div></div></header>
<main>${o.body}</main>
<footer class="foot"><div class="wrap"><div class="cols">
<div><a class="logo" href="${U.home(l)}">${I.logo}<span><b>Ellington</b><small>Estate</small></span></a><p>${t.footerAbout}</p></div>
<div><h4>${L[l].zones['costa-blanca']}</h4><ul>${Object.entries(towns).filter(([, v]) => v.zone === 'costa-blanca').map(([k, v]) => `<li><a href="${U.town(l, k)}">${v.name}</a></li>`).join('')}</ul></div>
<div><h4>${L[l].zones['costa-del-sol']}</h4><ul>${Object.entries(towns).filter(([, v]) => v.zone === 'costa-del-sol').map(([k, v]) => `<li><a href="${U.town(l, k)}">${v.name}</a></li>`).join('')}</ul></div>
<div><h4>${SITE.name}</h4><ul>${types.map(ty => `<li><a href="${U.type(l, ty)}">${L[l].types[ty]}</a></li>`).join('')}<li><a href="${U.blog(l)}">${n.blog}</a></li><li><a href="${U.about(l)}">${n.about}</a></li><li><a href="${U.contact(l)}">${n.contact}</a></li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li></ul></div>
</div><p class="disc">${t.disclaimer}</p>
<div class="legal"><span>© ${new Date().getFullYear()} ${SITE.name} · ${t.rights}</span><span><a href="${U.privacy(l)}">${t.privacyTitle}</a> · <a href="/sitemap.xml">Sitemap</a></span></div></div></footer>
<a class="wa" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>
<script src="/assets/app.js?v=${VER}" defer></script></body></html>`;
};

const crumbs = (l, items) => `<ol class="crumbs" aria-label="${L[l].t.breadcrumb}">${items.map(([h, n], i) => `<li>${i < items.length - 1 ? `<a href="${h}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}</li>`).join('')}</ol>`;
const crumbLd = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([h, n], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.domain + h })) });

// ---------- components ----------
const card = (l, p) => {
  const t = L[l].t; const z = zoneOf(p);
  const imgs = p.images.slice(0, 4);
  const slides = imgs.length ? imgs.map((s, i) => `<div>${media(s, `${p.name}, ${towns[p.town].name} — ${i + 1}`)}</div>`).join('') : `<div>${art(p.order, p.name)}</div>`;
  const status = p.delivery === 'Completed' ? `<span class="badge badge--sea">${t.completed.split(' — ')[0]}</span>` : '';
  return `<article class="card reveal" data-slug="${p.slug}" data-zone="${z}" data-town="${p.town}" data-types="${p.types.join(' ')}" data-bedsmax="${p.beds[1]}" data-price="${p.priceFrom}" data-features="${p.features.join(' ')}" data-order="${p.order}">
<div class="card-media"><div class="slides">${slides}</div>${imgs.length > 1 ? `<div class="dots">${imgs.map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</div>` : ''}
<div class="card-badges"><span class="badge">${L[l].types[p.types[0]]}</span>${status}</div>
<button class="fav" type="button" data-slug="${p.slug}" data-on="${t.saved}" data-off="${t.save}" aria-pressed="false" aria-label="${t.save}">${I.heart}</button></div>
<div class="card-body"><div class="card-loc">${towns[p.town].name} · ${L[l].zones[z]}</div>
<h3><a href="${U.project(l, p)}">${esc(p.name)}</a></h3>
<div class="card-meta"><span>${I.bed}${range(p.beds)} ${t.bedsShort}</span><span>${I.bath}${range(p.baths)} ${t.bathsShort}</span>${p.units ? `<span>${I.home}${p.units}</span>` : ''}</div>
<div class="card-foot"><div class="price"><small>${t.from}</small><b>${money(l, p.priceFrom)}</b></div><span class="arrow">${t.viewHome} →</span></div></div></article>`;
};

const leadForm = (l, p) => {
  const t = L[l].t;
  return `<form class="form" data-ok="${esc(t.fSent)}" data-err="${esc(t.fError)}" novalidate>
${p ? `<input type="hidden" name="project" value="${esc(p.name)}">` : ''}
<div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
<input name="name" required placeholder="${t.fName}" aria-label="${t.fName}" autocomplete="name">
<input name="email" type="email" required placeholder="${t.fEmail}" aria-label="${t.fEmail}" autocomplete="email">
<input name="phone" type="tel" placeholder="${t.fPhone}" aria-label="${t.fPhone}" autocomplete="tel">
<textarea name="message" placeholder="${t.fMsg}" aria-label="${t.fMsg}"></textarea>
<label class="consent"><input type="checkbox" name="consent" required> <span>${t.fConsent} <a href="${U.privacy(l)}">→</a></span></label>
<button class="btn btn--gold" type="submit">${t.fSend}</button><div class="msg" role="status"></div></form>`;
};

const postCard = (l, a) => `<article class="post reveal"><div class="cover">${art(a.date.length + a.mins, '')}</div><div class="meta">${new Date(a.date).toLocaleDateString(L[l].locale.replace('_', '-'), { day: 'numeric', month: 'long', year: 'numeric' })} · ${a.mins} ${L[l].t.minRead}</div><h3><a href="${U.article(l, a)}">${esc(a.title[l])}</a></h3><p>${esc(a.desc[l])}</p><span class="link">${L[l].t.readMore}</span></article>`;

// ---------- pages ----------
const out = (p, html) => { const f = path.join(OUT, p, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

const zoneImage = z => (projects.find(p => zoneOf(p) === z && p.featured && p.images[0]) || projects.find(p => zoneOf(p) === z && p.images[0]) || {}).images?.[0];
const townImage = tw => (projects.find(p => p.town === tw && p.images[0]) || {}).images?.[0];
const countIn = f => projects.filter(f).length;

function home(l) {
  const t = L[l].t;
  const feat = projects.filter(p => p.featured).slice(0, 6);
  const townKeys = Object.keys(towns).sort((a, b) => countIn(p => p.town === b) - countIn(p => p.town === a));
  const body = `
<section class="hero"><div class="wrap">
<div><div class="kicker">${t.heroKicker}</div><h1>${t.heroTitle}</h1><p class="lead">${t.heroText}</p>
<div class="hero-ctas"><a class="btn" href="${U.props(l)}">${t.exploreAll}</a><a class="btn btn--ghost" href="${U.contact(l)}">${t.talk}</a></div>
<div class="hero-stats"><div><b>${projects.length}</b><span>${t.homes}</span></div><div><b>${Object.keys(towns).length}</b><span>${t.town}</span></div><div><b>2</b><span>${t.zone}</span></div></div></div>
<div class="hero-art">${heroImg ? `<img src="${heroImg}" alt="" fetchpriority="high">` : heroArt()}<span class="stamp">${t.tagline}</span></div>
</div></section>

<section class="sec sec--linen"><div class="wrap">
<div class="sec-head"><div><div class="kicker">01</div><h2>${t.chooseCoast}</h2><p>${t.chooseCoastText}</p></div><a class="link" href="${U.props(l)}">${t.allHomes}</a></div>
<div class="zones">${['costa-blanca', 'costa-del-sol'].map((z, i) => `<a class="ztile reveal" href="${U.zone(l, z)}"><div class="bg">${media(zoneImage(z), L[l].zones[z], i + 2, '')}</div><div class="cap"><div><h3>${L[l].zones[z]}</h3><div class="n">${countIn(p => zoneOf(p) === z)} ${t.homes} · ${t.fromShort} ${money(l, Math.min(...projects.filter(p => zoneOf(p) === z).map(p => p.priceFrom)))}</div></div><span class="go">${I.arrow}</span></div></a>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap">
<div class="sec-head"><div><div class="kicker">02</div><h2>${t.featured}</h2><p>${t.featuredText}</p></div><a class="link" href="${U.props(l)}">${t.viewAll}</a></div>
<div class="grid">${feat.map(p => card(l, p)).join('')}</div></div></section>

<section class="sec sec--linen"><div class="wrap">
<div class="sec-head"><div><div class="kicker">03</div><h2>${t.towns}</h2><p>${t.townsText}</p></div></div>
<div class="towns">${townKeys.map((k, i) => `<a class="town reveal" href="${U.town(l, k)}"><div class="bg">${media(townImage(k), towns[k].name, i)}</div><b>${towns[k].name}</b><span>${countIn(p => p.town === k)} · ${L[l].zones[towns[k].zone]}</span></a>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap"><div class="sec-head"><div><div class="kicker">04</div><h2>${t.stepsTitle}</h2></div></div>
<div class="steps">${t.steps.map(([h, p]) => `<div class="step reveal"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></section>

<section class="sec sec--sea"><div class="wrap"><div class="sec-head"><div><div class="kicker">05</div><h2>${t.warrantyTitle}</h2></div></div>
<div class="warr">${t.warranties.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div></div></section>

<section class="sec"><div class="wrap"><div class="sec-head"><div><div class="kicker">06</div><h2>${t.journal}</h2></div><a class="link" href="${U.blog(l)}">${t.viewAll}</a></div>
<div class="posts">${articles.slice(0, 3).map(a => postCard(l, a)).join('')}</div></div></section>`;
  const ld = { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: SITE.name, url: SITE.domain, email: SITE.email, telephone: SITE.phone, areaServed: ['Costa Blanca', 'Costa del Sol'], address: { '@type': 'PostalAddress', addressRegion: 'Alicante', addressCountry: 'ES' } };
  out(U.home(l), page(l, { title: `${SITE.name} — ${t.tagline}`, desc: t.heroText, path: U.home(l), alts: alts(U.home), body, ld, prio: 1 }));
}

function listing(l) {
  const t = L[l].t;
  const townOpts = Object.entries(towns).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([k, v]) => `<option value="${k}" data-zone="${v.zone}">${v.name}</option>`).join('');
  const prices = [300000, 400000, 500000, 750000, 1000000, 2000000];
  const items = [[U.home(l), t.home], [U.props(l), L[l].nav.props]];
  const body = `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${t.propsTitle}</h1><p class="lead">${t.propsText}</p>
<div class="chips">${types.map(ty => `<a class="chip" href="${U.type(l, ty)}">${L[l].types[ty]} <small>${countIn(p => p.types.includes(ty))}</small></a>`).join('')}</div></div></div>
<div class="filterbar"><div class="wrap"><form id="filters" role="search" aria-label="${t.filters}">
<div class="fld"><label for="f-zone">${t.zone}</label><select id="f-zone" name="zone"><option value="">${t.anyZone}</option>${['costa-blanca', 'costa-del-sol'].map(z => `<option value="${z}">${L[l].zones[z]}</option>`).join('')}</select></div>
<div class="fld"><label for="f-town">${t.town}</label><select id="f-town" name="town"><option value="">${t.anyTown}</option>${townOpts}</select></div>
<div class="fld"><label for="f-type">${t.type}</label><select id="f-type" name="type"><option value="">${t.anyType}</option>${types.map(ty => `<option value="${ty}">${L[l].types[ty]}</option>`).join('')}</select></div>
<div class="fld"><label for="f-beds">${t.minBeds}</label><select id="f-beds" name="beds"><option value="">${t.any}</option>${[1, 2, 3, 4].map(b => `<option value="${b}">${b}+</option>`).join('')}</select></div>
<div class="fld"><label for="f-max">${t.maxPrice}</label><select id="f-max" name="max"><option value="">${t.noMax}</option>${prices.map(v => `<option value="${v}">${money(l, v)}</option>`).join('')}</select></div>
<button class="more-btn" type="button" id="more" aria-expanded="false">${t.featuresF} <span id="feat-count"></span></button>
<div class="feat-row" style="grid-column:1/-1">${featureKeys.map(f => `<label><input type="checkbox" name="f" value="${f}"> ${L[l].features[f]}</label>`).join('')}</div></form></div></div>
<div class="wrap"><div class="results-bar"><div><b id="count">${projects.length}</b> ${t.results} · <button class="link" id="reset" type="button" style="background:none;border:0;border-bottom:1px solid var(--gold);padding:0 0 6px">${t.reset}</button></div>
<div class="sort"><label for="sort" class="muted">${t.sort}</label><select id="sort"><option value="featured">${t.sortFeatured}</option><option value="low">${t.sortLow}</option><option value="high">${t.sortHigh}</option></select></div></div>
<div class="grid" id="results">${projects.map(p => card(l, p)).join('')}</div><p class="empty" id="empty">${t.noResults}</p><div style="height:80px"></div></div>`;
  out(U.props(l), page(l, { title: `${t.propsTitle} | ${SITE.name}`, desc: t.propsText, path: U.props(l), alts: alts(U.props), body, nav: 'props', ld: crumbLd(items), prio: 0.9 }));
}

function subset(l, { title, intro, items, list, chips, pathFn, nav, image }) {
  const t = L[l].t;
  const body = `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${esc(title)}</h1><p class="lead">${esc(intro)}</p>${chips ? `<div class="chips">${chips}</div>` : ''}</div></div>
<div class="wrap"><div class="results-bar"><div><b>${list.length}</b> ${t.results}</div><a class="link" href="${U.props(l)}">${t.filters} →</a></div>
<div class="grid">${list.map(p => card(l, p)).join('')}</div><div style="height:96px"></div></div>
<section class="sec sec--linen"><div class="wrap contact-grid"><div><div class="kicker">${SITE.name}</div><h2 style="margin:14px 0 16px">${t.enquire}</h2><p class="lead">${t.enquireText}</p></div><div class="contact-card">${leadForm(l)}</div></div></section>`;
  const ld = [crumbLd(items), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE.domain + U.project(l, p), name: p.name })) }];
  out(pathFn(l), page(l, { title: `${title} | ${SITE.name}`, desc: intro, path: pathFn(l), alts: alts(pathFn), body, nav, ld, image, prio: 0.8 }));
}

function zonePages(l) {
  const t = L[l].t;
  for (const z of ['costa-blanca', 'costa-del-sol']) {
    const list = projects.filter(p => zoneOf(p) === z);
    const chips = Object.entries(towns).filter(([, v]) => v.zone === z).map(([k, v]) => `<a class="chip" href="${U.town(l, k)}">${v.name} <small>${countIn(p => p.town === k)}</small></a>`).join('');
    subset(l, { title: `${t.inZone} ${L[l].zones[z]}`, intro: t.zoneIntro[z], list, chips, nav: z, image: zoneImage(z),
      items: [[U.home(l), t.home], [U.props(l), L[l].nav.props], [U.zone(l, z), L[l].zones[z]]], pathFn: x => U.zone(x, z) });
  }
  for (const [k, v] of Object.entries(towns)) {
    const list = projects.filter(p => p.town === k);
    const chips = Object.entries(towns).filter(([kk, vv]) => vv.zone === v.zone).map(([kk, vv]) => `<a class="chip" href="${U.town(l, kk)}"${kk === k ? ' aria-current="page"' : ''}>${vv.name}</a>`).join('');
    subset(l, { title: `${t.inTown} ${v.name}`, intro: t.townIntro.replace('{n}', list.length).replace('{town}', v.name).replace('{zone}', L[l].zones[v.zone]), list, chips, nav: v.zone, image: townImage(k),
      items: [[U.home(l), t.home], [U.props(l), L[l].nav.props], [U.zone(l, v.zone), L[l].zones[v.zone]], [U.town(l, k), v.name]], pathFn: x => U.town(x, k) });
  }
  for (const ty of types) {
    const list = projects.filter(p => p.types.includes(ty));
    const chips = types.map(tt => `<a class="chip" href="${U.type(l, tt)}"${tt === ty ? ' aria-current="page"' : ''}>${L[l].types[tt]}</a>`).join('');
    subset(l, { title: `${L[l].types[ty]} — ${t.propsTitle.toLowerCase()}`.replace(/^./, c => c.toUpperCase()), intro: t.propsText, list, chips, nav: 'props',
      items: [[U.home(l), t.home], [U.props(l), L[l].nav.props], [U.type(l, ty), L[l].types[ty]]], pathFn: x => U.type(x, ty) });
  }
}

function projectPage(l, p) {
  const t = L[l].t; const z = zoneOf(p); const tn = towns[p.town].name;
  const items = [[U.home(l), t.home], [U.props(l), L[l].nav.props], [U.zone(l, z), L[l].zones[z]], [U.town(l, p.town), tn], [U.project(l, p), p.name]];
  const imgs = p.images;
  const gallery = imgs.length
    ? `<div class="p-gallery${imgs.length < 3 ? ' one' : ''}">${imgs.slice(0, imgs.length < 3 ? 1 : 3).map((s, i) => `<a href="${s}" data-lb data-alt="${esc(p.name)}">${media(s, `${p.name} — ${tn} (${i + 1})`)}${i === 0 && imgs.length > 1 ? `<span class="badge all">${t.gallery} · ${imgs.length}</span>` : ''}</a>`).join('')}</div>${imgs.slice(imgs.length < 3 ? 1 : 3).map(s => `<a href="${s}" data-lb hidden></a>`).join('')}`
    : `<div class="p-gallery"><div>${art(p.order, p.name)}</div><div>${art(p.order + 1, '')}</div><div>${art(p.order + 2, t.imgSoon)}</div></div>`;
  const similar = projects.filter(x => x !== p).map(x => [x, (zoneOf(x) === z ? 2 : 0) + (x.types.some(ty => p.types.includes(ty)) ? 1 : 0) - Math.abs(x.priceFrom - p.priceFrom) / 1e7]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([x]) => x);
  const d = 0.02;
  const delivery = p.delivery === 'Completed' ? t.completed : p.delivery;
  const body = `<div class="wrap" style="padding-top:28px">${crumbs(l, items)}<div style="height:18px"></div>${gallery}
<div class="p-layout"><div>
<div class="p-title"><div class="card-loc">${esc(p.area)} · ${tn} · ${L[l].zones[z]}</div><h1>${esc(p.name)}</h1><p class="lead">${esc(p.summary[l])}</p>
<button class="fav" type="button" data-slug="${p.slug}" data-on="${t.saved}" data-off="${t.save}" aria-pressed="false" style="position:static;width:auto;padding:0 18px;border-radius:999px;border:1px solid var(--line-strong);gap:8px;display:inline-flex;height:42px">${I.heart}<span class="t">${t.save}</span></button></div>
<div class="facts"><div><small>${t.from}</small><b>${money(l, p.priceFrom)}</b></div><div><small>${t.beds}</small><b>${range(p.beds)}</b></div><div><small>${t.baths}</small><b>${range(p.baths)}</b></div><div><small>${p.units ? t.units : t.type}</small><b>${p.units || p.types.map(ty => L[l].types[ty]).join(', ')}</b></div></div>
<div class="p-section"><h2>${t.overview}</h2><dl class="dl"><dt>${t.type}</dt><dd>${p.types.map(ty => `<a href="${U.type(l, ty)}">${L[l].types[ty]}</a>`).join(', ')}</dd><dt>${t.location}</dt><dd>${esc(p.area)}, <a href="${U.town(l, p.town)}">${tn}</a> · <a href="${U.zone(l, z)}">${L[l].zones[z]}</a></dd>${p.developer ? `<dt>${t.developer}</dt><dd>${p.developerUrl ? `<a href="${p.developerUrl}" target="_blank" rel="noopener">${esc(p.developer)}</a>` : esc(p.developer)}</dd>` : ''}${p.architect ? `<dt>${t.architect}</dt><dd>${esc(p.architect)}</dd>` : ''}${delivery ? `<dt>${t.delivery}</dt><dd>${esc(delivery)}</dd>` : ''}</dl></div>
<div class="p-section"><h2>${t.amenities}</h2><ul class="amen">${p.features.map(f => `<li>${I.check}${L[l].features[f]}</li>`).join('')}</ul></div>
<div class="p-section"><h2>${t.map}</h2><iframe class="map" loading="lazy" title="${esc(p.name)} — ${t.map}" src="https://www.openstreetmap.org/export/embed.html?bbox=${p.lng - d}%2C${p.lat - d * .7}%2C${p.lng + d}%2C${p.lat + d * .7}&layer=mapnik&marker=${p.lat}%2C${p.lng}"></iframe></div>
<p class="disclaimer">${t.disclaimer}</p></div>
<aside class="aside" id="enquire"><div class="price"><small>${t.priceIndicative}</small><b>${money(l, p.priceFrom)}</b></div><h3>${t.enquire}</h3><p>${t.enquireText}</p>${leadForm(l, p)}
<div class="quick"><a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`${p.name} — ${SITE.domain}${U.project(l, p)}`)}" target="_blank" rel="noopener">${t.whatsapp}</a><a href="tel:${SITE.phone.replace(/\s/g, '')}">${t.call}</a></div></aside></div></div>
<section class="sec sec--linen"><div class="wrap"><div class="sec-head"><h2>${t.similar}</h2><a class="link" href="${U.zone(l, z)}">${L[l].zones[z]} →</a></div><div class="grid">${similar.map(x => card(l, x)).join('')}</div></div></section>
<div class="lb" id="lb" role="dialog" aria-modal="true"><img alt=""><button class="x" aria-label="${t.close}">×</button><button class="pv" aria-label="←">‹</button><button class="nx" aria-label="→">›</button><span class="ct"></span></div>`;
  const ld = [crumbLd(items), { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: `${p.name}, ${tn}`, description: p.summary[l], url: SITE.domain + U.project(l, p), image: imgs.map(s => SITE.domain + s),
    offers: { '@type': 'Offer', price: p.priceFrom, priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
    contentLocation: { '@type': 'Place', name: `${tn}, ${L[l].zones[z]}`, geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng } } }];
  const title = `${p.name}, ${tn} — ${p.types.map(ty => L[l].types[ty]).join(' & ')} ${t.fromShort} ${money(l, p.priceFrom)}`;
  out(U.project(l, p), page(l, { title: `${title} | ${SITE.name}`, desc: p.summary[l], path: U.project(l, p), alts: alts(x => U.project(x, p)), body, nav: z, ld, image: imgs[0], prio: 0.9 }));
}

function blogPages(l) {
  const t = L[l].t;
  const items = [[U.home(l), t.home], [U.blog(l), t.blogTitle]];
  out(U.blog(l), page(l, { title: `${t.blogTitle} | ${SITE.name}`, desc: t.blogText, path: U.blog(l), alts: alts(U.blog), nav: 'blog', ld: crumbLd(items), prio: 0.7,
    body: `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${t.blogTitle}</h1><p class="lead">${t.blogText}</p></div></div><div class="wrap"><div class="posts">${articles.map(a => postCard(l, a)).join('')}</div><div style="height:110px"></div></div>` }));
  for (const a of articles) {
    const it = [...items, [U.article(l, a), a.title[l]]];
    const date = new Date(a.date).toLocaleDateString(L[l].locale.replace('_', '-'), { day: 'numeric', month: 'long', year: 'numeric' });
    const body = `<div class="wrap"><div class="article" style="padding-top:36px">${crumbs(l, it)}<h1 style="font-size:clamp(36px,5vw,58px);margin:22px 0 14px">${esc(a.title[l])}</h1><div class="muted" style="font-size:13px;letter-spacing:.14em;text-transform:uppercase">${t.published} ${date} · ${a.mins} ${t.minRead}</div>
<div class="cover">${art(a.mins * 3, '')}</div>${a.body[l]}
<div class="cta-band"><h3>${t.talk}</h3><a class="btn" href="${U.contact(l)}">${t.contactTitle}</a></div>
<p style="margin-top:36px"><a class="link" href="${U.blog(l)}">← ${t.backToJournal}</a></p></div></div>
<section class="sec sec--linen"><div class="wrap"><div class="sec-head"><h2>${t.featured}</h2><a class="link" href="${U.props(l)}">${t.viewAll}</a></div><div class="grid">${projects.filter(p => p.featured).slice(0, 3).map(p => card(l, p)).join('')}</div></div></section>`;
    const ld = [crumbLd(it), { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title[l], description: a.desc[l], datePublished: a.date, inLanguage: l, author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name }, mainEntityOfPage: SITE.domain + U.article(l, a) }];
    out(U.article(l, a), page(l, { title: `${a.title[l]} | ${SITE.name}`, desc: a.desc[l], path: U.article(l, a), alts: alts(x => U.article(x, a)), body, nav: 'blog', ld, ogType: 'article', prio: 0.7 }));
  }
}

function simplePages(l) {
  const t = L[l].t;
  // About
  let items = [[U.home(l), t.home], [U.about(l), L[l].nav.about]];
  out(U.about(l), page(l, { title: `${t.aboutTitle} | ${SITE.name}`, desc: t.footerAbout, path: U.about(l), alts: alts(U.about), nav: 'about', ld: crumbLd(items),
    body: `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${t.aboutTitle}</h1></div></div><div class="wrap"><div class="prose">${L[l].about.map(p => `<p>${p}</p>`).join('')}</div><div style="height:40px"></div></div>
<section class="sec sec--linen"><div class="wrap"><div class="steps">${t.steps.map(([h, p]) => `<div class="step"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></section>` }));
  // Contact
  items = [[U.home(l), t.home], [U.contact(l), L[l].nav.contact]];
  out(U.contact(l), page(l, { title: `${t.contactTitle} | ${SITE.name}`, desc: t.contactText, path: U.contact(l), alts: alts(U.contact), nav: 'contact', ld: crumbLd(items),
    body: `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${t.contactTitle}</h1><p class="lead">${t.contactText}</p></div></div>
<div class="wrap contact-grid" style="padding-bottom:110px"><div><ul class="contact-list"><li><span class="kicker">Email</span><br><a href="mailto:${SITE.email}">${SITE.email}</a></li><li><span class="kicker">${t.call}</span><br><a href="tel:${SITE.phone.replace(/\s/g, '')}">${SITE.phone}</a></li><li><span class="kicker">WhatsApp</span><br><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${SITE.phone}</a></li><li><span class="kicker">${t.location}</span><br>${SITE.office}</li></ul></div><div class="contact-card">${leadForm(l)}</div></div>` }));
  // Saved
  items = [[U.home(l), t.home], [U.saved(l), L[l].nav.saved]];
  out(U.saved(l), page(l, { title: `${t.savedTitle} | ${SITE.name}`, desc: t.savedEmpty, path: U.saved(l), alts: alts(U.saved), prio: 0.1,
    body: `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${t.savedTitle}</h1></div></div><div class="wrap"><p class="lead" id="saved-empty">${t.savedEmpty} <a class="link" href="${U.props(l)}">${t.exploreAll}</a></p><div class="grid" id="saved-grid">${projects.map(p => card(l, p).replace('<article ', '<article hidden ')).join('')}</div><div style="height:110px"></div></div>` }));
  // Privacy (template — have it reviewed)
  items = [[U.home(l), t.home], [U.privacy(l), t.privacyTitle]];
  out(U.privacy(l), page(l, { title: `${t.privacyTitle} | ${SITE.name}`, desc: t.privacyTitle, path: U.privacy(l), alts: alts(U.privacy), prio: 0.1,
    body: `<div class="page-head"><div class="wrap">${crumbs(l, items)}<h1>${t.privacyTitle}</h1></div></div><div class="wrap prose" style="padding-bottom:110px">${PRIVACY[l]}</div>` }));
}

const PRIVACY = {
  en: `<p>Controller: ${SITE.name} (<a href="mailto:${SITE.email}">${SITE.email}</a>). We process the data you send through our forms (name, email, phone, message) only to answer your enquiry and, where relevant, to put you in touch with the developer of the property you asked about. Legal basis: your consent and pre-contractual measures (GDPR art. 6.1.a and 6.1.b). We keep enquiries for up to 24 months. You may request access, rectification, erasure, restriction, portability or objection at any time by email, and complain to the Spanish Data Protection Agency (aepd.es). Saved properties are stored only in your own browser.</p>`,
  es: `<p>Responsable: ${SITE.name} (<a href="mailto:${SITE.email}">${SITE.email}</a>). Tratamos los datos que envías en nuestros formularios (nombre, email, teléfono, mensaje) solo para responder tu consulta y, en su caso, ponerte en contacto con la promotora del inmueble consultado. Base legal: consentimiento y medidas precontractuales (RGPD art. 6.1.a y 6.1.b). Conservamos las consultas hasta 24 meses. Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad u oposición por email y reclamar ante la AEPD (aepd.es). Las viviendas guardadas se almacenan solo en tu navegador.</p>`,
  de: `<p>Verantwortlich: ${SITE.name} (<a href="mailto:${SITE.email}">${SITE.email}</a>). Wir verarbeiten die über unsere Formulare gesendeten Daten (Name, E-Mail, Telefon, Nachricht) nur zur Beantwortung Ihrer Anfrage und ggf. zur Kontaktaufnahme mit dem Bauträger der angefragten Immobilie. Rechtsgrundlage: Einwilligung und vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. a und b DSGVO). Anfragen speichern wir bis zu 24 Monate. Sie können jederzeit per E-Mail Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit oder Widerspruch verlangen und sich bei der spanischen Datenschutzbehörde (aepd.es) beschweren. Gemerkte Immobilien werden nur in Ihrem Browser gespeichert.</p>`,
  nl: `<p>Verwerkingsverantwoordelijke: ${SITE.name} (<a href="mailto:${SITE.email}">${SITE.email}</a>). We verwerken de gegevens die u via onze formulieren stuurt (naam, e-mail, telefoon, bericht) alleen om uw aanvraag te beantwoorden en, indien van toepassing, u in contact te brengen met de ontwikkelaar van de woning. Rechtsgrond: toestemming en precontractuele maatregelen (AVG art. 6.1.a en 6.1.b). Aanvragen bewaren we maximaal 24 maanden. U kunt per e-mail inzage, rectificatie, verwijdering, beperking, overdraagbaarheid of bezwaar vragen en een klacht indienen bij de Spaanse toezichthouder (aepd.es). Bewaarde woningen worden alleen in uw eigen browser opgeslagen.</p>`,
  sv: `<p>Personuppgiftsansvarig: ${SITE.name} (<a href="mailto:${SITE.email}">${SITE.email}</a>). Vi behandlar uppgifterna du skickar via våra formulär (namn, e-post, telefon, meddelande) enbart för att besvara din förfrågan och vid behov sätta dig i kontakt med byggherren för bostaden. Rättslig grund: samtycke och åtgärder före avtal (GDPR art. 6.1.a och 6.1.b). Förfrågningar sparas i högst 24 månader. Du kan när som helst via e-post begära tillgång, rättelse, radering, begränsning, dataportabilitet eller invända, och klaga hos den spanska dataskyddsmyndigheten (aepd.es). Sparade bostäder lagras endast i din egen webbläsare.</p>`,
};

// ---------- run ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.cpSync(PUB, OUT, { recursive: true });
for (const f of ['styles.css', 'app.js']) fs.copyFileSync(path.join(ROOT, 'src/assets', f), path.join(OUT, 'assets', f));

for (const l of langs) {
  home(l); listing(l); zonePages(l); blogPages(l); simplePages(l);
  projects.forEach(p => projectPage(l, p));
}

// 404
fs.writeFileSync(path.join(OUT, '404.html'), page('en', { title: `404 | ${SITE.name}`, desc: L.en.t.notFound, path: '/404', alts: alts(U.home),
  body: `<div class="page-head"><div class="wrap" style="text-align:center;padding:80px 0 140px"><div class="kicker">404</div><h1>${L.en.t.notFound}</h1><p style="margin-top:30px">${langs.map(l => `<a class="link" style="margin:0 10px" href="${U.props(l)}">${L[l].nav.props}</a>`).join('')}</p></div></div>` }).replace(/<link rel="canonical"[^>]+>/, '<meta name="robots" content="noindex">'));
sitemap.pop(); // remove 404 from sitemap

// sitemap, robots, headers, redirects
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap.filter(s => !langs.some(x => s.path === U.saved(x) || s.path === U.privacy(x))).map(s => `<url><loc>${SITE.domain}${s.path}</loc><lastmod>${today}</lastmod><priority>${s.prio}</priority>${langs.map(x => `<xhtml:link rel="alternate" hreflang="${x}" href="${SITE.domain}${s.alts[x]}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE.domain}${s.alts.en}"/></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n${langs.map(l => `Disallow: ${U.saved(l)}`).join('\n')}\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/img/*\n  Cache-Control: public, max-age=2592000\n`);
fs.writeFileSync(path.join(OUT, '_redirects'), `/en /  301\n/en/* /:splat 301\n`);

const pages = sitemap.length;
console.log(`Built ${pages} pages in ${langs.length} languages → dist/  (projects with images: ${projects.filter(p => p.images.length).length}/${projects.length})`);
