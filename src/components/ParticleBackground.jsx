import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ParticleBackground = ({ id = 'css-particles' }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div id={id} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

ParticleBackground.propTypes = {
  id: PropTypes.string,
};

export default ParticleBackground;