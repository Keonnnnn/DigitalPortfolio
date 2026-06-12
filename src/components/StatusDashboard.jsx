import React, { useState } from 'react';
import SpotifyNowPlaying from './SpotifyNowPlaying';
import DevStatus from './DevStatus';
import './StatusDashboard.css';

const PANELS = 2;

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export default function StatusDashboard() {
  const [active, setActive] = useState(0);

  return (
    <div className="sd-root">
      <div className="sd-viewport">
        <div
          className="sd-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          <div className="sd-panel"><SpotifyNowPlaying /></div>
          <div className="sd-panel"><DevStatus /></div>
        </div>

        {active > 0 && (
          <button className="sd-arrow sd-arrow--left"
            onClick={() => setActive(p => p - 1)} aria-label="Previous">
            <ChevronLeft />
          </button>
        )}
        {active < PANELS - 1 && (
          <button className="sd-arrow sd-arrow--right"
            onClick={() => setActive(p => p + 1)} aria-label="Next">
            <ChevronRight />
          </button>
        )}
      </div>

      <div className="sd-dots" role="tablist" aria-label="Status panels">
        {['Spotify', 'Dev status'].map((label, i) => (
          <button
            key={i}
            className={`sd-dot${active === i ? ' sd-dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={label}
            aria-selected={active === i}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}
