import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion as m } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitch from './ThemeSwitch';
import profImage from '../assets/images/prof.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Education', path: '/education' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-20 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <m.div
            className="flex-shrink-0 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary shadow-md">
              <img
                src={profImage}
                alt="Pamarthi Hemanth Srinivas"
                className="w-full h-full object-cover"
              />
            </div>
            <Link to="/" className="text-xl sm:text-2xl font-bold text-primary">
              <span className="text-dark dark:text-light">Pamarthi</span>
              <span className="hidden xs:inline">Hemanth Srinivas</span>
            </Link>
          </m.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link, index) => (
                <m.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="px-3 py-2 rounded-md text-sm font-medium text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </m.div>
              ))}
              
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              >
                <ThemeSwitch />
              </m.div>
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center">
            <div className="mr-3">
              <ThemeSwitch />
            </div>
            <m.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-dark dark:text-light hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <FiX size={24} className="text-primary" aria-hidden="true" />
              ) : (
                <FiMenu size={24} aria-hidden="true" />
              )}
            </m.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <m.div
        id="mobile-menu"
        className={`md:hidden overflow-hidden ${isOpen ? 'shadow-lg' : ''}`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
          duration: 0.3
        }}
        role="menu"
        aria-labelledby="mobile-menu-button"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link, index) => (
            <m.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                to={link.path}
                className="block px-4 py-3 rounded-md text-base font-medium text-dark dark:text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {link.name}
              </Link>
            </m.div>
          ))}
        </div>
      </m.div>
    </nav>
  );
};

export default Navbar;