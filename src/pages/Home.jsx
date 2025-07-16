// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import HeroScene from '../components/HeroScene';
import ParticleBackground from '../components/ParticleBackground';
import ErrorBoundary from '../components/ErrorBoundary';
import cvPdf from '../assets/images/Pamarthi_HemanthSrinivas_CV.pdf';

const Home = () => {
  return (
    <div className="relative">
      {/* Interactive Particle Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ParticleBackground id="home-particles" />
      </div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
                SDE
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
                className="text-gray-600 dark:text-white text-lg mb-8"
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
                <Link
                  to="/projects"
                  className="btn btn-primary flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="View my projects"
                >
                  View My Work <FiArrowRight aria-hidden="true" />
                </Link>
                <a
                  href={cvPdf}
                  className="btn btn-outline flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  download
                  aria-label="Download my CV"
                >
                  Download CV <FiDownload aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
            
            {/* 3D Scene with Fallback */}
            <motion.div
              className="relative h-[400px] md:h-[500px] w-full overflow-visible"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ zIndex: 10 }}
            >
              <ErrorBoundary fallback={
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 bg-opacity-20 rounded-xl">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-bold text-dark dark:text-light mb-2">Interactive 3D</h3>
                    <p className="text-gray-600 dark:text-gray-300">Showcasing my technical skills</p>
                  </div>
                </div>
              }>
                <HeroScene />
              </ErrorBoundary>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
          >
            <h2 className="text-3xl font-bold text-white mb-6">My Expertise</h2>
            <p className="text-gray-200 mb-8">
              With a strong foundation in frontend development and a passion for creating exceptional user experiences,
              I bring creativity and technical expertise to every project.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6" role="list" aria-label="My skills">
              {['React.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Responsive Design', 'UI/UX'].map((skill, index) => (
                <motion.div
                  key={skill}
                  className="bg-white/10 p-4 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  role="listitem"
                >
                  <p className="font-medium text-white">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-gray-200 mb-8">
              I'm currently available for freelance projects, full-time positions, and collaborations.
              If you're looking for a developer who is passionate about creating exceptional web experiences, let's connect!
            </p>
            <Link
              to="/contact"
              className="btn btn-primary inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Contact me"
            >
              Get In Touch <FiArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;