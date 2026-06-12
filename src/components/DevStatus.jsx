import React, { useEffect, useRef, useState } from 'react';
import './DevStatus.css';

const DISCORD_ID  = '698504140715851838';
const GITHUB_USER = 'Keonnnnn';

const fmt = (startMs) => {
  const m = Math.floor((Date.now() - startMs) / 60000);
  if (m < 1) return 'just started';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
};

const ago = (iso) => {
  const m = Math.floor((Date.now() - new Date(iso)) / 60000);
  const h = Math.floor(m / 60), d = Math.floor(h / 24);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return d === 1 ? 'yesterday' : `${d}d ago`;
};

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" className="ds-cover-svg" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="ds-cover-svg" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
      0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
      -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99
      .105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
      -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405
      c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
      0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3
      0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function DevStatus() {
  const [vsc, setVsc]       = useState(null);
  const [gh, setGh]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick]     = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const fetchLanyard = async () => {
      try {
        const res  = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await res.json();
        if (!mounted.current) return;
        const activity = json.success
          ? json.data?.activities?.find(a => a.name === 'Visual Studio Code' && a.type === 0)
          : null;
        setVsc(activity ?? null);
      } catch (_) {
        if (mounted.current) setVsc(null);
      }
    };

    const fetchGitHub = async () => {
      try {
        const res    = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`);
        const events = await res.json();
        if (!mounted.current || !Array.isArray(events)) return;
        setGh(events.find(e => e.type === 'PushEvent') ?? null);
      } catch (_) {
        if (mounted.current) setGh(null);
      }
    };

    Promise.all([fetchLanyard(), fetchGitHub()]).then(() => {
      if (mounted.current) setLoading(false);
    });

    const lanyardPoll = setInterval(fetchLanyard, 30_000);
    const ghPoll      = setInterval(fetchGitHub, 300_000);
    const ticker      = setInterval(() => setTick(t => t + 1), 60_000);

    return () => {
      mounted.current = false;
      clearInterval(lanyardPoll);
      clearInterval(ghPoll);
      clearInterval(ticker);
    };
  }, []);

  void tick;

  if (loading) {
    return (
      <div className="ds-card">
        <div className="ds-media">
          <div className="ds-cover ds-cover--loading" />
          <div className="ds-meta">
            <span className="ds-chip ds-chip--loading">Connecting…</span>
            <h3 className="ds-title">Loading status…</h3>
          </div>
        </div>
      </div>
    );
  }

  if (vsc) {
    const elapsed = vsc.timestamps?.start ? fmt(vsc.timestamps.start) : null;
    return (
      <div className="ds-card ds-card--coding">
        <div className="ds-media">
          <div className="ds-cover ds-cover--vsc"><CodeIcon /></div>
          <div className="ds-meta">
            <span className="ds-chip ds-chip--live">
              <span className="ds-dot" aria-hidden="true" />
              Now coding
              {elapsed && <span className="ds-chip-time">{elapsed}</span>}
            </span>
            <h3 className="ds-title">{vsc.details || 'Visual Studio Code'}</h3>
            <p className="ds-subtitle">{vsc.state || 'Visual Studio Code'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (gh) {
    const repo = gh.repo?.name?.replace(`${GITHUB_USER}/`, '') ?? '';
    const msg  = gh.payload?.commits?.[0]?.message?.split('\n')[0] ?? 'Pushed code';
    return (
      <a className="ds-card" href={`https://github.com/${gh.repo?.name}`}
        target="_blank" rel="noreferrer" aria-label="View on GitHub">
        <div className="ds-media">
          <div className="ds-cover ds-cover--gh"><GitHubIcon /></div>
          <div className="ds-meta">
            <span className="ds-chip ds-chip--gh">Last built</span>
            <h3 className="ds-title">{repo}</h3>
            <p className="ds-subtitle">{msg}</p>
            <p className="ds-time">{ago(gh.created_at)}</p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <div className="ds-card">
      <div className="ds-media">
        <div className="ds-cover ds-cover--idle"><CodeIcon /></div>
        <div className="ds-meta">
          <span className="ds-chip ds-chip--idle">Offline</span>
          <h3 className="ds-title">Not currently coding</h3>
          <p className="ds-subtitle">Check back later</p>
        </div>
      </div>
    </div>
  );
}
