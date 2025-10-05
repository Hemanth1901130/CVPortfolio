import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";
import SkeletonLoader from "../components/SkeletonLoader";
import { PinContainer } from "../components/ui/3d-pin";
import { RevealAnimation } from "../components/AdvancedAnimations";

const javaCert = "/certificates/java-cert.png";
const caseCert = "/certificates/case-cert.png";
const systemCert = "/certificates/system-cert.png";

const Achievements = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const certificates = [
    {
      id: 1,
      title: "Java Programming",
      issuer: "Jspiders",
      date: "June 2023",
      description:
        "Advanced Java programming certification covering core concepts, data structures, and application development.",
      image: javaCert,
      alt: "Java Programming Certificate",
    },
    {
      id: 2,
      title: "CASE Study",
      issuer: "IIIT Guwahati",
      date: "August 2023",
      description:
        " Certification for winning a comprehensive CASE study on marketing practices and methodologies.",
      image: caseCert,
      alt: "CASE Study Certificate",
    },
    {
      id: 3,
      title: "Systems Architecture",
      issuer: "EI Systems",
      date: "October 2023",
      description:
        "Certification in designing and implementing scalable system architectures for enterprise applications.",
      image: systemCert,
      alt: "Systems Architecture Certificate",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Achievements & Certifications
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            A showcase of my professional certifications and notable
            achievements in the field of software development.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <SkeletonLoader key={i} type="card" height="400px" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <RevealAnimation
                key={cert.id}
                animation="fadeUp"
                delay={index * 150}
                className="flex items-center justify-center h-[28rem]"
              >
                <PinContainer
                  title={cert.title}
                  href={cert.image}
                  containerClassName="w-full h-full"
                  className="w-[22rem] h-[22rem]"
                >
                  <div className="flex basis-full flex-col p-6 tracking-tight text-slate-100/50 w-[22rem] h-[22rem]">
                    {}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="max-w-xs !pb-1 !m-0 font-bold text-base text-slate-100 line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-slate-400 mb-2">
                          by {cert.issuer}
                        </p>
                      </div>

                      {}
                      <div className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-medium">
                        {cert.date}
                      </div>
                    </div>

                    {}
                    <div className="text-xs !m-0 !p-0 font-normal flex-1">
                      <span className="text-slate-400 line-clamp-3">
                        {cert.description}
                      </span>
                    </div>

                    {}
                    <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 h-40">
                      <OptimizedImage
                        src={cert.image}
                        alt={cert.alt}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>

                    {}
                    <div className="mt-4">
                      <a
                        href={cert.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-lg text-sm font-medium transition-all"
                      >
                        <span>View Certificate</span>
                      </a>
                    </div>
                  </div>
                </PinContainer>
              </RevealAnimation>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
