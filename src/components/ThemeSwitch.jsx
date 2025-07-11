import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiChevronDown, FiCheck } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitch = () => {
  const { currentTheme, isDarkMode, themes, toggleDarkMode, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    closeDropdown();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-dark dark:text-light mr-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
      </motion.button>

      <div className="inline-block">
        <motion.button
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-dark dark:text-light"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span 
            className="block w-4 h-4 rounded-full" 
            style={{ backgroundColor: themes[currentTheme].primary }}
          />
          <span className="hidden sm:inline capitalize">{currentTheme}</span>
          <FiChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1">
                {Object.keys(themes).map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => handleThemeChange(themeName)}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span 
                        className="block w-4 h-4 rounded-full" 
                        style={{ backgroundColor: themes[themeName].primary }}
                      />
                      <span className="capitalize">{themeName}</span>
                    </div>
                    {currentTheme === themeName && (
                      <FiCheck size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeSwitch;