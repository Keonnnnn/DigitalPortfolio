import React, { useCallback, useEffect, useState } from "react";
import "./Testimonials.css";

import zannSignature from "../assets/signatures/zann-liao.png";
import huiLingSignature from "../assets/signatures/lee-hui-ling.png";
import micTaySignature from "../assets/signatures/mic-tay.png";

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "What sets Keon apart is his ability to bridge technical complexity and user needs — translating intricate system requirements into solutions that genuinely solve business problems. He is reliable, composed under pressure, and naturally collaborative.",
    name: "Zann Liao",
    role: "Assistant Director, Transformation Office",
    org: "National Youth Council Singapore",
    date: "29 June 2026",
    accent: "te-card--a",
    signature: zannSignature,
    fullText: [
      "I had the privilege of directly supervising Keon Shu throughout his internship at the National Youth Council (NYC) Singapore, where he served as a Business Process Automation intern in the Transformation Office from 1 April 2025 to 30 June 2026.",
      "From the outset, Keon demonstrated the kind of analytical rigour and intellectual curiosity that I believe will serve him well in SMU's Bachelor of Science (Information Systems) programme. He quickly mastered the government and automation tools at his disposal, but what distinguished him was his instinct to look beyond the technical mechanics — consistently asking how each solution could deliver meaningful business value. This ability to connect technology to organisational outcomes is precisely the mindset that the IS discipline demands.",
      "Keon's first major project, the Youth Corps Singapore (YCS) Collaterals System, gave early evidence of his capability. He independently managed both requirements gathering and technical implementation, building an end-to-end automation solution that processes collateral requests, routes them to relevant staff, and updates inventory in real-time. Critically, he integrated government tools with an external database to create a cohesive, production-ready platform — demonstrating not just coding competence, but systems thinking and an appreciation for how technology must fit within a broader operational context. The system remains in active use today, delivering measurable operational gains.",
      "As I assigned him increasingly complex work, Keon's performance did not plateau — it deepened. When tasked with optimising our Customer Relationship Management System (CRMS) data acquisition process, he designed comprehensive data-cleaning macros that exceeded the initial project scope, and in doing so developed a substantive understanding of data governance and business data requirements. This capacity to grow beyond what is asked of him, and to engage meaningfully with the underlying principles rather than just the immediate task, reflects the kind of learner who will thrive in a rigorous academic environment.",
      "What sets Keon apart is his ability to bridge technical complexity and user needs — translating intricate system requirements into solutions that genuinely solve business problems. He progressed steadily from process mapping to designing full automation solutions, and he did so through active reflection, consistent feedback-seeking, and a willingness to take ownership at every stage. He is reliable, composed under pressure, and naturally collaborative, communicating clearly across all stakeholders.",
      "I have no doubt that Keon has both the technical foundation and the intellectual disposition to excel in SMU's IS programme. He approaches problems with the same care and rigour that the programme will demand of him, and I recommend him without reservation.",
    ],
  },
  {
    id: "t3",
    quote:
      "Keon is an exceptionally quick learner with high intellectual curiosity. He effectively translated complex technical concepts into actionable solutions for non-technical stakeholders.",
    name: "Mic Tay Wee Yang",
    role: "Former Deputy Director, Transformation Office",
    org: "National Youth Council",
    date: "21 June 2026",
    accent: "te-card--b",
    signature: micTaySignature,
    fullText: [
      "Keon Shu served as a Business Process Automation Intern at the National Youth Council (NYC) Singapore from 1 April 2025 to 30 June 2026.",
      "Keon is an exceptionally quick learner with high intellectual curiosity. During his internship, he readily accepted the different projects he was assigned and demonstrated humility in outlining the gaps in his understanding, which he promptly closed with detailed research.",
      "Keon led the Youth Corps Singapore (YCS) collaterals project as both the business analyst and the developer. He conducted in-depth interviews with different stakeholders to gather their requirements for an end-to-end automation system that helped YCS process multiple collateral requests, route them to relevant staff, and update stock in real-time. Through the project, he developed a strong grasp of business processes, information systems, and government tools. Till today, the system continues to support business operations and improve efficiency.",
      "Keon also optimized the Customer Relationship Management System (CRMS) by designing and implementing advanced data-cleaning macros that exceeded the original project scope. Through the project, he developed a sophisticated understanding of business needs, Microsoft Dynamics architecture and NYC's data quality management.",
      "Throughout his tenure, Keon was reliable, calm and collaborative. He effectively translated complex technical concepts into actionable solutions for non-technical stakeholders. His proactive learning agility and technical rigor make him an outstanding candidate for a demanding Bachelor's programme. I recommend him without reservation.",
    ],
  },
  {
    id: "t2",
    quote:
      "He was a thoughtful listener who valued our input deeply, and did not treat stakeholders merely as end-users but as genuine partners. Keon is technically capable, collaborative by nature, and genuinely invested in the people around him.",
    name: "Lee Hui Ling",
    role: "Manager, Ministry of Education",
    org: "Formerly Manager, Youth Corps Singapore",
    date: "24 June 2026",
    accent: "te-card--c",
    signature: huiLingSignature,
    fullText: [
      "I had the privilege of working closely with Keon Shu as the project lead for Youth Corps Singapore (Youth Corps) Collaterals System project during my time at Youth Corps.",
      "Keon is highly approachable and receptive to our concerns, making collaboration seamless. He is reliable and an agile problem-solver. His technical expertise enables him to easily grasp complex user requirements and translate them into effective, practical solutions.",
      "Keon demonstrated strong leadership throughout the project. From the start, he took initiative to build a working prototype and included us as active participants in the development process, allowing us to see the system take shape in real time and provide meaningful feedback. He was a thoughtful listener who valued our input deeply, and did not treat stakeholders merely as end-users but as genuine partners. He brought technical insights at every stage, refining the system based on our feedback and delivering a solution that significantly enhanced our operational efficiency.",
      "The system is now used by over 50 full-time staff, interns and volunteers across Youth Corps. Like any live system, there were occasions where technical issues arose and affected daily operations. Keon was always ready to step in promptly and resolve them, ensuring minimal disruption to the team. He also proactively shared relevant updates from Whole-of-Government systems whenever he saw an opportunity to improve our workflows further. His reliability under pressure and his forward-looking approach speak to his character as much as his technical ability. The project has since been recognised across the division as a model for thoughtful system design, and I believe Keon will bring this same mindset into his studies at SMU and into the organisations he joins after graduation.",
      "Keon is technically capable, collaborative by nature, and genuinely invested in the people around him. His positive attitude and strong work ethic made him a valued member of the team, and I have little doubt he will contribute meaningfully to SMU's community and to the industry beyond. I recommend him without reservation.",
    ],
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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

export default function Testimonials() {
  const [openId, setOpenId] = useState(null);
  const active = TESTIMONIALS.find((t) => t.id === openId) || null;

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!active) return;
    const handleKeyPress = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [active, close]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <section id="testimonials" className="testimonials">
      <h2 className="te-heading">Kind words</h2>

      <div className="te-grid" role="list">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className={`te-card ${t.accent}`}
            role="listitem"
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <span className="te-quote-mark" aria-hidden="true">&ldquo;</span>
            <p className="te-quote">{t.quote}</p>
            <div className="te-foot">
              <div className="te-avatar">{initials(t.name)}</div>
              <div className="te-who">
                <p className="te-name">{t.name}</p>
                <p className="te-role">{t.role}</p>
                <p className="te-org">{t.org}</p>
              </div>
            </div>
            <button
              className="te-read-more"
              onClick={() => setOpenId(t.id)}
              aria-haspopup="dialog"
            >
              Read full letter
            </button>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="te-modal-overlay"
          onClick={handleOverlayClick}
          role="presentation"
        >
          <div
            className="te-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Full testimonial from ${active.name}`}
          >
            <button
              className="te-modal-close"
              onClick={close}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="te-modal-head">
              <div className={`te-avatar te-avatar--lg ${active.accent}`}>
                {initials(active.name)}
              </div>
              <div>
                <p className="te-modal-name">{active.name}</p>
                <p className="te-modal-role">{active.role}</p>
                <p className="te-modal-org">{active.org}</p>
              </div>
            </div>

            <div className="te-modal-body">
              {active.fullText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="te-modal-signoff">
              <p className="te-modal-sincerely">Sincerely,</p>
              <img
                className="te-modal-signature"
                src={active.signature}
                alt={`${active.name}'s signature`}
              />
              <p className="te-modal-signee">{active.name}</p>
            </div>

            <p className="te-modal-date">{active.date}</p>
          </div>
        </div>
      )}
    </section>
  );
}
