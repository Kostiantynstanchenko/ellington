(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---- storage (favourites) ----
  const KEY = 'ee:saved';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
  const syncFavs = () => {
    const s = read();
    $$('.fav').forEach(b => {
      const on = s.includes(b.dataset.slug);
      b.setAttribute('aria-pressed', on);
      b.setAttribute('aria-label', on ? b.dataset.on : b.dataset.off);
      const t = b.querySelector('.t'); if (t) t.textContent = on ? b.dataset.on : b.dataset.off;
    });
    $$('.saved-link .count').forEach(c => { c.textContent = s.length; c.classList.toggle('on', s.length > 0); });
    const sp = $('#saved-grid');
    if (sp) {
      let n = 0;
      $$('.card', sp).forEach(c => { const on = s.includes(c.dataset.slug); c.hidden = !on; if (on) n++; });
      $('#saved-empty').hidden = n > 0;
    }
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('.fav'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const s = read(); const i = s.indexOf(b.dataset.slug);
    i > -1 ? s.splice(i, 1) : s.push(b.dataset.slug);
    write(s); syncFavs();
  });

  // ---- header ----
  const burger = $('.burger'), nav = $('.nav');
  burger && burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  $$('.lang>button').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); const o = b.parentElement.classList.toggle('open'); b.setAttribute('aria-expanded', o); }));
  document.addEventListener('click', () => $$('.lang.open').forEach(l => l.classList.remove('open')));

  // ---- card image slides ----
  $$('.card-media .slides').forEach(sl => {
    const dots = $$('.dots i', sl.parentElement);
    if (dots.length < 2) return;
    sl.addEventListener('scroll', () => { const i = Math.round(sl.scrollLeft / sl.clientWidth); dots.forEach((d, k) => d.classList.toggle('on', k === i)); }, { passive: true });
  });

  // ---- map (Leaflet + CARTO light basemap) ----
  const mapEl = $('#map');
  if (mapEl && window.L) {
    let pts = [];
    try { pts = JSON.parse(mapEl.dataset.points || '[]'); } catch {}
    if (pts.length) {
      const single = pts.length === 1;
      const map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);
      const marks = pts.map(p => {
        const m = L.marker([p.lat, p.lng], {
          icon: L.divIcon({ className: '', html: `<div class="ee-pin ${p.z === 'costa-blanca' ? 'cb' : ''}">${single ? p.n : p.p}</div>`, iconSize: null }),
          title: `${p.n}, ${p.t}`, riseOnHover: true,
        }).addTo(map);
        const img = p.i ? `<img src="${p.i}" alt="">` : `<div class="mc-g"></div>`;
        m.bindPopup(`<a class="map-card" href="${p.u}">${img}<div class="mc-b"><div class="mc-l">${p.t}</div><b>${p.n}</b><div class="mc-p">${p.pf}</div></div></a>`, { closeButton: true, maxWidth: 240 });
        return m;
      });
      if (single) {
        map.setView([pts[0].lat, pts[0].lng], +mapEl.dataset.zoom || 13);
      } else {
        const all = L.featureGroup(marks);
        map.fitBounds(all.getBounds(), { padding: [50, 50], maxZoom: 11 });
        // Zoomed right out, the two coasts are only a few pixels apart and the price pins would
        // sit on top of each other, so show one marker per coast and swap in the prices on zoom in.
        const SPLIT = 8.5;
        const groups = ['costa-del-sol', 'costa-blanca'].map(z => {
          const own = pts.map((p, i) => [p, marks[i]]).filter(([p]) => p.z === z);
          if (!own.length) return null;
          const box = L.featureGroup(own.map(([, m]) => m)).getBounds();
          const label = mapEl.dataset[z === 'costa-blanca' ? 'cb' : 'cs'] || '';
          const g = L.marker(box.getCenter(), {
            icon: L.divIcon({ className: '', html: `<div class="ee-group"><b>${label}</b><span>${own.length}</span></div>`, iconSize: null }),
            title: label, riseOnHover: true,
          });
          g.on('click', () => map.flyToBounds(box, { padding: [60, 60], maxZoom: 12 }));
          return { g, marks: own.map(([, m]) => m) };
        }).filter(Boolean);
        // Neighbouring towns can still put two bubbles on the same spot: lift the later one clear.
        const declutter = () => {
          const placed = [];
          marks.forEach(m => {
            const el = m.getElement() && m.getElement().firstChild;
            if (!el) return;
            el.style.transform = '';
            if (!map.hasLayer(m)) return;
            const pt = map.latLngToContainerPoint(m.getLatLng());
            let lift = 0, guard = 0;
            const hits = () => placed.some(q => Math.abs(q.x - pt.x) < 58 && Math.abs(q.y - (pt.y - lift)) < 24);
            while (hits() && guard++ < 6) lift += 30;
            if (lift) el.style.transform = `translateY(${-lift}px)`;
            placed.push({ x: pt.x, y: pt.y - lift });
          });
        };
        const draw = () => {
          const wide = map.getZoom() < SPLIT;
          groups.forEach(({ g, marks: ms }) => {
            if (wide) { if (!map.hasLayer(g)) g.addTo(map); ms.forEach(m => map.removeLayer(m)); }
            else { if (map.hasLayer(g)) map.removeLayer(g); ms.forEach(m => { if (!map.hasLayer(m)) m.addTo(map); }); }
          });
          if (!wide) declutter();
        };
        map.on('zoomend', draw); map.on('moveend', () => { if (map.getZoom() >= SPLIT) declutter(); }); draw();
      }
      // Scroll-wheel zoom only after the visitor clicks the map, so the page keeps scrolling normally.
      map.on('click focus', () => map.scrollWheelZoom.enable());
      map.on('mouseout', () => map.scrollWheelZoom.disable());
    }
  }

  // ---- landing page: active section in the sub-nav ----
  const lpNav = $('.lp-nav');
  if (lpNav && 'IntersectionObserver' in window) {
    const links = $$('a[href^="#"]', lpNav);
    const byId = Object.fromEntries(links.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { links.forEach(a => a.classList.remove('on')); byId[x.target.id] && byId[x.target.id].classList.add('on'); }
    }), { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(id => { const el = document.getElementById(id); el && io.observe(el); });
  }

  // ---- listing filters ----
  const form = $('#filters');
  if (form) {
    const cards = $$('#results .card');
    const fields = ['zone', 'town', 'type', 'beds', 'max'];
    const params = new URLSearchParams(location.search);
    fields.forEach(f => { if (params.has(f) && form[f]) form[f].value = params.get(f); });
    (params.get('f') || '').split(',').filter(Boolean).forEach(v => { const c = form.querySelector(`input[name=f][value="${v}"]`); if (c) c.checked = true; });
    if (params.get('sort')) $('#sort').value = params.get('sort');
    const townOpts = $$('option[data-zone]', form.town);
    const apply = (push = true) => {
      const z = form.zone.value;
      townOpts.forEach(o => { o.hidden = !!z && o.dataset.zone !== z; });
      if (z && form.town.selectedOptions[0] && form.town.selectedOptions[0].hidden) form.town.value = '';
      const v = { zone: z, town: form.town.value, type: form.type.value, beds: +form.beds.value || 0, max: +form.max.value || 0 };
      const feats = $$('input[name=f]:checked', form).map(i => i.value);
      let n = 0;
      cards.forEach(c => {
        const d = c.dataset;
        const ok = (!v.zone || d.zone === v.zone) && (!v.town || d.town === v.town) && (!v.type || d.types.split(' ').includes(v.type))
          && (!v.beds || +d.bedsmax >= v.beds) && (!v.max || +d.price <= v.max) && feats.every(f => d.features.split(' ').includes(f));
        c.hidden = !ok; if (ok) n++;
      });
      const sort = $('#sort').value, wrap = $('#results');
      const sorted = [...cards].sort((a, b) => sort === 'low' ? a.dataset.price - b.dataset.price : sort === 'high' ? b.dataset.price - a.dataset.price : a.dataset.order - b.dataset.order);
      sorted.forEach(c => wrap.appendChild(c));
      $('#count').textContent = n; $('#empty').style.display = n ? 'none' : 'block';
      $('#feat-count').textContent = feats.length ? `(${feats.length})` : '';
      if (push) {
        const q = new URLSearchParams();
        fields.forEach(f => { if (form[f].value) q.set(f, form[f].value); });
        if (feats.length) q.set('f', feats.join(','));
        if (sort !== 'featured') q.set('sort', sort);
        history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
      }
    };
    form.addEventListener('change', () => apply());
    form.addEventListener('submit', e => e.preventDefault());
    $('#sort').addEventListener('change', () => apply());
    $('#more').addEventListener('click', () => { const r = $('.feat-row'); r.classList.toggle('open'); $('#more').setAttribute('aria-expanded', r.classList.contains('open')); });
    $('#reset').addEventListener('click', () => { form.reset(); $('#sort').value = 'featured'; apply(); });
    if (params.get('f')) $('.feat-row').classList.add('open');
    apply(false);
  }

  // ---- lightbox ----
  const lb = $('#lb');
  if (lb) {
    const links = $$('[data-lb]'); let i = 0;
    const img = $('img', lb), ct = $('.ct', lb);
    const show = k => { i = (k + links.length) % links.length; img.src = links[i].href; img.alt = links[i].dataset.alt || ''; ct.textContent = `${i + 1} / ${links.length}`; };
    links.forEach((a, k) => a.addEventListener('click', e => { e.preventDefault(); show(k); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }));
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    $('.x', lb).onclick = close; $('.pv', lb).onclick = () => show(i - 1); $('.nx', lb).onclick = () => show(i + 1);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  }

  // ---- lead forms (Cloudflare Pages Function at /api/lead) ----
  $$('form.form').forEach(f => f.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = $('button[type=submit]', f), msg = $('.msg', f);
    btn.disabled = true; msg.className = 'msg';
    const data = Object.fromEntries(new FormData(f));
    data.page = location.href; data.lang = document.documentElement.lang;
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw 0;
      f.reset(); msg.textContent = f.dataset.ok; msg.className = 'msg ok';
      window.dataLayer && window.dataLayer.push({ event: 'lead', project: data.project || '' });
    } catch { msg.textContent = f.dataset.err; msg.className = 'msg err'; }
    btn.disabled = false;
  }));

  // ---- reveal on scroll ----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('in'));

  syncFavs();
})();
