import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { posts } from "../data/posts";
import "./BlogPost.css";

function getReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <section className="blog-post">
        <div className="blog-post-header">
          <Link to="/blog" className="blog-back-link">
            <span className="back-arrow">←</span> Back to Blog
          </Link>
          <h1>Post not found</h1>
          <p className="blog-date">This blog post does not exist.</p>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const blocks = post.blocks || post.content
    .trim()
    .split("\n\n")
    .map((value) => ({ type: "text", value }));

  return (
    <section className="blog-post">
      <header className="blog-post-header">
        <Link to="/blog" className="blog-back-link">
          <span className="back-arrow">←</span> Back to Blog
        </Link>

        <div className="blog-meta">
          <p className="blog-date">{formattedDate}</p>
          <span className="blog-reading-time">{getReadingTime(post.content)}</span>
        </div>

        <h1>{post.title}</h1>
      </header>

      <div className="blog-divider" />

      <article>
        {blocks.map((block, index) => {
          if (block.type === "image") {
            return (
              <figure key={index} className="blog-post-figure">
                <img src={block.src} alt={block.alt} />
              </figure>
            );
          }

          return <p key={index}>{block.value}</p>;
        })}
      </article>
    </section>
  );
}