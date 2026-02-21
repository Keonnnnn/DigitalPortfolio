// src/components/SpotifyNowPlaying.js
import React, { useEffect, useRef, useState } from "react";
import "./SpotifyNowPlaying.css";
import vinylPlaceholder from "../assets/vinyl1.png";

// Your deployed Vercel API endpoint
const API_URL = "https://spotify-proxy-gules.vercel.app/api/now-playing";

const fmt = (ms) => {
  if (!ms || ms < 0) return "0:00";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
};

// small helper to add a fetch timeout
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 7000, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const resp = await fetch(resource, { ...rest, signal: controller.signal });
    return resp;
  } finally {
    clearTimeout(id);
  }
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(0);
  const [heartbeat, setHeartbeat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const pollRef = useRef(null);
  const tickRef = useRef(null);

  // --- polling --------------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    const fetchNowPlaying = async () => {
      try {
        const url = `${API_URL}?t=${Date.now()}`; // cache-buster
        const res = await fetchWithTimeout(url, {
          cache: "no-store",
          timeout: 7000,
        });
        const json = await res.json();

        if (!mounted) return;

        // Map API -> UI
        const mapped = {
          isPlaying: !!json.isPlaying,
          title: json.title || "None",
          artist: json.artist || "None",
          albumImageUrl: json.artwork || "",
          songUrl: json.url || "#",
          progressMs: Number(json.progressMs || 0),
          durationMs: Number(json.durationMs || 0),
        };

        setData(mapped);
        setUpdatedAt(Date.now());
        setErr(null);
      } catch (e) {
        if (!mounted) return;
        setErr("Failed to reach server");
        setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const startTimers = () => {
      // poll every 25s
      pollRef.current = setInterval(fetchNowPlaying, 25_000);
      // 1s heartbeat to animate progress
      tickRef.current = setInterval(() => setHeartbeat((h) => h + 1), 1_000);
    };

    const stopTimers = () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      pollRef.current = null;
      tickRef.current = null;
    };

    // handle tab visibility (pause polling while hidden)
    const handleVis = () => {
      if (document.hidden) {
        stopTimers();
      } else {
        fetchNowPlaying(); // refresh immediately
        startTimers();
      }
    };
    document.addEventListener("visibilitychange", handleVis);

    // initial load
    fetchNowPlaying();
    startTimers();

    return () => {
      mounted = false;
      stopTimers();
      document.removeEventListener("visibilitychange", handleVis);
    };
  }, []);

  const {
    isPlaying = false,
    title = "None",
    artist = "None",
    albumImageUrl = "",
    songUrl = "#",
    progressMs = 0,
    durationMs = 0,
  } = data || {};

  // live progress between polls (no useMemo -> no ESLint "unnecessary deps" error)
  const liveProgress = (() => {
    if (!isPlaying || !durationMs) return 0;
    const elapsed = Math.max(0, Date.now() - updatedAt);
    const base = Math.max(0, Math.min(progressMs, durationMs));
    return Math.min(base + elapsed, durationMs);
  })();

  // heartbeat forces a re-render every second (so progress updates)
  // eslint doesn't complain because it's used here (even though we don't display it)
  void heartbeat;

  const pct = durationMs ? (liveProgress / durationMs) * 100 : 0;

  const SpotifyIcon = () => (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="np-chip-icon"
    >
      <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12C24 5.372 18.628 0 12 0Zm5.39 17.35a.87.87 0 0 1-1.197.28c-3.279-2.004-7.414-2.458-12.285-1.349a.87.87 0 1 1-.387-1.694c5.24-1.2 9.8-.685 13.383 1.445.41.25.54.79.286 1.32Zm1.63-3.41a1.09 1.09 0 0 1-1.496.35c-3.753-2.25-9.476-2.907-13.92-1.591a1.09 1.09 0 1 1-.62-2.09c5.02-1.49 11.316-.745 15.54 1.785.52.312.69 1 .3 1.546Zm.144-3.633c-4.3-2.553-11.454-2.787-15.552-1.54a1.3 1.3 0 1 1-.77-2.49c4.687-1.45 12.56-1.18 17.5 1.75a1.3 1.3 0 1 1-1.178 2.28Z" />
    </svg>
  );

  // --- UI states ------------------------------------------------------------
  if (loading) {
    return (
      <div className="np-card">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img
              className="np-cover np-cover--art np-spin"
              src={vinylPlaceholder}
              alt="Vinyl"
            />
          </div>
          <div className="np-meta" role="status" aria-live="polite">
            <span className="np-chip np-chip--loading">
              <SpotifyIcon />
              <span>Connecting…</span>
            </span>
            <h3 className="np-title">Loading Spotify…</h3>
            <p className="np-artist">Fetching current track</p>
            <div className="np-track">
              <div className="np-track-fill" style={{ width: "20%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="np-card paused">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img
              className="np-cover np-cover--art np-spin"
              src={vinylPlaceholder}
              alt="Vinyl"
            />
          </div>
          <div className="np-meta" role="status" aria-live="polite">
            <span className="np-chip np-chip--error">
              <SpotifyIcon />
              <span>Spotify unavailable</span>
            </span>
            <h3 className="np-title">Spotify unavailable</h3>
            <p className="np-artist">{err}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="np-card paused">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img
              className="np-cover np-cover--art np-spin"
              src={vinylPlaceholder}
              alt="Vinyl"
            />
          </div>
          <div className="np-meta" role="status" aria-live="polite">
            <span className="np-chip np-chip--paused">
              <SpotifyIcon />
              <span>Paused</span>
            </span>
            <h3 className="np-title">Not playing right now</h3>
            <p className="np-artist">Keon's Spotify is paused</p>
            <div className="np-times">
              <span>{fmt(0)}</span>
              <span>{fmt(0)}</span>
            </div>
            <div className="np-track" aria-hidden="true">
              <div className="np-track-fill" style={{ width: "0%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- playing --------------------------------------------------------------
  return (
    <a
      className="np-card playing"
      href={songUrl || "#"}
      target="_blank"
      rel="noreferrer"
      aria-label="Open in Spotify"
    >
      <div className="np-media">
        <div className="np-cover-wrap">
          {albumImageUrl ? (
            <img className="np-cover" src={albumImageUrl} alt="Album cover" />
          ) : (
            <img
              className="np-cover np-cover--art np-spin"
              src={vinylPlaceholder}
              alt="Vinyl"
            />
          )}
          <div className="np-eq on">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="np-meta" role="status" aria-live="polite">
          <span className="np-chip np-chip--live" title="You are listening right now">
            <span className="np-chip-ring" aria-hidden="true" />
            <SpotifyIcon />
            <span>Listening now</span>
            <span className="np-chip-bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </span>

          <h3 className="np-title">{title}</h3>
          <p className="np-artist">{artist}</p>

          <div className="np-times">
            <span>{fmt(liveProgress)}</span>
            <span>{fmt(durationMs)}</span>
          </div>

          <div
            className="np-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={durationMs}
            aria-valuenow={liveProgress}
          >
            <div className="np-track-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </a>
  );
}