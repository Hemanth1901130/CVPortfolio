import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion as m, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {isLoading ? (
        <m.div 
          className="fixed inset-0 flex items-center justify-center bg-light dark:bg-dark z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <m.div
            className="text-4xl font-bold text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Portfolio
            <m.span
              className="inline-block ml-2"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              ⚙️
            </m.span>
          </m.div>
        </m.div>
      ) : (
        <AnimatePresence>
          <div className="flex flex-col min-h-screen">
            <ScrollProgress />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Layout;