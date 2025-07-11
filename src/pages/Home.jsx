// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import HeroScene from '../components/HeroScene';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Frontend Developer
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-light mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Pamarthi <span className="text-primary">Hemanth</span> <span className="text-primary">Srinivas</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              I'm a passionate Frontend Developer and certified Core Java Professional specializing in building
              responsive and user-friendly web applications using React.js, HTML, CSS, and other modern
              technologies. I focus on creating clean, intuitive digital experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Link to="/projects" className="btn btn-primary flex items-center justify-center gap-2">
                View My Work <FiArrowRight />
              </Link>
              <a
                href="/src/assets/images/Pamarthi_HemanthSrinivas_CV.pdf"
                className="btn btn-outline flex items-center justify-center gap-2"
                download
              >
                Download CV <FiDownload />
              </a>
            </motion.div>
          </motion.div>
          
          {/* 3D Scene */}
          <motion.div
            className="relative h-[400px] md:h-[500px] w-full overflow-visible"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ zIndex: 10 }}
          >
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;