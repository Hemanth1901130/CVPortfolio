import { motion } from 'framer-motion';

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
  return (
    <div 
      className={`relative ${className}`}
      aria-hidden={ariaHidden}
      {...props}
    >
      {children}
    </div>
  );
};

export default OptimizedParallax;