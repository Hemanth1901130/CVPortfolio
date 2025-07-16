import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SkeletonLoader from '../components/SkeletonLoader';
import ParticleBackground from '../components/ParticleBackground';
import { 
  FiCode, 
  FiDatabase, 
  FiLayers, 
  FiTool, 
  FiGitBranch, 
  FiPackage 
} from 'react-icons/fi';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = [
    { id: 'frontend', name: 'Frontend', icon: <FiCode /> },
    { id: 'backend', name: 'Backend', icon: <FiDatabase /> },
    { id: 'languages', name: 'Languages', icon: <FiLayers /> },
    { id: 'tools', name: 'Tools', icon: <FiTool /> },
    { id: 'version-control', name: 'Version Control', icon: <FiGitBranch /> },
  ];
  
  const skills = {
    frontend: [
      { name: 'HTML5', level: 85, color: '#E34F26' },
      { name: 'CSS3', level: 85, color: '#1572B6' },
      { name: 'JavaScript', level: 80, color: '#F7DF1E' },
      { name: 'React.js', level: 85, color: '#61DAFB' },
      { name: 'Tailwind CSS', level: 80, color: '#06B6D4' },
    ],
    backend: [
      { name: 'MySQL', level: 75, color: '#4479A1' },
      { name: 'RESTful APIs', level: 70, color: '#FF6C37' },
      { name: 'Node.js', level: 60, color: '#339933' },
    ],
    languages: [
      { name: 'Java', level: 85, color: '#007396' },
      { name: 'JavaScript', level: 80, color: '#F7DF1E' },
      { name: 'HTML/CSS', level: 85, color: '#E34F26' },
    ],
    tools: [
      { name: 'VS Code', level: 85, color: '#007ACC' },
      { name: 'Android Studio', level: 75, color: '#3DDC84' },
      { name: 'Chrome DevTools', level: 80, color: '#4285F4' },
      { name: 'Adobe Photoshop', level: 90, color: '#31A8FF' },
      { name: 'Adobe Premiere', level: 85, color: '#9999FF' },
    ],
    'version-control': [
      { name: 'Git', level: 75, color: '#F05032' },
      { name: 'GitHub', level: 75, color: '#181717' },
    ],
  };

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay to show loading state
  }, []);

  return (
    <section className="py-20 relative">
      {/* Interactive Particle Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ParticleBackground id="skills-particles" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-200 text-lg">
            As a frontend developer, I've developed skills in various technologies and tools
            to create responsive and user-friendly web applications.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-black/25 text-gray-200 hover:bg-white/10 backdrop-blur-sm'
              }`}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonLoader type="skill-card" count={4} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills[activeCategory].map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-black/25 rounded-xl shadow-lg p-6 backdrop-blur-sm text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              exit={{ opacity: 0, y: 20 }}
              layout
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-sm font-medium text-gray-200">{skill.level}%</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {/* Additional Skills */}
        {isLoading ? (
          <div className="mt-16">
            <SkeletonLoader type="card" width="100%" height="200px" className="rounded-xl" />
          </div>
        ) : (
          <motion.div
            className="mt-16 bg-black/25 rounded-xl shadow-lg p-8 backdrop-blur-sm text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Responsive Design', 'Cross-Browser Compatibility', 'UI/UX Design Principles',
              'Mobile App Development', 'Problem Solving', 'Team Collaboration',
              'Technical Documentation', 'Debugging', 'Adaptability',
              'Telugu (Proficient)', 'English (Advanced)', 'Hindi (Advanced)'
            ].map((skill, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-white/10 text-gray-200 rounded-full text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: '#0ea5e920' }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;