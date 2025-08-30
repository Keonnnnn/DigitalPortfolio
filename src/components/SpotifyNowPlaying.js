import React, { useEffect, useMemo, useState } from "react";
import "./SpotifyNowPlaying.css";
import vinylPlaceholder from "../assets/vinyl1.png"; 


const fmt = (ms) => {
  if (!ms || ms < 0) return "0:00";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
};

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(0);
  const [heartbeat, setHeartbeat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/now-playing", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;

        setData(json);
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

    fetchNowPlaying();
    const poll = setInterval(fetchNowPlaying, 25000);
    const timer = setInterval(() => setHeartbeat((h) => h + 1), 1000);

    return () => {
      mounted = false;
      clearInterval(poll);
      clearInterval(timer);
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

  
  const liveProgress = useMemo(() => {
    if (!isPlaying || !durationMs) return 0;
    const elapsed = Math.max(0, Date.now() - updatedAt);
    const base = Math.max(0, Math.min(progressMs, durationMs));
    return Math.min(base + elapsed, durationMs);
   
  }, [isPlaying, durationMs, progressMs, updatedAt, heartbeat]);

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

  if (loading) {
    return (
      <div className="np-card">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img className="np-cover np-cover--art np-spin" src={vinylPlaceholder} alt="Vinyl" />
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
            <img className="np-cover np-cover--art np-spin" src={vinylPlaceholder} alt="Vinyl" />
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
            <img className="np-cover np-cover--art np-spin" src={vinylPlaceholder} alt="Vinyl" />
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
            <img className="np-cover np-cover--art np-spin" src={vinylPlaceholder} alt="Vinyl" />
          )}
         
          <div className="np-eq on">
            <span /><span /><span /><span />
          </div>
        </div>

        <div className="np-meta" role="status" aria-live="polite">
          <span className="np-chip np-chip--live" title="You are listening right now">
            <span className="np-chip-ring" aria-hidden="true" />
            <SpotifyIcon />
            <span>Listening now</span>
            <span className="np-chip-bars" aria-hidden="true">
              <i /><i /><i />
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
