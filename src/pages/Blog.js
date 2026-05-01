import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import KatsuojiPhoto from "../assets/Katsuoji.jpeg";
import DarumaPhoto from "../assets/daruma2.jpeg";
import "./Blog.css";

function getReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
}

export default function Blog() {
  return (
    <section className="blog-page">
      {/* HERO */}
      <header className="blog-hero">
        <div className="blog-hero-content">
          <p className="blog-eyebrow">Personal Blog</p>

          <h1 className="blog-title">
            After Hours <span>by Keon</span>
          </h1>

          <p className="blog-subtitle">Thoughts and reflections.</p>

          <div className="blog-intro-row">
            <div className="blog-hero-image">
              <img
                src={KatsuojiPhoto}
                alt="Keon standing in front of a mountain view in Japan"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="blog-intro-text">
              <h2>Hello, I'm Keon.</h2>
              <p>
                I believe that every step I take is shaping a better tomorrow.
                This is where I reflect, write about my experiences, and think
                through life after hours.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* POSTS SECTION */}
      <div className="blog-posts-section">
        <div className="blog-posts-header">
          <span className="blog-posts-label">Latest</span>
          <div className="blog-posts-rule" />
        </div>

        <div className="blog-list">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              className="blog-card"
              key={post.slug}
            >
              <div className="blog-card-image">
                <img src={DarumaPhoto} alt={post.title} />
              </div>

              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-date">
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="blog-card-reading-time">
                    {getReadingTime(post.content)}
                  </span>
                </div>

                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>

                <div className="blog-card-footer">
                  <span className="blog-read-cta">Read post →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}