// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCode, FiUsers, FiLayers, FiMonitor } from "react-icons/fi";
import ParticleBackground from "../components/ParticleBackground";

const About = () => {
 const skills = [
  {
    name: "Frontend Development",
    icon: <FiCode size={24} />,
    description:
      "I build responsive, user-friendly web apps using React and other modern tools, with a focus on performance and clean code.",
  },
  {
    name: "UI/UX Design",
    icon: <FiMonitor size={24} />,
    description:
      "I care about how things look and feel. I aim for interfaces that are both easy to use and visually consistent.",
  },
  {
    name: "Team Collaboration",
    icon: <FiUsers size={24} />,
    description:
      "I enjoy working closely with designers, developers, and product teams to ship features smoothly and on time.",
  },
  {
    name: "Frontend Architecture",
    icon: <FiLayers size={24} />,
    description:
      "I like keeping things organized — from component structure to state management — so the codebase stays scalable and easy to work with.",
  },
];


  return (
    <div className="relative">
      {/* Interactive Particle Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ParticleBackground id="about-particles" />
      </div>

      {/* About Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-black/25 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-200 text-lg">
              I'm a Frontend Developer with a passion for crafting clean,
              efficient, and accessible interfaces using ReactJS. Currently
              working and always open to new opportunities and challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/25 rounded-xl shadow-lg p-8 backdrop-blur-sm text-white"
            >
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <p className="text-gray-200 mb-6">
                I stumbled into web development thinking it’d be just HTML and
                vibes—turns out it’s a lot more, and I kind of love it. There’s
                something satisfying about turning coffee and chaos into clean,
                responsive interfaces.
              </p>
              <p className="text-gray-200">
                I enjoy building things that don’t break (most of the time) and
                writing code that future-me won’t hate. Whether it’s crafting
                pixel-perfect UIs or battling CSS bugs like a digital ninja, I’m
                all about creating stuff that looks good and works even better.
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
                    className="bg-black/25 rounded-xl shadow-lg p-6 flex flex-col items-center text-center backdrop-blur-sm text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-4">
                      {skill.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {skill.name}
                    </h4>
                    <p className="text-gray-200 text-sm">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
