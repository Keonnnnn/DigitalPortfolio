// src/components/SpotifyNowPlaying.js
import React, { useEffect, useMemo, useState } from "react";
import "./SpotifyNowPlaying.css";

/** mm:ss formatter */
const fmt = (ms) => {
  if (!ms || ms < 0) return "0:00";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
};

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);     // latest payload from server
  const [tick, setTick] = useState(0);        // local 1s ticker
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchNowPlaying = async () => {
      try {
        // thanks to CRA proxy, this hits http://localhost:5001/now-playing
        const res = await fetch("/now-playing", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;

        setData(json);
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
    const poll = setInterval(fetchNowPlaying, 25000); // refresh every 25s
    const timer = setInterval(() => setTick((t) => t + 1000), 1000); // smooth bar

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

  // advance progress locally between polls so the bar moves smoothly
  const liveProgress = useMemo(() => {
    if (!isPlaying || !durationMs) return 0;
    return Math.min(progressMs + tick, durationMs);
  }, [isPlaying, progressMs, durationMs, tick]);

  const pct = durationMs ? (liveProgress / durationMs) * 100 : 0;

  // --- Loading / error / idle states
  if (loading) {
    return (
      <div className="np-card">
        <div className="np-media">
          <div className="np-cover-wrap">
            <div className="np-cover np-cover--placeholder" />
          </div>
          <div className="np-meta">
            <h3 className="np-title">Loading Spotify…</h3>
            <p className="np-artist">Fetching current track</p>
            <div className="np-track"><div className="np-track-fill" style={{ width: "20%" }} /></div>
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
            <div className="np-cover np-cover--placeholder" />
          </div>
          <div className="np-meta">
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
            {albumImageUrl ? (
              <img className="np-cover" src={albumImageUrl} alt="Album cover" />
            ) : (
              <div className="np-cover np-cover--placeholder" />
            )}
          </div>
          <div className="np-meta">
            <h3 className="np-title">Not playing right now</h3>
            <p className="np-artist">Spotify is paused</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Playing state
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
            <div className="np-cover np-cover--placeholder" />
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

          <div className="np-track" role="progressbar" aria-valuemin={0} aria-valuemax={durationMs} aria-valuenow={liveProgress}>
            <div className="np-track-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </a>
  );
}
