import React from 'react';
import { motion } from 'framer-motion';

const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-medium">Loading...</p>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;