import { useCallback, useState, useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import PropTypes from 'prop-types';

const ParticleBackground = ({ id = 'tsparticles' }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const particlesRef = useRef(null);
  const errorRetryCount = useRef(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Add listener for changes to motion preference
    const handleMotionPreferenceChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    // Add global event listeners for WebGL context loss/restore
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost in ParticleBackground');
      setContextLost(true);
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored in ParticleBackground');
      setContextLost(false);
      // Attempt to reinitialize particles
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

  // Auto-recovery mechanism
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
      await loadSlim(engine);
      // Store reference to the engine
      particlesRef.current = engine;
      // Reset error state and retry count on successful init
      setHasError(false);
      errorRetryCount.current = 0;
    } catch (err) {
      console.error('Failed to initialize particles:', err);
      setHasError(true);
    }
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded successfully');
    // Store reference to the container
    particlesRef.current = container;
  }, []);

  // If user prefers reduced motion or there's an error, don't render particles
  if (prefersReducedMotion || hasError) {
    return null;
  }
  
  // If context is lost, show a simplified fallback or nothing
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
        autoPlay: true, // Keep animation running
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 30, // Lower FPS limit for better performance
        fullScreen: {
          enable: false, // Don't use fullscreen mode to avoid performance issues
        },
        interactivity: {
          events: {
            onClick: {
              enable: false, // Disable click interactions for better performance
            },
            onHover: {
              enable: true,
              mode: 'repulse',
              parallax: {
                enable: false, // Disable parallax effect for better performance
              }
            },
            resize: {
              enable: true,
              delay: 500, // Add delay to resize handling for better performance
              minimumSize: 100, // Don't render particles below this size
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
            value: '#ffffff', // White particles for better contrast on blue background
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.3, // Lower opacity for better performance
            width: 1,
            triangles: {
              enable: false, // Disable triangles for better performance
            }
          },
          collisions: {
            enable: false, // Disable collisions for better performance
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'out', // Use 'out' instead of 'bounce' for better performance
            },
            random: false,
            speed: 1, // Lower speed for better performance
            straight: false,
            trail: {
              enable: false, // Disable trail for better performance
            }
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Increase area to reduce particle density
            },
            value: 40, // Reduce number of particles for better performance
            limit: 50, // Set a hard limit on particles
          },
          opacity: {
            value: 0.4, // Lower opacity for better performance
          },
          shape: {
            type: 'circle', // Stick with simple circles for better performance
          },
          size: {
            value: { min: 1, max: 3 }, // Smaller particles for better performance
          },
          twinkle: {
            enable: false, // Disable twinkling for better performance
          }
        },
        detectRetina: false, // Disable retina detection for better performance
        pauseOnBlur: true, // Pause when tab is not focused
        pauseOnOutsideViewport: true, // Pause when not visible
        smooth: false, // Disable smooth animations for better performance
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

ParticleBackground.propTypes = {
  id: PropTypes.string,
};

export default ParticleBackground;