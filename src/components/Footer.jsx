// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import profImage from '../assets/images/prof.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiGithub size={20} />, url: 'https://github.com/Hemanth1901130', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, url: 'https://www.linkedin.com/in/hemanth-srinivas-pamarthi-417b5621a', label: 'LinkedIn' },
    { icon: <FiMail size={20} />, url: 'mailto:pamarthy.hemanth@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-transparent backdrop-blur-sm py-8 border-t border-gray-200/20 dark:border-gray-800/20 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 md:mb-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-md hidden md:block">
                <img
                  src={profImage}
                  alt="Pamarthi Hemanth Srinivas"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-dark dark:text-light text-sm font-medium">
                © {currentYear} Pamarthi Hemanth Srinivas. All rights reserved.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark hover:text-primary dark:text-light dark:hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-dark dark:text-light font-medium">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;