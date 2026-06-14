# Keon's Digital Portfolio

Personal portfolio website built with React. Live at [keonshu.com](https://keonshu.com).

## Features

- **Hero** — animated shooting stars background, cursor trail, and background music toggle (Bundle of Joy)
- **Status Dashboard** — live Spotify now-playing card and GitHub activity card with commit streak tracking
- **Projects** — showcase of personal and side projects
- **Image Gallery** — photo gallery modal
- **Blog** — personal blog with individual post pages
- **Light / Dark mode** — persisted theme toggle
- **404 page** — custom not-found page

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, React Router, CSS |
| Spotify proxy | Express.js |
| Deployment | Vercel |

## Project Structure

```
src/
├── components/
│   ├── Hero           # Landing section (music, stars, gallery trigger)
│   ├── Header         # Nav bar with theme toggle
│   ├── StatusDashboard / DevStatus  # Spotify + GitHub cards
│   ├── SpotifyNowPlaying  # Live Spotify widget
│   ├── GitHubActivity     # Recent commits + streak
│   ├── Projects       # Project cards
│   ├── ImageGallery   # Lightbox photo gallery
│   ├── ShootingStars  # Canvas star animation
│   ├── CursorTrail    # Custom cursor effect
│   └── ScrollToTop    # Back-to-top button
└── pages/
    ├── Blog / BlogPost
    └── NotFound
```
