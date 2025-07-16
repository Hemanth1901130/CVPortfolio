import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * SkeletonLoader component for displaying loading placeholders
 * 
 * @param {Object} props
 * @param {string} props.type - Type of skeleton (text, card, circle, etc.)
 * @param {string} props.width - Width of the skeleton
 * @param {string} props.height - Height of the skeleton
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.count - Number of skeleton items to display
 * @returns {JSX.Element}
 */
const SkeletonLoader = ({ 
  type = 'text', 
  width = '100%', 
  height = '20px', 
  className = '', 
  count = 1,
  ...props 
}) => {
  // Generate skeleton items based on count
  const items = Array.from({ length: count }, (_, index) => index);

  // Get the appropriate skeleton based on type
  const getSkeletonByType = () => {
    switch (type) {
      case 'text':
        return (
          <div 
            className={`bg-gray-500/40 rounded ${className}`}
            style={{ width, height }}
            {...props}
          />
        );
      case 'circle':
        return (
          <div 
            className={`bg-gray-500/40 rounded-full ${className}`}
            style={{ width, height }}
            {...props}
          />
        );
      case 'card':
        return (
          <div 
            className={`bg-gray-500/40 rounded-lg ${className}`}
            style={{ width, height }}
            {...props}
          />
        );
      case 'project-card':
        return (
          <div className={`bg-black/25 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden ${className}`}>
            {/* Image placeholder */}
            <div className="bg-gray-500/40" style={{ height: '200px' }}></div>
            {/* Content placeholders */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div className="bg-gray-500/40 h-7 rounded w-3/4"></div>
              {/* Description */}
              <div className="space-y-2">
                <div className="bg-gray-500/40 h-4 rounded w-full"></div>
                <div className="bg-gray-500/40 h-4 rounded w-5/6"></div>
                <div className="bg-gray-500/40 h-4 rounded w-4/6"></div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="bg-gray-500/40 h-6 rounded w-16"></div>
                <div className="bg-gray-500/40 h-6 rounded w-20"></div>
                <div className="bg-gray-500/40 h-6 rounded w-14"></div>
              </div>
            </div>
          </div>
        );
      case 'achievement-card':
        return (
          <div className={`bg-black/25 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden ${className}`}>
            {/* Image placeholder */}
            <div className="bg-gray-500/40" style={{ height: '180px' }}></div>
            {/* Content placeholders */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div className="bg-gray-500/40 h-6 rounded w-3/4"></div>
              {/* Description */}
              <div className="bg-gray-500/40 h-4 rounded w-full"></div>
              {/* Date */}
              <div className="bg-gray-500/40 h-4 rounded w-1/3"></div>
            </div>
          </div>
        );
      case 'timeline-item':
        return (
          <div className={`flex ${className}`}>
            {/* Circle */}
            <div className="relative">
              <div className="bg-gray-500/40 rounded-full h-6 w-6"></div>
              <div className="bg-gray-500/40 w-1 h-full absolute top-6 left-3"></div>
            </div>
            {/* Content */}
            <div className="ml-8 pb-8 space-y-3">
              {/* Title */}
              <div className="bg-gray-500/40 h-6 rounded w-3/4"></div>
              {/* Subtitle */}
              <div className="bg-gray-500/40 h-5 rounded w-1/2"></div>
              {/* Date */}
              <div className="bg-gray-500/40 h-4 rounded w-1/4"></div>
              {/* Description */}
              <div className="space-y-2">
                <div className="bg-gray-500/40 h-4 rounded w-full"></div>
                <div className="bg-gray-500/40 h-4 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        );
      case 'skill-card':
        return (
          <div className={`bg-black/25 backdrop-blur-sm rounded-xl shadow-lg p-6 ${className}`}>
            {/* Icon placeholder */}
            <div className="bg-gray-500/40 rounded-full h-12 w-12 mx-auto mb-4"></div>
            {/* Title */}
            <div className="bg-gray-500/40 h-5 rounded w-2/3 mx-auto mb-3"></div>
            {/* Description */}
            <div className="space-y-2">
              <div className="bg-gray-500/40 h-3 rounded w-full"></div>
              <div className="bg-gray-500/40 h-3 rounded w-5/6 mx-auto"></div>
              <div className="bg-gray-500/40 h-3 rounded w-4/6 mx-auto"></div>
            </div>
          </div>
        );
      default:
        return (
          <div 
            className={`bg-gray-500/40 rounded ${className}`}
            style={{ width, height }}
            {...props}
          />
        );
    }
  };

  // Animation for the skeleton loading effect
  const pulseAnimation = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: [0.6, 0.8, 0.6],
      transition: { 
        repeat: Infinity, 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {items.map((item) => (
        <motion.div 
          key={item}
          initial={pulseAnimation.initial}
          animate={pulseAnimation.animate}
          className="overflow-hidden"
        >
          {getSkeletonByType()}
        </motion.div>
      ))}
    </>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['text', 'circle', 'card', 'project-card', 'achievement-card', 'timeline-item', 'skill-card']),
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  count: PropTypes.number
};

export default SkeletonLoader;