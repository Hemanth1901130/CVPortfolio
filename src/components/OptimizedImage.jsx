import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage component for lazy loading and optimizing images
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.objectFit - Object-fit property (cover, contain, etc.)
 * @param {boolean} props.blur - Whether to apply blur effect during loading
 * @param {number} props.threshold - Intersection observer threshold (0-1)
 * @param {Function} props.onLoad - Callback when image is loaded
 * @param {string} props.fallback - Fallback image URL if main image fails to load
 * @param {Object} props.sizes - Responsive sizes configuration
 * @returns {JSX.Element}
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  objectFit = 'cover',
  blur = true,
  threshold = 0.1,
  onLoad,
  fallback,
  sizes,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image error event
  const handleImageError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Determine image source based on loading state and errors
  const imageSrc = error && fallback ? fallback : src;

  // Combine styles
  const combinedStyle = {
    ...style,
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: '#f0f0f0' }}
      aria-busy={!isLoaded}
    >
      {/* Loading placeholder */}
      {!isLoaded && blur && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={combinedStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          {...props}
        />
      )}

      {/* Fallback for no JavaScript or errors */}
      <noscript>
        <img
          src={src}
          alt={alt}
          className="w-full h-full"
          style={{ objectFit }}
        />
      </noscript>
    </div>
  );
};

export default OptimizedImage;