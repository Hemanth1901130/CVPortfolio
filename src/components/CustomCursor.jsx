import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(true);
  const [magnetTarget, setMagnetTarget] = useState(null);
  const [trails, setTrails] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring physics for smooth movement
  const springConfig = { damping: 30, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Refs for performance optimization
  const rafRef = useRef();
  const trailRef = useRef([]);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const { clientX: x, clientY: y } = e;
      
      // Handle magnetic attraction
      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        // Magnetic pull within 100px radius
        if (distance < 100) {
          const force = Math.max(0.1, (100 - distance) / 100);
          const magnetX = x + (centerX - x) * force * 0.3;
          const magnetY = y + (centerY - y) * force * 0.3;
          cursorX.set(magnetX);
          cursorY.set(magnetY);
        } else {
          cursorX.set(x);
          cursorY.set(y);
        }
      } else {
        cursorX.set(x);
        cursorY.set(y);
      }

      // Update trail
      trailRef.current = [
        { x, y, id: Date.now() },
        ...trailRef.current.slice(0, 8)
      ];
      setTrails([...trailRef.current]);
    });
  }, [magnetTarget, cursorX, cursorY]);

  // Enhanced cursor states for different elements
  const handleElementHover = useCallback((element, state) => {
    setCursorState(state);
    
    if (state === 'magnetic') {
      setMagnetTarget(element.target);
    } else {
      setMagnetTarget(null);
    }
  }, []);

  const handleElementLeave = useCallback(() => {
    setCursorState('default');
    setMagnetTarget(null);
  }, []);

  // Cursor visibility handlers
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  // Setup event listeners with improved performance
  useEffect(() => {
    // Check for touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    if (isTouchDevice) return;

    // Mouse movement
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Enhanced element detection with MutationObserver for dynamic content
    const setupElementListeners = () => {
      const selectors = {
        magnetic: '.magnetic-hover, .btn-primary, .interactive-card',
        hover: 'a, button, .btn, [role="button"]',
        text: 'input, textarea, [contenteditable]',
        media: 'img, video, .project-image',
        disabled: '[disabled], .disabled'
      };

      Object.entries(selectors).forEach(([state, selector]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          element.addEventListener('mouseenter', (e) => handleElementHover(e, state), { passive: true });
          element.addEventListener('mouseleave', handleElementLeave, { passive: true });
        });
      });
    };

    // Initial setup
    const initialTimer = setTimeout(setupElementListeners, 100);

    // Dynamic content observer
    const observer = new MutationObserver(() => {
      clearTimeout(initialTimer);
      setTimeout(setupElementListeners, 50);
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      clearTimeout(initialTimer);
    };
  }, [handleMouseMove, handleElementHover, handleElementLeave, handleMouseEnter, handleMouseLeave, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // Cursor variants with enhanced states
  const getCursorVariant = () => {
    const baseStyle = {
      scale: isVisible ? 1 : 0,
      transition: { type: 'spring', ...springConfig }
    };

    switch (cursorState) {
      case 'magnetic':
        return {
          ...baseStyle,
          scale: isVisible ? 1.5 : 0,
          backgroundColor: 'rgba(147, 51, 234, 0.2)',
          border: '2px solid rgba(147, 51, 234, 0.8)',
          boxShadow: '0 0 25px rgba(147, 51, 234, 0.6)',
        };
      case 'hover':
        return {
          ...baseStyle,
          scale: isVisible ? 1.2 : 0,
          backgroundColor: 'rgba(59, 130, 246, 0.3)',
          border: '2px solid rgba(59, 130, 246, 0.9)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        };
      case 'text':
        return {
          ...baseStyle,
          scale: isVisible ? 0.8 : 0,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          border: '1px solid rgba(34, 197, 94, 0.8)',
          boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)',
        };
      case 'media':
        return {
          ...baseStyle,
          scale: isVisible ? 2 : 0,
          backgroundColor: 'rgba(251, 191, 36, 0.1)',
          border: '2px solid rgba(251, 191, 36, 0.7)',
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)',
        };
      case 'disabled':
        return {
          ...baseStyle,
          scale: isVisible ? 0.6 : 0,
          backgroundColor: 'rgba(107, 114, 128, 0.2)',
          border: '1px solid rgba(107, 114, 128, 0.5)',
          boxShadow: 'none',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(59, 130, 246, 0.6)',
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
        };
    }
  };

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={getCursorVariant()}
        initial={{ scale: 0 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: cursorState === 'media' ? 0 : 1,
        }}
        transition={{ type: 'spring', ...springConfig }}
      />

      {/* Particle Trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed top-0 left-0 w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-[9998]"
          style={{
            left: trail.x,
            top: trail.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Magnetic Ring Effect */}
      {cursorState === 'magnetic' && magnetTarget && (
        <motion.div
          className="fixed top-0 left-0 border border-purple-500/30 rounded-full pointer-events-none z-[9997]"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            width: 80,
            height: 80,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
          
          html, body {
            cursor: none !important;
          }
          
          @media (hover: none) and (pointer: coarse) {
            * {
              cursor: auto !important;
            }
          }
          
          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
          }
          
          /* Hide default cursor on desktop */
          @media (hover: hover) and (pointer: fine) {
            * {
              cursor: none !important;
            }
          }
        `
      }} />
    </>
  );
};

export default CustomCursor;
