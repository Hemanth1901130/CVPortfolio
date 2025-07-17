import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleLinkHover = () => setCursorVariant('link');
    const handleLinkLeave = () => setCursorVariant('default');

    // Add a small delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      // Add event listeners to all links and buttons
      const links = document.querySelectorAll('a, button, .btn, [role="button"], input, select, textarea');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      // Try to remove listeners if possible
      try {
        const links = document.querySelectorAll('a, button, .btn, [role="button"], input, select, textarea');
        links.forEach(link => {
          link.removeEventListener('mouseenter', handleLinkHover);
          link.removeEventListener('mouseleave', handleLinkLeave);
        });
      } catch (e) {
        console.log('Cleanup error:', e);
      }
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      border: '2px solid rgba(59, 130, 246, 1.0)',
      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
      transition: {
        type: 'tween', // Use tween for more reliable movement
        duration: 0.05
      }
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(59, 130, 246, 0.4)',
      border: '2px solid rgba(59, 130, 246, 1.0)',
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)',
      transition: {
        type: 'tween',
        duration: 0.05
      }
    }
  };

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-outer fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
        initial={{ x: 0, y: 0 }}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="custom-cursor-dot fixed top-0 left-0 w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8
        }}
        transition={{
          type: 'tween',
          duration: 0.05
        }}
        initial={{ x: 0, y: 0 }}
        aria-hidden="true"
        style={{ willChange: 'transform', boxShadow: '0 0 5px rgba(59, 130, 246, 0.8)' }}
      />
      <style jsx="jsx" global="global">{`
        html, body {
          cursor: none !important;
        }
        
        a, button, .btn, [role="button"], input, select, textarea {
          cursor: none !important;
        }
        
        /* Fallback cursor style */
        .no-custom-cursor {
          cursor: default !important;
        }
        
        @media (max-width: 768px) {
          body, a, button, .btn {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
