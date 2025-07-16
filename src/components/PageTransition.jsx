import { motion, useReducedMotion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageTransition = ({ children }) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  const pageVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
      }
    : {
        initial: {
          opacity: 0,
          y: 20,
        },
        in: {
          opacity: 1,
          y: 0,
        },
        out: {
          opacity: 0,
          y: -20,
        },
      };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: prefersReducedMotion ? 0.2 : 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;