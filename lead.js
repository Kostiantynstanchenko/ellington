// Cloudflare Pages Function: POST /api/lead
// Stores each enquiry in KV (binding LEADS, optional) and forwards it to Telegram (optional).
// Settings → Environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
// Settings → Functions → KV namespace bindings: LEADS
const clean = (v, n = 500) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, n);

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false }, 400); }
  if (d.website) return json({ ok: true }); // honeypot: silently drop bots
  const lead = {
    name: clean(d.name, 120), email: clean(d.email, 160), phone: clean(d.phone, 40), message: clean(d.message, 2000),
    project: clean(d.project, 120), lang: clean(d.lang, 5), page: clean(d.page, 300), consent: !!d.consent,
    at: new Date().toISOString(), country: request.headers.get('cf-ipcountry') || '',
  };
  if (!lead.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email) || !lead.consent) return json({ ok: false, error: 'invalid' }, 422);

  const tasks = [];
  if (env.LEADS) tasks.push(env.LEADS.put(`lead:${lead.at}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(lead)));
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const text = `🏛 New Ellington Estate lead\n${lead.project ? `Project: ${lead.project}\n` : ''}Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || '—'}\nLang: ${lead.lang} · ${lead.country}\n${lead.message ? `\n${lead.message}\n` : ''}\n${lead.page}`;
    tasks.push(fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    }));
  }
  if (!tasks.length) return json({ ok: false, error: 'no destination configured' }, 500);
  const res = await Promise.allSettled(tasks);
  return res.some(r => r.status === 'fulfilled') ? json({ ok: true }) : json({ ok: false }, 502);
}

export const onRequest = () => json({ ok: false }, 405);
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });
