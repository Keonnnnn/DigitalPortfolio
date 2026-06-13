import React, { useEffect, useRef, useState } from 'react';
import './GitHubActivity.css';

const GITHUB_USER = 'Keonnnnn';

const ago = (iso) => {
  const m = Math.floor((Date.now() - new Date(iso)) / 60000);
  const h = Math.floor(m / 60), d = Math.floor(h / 24);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return d === 1 ? 'yesterday' : `${d}d ago`;
};

function calcStreak(pushEvents) {
  const days = [...new Set(pushEvents.map(e => e.created_at.slice(0, 10)))]
    .sort((a, b) => b.localeCompare(a));
  if (!days.length) return 0;

  const today     = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (days[0] !== today && days[0] !== yesterday) return 0;

  let streak = 0;
  let expected = days[0];
  for (const day of days) {
    if (day === expected) {
      streak++;
      const d = new Date(expected);
      d.setDate(d.getDate() - 1);
      expected = d.toISOString().slice(0, 10);
    } else {
      break;
    }
  }
  return streak;
}

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="gh-icon" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TrafficLights = () => (
  <div className="gh-tl" aria-hidden="true">
    <span className="gh-tl-r" /><span className="gh-tl-y" /><span className="gh-tl-g" />
  </div>
);

export default function GitHubActivity() {
  const [commits, setCommits] = useState([]);
  const [streak, setStreak]   = useState(0);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const fetchActivity = async () => {
      try {
        const res    = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`);
        const events = await res.json();
        if (!mounted.current || !Array.isArray(events)) return;

        const pushEvents = events.filter(e => e.type === 'PushEvent');

        // One entry per repo, most recent first
        const seen   = new Set();
        const recent = [];
        for (const e of pushEvents) {
          const repo = e.repo?.name?.replace(`${GITHUB_USER}/`, '') ?? '';
          if (!seen.has(repo)) {
            seen.add(repo);
            recent.push({
              repo,
              message: e.payload?.commits?.[0]?.message?.split('\n')[0] ?? 'Pushed code',
              time: e.created_at,
            });
          }
          if (recent.length >= 2) break;
        }

        setCommits(recent);
        setStreak(calcStreak(pushEvents));
      } catch {
        // silent fail — show empty state
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    fetchActivity();
    const poll = setInterval(fetchActivity, 300_000);

    return () => {
      mounted.current = false;
      clearInterval(poll);
    };
  }, []);

  return (
    <div className="gh-card ds-card ds-card--github ds-card--window">
      <div className="gh-wrap">

        {/* Title bar */}
        <div className="gh-bar">
          <TrafficLights />
          <GitHubIcon />
          <span className="gh-win-title">{GITHUB_USER}</span>
        </div>

        {loading ? (
          <div className="gh-loading">
            <span className="gh-cursor" aria-hidden="true">▋</span>
            <span>Fetching activity…</span>
          </div>
        ) : (
          <>
            {/* Streak banner */}
            {streak > 0 && (
              <div className="gh-streak">
                <span className="gh-streak-fire" aria-hidden="true">{streak >= 7 ? '🔥' : '⚡'}</span>
                <span className="gh-streak-count">{streak}</span>
                <span className="gh-streak-label">day streak</span>
              </div>
            )}

            {/* Commits */}
            <div className="gh-commits">
              {commits.map((c, i) => (
                <div key={i} className="gh-commit">
                  <div className="gh-commit-top">
                    <span className="gh-commit-dot" aria-hidden="true" />
                    <span className="gh-commit-repo">{c.repo}</span>
                    <span className="gh-commit-time">{ago(c.time)}</span>
                  </div>
                  <p className="gh-commit-msg">{c.message}</p>
                </div>
              ))}
              {commits.length === 0 && (
                <div className="gh-empty">No recent public commits</div>
              )}
            </div>
          </>
        )}

        {/* Status bar */}
        <div className="gh-status">
          <div className="gh-status-l">
            <span className="gh-status-chip">GitHub</span>
          </div>
          <div className="gh-status-r">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="gh-status-link"
              onClick={e => e.stopPropagation()}
            >
              @{GITHUB_USER} ↗
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
