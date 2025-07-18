// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import codreJava from '../assets/images/CoreJavaCertificate.pdf';
import crackTheCase from '../assets/images/CrackTheCase.pdf';
import androidDev from '../assets/images/21ESYSN1024.pdf';
import SkeletonLoader from '../components/SkeletonLoader';
import ParticleBackground from '../components/ParticleBackground';

const Education = () => {
  const [isLoading, setIsLoading] = useState(true);
  
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
        <ParticleBackground id="education-particles" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-200 text-lg">
            My academic background and educational qualifications.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center bg-black/25 p-4 rounded-xl shadow-lg backdrop-blur-sm">Academic Education</h3>
          {isLoading ? (
            <div className="space-y-6">
              <SkeletonLoader type="timeline-item" count={3} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-black/25 rounded-xl shadow-lg p-6 backdrop-blur-sm text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-white">B.Tech: ECE</h4>
                  <p className="text-primary">IIIT Guwahati</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-200">
                    2019 - 2024
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/25 rounded-xl shadow-lg p-6 backdrop-blur-sm text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-white">Intermediate: MPC</h4>
                  <p className="text-primary">FIITJEE Junior College, Vijayawada, Andhra Pradesh</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-200">
                    2018
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/25 rounded-xl shadow-lg p-6 backdrop-blur-sm text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-white">High School: 10th</h4>
                  <p className="text-primary">Sri Chaitanya High School, Vijayawada, Andhra Pradesh</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-200">
                    2016
                  </span>
                </div>
              </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Certifications & Awards */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-dark dark:text-light mb-8 text-center">Certifications & Awards</h3>
          {isLoading ? (
            <div className="space-y-6">
              <SkeletonLoader type="timeline-item" count={3} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-dark dark:text-light">Core Java Professional Certificate</h4>
                  <p className="text-primary">Full Core Java Professional Certification</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <a
                    href={codreJava}
                    target="_blank"
                    className="bg-primary/10 px-3 py-1 rounded-full text-sm text-primary hover:bg-primary/20 transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-dark dark:text-light">1st Place - Crack The Case</h4>
                  <p className="text-primary">Entrepreneurship Cell, IIIT Guwahati</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                    October 10, 2021
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Awarded 1st place in the Crack The Case competition conducted by the Entrepreneurship Cell at IIIT Guwahati.
              </p>
              <div className="mt-2">
                <a
                  href={crackTheCase}
                  target="_blank"
                  className="text-primary hover:underline text-sm"
                >
                  View Certificate
                </a>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark/80 rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-dark dark:text-light">Android Application Development</h4>
                  <p className="text-primary">EISYSTEMS SERVICES - Technex'21, IIT (BHU) Varanasi</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                    January 15 - March 1, 2022 (6 Weeks)
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Completed a 6-week training program on Android Application Development and developed a Hotel Review App.
              </p>
              <div className="mt-2">
                <a
                  href={androidDev}
                  target="_blank"
                  className="text-primary hover:underline text-sm"
                >
                  View Certificate
                </a>
              </div>
              </div>
            </div>
          )}
        </motion.div> */}
      </div>
    </section>
  );
};

export default Education;