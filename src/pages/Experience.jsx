// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Experience = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            My professional journey and work experience in the field of web development and software engineering.
          </p>
        </motion.div>

        {/* Experience */}
        <div className="space-y-8">
          <motion.div
            className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-dark dark:text-light">Intern Frontend Developer</h4>
                <p className="text-primary">Sanctuari, Mumbai, India</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  12/2024 - Present
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Contributed to the staging development of an insurance-focused web platform, with a strong emphasis on responsive design and user experience. Collaborated closely with the back-end team to integrate APIs and implement AI-driven functionalities within the website. Adept at turning complex requirements into clean, maintainable code and ensuring seamless performance across browsers.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-dark dark:text-light">Android Developer Intern</h4>
                <p className="text-primary">EISYSTEMS SERVICES - Technex'21, IIT (BHU) Varanasi</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  January 15 - March 1, 2022 (6 Weeks)
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Completed a 6-week training program on Android Application Development and developed a Hotel Review App for collecting and managing customer feedback.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;