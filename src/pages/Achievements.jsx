import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import SkeletonLoader from '../components/SkeletonLoader';

// Import certificate images
import javaCert from '../assets/images/certificates/java-cert.png';
import caseCert from '../assets/images/certificates/case-cert.png';
import systemCert from '../assets/images/certificates/system-cert.png';

/**
 * Achievements page component
 * Displays certifications and achievements
 * 
 * @returns {JSX.Element} The Achievements page component
 */
const Achievements = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Certificate data
  const certificates = [
    {
      id: 1,
      title: 'Java Programming',
      issuer: 'Oracle',
      date: 'June 2023',
      description: 'Advanced Java programming certification covering core concepts, data structures, and application development.',
      image: javaCert,
      alt: 'Java Programming Certificate'
    },
    {
      id: 2,
      title: 'CASE Certification',
      issuer: 'IEEE',
      date: 'August 2023',
      description: 'Certified Associate in Software Engineering (CASE) demonstrating proficiency in software development methodologies.',
      image: caseCert,
      alt: 'CASE Certificate'
    },
    {
      id: 3,
      title: 'Systems Architecture',
      issuer: 'Microsoft',
      date: 'October 2023',
      description: 'Certification in designing and implementing scalable system architectures for enterprise applications.',
      image: systemCert,
      alt: 'Systems Architecture Certificate'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Achievements & Certifications
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            A showcase of my professional certifications and notable achievements in the field of software development.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <SkeletonLoader key={i} type="card" height="400px" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="bg-black/25 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <OptimizedImage
                    src={cert.image}
                    alt={cert.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-white">
                      {cert.title}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black bg-opacity-10 text-primary">
                      {cert.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Issued by {cert.issuer}
                  </p>
                  <p className="text-gray-200">
                    {cert.description}
                  </p>
                </div>
                <div className="px-6 py-4 bg-black/30 backdrop-blur-sm">
                  <button
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary text-secondary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    View Certificate
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}


      </div>
    </div>
  );
};

export default Achievements;