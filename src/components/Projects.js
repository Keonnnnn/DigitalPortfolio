// src/components/Projects.js
import "./Projects.css";

import RobotIcon from "../assets/robot.png";
import SingapuraIcon from "../assets/Singapura.png";
import EcotureIcon from "../assets/ECOTURE.png";
import IllumiaIcon from "../assets/illumia.png";
import MakanLahIcon from "../assets/MakanLah.png";
import TeleIcon from "../assets/tele.png";
import CollatorIcon from "../assets/Collator.png";

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
    url: "https://docs.google.com/presentation/d/1iQNU_TAhzT77QZ6msAJMFkqVFwiHF2Vx6Bu9MvVLmx4/edit?usp=sharing",
    contactNote: "Contact me to find out more",
    contactUrl:
      "mailto:Keonshu.contact@gmail.com?subject=YCS%20Collaterals%20System%20inquiry",
  },
  {
    id: "p7",
    title: "CRMS Master Collator",
    category: "Internship",
    since: "2025",
    builtAt: "National Youth Council (NYC)",
    description:
      "I developed a macro-enabled solution that automates validation of email domains and collates contacts.",
    status: "Active",
    icon: CollatorIcon,
    stack: ["VBA Macros", "Excel"],
    url: "https://docs.google.com/presentation/d/1J3P9i4oo5bBNHAjPPtG_Mzq8vovgw1_JIN2hlTSP5Vk/edit?usp=sharing",
    contactNote: "Contact me to find out more",
    contactUrl:
      "mailto:Keonshu.contact@gmail.com?subject=CRMS%20Master%20Collator%20inquiry",
  },
  {
    id: "p6",
    title: "YCS Telegram Bot",
    category: "Internship",
    since: "2025",
    builtAt: "National Youth Council (NYC)",
    description:
      "I developed a Telegram bot for Youth to easily search and enquire about the latest Programs organised by Youth Corps Singapore (YCS).",
    status: "Active",
    icon: TeleIcon,
    stack: ["Make", "Plumber", "FormSG", "Google Sheets"],
    url: "https://docs.google.com/presentation/d/1hvkY74sHCgRcpcnWgDr3fC7C-EJSYIEug4lXn4XOAoE/edit?usp=sharing",
    contactNote: "Contact me to find out more",
    contactUrl:
      "mailto:Keonshu.contact@gmail.com?subject=YCS%20Telegram%20Bot%20inquiry",
    telegramBotUrl: "https://t.me/YouthCorpsSG_events_bot",
  },
  {
    id: "p2",
    title: "Ecoture",
    category: "School Project",
    since: "2025",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "Full Stack web app. Our very own version of a Retail E-commerce platform.",
    icon: EcotureIcon,
    stack: ["HTML5", "CSS", "JavaScript", "C#", "MySQL"],
    url: "https://github.com/Keonnnnn/Ecoture",
  },
  {
    id: "p2w",
    title: "Ecoture (Wireframes)",
    category: "School Project",
    since: "2025",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "High fidelity prototype created for the Ecoture project before development. Designed to visualize flows and layouts.",
    icon: EcotureIcon,
    stack: ["Figma", "UI/UX"],
    url: "https://www.figma.com/proto/vKeBfXlKQHdrFshLoUiHbm/Ecoture---High-Fidelity-Prototype?node-id=887-5198&t=TlS87QQiRBAWFR7Y-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=845%3A3805",
  },
  {
    id: "p3",
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
    id: "p3w",
    title: "Singapura CC (Wireframes)",
    category: "School Project",
    since: "2024",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "Wireframes created to outline the user experience and features of the Singapura CC portal.",
    icon: SingapuraIcon,
    stack: ["Figma", "UI/UX"],
    url: "https://www.figma.com/design/A6x153odr5Cm0Z7WZ4xHHg/Singapura-CC-Wireframes?node-id=0-1&t=t0PWWN755B44LOOr-1",
  },
  {
    id: "p4",
    title: "Illumia",
    category: "School Project",
    since: "2024",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "High fidelity prototype of a Hotel Booking System designed for UI/UX coursework.",
    icon: IllumiaIcon,
    stack: ["Figma", "UI/UX"],
    url: "https://www.figma.com/proto/iiJICqnHx9HeG47QLq0jKI/Illumia---High-Fidelity-Prototype?node-id=3-5&t=HuPJvBjTuRsxYN2e-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A5",
  },
  {
    id: "p5",
    title: "Makan Lah",
    category: "School Project",
    since: "2023",
    builtAt: "Nanyang Polytechnic (NYP)",
    description:
      "Wireframes of a sustainable food delivery web app designed for app development coursework.",
    icon: MakanLahIcon,
    stack: ["Figma", "UI/UX"],
    url: "https://www.figma.com/design/i8GUBWMzQZn4bsOesVUwg5/Makan-Lah---Wireframes?node-id=0-1&t=t5LGME28o2zx7qlW-1",
  },
];

