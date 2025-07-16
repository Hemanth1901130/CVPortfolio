import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';

/**
 * OptimizedParallax component for optimizing parallax background images
 * 
 * @param {Object} props
 * @param {string} props.bgImage - Background image URL
 * @param {number} props.strength - Parallax effect strength
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Child components
 * @param {boolean} props.blur - Whether to apply blur effect during loading
 * @param {string} props.bgColor - Background color to show during loading
 * @param {string} props.ariaHidden - Whether to hide from screen readers
 * @returns {JSX.Element}
 */
const OptimizedParallax = ({
  bgImage,
  strength = 300,
  className = '',
  children,
  blur = true,
  bgColor = '#f0f0f0',
  ariaHidden = 'true',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Preload the image when component is in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = bgImage;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      console.error(`Failed to load parallax image: ${bgImage}`);
      setIsLoaded(true); // Still mark as loaded to avoid infinite loading state
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [bgImage, isInView]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`.parallax-${bgImage.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.disconnect();
      }
    };
  }, [bgImage]);

  return (
    <div 
      className={`relative ${className} parallax-${bgImage.replace(/[^a-zA-Z0-9]/g, '')}`}
      aria-hidden={ariaHidden}
    >
      {/* Loading placeholder */}
      {!isLoaded && blur && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
          className="absolute inset-0 z-0"
          style={{ backgroundColor: bgColor }}
        />
      )}

      {/* Actual parallax */}
      {isInView && (
        <Parallax
          bgImage={bgImage}
          strength={strength}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        >
          {children}
        </Parallax>
      )}

      {/* Fallback when not in view or during loading */}
      {(!isInView || !isLoaded) && (
        <div className="w-full h-full" style={{ minHeight: '200px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default OptimizedParallax;