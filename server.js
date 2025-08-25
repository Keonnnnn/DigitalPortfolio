// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // v2 for CommonJS

const app = express();

/* ---------------- CORS (React dev) ---------------- */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);
app.use(express.json());

/* ---------------- ENV ---------------- */
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN, // fill after first /login -> /callback
  REDIRECT_URI = "http://127.0.0.1:5001/callback", // keep in sync with Spotify Dashboard
  SERVER_PORT,
  PORT, // fallback if you used PORT before
} = process.env;

const LISTEN_PORT = Number(SERVER_PORT || PORT || 5001);

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.warn(
    "[WARN] Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env"
  );
}

/* ---------------- Spotify helpers ---------------- */
const BASIC = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
].join(" ");

async function getAccessToken(refreshToken) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(
      `Refresh token error: ${json.error || "unknown"} ${
        json.error_description || ""
      }`
    );
  }
  return json.access_token;
}

/* ---------------- OAuth routes ---------------- */
app.get("/login", (_req, res) => {
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("client_id", SPOTIFY_CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("scope", SCOPES);
  res.redirect(url.toString());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("Missing ?code from Spotify");

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${BASIC}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const json = await tokenRes.json();

    if (!tokenRes.ok || json.error) {
      console.error("[Token exchange error]", json);
      return res
        .status(500)
        .send("Token exchange error (see server console for details).");
    }

    console.log("\n==== COPY THIS INTO YOUR .env ====");
    console.log("SPOTIFY_REFRESH_TOKEN=" + json.refresh_token);
    console.log("==================================\n");

    res.send(`
      <h2>Authorized ✅</h2>
      <p><strong>Refresh token</strong> is printed in this server's console.</p>
      <ol>
        <li>Copy it into your <code>.env</code> as <code>SPOTIFY_REFRESH_TOKEN</code>.</li>
        <li>Restart the server.</li>
      </ol>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Exception during token exchange.");
  }
});

/* ---------------- API: now playing ---------------- */
app.get("/now-playing", async (_req, res) => {
  if (!SPOTIFY_REFRESH_TOKEN) {
    return res.status(400).json({ error: "missing_refresh_token" });
  }

  try {
    const accessToken = await getAccessToken(SPOTIFY_REFRESH_TOKEN);

    const nowRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Nothing playing
    if (nowRes.status === 204 || nowRes.status === 202) {
      return res
        .set("Cache-Control", "no-store")
        .json({ isPlaying: false });
    }

    if (!nowRes.ok) {
      const text = await nowRes.text();
      return res
        .set("Cache-Control", "no-store")
        .status(500)
        .json({ error: "api_error", details: text });
    }

    const payload = await nowRes.json();
    const item = payload.item;

    return res
      .set("Cache-Control", "no-store")
      .json({
        isPlaying: payload.is_playing,
        title: item?.name || null,
        artist: item?.artists?.map((a) => a.name).join(", ") || null,
        albumImageUrl: item?.album?.images?.[0]?.url || null,
        songUrl: item?.external_urls?.spotify || null,
        // timing for your UI progress bar
        progressMs: payload?.progress_ms ?? 0,
        durationMs: item?.duration_ms ?? 0,
      });
  } catch (err) {
    console.error(err);
    return res
      .set("Cache-Control", "no-store")
      .status(500)
      .json({ error: "exception" });
  }
});

/* ---------------- Health ---------------- */
app.get("/", (_req, res) => res.send("OK"));

/* ---------------- Start ---------------- */
app.listen(LISTEN_PORT, () => {
  console.log(`Local server running at http://localhost:${LISTEN_PORT}`);
  console.log(`1) Visit http://localhost:${LISTEN_PORT}/login to authorize`);
  console.log(
    `2) Paste the printed refresh token into .env and restart the server`
  );
});
