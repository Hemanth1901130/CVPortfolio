import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useScrollAnimation,
  useMouseTracking,
  useRevealAnimation,
  useTypewriter,
} from "../hooks/useScrollAnimation";

export const MagneticButton = ({
  children,
  className = "",
  strength = 0.3,
  as: Component = "button",
  ...props
}) => {
  const { ref, style, isHovering } = useMouseTracking(strength);

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      className={`btn btn-primary magnetic-hover ${className}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: isHovering ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </MotionComponent>
  );
};

MagneticButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  strength: PropTypes.number,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export const RevealAnimation = ({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
  ...props
}) => {
  const { ref, style, isVisible } = useRevealAnimation(animation, { delay });

  return (
    <div ref={ref} style={style} className={className} {...props}>
      {children}
    </div>
  );
};

RevealAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf([
    "fadeUp",
    "fadeDown",
    "fadeLeft",
    "fadeRight",
    "scaleUp",
    "rotateIn",
  ]),
  delay: PropTypes.number,
  className: PropTypes.string,
};

export const StaggeredGrid = ({
  children,
  className = "",
  staggerDelay = 100,
  ...props
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.staggerIndex, 10);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const container = containerRef.current;
    if (container) {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        child.dataset.staggerIndex = index;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} {...props}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={
            visibleItems.has(index)
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 50 }
          }
          transition={{
            duration: 0.6,
            delay: index * (staggerDelay / 1000),
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

StaggeredGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  staggerDelay: PropTypes.number,
};

export const ParallaxScroll = ({
  children,
  speed = 0.5,
  className = "",
  ...props
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className={className} {...props}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
};

ParallaxScroll.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  className: PropTypes.string,
};

export const TypewriterEffect = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  ...props
}) => {
  const displayText = useTypewriter(text, { speed, delay });

  return (
    <span className={className} {...props}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
};

TypewriterEffect.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  delay: PropTypes.number,
  className: PropTypes.string,
};

export const FloatingCard = ({
  children,
  className = "",
  intensity = 10,
  ...props
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / rect.height) * intensity;
    const rotateY = ((e.clientX - centerX) / rect.width) * intensity;

    setRotateX(-rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      whileHover={{ z: 50 }}
      {...props}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

FloatingCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  intensity: PropTypes.number,
};

export const MorphingBackground = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20"
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

MorphingBackground.propTypes = {
  className: PropTypes.string,
};

export const ParticleSystem = ({ count = 50, className = "" }) => {
  const particles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -100, window.innerHeight + 100],
            opacity: [0, 1, 0],
            scale: [null, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

ParticleSystem.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};

export const GradientText = ({
  children,
  gradient = "primary",
  className = "",
  ...props
}) => {
  const gradientClasses = {
    primary: "text-gradient-primary",
    accent: "text-gradient-accent",
    rainbow:
      "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent",
    ocean:
      "bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent",
  };

  return (
    <span className={`${gradientClasses[gradient]} ${className}`} {...props}>
      {children}
    </span>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  gradient: PropTypes.oneOf(["primary", "accent", "rainbow", "ocean"]),
  className: PropTypes.string,
};

export const SkeletonLoader = ({
  type = "text",
  count = 1,
  className = "",
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const getSkeletonClass = () => {
    switch (type) {
      case "text":
        return "h-4 bg-gray-200 rounded";
      case "title":
        return "h-8 bg-gray-200 rounded";
      case "card":
        return "h-48 bg-gray-200 rounded-xl";
      case "circle":
        return "w-12 h-12 bg-gray-200 rounded-full";
      case "project-card":
        return "h-80 bg-gray-200 rounded-xl";
      default:
        return "h-4 bg-gray-200 rounded";
    }
  };

  return (
    <>
      {skeletons.map((skeleton) => (
        <div
          key={skeleton}
          className={`shimmer ${getSkeletonClass()} ${className}`}
        />
      ))}
    </>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(["text", "title", "card", "circle", "project-card"]),
  count: PropTypes.number,
  className: PropTypes.string,
};
