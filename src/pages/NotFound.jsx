import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">Page Not Found</h2>
          <p className="text-gray-600 dark:text-white text-lg mb-8 max-w-2xl mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 btn btn-primary"
            >
              <FiArrowLeft /> Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;