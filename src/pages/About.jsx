// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiLayers, FiMonitor } from 'react-icons/fi';
const About = () => {
  const skills = [
    { name: 'SDE', icon: <FiCode size={24} />, description: 'Building responsive and interactive user interfaces with modern frameworks and libraries.' },
    { name: 'UI/UX Design', icon: <FiMonitor size={24} />, description: 'Creating intuitive and visually appealing user experiences with attention to detail.' },
    { name: 'Team Collaboration', icon: <FiUsers size={24} />, description: 'Working effectively with cross-functional teams to deliver high-quality products.' },
    { name: 'Architecture', icon: <FiLayers size={24} />, description: 'Designing scalable and maintainable frontend architectures for complex applications.' },
  ];

  // Skills for the skills section

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
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            I'm a passionate Frontend Developer with experience in building responsive and user-centric web
            applications. Skilled in React.js, Java, HTML/CSS, MySQL, and UI/UX tools. I love creating clean,
            intuitive digital experiences and solving practical problems through code.
          </p>
        </motion.div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-dark dark:text-light mb-6">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My journey in web development began when I discovered my passion for creating
              interactive user experiences. I'm skilled at turning complex requirements into clean,
              maintainable code and ensuring seamless performance across browsers.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I believe in writing clean, maintainable code and creating intuitive user interfaces
              that make complex applications feel simple and enjoyable to use. I'm passionate about
              creating digital products that not only look great but also provide real value to users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    {skill.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-dark dark:text-light mb-2">{skill.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;