function onMove(e) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  card.style.setProperty("--rX", `${(0.5 - y) * 10}deg`);
  card.style.setProperty("--rY", `${(x - 0.5) * 16}deg`);
}

function onEnter(e) {
  e.currentTarget.classList.add("is-hovered");
}

function onLeave(e) {
  const card = e.currentTarget;
  card.classList.remove("is-hovered");
  card.style.setProperty("--rX", "0deg");
  card.style.setProperty("--rY", "0deg");
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="pr-heading">My Projects</h2>

      <div className="pr-grid" role="list">
        {PROJECTS.map((p) => {
          const CardTag = p.url ? "a" : "div";

          let scale = 0.92;
          if (p.id === "p1") scale = 0.8;
          if (p.id === "p2" || p.id === "p3" || p.id.endsWith("w")) scale = 1.02;
          if (p.id === "p7") scale = 0.75;

          const metaChips = [
            p.since,
            p.builtAt ?? (p.audience ? `For ${p.audience}` : null),
          ].filter(Boolean);

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
            >
              {/* Row 1: logo · title · category chip — all on one line */}
              <div className="pr-head">
                <div className="pr-logo">
                  {p.icon ? (
                    <img
                      src={p.icon}
                      alt={`${p.title} icon`}
                      className="pr-logo-img"
                      style={{ transform: `scale(${scale})` }}
                      loading="lazy"
                      draggable="false"
                    />
                  ) : (
                    <span>{p.emoji}</span>
                  )}
                </div>
                <h3 className="pr-title">{p.title}</h3>
                <span className="pr-chip pr-category-chip">{p.category}</span>
              </div>

              {/* Row 2: meta chips */}
              {metaChips.length > 0 && (
                <div className="pr-meta">
                  {metaChips.map((chip, i) => (
                    <span key={i} className="pr-chip">{chip}</span>
                  ))}
                </div>
              )}

              {/* Row 3: description */}
              {p.description && <p className="pr-desc">{p.description}</p>}

              {/* Row 4: stack */}
              {Array.isArray(p.stack) && p.stack.length > 0 && (
                <div className="pr-stack">
                  {p.stack.map((s, i) => (
                    <span key={i} className="pr-chip">{s}</span>
                  ))}
                </div>
              )}

              {/* Row 5: footer — pinned to bottom */}
              <div className="pr-foot">
                <div className="pr-foot-left">
                  {p.contactNote && (
                    <a
                      className="pr-cta"
                      href={p.contactUrl || "mailto:Keonshu.contact@gmail.com"}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span aria-hidden="true">✉️</span>
                      <span>{p.contactNote}</span>
                    </a>
                  )}
                  {p.telegramBotUrl && (
                    <a
                      className="pr-cta"
                      href={p.telegramBotUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span aria-hidden="true">🤖</span>
                      <span>Try the YCS Telegram Bot</span>
                    </a>
                  )}
                </div>

                <div className="pr-foot-right">
                  {p.status && (
                    <span className={`pr-badge${p.status.toLowerCase() === "active" ? " pr-badge--active" : ""}`}>
                      {p.status}
                    </span>
                  )}
                  {p.url && <span className="pr-open" aria-hidden="true">↗</span>}
                </div>
              </div>
            </CardTag>
          );
        })}

        <div className="pr-card coming-soon" role="listitem">
          <div className="cs-content">
            <span className="cs-emoji">✨</span>
            <p className="cs-text">More exciting projects<br />coming soon…</p>
          </div>
        </div>
      </div>
    </section>
  );
}