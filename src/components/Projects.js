// src/components/Projects.js
import React from "react";
import "./Projects.css";

// Images
import RobotIcon from "../assets/robot.png";
import SingapuraIcon from "../assets/Singapura.png";
import EcotureIcon from "../assets/ECOTURE.png";

const PROJECTS = [
  {
    id: "p1",
    title: "YCS Collaterals System",
    category: "Internship",
    since: "2025",
    builtAt: "National Youth Council (NYC)",
    description:
      "I developed a Collaterals System for Youth Corps Singapore (YCS) to streamline inventory tracking and management.",
    status: "Active",
    icon: RobotIcon,
    stack: ["FormSG", "Plumber", "Postman", "Excel Power Query"],
    url: "#",
  },
  {
    id: "p2",
    title: "Singapura CC",
    category: "School Project",
    since: "2024",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "Full Stack web app. Our very own version of a Community Club portal.",
    icon: SingapuraIcon,
    stack: ["HTML5", "CSS", "JavaScript", "MySQL"],
    url: "https://github.com/Keonnnnn/singapura-cc-app",
  },
  {
    id: "p3",
    title: "Ecoture",
    category: "School Project",
    since: "2025",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "Full Stack web app. Our very own version of a Retail E-commerce platform.",
    icon: EcotureIcon,
    stack: ["HTML5", "CSS", "JavaScript", "C#", "MySQL"],
    url: "https://github.com/Keonnnnn/Ecoture",
  }
];

/* --- 3D tilt (uses CSS vars) --- */
function onMove(e) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  const rotY = (x - 0.5) * 16;
  const rotX = (0.5 - y) * 10;
  card.style.setProperty("--rX", `${rotX}deg`);
  card.style.setProperty("--rY", `${rotY}deg`);
  card.style.setProperty("--px", `${x * 100}%`);
  card.style.setProperty("--py", `${y * 100}%`);
}
function onEnter(e) {
  const card = e.currentTarget;
  card.classList.add("is-hovered");
  card.style.setProperty("--px", `50%`);
  card.style.setProperty("--py", `50%`);
}
function onLeave(e) {
  const card = e.currentTarget;
  card.classList.remove("is-hovered");
  card.style.setProperty("--rX", `0deg`);
  card.style.setProperty("--rY", `0deg`);
  card.style.setProperty("--px", `50%`);
  card.style.setProperty("--py", `50%`);
}

/* --- inline sizing so titles can wrap to 2 lines --- */
const GRID_WIDE_STYLE = {
  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
  gap: 28,
  maxWidth: 1240,
  margin: "0 auto",
  padding: "0 16px",
};
const CARD_LARGER_STYLE = {
  padding: "26px 26px 22px",
  borderRadius: 20,
  minHeight: 220,
};
const TITLE_TWO_LINE_STYLE = {
  whiteSpace: "normal",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
};

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="pr-heading">My Projects</h2>

      <div className="pr-grid" role="list" style={GRID_WIDE_STYLE}>
        {PROJECTS.map((p) => {
          const CardTag = p.url ? "a" : "div";
          const metaChips = [
            p.since ? `Since ${p.since}` : null,
            p.builtAt ? p.builtAt : p.audience ? `For ${p.audience}` : null,
          ].filter(Boolean);

          // Per-card logo scale
          let scale = 0.92;              // default
          if (p.id === "p1") scale = 0.80;       // robot slightly smaller
          if (p.id === "p2" || p.id === "p3") scale = 1.02; // small boost for these two

          const logoWrapperStyle = { overflow: "hidden" };
          const logoImgStyle = {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${scale})`,
          };
          const emojiStyle = { fontSize: "22px", lineHeight: 1, transform: "scale(0.92)" };

          return (
            <CardTag
              key={p.id}
              className="pr-card"
              {...(p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {})}
              role="listitem"
              aria-label={`${p.title} — ${p.category}`}
              onMouseMove={onMove}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              style={CARD_LARGER_STYLE}
            >
              {/* Header: icon + title + chip */}
              <div className="pr-head">
                <div className="pr-logo" style={logoWrapperStyle} aria-hidden={!p.icon && !p.emoji}>
                  {p.icon ? (
                    <img
                      src={p.icon}
                      alt={`${p.title} icon`}
                      className="pr-logo-img"
                      style={logoImgStyle}
                      loading="lazy"
                      draggable="false"
                    />
                  ) : (
                    <span style={emojiStyle}>{p.emoji}</span>
                  )}
                </div>

                <div className="pr-titleWrap">
                  <h3 className="pr-title" style={TITLE_TWO_LINE_STYLE}>
                    {p.title}
                  </h3>
                  <span className="pr-chip">{p.category}</span>
                </div>
              </div>

              {/* Meta chips */}
              {metaChips.length > 0 && (
                <div className="pr-meta" style={{ gap: 8, flexWrap: "wrap" }}>
                  {metaChips.map((chip, i) => (
                    <span key={i} className="pr-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {p.description && <p className="pr-desc">{p.description}</p>}

              {/* Tech stack chips */}
              {Array.isArray(p.stack) && p.stack.length > 0 && (
                <div
                  className="pr-stack"
                  style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: 12 }}
                >
                  {p.stack.map((s, i) => (
                    <span key={i} className="pr-chip">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="pr-foot">
                <span
                  className={`pr-badge ${
                    (p.status || "").toLowerCase() === "active" ? "pr-badge--active" : ""
                  }`}
                >
                  {p.status}
                </span>
                {p.url && <span className="pr-open" aria-hidden="true">↗</span>}
              </div>
            </CardTag>
          );
        })}
      </div>
    </section>
  );
}
