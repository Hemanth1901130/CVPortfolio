import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ThemeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {}
      <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 transition-opacity duration-300" />

      {}
      <motion.div
        className="relative z-10 flex items-center justify-center w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md"
        animate={{ x: isDarkMode ? 14 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="text-yellow-400"
            >
              <FiMoon size={10} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="text-yellow-500"
            >
              <FiSun size={10} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDarkMode
            ? "0 0 8px rgba(59, 130, 246, 0.4)"
            : "0 0 8px rgba(251, 191, 36, 0.4)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeSwitch;
