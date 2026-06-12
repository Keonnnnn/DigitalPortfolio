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

const LANG_MAP = { js:'JavaScript', jsx:'JSX', ts:'TypeScript', tsx:'TSX', css:'CSS', html:'HTML', py:'Python', md:'Markdown', json:'JSON', cs:'C#' };

const getFileInfo = (details = '') => {
  const parts = details.trim().split(/\s+/);
  const filename = parts.length > 1 ? parts.slice(1).join(' ') : (parts[0] || 'untitled');
  const dotIdx = filename.lastIndexOf('.');
  const ext = dotIdx >= 0 ? filename.slice(dotIdx + 1).toLowerCase() : '';
  return { filename, ext, lang: LANG_MAP[ext] || (ext ? ext.toUpperCase() : 'Text') };
};

const TrafficLights = () => (
  <div className="dsw-tl" aria-hidden="true">
    <span className="dsw-tl-r" /><span className="dsw-tl-y" /><span className="dsw-tl-g" />
  </div>
);

const FakeCode = () => (
  <>
    <div className="dsw-line"><span className="dsw-k">import</span> <span className="dsw-p">{'{'}</span> <span className="dsw-v">useState</span><span className="dsw-p">,</span> <span className="dsw-v">useEffect</span> <span className="dsw-p">{'}'}</span> <span className="dsw-k">from</span> <span className="dsw-s">'react'</span></div>
    <div className="dsw-line dsw-line--blank"> </div>
    <div className="dsw-line"><span className="dsw-k">export default function</span> <span className="dsw-f">App</span><span className="dsw-p">() {'{'}</span></div>
    <div className="dsw-line dsw-line--active">{'  '}<span className="dsw-k">const</span> <span className="dsw-p">[</span><span className="dsw-v">data</span><span className="dsw-p">,</span> <span className="dsw-v">setData</span><span className="dsw-p">]</span> <span className="dsw-p">=</span> <span className="dsw-f">useState</span><span className="dsw-p">(</span><span className="dsw-n">null</span><span className="dsw-p">)</span></div>
    <div className="dsw-line dsw-line--blank"> </div>
    <div className="dsw-line">{'  '}<span className="dsw-k">return</span> <span className="dsw-p">(</span></div>
  </>
);

export default function DevStatus() {
  const [vsc, setVsc]         = useState(null);
  const [gh, setGh]           = useState(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick]       = useState(0);
  const mounted               = useRef(true);

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
      } catch { if (mounted.current) setVsc(null); }
    };

    const fetchGitHub = async () => {
      try {
        const res    = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`);
        const events = await res.json();
        if (!mounted.current || !Array.isArray(events)) return;
        setGh(events.find(e => e.type === 'PushEvent') ?? null);
      } catch { if (mounted.current) setGh(null); }
    };

    Promise.all([fetchLanyard(), fetchGitHub()]).then(() => {
      if (mounted.current) setLoading(false);
    });

    const lanyardPoll = setInterval(fetchLanyard, 30_000);
    const ghPoll      = setInterval(fetchGitHub,  300_000);
    const ticker      = setInterval(() => setTick(t => t + 1), 60_000);

    return () => {
      mounted.current = false;
      clearInterval(lanyardPoll);
      clearInterval(ghPoll);
      clearInterval(ticker);
    };
  }, []);

  void tick;

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="ds-card ds-card--window">
        <div className="dsw-wrap">
          <div className="dsw-bar">
            <TrafficLights />
            <span className="dsw-win-title">connecting…</span>
          </div>
          <div className="dsw-loading">
            <span className="dsw-cursor" aria-hidden="true">▋</span>
            <span>Fetching live status…</span>
          </div>
          <div className="dsw-status dsw-status--idle">
            <span className="dsw-status-l">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── VS Code active ── */
  if (vsc) {
    const elapsed   = vsc.timestamps?.start ? fmt(vsc.timestamps.start) : null;
    const { filename, ext, lang } = getFileInfo(vsc.details);
    const workspace = vsc.state?.replace(/^Workspace:\s*/i, '') || 'Keon Website';
    return (
      <div className="ds-card ds-card--window ds-card--coding">
        <div className="dsw-wrap">
          <div className="dsw-bar">
            <TrafficLights />
            <div className="dsw-tab">
              {ext && <span className="dsw-tab-lang">{ext.toUpperCase()}</span>}
              <span className="dsw-tab-name">{filename}</span>
              <span className="dsw-tab-x" aria-hidden="true">×</span>
            </div>
          </div>

          <div className="dsw-editor">
            <div className="dsw-gutter" aria-hidden="true">
              {[1,2,3,4,5,6].map(n => <span key={n}>{n}</span>)}
            </div>
            <div className="dsw-code" aria-label="Code editor preview">
              <FakeCode />
            </div>
          </div>

          <div className="dsw-status">
            <div className="dsw-status-l">
              <span className="dsw-status-live">
                <span className="dsw-status-dot" aria-hidden="true" />
                Now coding
                {elapsed && <span className="dsw-status-time">{elapsed}</span>}
              </span>
            </div>
            <div className="dsw-status-r">
              <span className="dsw-status-ws">{workspace}</span>
              <span className="dsw-status-lang">{lang}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── GitHub last push ── */
  if (gh) {
    const repo = gh.repo?.name?.replace(`${GITHUB_USER}/`, '') ?? '';
    const msg  = gh.payload?.commits?.[0]?.message?.split('\n')[0] ?? 'Pushed code';
    return (
      <a className="ds-card ds-card--window"
        href={`https://github.com/${gh.repo?.name}`}
        target="_blank" rel="noreferrer"
        aria-label="View on GitHub">
        <div className="dsw-wrap">
          <div className="dsw-bar">
            <TrafficLights />
            <span className="dsw-win-title">bash — {GITHUB_USER}</span>
          </div>

          <div className="dsw-terminal">
            <div className="dsw-prompt">
              <span className="dsw-dir">~/{repo}</span>
              <span className="dsw-branch"> (main)</span>
              <span className="dsw-sym"> $ </span>
              <span className="dsw-cmd">git push origin main</span>
            </div>
            <div className="dsw-output">
              <span className="dsw-ok">✓</span>
              <span>{msg}</span>
            </div>
            <div className="dsw-prompt dsw-prompt--idle">
              <span className="dsw-dir">~/{repo}</span>
              <span className="dsw-branch"> (main)</span>
              <span className="dsw-sym"> $ </span>
              <span className="dsw-cursor" aria-hidden="true">▋</span>
            </div>
          </div>

          <div className="dsw-status dsw-status--gh">
            <div className="dsw-status-l">
              <span className="dsw-status-chip">Last built</span>
            </div>
            <div className="dsw-status-r">
              <span>{ago(gh.created_at)}</span>
              <span className="dsw-status-lang">{repo}</span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  /* ── Idle ── */
  return (
    <div className="ds-card ds-card--window">
      <div className="dsw-wrap">
        <div className="dsw-bar">
          <TrafficLights />
          <span className="dsw-win-title">terminal — zsh</span>
        </div>
        <div className="dsw-terminal">
          <div className="dsw-prompt">
            <span className="dsw-dir">~/projects</span>
            <span className="dsw-sym"> $ </span>
            <span className="dsw-cursor" aria-hidden="true">▋</span>
          </div>
        </div>
        <div className="dsw-status dsw-status--idle">
          <div className="dsw-status-l"><span>Offline</span></div>
          <div className="dsw-status-r"><span>zsh</span></div>
        </div>
      </div>
    </div>
  );
}
