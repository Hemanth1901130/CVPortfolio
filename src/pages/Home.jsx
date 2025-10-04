import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiDownload,
  FiUser,
  FiCode,
  FiTrendingUp,
} from "react-icons/fi";
import HeroScene from "../components/HeroScene";
import ParticleBackground from "../components/ParticleBackground";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  RevealAnimation,
  MagneticButton,
  FloatingCard,
  GradientText,
  TypewriterEffect,
  ParallaxScroll,
  MorphingBackground,
} from "../components/AdvancedAnimations";
import { MorphingText } from "../components/ui/morphing-text";
import { ShinyButton } from "../components/ui/shiny-button";
import cvPdf from "../assets/images/Pamarthi_HemanthSrinivas_CV.pdf";

const Home = () => {
  return (
    <div className="relative">
      {}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ParticleBackground id="home-particles" />
      </div>
      {}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {}
            <RevealAnimation animation="fadeRight" delay={200}>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <span className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm">
                    <FiCode size={16} />
                    Frontend Developer
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-green-300 rounded-full text-sm font-medium backdrop-blur-sm">
                    <FiTrendingUp size={16} />
                    1+ Years
                  </span>
                </motion.div>

                <div>
                  <motion.h1
                    className="text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight"
                    // initial={{ opacity: 0, y: 30 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <GradientText gradient="primary" className="block text-stroke-light">
                      <MorphingText
                        texts={["Hi there,", "I'm", "Hemanth"]}
                        className="text-3xl md:text-4xl lg:text-5xl h-12 md:h-16"
                      />
                    </GradientText>
                  </motion.h1>

                  <motion.div
                    className="text-xl md:text-2xl text-gray-300 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <TypewriterEffect
                      text="Crafting Digital Experiences"
                      speed={800}
                      delay={400}
                    />
                  </motion.div>
                </div>

                <motion.p
                  className="text-black-400 text-lg leading-relaxed mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  Passionate Frontend Developer specializing in React.js and
                  modern web technologies. I create responsive, accessible, and
                  performance-optimized applications that deliver exceptional
                  user experiences.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <ShinyButton
                    onClick={() => window.location.href = '/projects'}
                    className="px-6 py-3 text-base font-medium bg-black/60 backdrop-blur-sm border-white/20"
                  >
                    <span className="flex items-center gap-2">
                      <FiUser size={18} />
                      View My Work
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FiArrowRight size={18} />
                      </motion.span>
                    </span>
                  </ShinyButton>

                  <MagneticButton
                    as="a"
                    href={cvPdf}
                    download
                    className="btn-outline magnetic-hover px-6 py-3 text-base font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <FiDownload size={18} />
                      Download CV
                    </span>
                  </MagneticButton>
                </motion.div>

                {}
                <motion.div
                  className="flex gap-6 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">3+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1+</div>
                    <div className="text-xs text-gray-400">Years Exp</div>
                  </div>
                  {/* <div className="text-center">
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                  </div> */}
                </motion.div>
              </div>
            </RevealAnimation>

            {}
            <motion.div
              className="relative h-[400px] md:h-[500px] w-full overflow-visible"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ zIndex: 10 }}
            >
              <ErrorBoundary
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 bg-opacity-20 rounded-xl">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold text-dark dark:text-light mb-2">
                        Interactive 3D
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Showcasing my technical skills
                      </p>
                    </div>
                  </div>
                }
              >
                <HeroScene />
              </ErrorBoundary>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <ParallaxScroll speed={0.3}>
        <section className="py-24 relative">
          <MorphingBackground />
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealAnimation animation="fadeUp" className="text-center mb-16">
              <GradientText
                gradient="white"
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                My Expertise
              </GradientText>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Combining creativity with technical precision to deliver
                exceptional digital experiences that exceed expectations and
                drive results.
              </p>
            </RevealAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "Frontend Development",
                  skills: [
                    "React.js",
                    "JavaScript ES6+",
                    "TypeScript",
                    "Next.js",
                  ],
                  icon: "⚛️",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  category: "Styling & Design",
                  skills: [
                    "Tailwind CSS",
                    "SCSS/Sass",
                    "CSS3",
                    "Responsive Design",
                  ],
                  icon: "🎨",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  category: "Tools & Workflow",
                  skills: [
                    "Git/GitHub",
                    "Vite",
                    "Performance Optimization",
                    "PWAs",
                  ],
                  icon: "🛠️",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  category: "Backend Basics",
                  skills: ["Node.js", "REST APIs", "MySQL", "Authentication"],
                  icon: "🔧",
                  color: "from-orange-500 to-red-500",
                },
                {
                  category: "Design & UX",
                  skills: [
                    "Adobe Photoshop",
                    "UI/UX Principles",
                    "Figma",
                    "Accessibility",
                  ],
                  icon: "✨",
                  color: "from-violet-500 to-purple-500",
                },
                {
                  category: "Soft Skills",
                  skills: [
                    "Problem Solving",
                    "Team Collaboration",
                    "Adaptability",
                    "Communication",
                  ],
                  icon: "🧠",
                  color: "from-cyan-500 to-blue-500",
                },
              ].map((category, index) => (
                <RevealAnimation
                  key={category.category}
                  animation="scaleUp"
                  delay={index * 100}
                >
                  <FloatingCard className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-white">
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className="text-sm text-gray-300 py-1 px-3 bg-white/5 rounded-lg border border-white/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </FloatingCard>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </section>
      </ParallaxScroll>

      {}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-30"></div>
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <RevealAnimation animation="fadeUp">
            <FloatingCard className="p-12">
              <motion.div
                className="mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-6xl">🚀</span>
              </motion.div>

              <GradientText
                gradient="secondary"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Build Something Amazing?
              </GradientText>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                I'm passionate about creating exceptional digital experiences.
                Whether you have a project in mind, need consultation, or just
                want to connect, I'd love to hear from you!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <MagneticButton
                  as={Link}
                  to="/contact"
                  className="btn-primary magnetic-hover px-8 py-4 text-lg"
                >
                  <span className="flex items-center gap-3">
                    Let's Connect
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FiArrowRight size={20} />
                    </motion.span>
                  </span>
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="btn-outline magnetic-hover px-8 py-4 text-lg"
                >
                  View My Work
                </MagneticButton>
              </div>

              <div className="flex justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Available for Projects
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Quick Response
                </div>
              </div>
            </FloatingCard>
          </RevealAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;
