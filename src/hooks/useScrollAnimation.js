import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    staggerDelay = 100,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
  };
};

export const useStaggeredAnimation = (itemCount, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    staggerDelay = 100,
    triggerOnce = true,
  } = options;

  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => new Set([...prev, index]));

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.dataset.index = index;
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [itemCount, threshold, rootMargin, triggerOnce]);

  const getItemStyle = (index) => ({
    opacity: visibleItems.has(index) ? 1 : 0,
    transform: visibleItems.has(index) ? "translateY(0)" : "translateY(50px)",
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * staggerDelay
    }ms`,
  });

  return {
    containerRef,
    visibleItems,
    getItemStyle,
  };
};

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;

      setOffset(parallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return {
    ref: elementRef,
    transform: `translateY(${offset}px)`,
  };
};

export const useMouseTracking = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return {
    ref: elementRef,
    style: {
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: isHovering
        ? "none"
        : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    isHovering,
  };
};

export const useRevealAnimation = (animationType = "fadeUp", options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "-50px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getAnimationStyles = () => {
    const baseStyle = {
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };

    switch (animationType) {
      case "fadeUp":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(60px)",
        };
      case "fadeDown":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-60px)",
        };
      case "fadeLeft":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(60px)",
        };
      case "fadeRight":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-60px)",
        };
      case "scaleUp":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.8)",
        };
      case "rotateIn":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "rotate(0deg)" : "rotate(-10deg)",
        };
      default:
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
        };
    }
  };

  return {
    ref,
    style: getAnimationStyles(),
    isVisible,
  };
};

export const useTypewriter = (text, options = {}) => {
  const {
    speed = 50,
    delay = 0,
    deleteSpeed = 30,
    deleteDelay = 2000,
    loop = false,
  } = options;

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    const animate = () => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
          timeout = setTimeout(animate, speed);
        } else if (loop) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            animate();
          }, deleteDelay);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);
          timeout = setTimeout(animate, deleteSpeed);
        } else {
          setIsDeleting(false);
          timeout = setTimeout(animate, speed);
        }
      }
    };

    const initialDelay = setTimeout(() => {
      animate();
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [
    text,
    speed,
    delay,
    deleteSpeed,
    deleteDelay,
    loop,
    currentIndex,
    isDeleting,
  ]);

  return displayText;
};
