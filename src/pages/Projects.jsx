import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi';
import learningPlatformImage from '../assets/images/learning-platform-screenshot.png';
import escapeGameImage from '../assets/images/escape-game-screenshot.png';
import portfolioImage from '../assets/images/portfolio-screenshot.png';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Project data
  useEffect(() => {
    const projectsData = [
      {
        id: 1,
        title: 'Interactive Learning Platform',
        description: 'A comprehensive online learning platform with course management, video lessons, and user authentication. Features include a dashboard for tracking progress, detailed course pages, and an intuitive lesson player for educational content.',
        image: learningPlatformImage,
        technologies: ['React.js', 'Tailwind CSS', 'Context API', 'Authentication'],
        category: 'web-app',
        demoLink: 'https://hemanth-learningplatform.netlify.app',
        githubLink: 'https://github.com/Hemanth1901130/LearningPlatform',
      },
      {
        id: 2,
        title: 'Find The Key - Escape Game',
        description: 'An immersive browser-based escape room game where players use a flashlight to find hidden items and solve puzzles. Features interactive gameplay elements, inventory management, and progressive difficulty levels.',
        image: escapeGameImage,
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Context API'],
        category: 'game',
        demoLink: 'https://hemanth-findthekey.netlify.app',
        githubLink: 'https://github.com/Hemanth1901130/EscapeGame',
      },
      {
        id: 3,
        title: 'Personal Portfolio Website',
        description: 'A responsive portfolio website showcasing my skills, projects, and professional journey. Features smooth animations, dark/light mode, and a clean, modern design optimized for all devices.',
        image: portfolioImage,
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
        category: 'website',
        demoLink: 'https://hemanth-cvportfolio.netlify.app',
        githubLink: 'https://github.com/Hemanth1901130/CVPortfolio',
      },
      
    ];

    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  // Filter projects
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setIsFilterMenuOpen(false);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  return (
    <section className="py-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Explore my projects showcasing my skills in frontend development,
            responsive design, and mobile application development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="relative mb-12">
          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-center mb-4">
            <motion.button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark/80 rounded-full shadow-md text-dark dark:text-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter />
              Filter: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </motion.button>
          </div>

          {/* Mobile Filter Menu */}
          <AnimatePresence>
            {isFilterMenuOpen && (
              <motion.div
                className="md:hidden absolute z-10 left-0 right-0 mx-auto w-64 bg-white dark:bg-dark/90 rounded-xl shadow-lg py-2 px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`block w-full text-left py-2 px-4 rounded-md text-sm ${
                      activeFilter === category
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-dark/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-dark/80 rounded-xl shadow-lg overflow-hidden"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                {/* Project Image */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  {project.image && project.image !== '#' ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {/* Placeholder for project image */}
                      <span className="text-4xl">{project.title.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark dark:text-light mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex justify-between">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <FiExternalLink size={16} /> Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-dark dark:text-light hover:text-primary dark:hover:text-primary"
                    >
                      <FiGithub size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;