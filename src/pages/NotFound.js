import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | Keon";
  }, []);

  return (
    <section className="notfound">
      <div className="nf-content">
        <p className="nf-eyebrow">Oops</p>
        <h1 className="nf-title">404</h1>
        <p className="nf-message">
          Looks like this page went out after hours.
        </p>
        <Link to="/" className="nf-btn">
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
