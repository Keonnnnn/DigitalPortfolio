import "./Projects.css";

// Images
import RobotIcon from "../assets/robot.png";
import SingapuraIcon from "../assets/Singapura.png";
import EcotureIcon from "../assets/ECOTURE.png";
import IllumiaIcon from "../assets/illumia.png";
import MakanLahIcon from "../assets/MakanLah.png";
import TeleIcon from "../assets/tele.jpeg";
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
    description: "I developed a macro-enabled solution that automates validation of email domains and collates contacts.",
    status: "Active",
    icon: CollatorIcon, 
    stack: ["VBA Macros", "Excel"], 
    url: "https://docs.google.com/presentation/d/1J3P9i4oo5bBNHAjPPtG_Mzq8vovgw1_JIN2hlTSP5Vk/edit?usp=sharing", 
    contactNote: "Contact me to find out more",
    contactUrl: "mailto:Keonshu.contact@gmail.com?subject=CRMS%20Master%20Collator%20inquiry",
  },
  {
    id: "p6", 
    title: "YCS Telegram Bot",
    category: "Internship", 
    since: "2025",
    builtAt: "National Youth Council (NYC)", 
    description: "I developed a Telegram bot for Youth to easily search and inquire about the latest Youth Programs organised by Youth Corps Singapore (YCS).",
    status: "Active",
    icon: TeleIcon, 
    stack: ["Make", "Plumber", "FormSG", "Google Sheets"], 
    url: "https://docs.google.com/presentation/d/1hvkY74sHCgRcpcnWgDr3fC7C-EJSYIEug4lXn4XOAoE/edit?usp=sharing", 
    contactNote: "Contact me to find out more",
    contactUrl: "mailto:Keonshu.contact@gmail.com?subject=YCS%20Telegram%20Bot%20inquiry",
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

const GRID_WIDE_STYLE = {
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
            p.since ? p.since : null,
            p.builtAt ? p.builtAt : p.audience ? `For ${p.audience}` : null,
          ].filter(Boolean);

          let scale = 0.92;
          if (p.id === "p1") scale = 0.8;
          if (p.id === "p2" || p.id === "p3" || p.id.endsWith("w")) scale = 1.02;
          if (p.id === "p7") scale = 0.75;

          const logoWrapperStyle = { overflow: "hidden" };
          const logoImgStyle = {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${scale})`,
          };

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
                    <span style={{ fontSize: "22px", lineHeight: 1 }}>{p.emoji}</span>
                  )}
                </div>

                <div className="pr-titleWrap">
                  <h3 className="pr-title" style={TITLE_TWO_LINE_STYLE}>
                    {p.title}
                  </h3>
                  <span className="pr-chip">{p.category}</span>
                </div>
              </div>

              {metaChips.length > 0 && (
                <div className="pr-meta" style={{ gap: 8, flexWrap: "wrap" }}>
                  {metaChips.map((chip, i) => (
                    <span key={i} className="pr-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {p.description && <p className="pr-desc">{p.description}</p>}

              {Array.isArray(p.stack) && p.stack.length > 0 && (
                <div className="pr-stack" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: 12 }}>
                  {p.stack.map((s, i) => (
                    <span key={i} className="pr-chip">{s}</span>
                  ))}
                </div>
              )}

              <div className="pr-foot">
                {p.contactNote && (
                  <a
                    className="pr-cta"
                    href={p.contactUrl || "mailto:Keonshu.contact@gmail.com"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span aria-hidden="true">✉️</span>
                    <span className="pr-cta-text">{p.contactNote}</span>
                  </a>
                )}

                {p.telegramBotUrl && (
                  <a
                    className="pr-cta"
                    href={p.telegramBotUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open YCS Telegram Bot"
                  >
                    <span aria-hidden="true">🤖</span>
                    <span className="pr-cta-text">Try the YCS Telegram Bot</span>
                  </a>
                )}

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

        <div className="pr-card coming-soon" role="listitem" aria-label="More projects coming soon">
          <div className="cs-content">
            <span className="cs-emoji">✨</span>
            <p className="cs-text">
              More exciting projects
              <br />
              coming soon…
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
