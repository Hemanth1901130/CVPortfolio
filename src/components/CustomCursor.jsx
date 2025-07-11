import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const CustomCursor = () => {
  // We're not using isDarkMode in this simplified version
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);

  // Check if device is touch-enabled
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  };

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (isTouchDevice()) {
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Show cursor after first movement
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Check if cursor is over a clickable element
    const handleElementHover = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        const isClickable = 
          hoveredElement.tagName === 'BUTTON' || 
          hoveredElement.tagName === 'A' || 
          hoveredElement.tagName === 'INPUT' || 
          hoveredElement.tagName === 'TEXTAREA' || 
          hoveredElement.tagName === 'SELECT' || 
          computedStyle.cursor === 'pointer';
        
        setIsPointer(isClickable);
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Log to confirm the component is running
    console.log('CustomCursor component is active');

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Check for hoverable elements on mousemove instead of interval
    const throttledHandleElementHover = () => {
      requestAnimationFrame(handleElementHover);
    };
    window.addEventListener('mousemove', throttledHandleElementHover);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', throttledHandleElementHover);
    };
  }, [isVisible]); // Remove position from dependency array to prevent re-running effect on every mouse move

  // Don't render on touch devices
  if (isTouchDevice()) {
    return null;
  }

  return (
    <AnimatePresence>
      {/* Outer cursor (larger circle) */}
      <motion.div
        key="outer-cursor"
        ref={cursorOuterRef}
        className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 border-red-500"
        style={{
          top: 0,
          left: 0,
          borderWidth: '3px',
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : isClicking ? 0.75 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'tween', // Use tween instead of spring for better performance
          duration: 0.15,
          ease: 'linear'
        }}
      />

      {/* Inner cursor (small dot) */}
      <motion.div
        key="inner-cursor"
        ref={cursorInnerRef}
        className="fixed pointer-events-none z-[9999] w-4 h-4 rounded-full bg-red-500"
        style={{
          top: 0,
          left: 0,
        }}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0 : isClicking ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'tween', // Use tween instead of spring for better performance
          duration: 0.1,
          ease: 'linear'
        }}
      />
    </AnimatePresence>
  );
};

export default CustomCursor;
