// Proxies Spotify CDN images server-side so the browser can draw them
// onto a canvas without hitting CORS restrictions.
const ALLOWED_HOSTS = ['i.scdn.co', 'mosaic.scdn.co', 'lineup-images.scdn.co'];

export default async function handler(req, res) {
  const { url } = req.query;

  let parsed;
  try { parsed = new URL(url); } catch {
    return res.status(400).end();
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return res.status(403).end();
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) return res.status(upstream.status).end();

    const buf = await upstream.arrayBuffer();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buf));
  } catch {
    res.status(502).end();
  }
}
