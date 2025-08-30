import React, { useMemo } from "react";
import "./ShootingStars.css";

export default function ShootingStars({ count = 20 }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
   
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * Math.random() * 40)}%`, 
      delay: `${Math.floor(Math.random() * 10000)}ms`,
    }));
  }, [count]);

  return (
    <div className="shooting-stars" aria-hidden="true">
      <div className="night">
        {stars.map((s, i) => (
          <span
            key={i}
            className="shooting_star"
            style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>
    </div>
  );
}
