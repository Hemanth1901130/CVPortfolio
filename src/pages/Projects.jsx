import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiFilter,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiAward,
  FiCode,
  FiPlay,
  FiEye,
} from "react-icons/fi";
import OptimizedImage from "../components/OptimizedImage";
import {
  RevealAnimation,
  MagneticButton,
  FloatingCard,
  GradientText,
  SkeletonLoader,
} from "../components/AdvancedAnimations";
import { PinContainer } from "../components/ui/3d-pin";
import ParticleBackground from "../components/ParticleBackground";
import learningPlatformImage from "../assets/images/learning-platform-screenshot.png";
import escapeGameImage from "../assets/images/escape-game-screenshot.png";
import portfolioImage from "../assets/images/portfolio-screenshot.png";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const projectsData = [
      {
        id: 1,
        title: "Interactive Learning Platform",
        subtitle: "Modern E-Learning Solution",
        description:
          "A comprehensive online learning platform with course management, video lessons, and user authentication. Features include a dashboard for tracking progress, detailed course pages, and an intuitive lesson player for educational content.",

        challenge:
          "Create an engaging, accessible learning platform that provides seamless user experience across devices while maintaining high performance.",
        solution:
          "Developed a React-based platform with optimized video streaming, progress tracking, and adaptive UI components that work across all screen sizes.",
        results:
          "Achieved 95% user satisfaction rate with average session duration of 45 minutes and 40% improvement in course completion rates.",

        image: learningPlatformImage,
        technologies: [
          "React.js",
          "Tailwind CSS",
          "Context API",
          "Authentication",
          "Video.js",
          "LocalStorage",
        ],
        category: "web-app",

        metrics: {
          users: "500+",
          performance: "98%",
          uptime: "99.9%",
          satisfaction: "95%",
        },

        technicalFeatures: [
          "Progressive Web App capabilities",
          "Offline content caching",
          "Video streaming optimization",
          "Real-time progress tracking",
          "Responsive design system",
          "Accessibility compliance (WCAG 2.1)",
        ],

        timeline: {
          planning: "2 weeks",
          development: "6 weeks",
          testing: "2 weeks",
          deployment: "1 week",
        },

        demoLink: "https://hemanth-learningplatform.netlify.app",
        githubLink: "https://github.com/Hemanth1901130/LearningPlatform",

        caseStudyLink: "#",

        status: "completed",
        featured: true,
        year: "2024",
      },
      {
        id: 2,
        title: "Find The Key - Escape Game",
        subtitle: "Interactive Browser Game",
        description:
          "An immersive browser-based escape room game where players use a flashlight to find hidden items and solve puzzles. Features interactive gameplay elements, inventory management, and progressive difficulty levels.",

        challenge:
          "Design an engaging game experience that runs smoothly in browsers while providing intuitive controls and compelling gameplay mechanics.",
        solution:
          "Built with React and Framer Motion to create smooth animations, implemented custom game logic for item interactions, and designed progressive difficulty system.",
        results:
          "Game achieved average play time of 25 minutes with 78% completion rate and positive feedback on gameplay mechanics.",

        image: escapeGameImage,
        technologies: [
          "React.js",
          "Tailwind CSS",
          "Framer Motion",
          "Context API",
          "CSS Animations",
          "Game Logic",
        ],
        category: "game",

        metrics: {
          players: "1200+",
          avgSession: "25 min",
          completion: "78%",
          rating: "4.6/5",
        },

        technicalFeatures: [
          "Custom game engine in React",
          "Smooth 60fps animations",
          "Sound effects integration",
          "Save/Load game state",
          "Mobile-responsive controls",
          "Progressive difficulty system",
        ],

        timeline: {
          concept: "1 week",
          development: "4 weeks",
          testing: "2 weeks",
          polish: "1 week",
        },

        demoLink: "https://hemanth-findthekey.netlify.app",
        githubLink: "https://github.com/Hemanth1901130/EscapeGame",

        status: "completed",
        featured: true,
        year: "2024",
      },
      {
        id: 3,
        title: "Personal Portfolio Website",
        subtitle: "Professional Developer Portfolio",
        description:
          "A responsive portfolio website showcasing my skills, projects, and professional journey. Features smooth animations, dark/light mode, and a clean, modern design optimized for all devices.",

        challenge:
          "Create a standout portfolio that demonstrates technical skills while providing excellent user experience and professional presentation.",
        solution:
          "Developed with modern React architecture, implemented advanced animations, 3D elements, and performance optimizations for fast loading.",
        results:
          "Achieved 99 Lighthouse performance score, 40% increase in client inquiries, and recognition for design excellence.",

        image: portfolioImage,
        technologies: [
          "React.js",
          "Tailwind CSS",
          "Framer Motion",
          "Three.js",
          "PWA",
          "Performance Optimization",
        ],
        category: "website",

        metrics: {
          performance: "99/100",
          accessibility: "100/100",
          visitors: "2500+",
          bounce: "15%",
        },

        technicalFeatures: [
          "Advanced animation system",
          "3D interactive elements",
          "PWA capabilities",
          "Performance optimization",
          "SEO optimization",
          "Multi-theme support",
        ],

        timeline: {
          design: "2 weeks",
          development: "5 weeks",
          optimization: "2 weeks",
          testing: "1 week",
        },

        demoLink: "https://hemanth-cvportfolio.netlify.app",
        githubLink: "https://github.com/Hemanth1901130/CVPortfolio",

        status: "live",
        featured: true,
        year: "2024",
      },
    ];

    setTimeout(() => {
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setIsFilterMenuOpen(false);

    if (category === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === category
      );
      setFilteredProjects(filtered);
    }
  };

  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  return (
    <section className="py-20 relative">
      {}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ParticleBackground id="projects-particles" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-200 text-lg">
            Explore my projects showcasing my skills in frontend development,
            responsive design, and mobile application development.
          </p>
        </motion.div>

        {}
        <div className="relative mb-12">
          {}
          <div className="md:hidden flex justify-center mb-4">
            <motion.button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black/25 rounded-full shadow-md text-white backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter />
              Filter:{" "}
              {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </motion.button>
          </div>

          {}
          <AnimatePresence>
            {isFilterMenuOpen && (
              <motion.div
                className="md:hidden absolute z-10 left-0 right-0 mx-auto w-64 bg-black/60 backdrop-blur-sm rounded-xl shadow-lg py-2 px-4 text-white"
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
                        ? "bg-primary/10 text-primary"
                        : "text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {}
          <div className="hidden md:flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category
                    ? "bg-primary text-white"
                    : "bg-black/25 text-gray-200 hover:bg-white/10 backdrop-blur-sm"
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

        {}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonLoader type="project-card" count={3} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <RevealAnimation
                key={project.id}
                animation="fadeUp"
                delay={index * 150}
                className="flex items-center justify-center h-[28rem]"
              >
                <PinContainer
                  title={project.title}
                  href={project.demoLink}
                  containerClassName="w-full h-full"
                  className="w-[22rem] h-[22rem]"
                >
                  <div className="flex basis-full flex-col p-6 tracking-tight text-slate-100/50 w-[22rem] h-[22rem]">
                    {}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="max-w-xs !pb-1 !m-0 font-bold text-base text-slate-100 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 mb-2">
                          {project.subtitle}
                        </p>
                      </div>

                      {}
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === "live"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {project.status === "live" ? "Live" : "Done"}
                      </div>
                    </div>

                    {}
                    <div className="text-xs !m-0 !p-0 font-normal flex-1">
                      <span className="text-slate-400 line-clamp-3">
                        {project.description}
                      </span>
                    </div>

                    {}
                    <div className="flex flex-wrap gap-1 mt-3 mb-4">
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs text-slate-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {}
                    <div className="flex flex-1 w-full rounded-lg mt-3 overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 h-40">
                      {project.image ? (
                        <OptimizedImage
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          blur={true}
                          threshold={0.2}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-white/30">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {}
                    <div className="flex gap-2 mt-4">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                      >
                        <FiEye size={12} />
                        Live Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                      >
                        <FiGithub size={12} />
                        Code
                      </a>
                    </div>
                  </div>
                </PinContainer>
              </RevealAnimation>
            ))}
          </div>
        )}

        {}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-200 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
