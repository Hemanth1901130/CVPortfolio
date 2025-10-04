import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';


const OptimizedImageV2 = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  quality = 85,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  sizes,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState('');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  
  const generateSources = (originalSrc) => {
    if (!originalSrc) return { webp: '', avif: '', original: originalSrc };
    
    
    
    const baseName = originalSrc.split('.').slice(0, -1).join('.');
    const extension = originalSrc.split('.').pop();
    
    return {
      avif: `${baseName}.avif`,
      webp: `${baseName}.webp`, 
      original: originalSrc
    };
  };

  
  const createBlurPlaceholder = () => {
    if (blurDataURL) return blurDataURL;
    
    
    const svg = `
      <svg width="${width || 400}" height="${height || 300}" viewBox="0 0 ${width || 400} ${height || 300}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="url(#gradient)" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  
  useEffect(() => {
    if (!isInView || !src) return;

    const sources = generateSources(src);
    let bestFormat = sources.original;

    
    const canUseWebP = () => {
      const elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d')) && elem.toDataURL('image/webp').indexOf('image/webp') === 5;
    };

    const canUseAVIF = () => {
      const avif = new Image();
      avif.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=";
      return avif.complete && avif.width > 0 && avif.height > 0;
    };

    
    if (canUseAVIF() && sources.avif) {
      bestFormat = sources.avif;
    } else if (canUseWebP() && sources.webp) {
      bestFormat = sources.webp;
    }

    setCurrentSrc(bestFormat);
  }, [isInView, src]);

  
  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
    if (onError) onError(e);
  };

  
  const renderPlaceholder = () => {
    if (placeholder === 'blur') {
      return (
        <motion.div
          className={`absolute inset-0 ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={createBlurPlaceholder()}
            alt=""
            className="w-full h-full object-cover filter blur-sm"
            aria-hidden="true"
          />
        </motion.div>
      );
    }

    if (placeholder === 'skeleton') {
      return (
        <motion.div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  
  if (hasError && currentSrc === src) {
    return (
      <div 
        ref={imgRef}
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
        {...props}
      >
        <div className="text-center p-4">
          <div className="text-gray-400 text-4xl mb-2">📷</div>
          <div className="text-gray-500 text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      {...props}
    >
      {}
      {!isLoaded && renderPlaceholder()}
      
      {}
      {isInView && currentSrc && (
        <picture>
          {}
          <source 
            srcSet={generateSources(src).avif} 
            type="image/avif" 
            sizes={sizes}
          />
          <source 
            srcSet={generateSources(src).webp} 
            type="image/webp" 
            sizes={sizes}
          />
          
          {}
          <motion.img
            src={currentSrc}
            alt={alt}
            className={`w-full h-full transition-all duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              objectFit, 
              objectPosition,
              filter: isLoaded ? 'none' : 'blur(20px)'
            }}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            initial={{ scale: 1.1 }}
            animate={{ scale: isLoaded ? 1 : 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </picture>
      )}

      {}
      {!isLoaded && isInView && (
        <div className="absolute bottom-2 right-2">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

OptimizedImageV2.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.number,
  priority: PropTypes.bool,
  placeholder: PropTypes.oneOf(['blur', 'skeleton', 'empty']),
  blurDataURL: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  objectPosition: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  sizes: PropTypes.string,
};

export default OptimizedImageV2;