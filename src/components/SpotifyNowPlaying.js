// src/components/SpotifyNowPlaying.js
import React, { useEffect, useMemo, useState } from "react";
import "./SpotifyNowPlaying.css";
import vinylPlaceholder from "../assets/vinyl1.png"; // first vinyl image

/** mm:ss formatter */
const fmt = (ms) => {
  if (!ms || ms < 0) return "0:00";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
};

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);      // latest payload from server
  const [updatedAt, setUpdatedAt] = useState(0); // when we last updated `data`
  const [heartbeat, setHeartbeat] = useState(0); // renders every second for smooth UI
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
        setUpdatedAt(Date.now());  // capture when this payload arrived
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
    const poll = setInterval(fetchNowPlaying, 25000);       // refresh every 25s
    const timer = setInterval(() => setHeartbeat((h) => h + 1), 1000); // redraw

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

  // advance progress based on real elapsed time since last payload
  const liveProgress = useMemo(() => {
    if (!isPlaying || !durationMs) return 0;
    const elapsed = Math.max(0, Date.now() - updatedAt); // ms since we set data
    const base = Math.max(0, Math.min(progressMs, durationMs));
    return Math.min(base + elapsed, durationMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, durationMs, progressMs, updatedAt, heartbeat]);

  const pct = durationMs ? (liveProgress / durationMs) * 100 : 0;

  // --- Loading
  if (loading) {
    return (
      <div className="np-card">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img className="np-cover np-cover--art" src={vinylPlaceholder} alt="Vinyl" />
          </div>
          <div className="np-meta">
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

  // --- Error
  if (err) {
    return (
      <div className="np-card paused">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img className="np-cover np-cover--art" src={vinylPlaceholder} alt="Vinyl" />
          </div>
          <div className="np-meta">
            <h3 className="np-title">Spotify unavailable</h3>
            <p className="np-artist">{err}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Not playing: show vinyl and zeros
  if (!isPlaying) {
    return (
      <div className="np-card paused">
        <div className="np-media">
          <div className="np-cover-wrap">
            <img className="np-cover np-cover--art" src={vinylPlaceholder} alt="Vinyl" />
          </div>
          <div className="np-meta">
            <h3 className="np-title">Not playing right now</h3>
            <p className="np-artist">Spotify is paused</p>
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

  // --- Playing
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
            <img className="np-cover np-cover--art" src={vinylPlaceholder} alt="Vinyl" />
          )}
          {/* tiny equalizer overlay */}
          <div className="np-eq on">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="np-meta">
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
