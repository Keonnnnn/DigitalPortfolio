// Proxies album art images server-side so the browser can draw them
// onto a canvas without hitting CORS restrictions.
module.exports = async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('https://')) {
    return res.status(400).end();
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) return res.status(upstream.status).end();

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) return res.status(415).end();

    const buf = await upstream.arrayBuffer();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buf));
  } catch {
    res.status(502).end();
  }
};
