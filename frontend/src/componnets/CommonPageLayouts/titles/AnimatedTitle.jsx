import React, { useEffect, useRef, useState } from 'react';
import './AnimatedTitle.css';

const AnimatedTitle = ({ titlePart1, titlePart2, className, offset = 0, duration = '1s' }) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - offset && rect.bottom >= offset) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount in case the element is already in view

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return (
    <div className="parent-container">
    <div className={`animated-title-container ${className}`} ref={containerRef}>
      <span
        className={`title-part left ${isInView ? 'animate' : ''}`}
        style={{ transitionDuration: duration }}
      >
        {titlePart1}
      </span>
      <span className="title-space">{'\u00A0'}</span> {/* Adding a non-breaking space */}
      <span
        className={`title-part right ${isInView ? 'animate' : ''}`}
        style={{ transitionDuration: duration }}
      >
        {titlePart2}
      </span>
    </div>
  </div>
  );
};

export default AnimatedTitle;
