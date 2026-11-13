// Enquiry endpoint for Cloudflare Pages (advanced mode). build.mjs copies this file to dist/_worker.js
// and limits it to /api/* with _routes.json, so every other URL is served as a static file.
// Pages → Settings → Variables and Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
// Optional: Settings → Bindings → KV namespace named LEADS (keeps a copy of every enquiry)
const clean = (v, n = 500) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, n);
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });

async function lead(request, env) {
  if (request.method !== 'POST') return json({ ok: false }, 405);
  let d;
  try { d = await request.json(); } catch { return json({ ok: false }, 400); }
  if (d.website) return json({ ok: true }); // honeypot: silently drop bots
  const x = {
    name: clean(d.name, 120), email: clean(d.email, 160), phone: clean(d.phone, 40), message: clean(d.message, 2000),
    project: clean(d.project, 120), lang: clean(d.lang, 5), page: clean(d.page, 300), consent: !!d.consent,
    at: new Date().toISOString(), country: request.headers.get('cf-ipcountry') || '',
  };
  if (!x.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x.email) || !x.consent) return json({ ok: false, error: 'invalid' }, 422);

  const tasks = [];
  if (env.LEADS) tasks.push(env.LEADS.put(`lead:${x.at}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(x)));
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const text = `🏛 New Ellington Estate lead\n${x.project ? `Project: ${x.project}\n` : ''}Name: ${x.name}\nEmail: ${x.email}\nPhone: ${x.phone || '—'}\nLang: ${x.lang} · ${x.country}\n${x.message ? `\n${x.message}\n` : ''}\n${x.page}`;
    tasks.push(fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    }).then(r => { if (!r.ok) throw new Error('telegram'); }));
  }
  if (!tasks.length) return json({ ok: false, error: 'no destination configured' }, 500);
  const res = await Promise.allSettled(tasks);
  return res.some(r => r.status === 'fulfilled') ? json({ ok: true }) : json({ ok: false }, 502);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/lead') return lead(request, env);
    return env.ASSETS.fetch(request);
  },
};
