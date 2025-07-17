import { useCallback, useState, useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import PropTypes from 'prop-types';

const ParticleBackground = ({ id = 'tsparticles' }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const particlesRef = useRef(null);
  const errorRetryCount = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost in ParticleBackground');
      setContextLost(true);
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored in ParticleBackground');
      setContextLost(false);
      if (particlesRef.current) {
        try {
          particlesRef.current.refresh();
        } catch (err) {
          console.error('Failed to refresh particles after context restore:', err);
        }
      }
    };
    
    window.addEventListener('webglcontextlost', handleContextLost, false);
    window.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  useEffect(() => {
    if (contextLost && errorRetryCount.current < 3) {
      const timer = setTimeout(() => {
        console.log(`Attempting to recover particles (attempt ${errorRetryCount.current + 1}/3)`);
        setContextLost(false);
        errorRetryCount.current += 1;
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [contextLost]);

  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
      particlesRef.current = engine;
      setHasError(false);
      errorRetryCount.current = 0;
    } catch (err) {
      console.error('Failed to initialize particles:', err);
      setHasError(true);
    }
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded successfully');
    particlesRef.current = container;
  }, []);

  if (prefersReducedMotion || hasError) {
    return null;
  }
  
  if (contextLost && errorRetryCount.current >= 3) {
    return null;
  }

  return (
    <Particles
      id={id}
      init={particlesInit}
      loaded={particlesLoaded}
      aria-hidden="true"
      options={{
        autoPlay: true,
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 30,
        fullScreen: {
          enable: false,
        },
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: true,
              mode: 'repulse',
              parallax: {
                enable: false,
              }
            },
            resize: {
              enable: true,
              delay: 500,
              minimumSize: 100,
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
            triangles: {
              enable: false,
            }
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'out',
            },
            random: false,
            speed: 1,
            straight: false,
            trail: {
              enable: false,
            }
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 40,
            limit: 50,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
          twinkle: {
            enable: false,
          }
        },
        detectRetina: false,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        smooth: false,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

ParticleBackground.propTypes = {
  id: PropTypes.string,
};

export default ParticleBackground;