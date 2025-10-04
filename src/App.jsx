import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { ThreeDProvider } from "./context/ThreeDContext";
import Layout from "./components/Layout";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import LoadingFallback from "./components/LoadingFallback";
import PerformanceMonitor from "./components/PerformanceMonitor";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Education = lazy(() => import("./pages/Education"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md"
    >
      Skip to content
    </a>
  );
};

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <ThreeDProvider>
        <CustomCursor />
        <PerformanceMonitor
          enabled={import.meta.env.MODE !== "production"}
          showMetrics={true}
          logToConsole={import.meta.env.MODE !== "production"}
        />
        <Router>
          <SkipToContent />
          <AppRoutes />
        </Router>
      </ThreeDProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const mainContentRef = useRef(null);

  useEffect(() => {
    const pageTitles = {
      "/": "Home | Pamarthi Hemanth Srinivas",
      "/about": "About | Pamarthi Hemanth Srinivas",
      "/skills": "Skills | Pamarthi Hemanth Srinivas",
      "/experience": "Experience | Pamarthi Hemanth Srinivas",
      "/education": "Education | Pamarthi Hemanth Srinivas",
      "/achievements": "Achievements | Pamarthi Hemanth Srinivas",
      "/projects": "Projects | Pamarthi Hemanth Srinivas",
      "/contact": "Contact | Pamarthi Hemanth Srinivas",
    };

    document.title =
      pageTitles[location.pathname] ||
      "Page Not Found | Pamarthi Hemanth Srinivas";
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (mainContentRef.current) {
      mainContentRef.current.setAttribute("tabindex", "-1");
      mainContentRef.current.focus();

      mainContentRef.current.removeAttribute("tabindex");
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Home />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <About />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/skills"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Skills />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/experience"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Experience />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/education"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Education />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/achievements"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Achievements />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Projects />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <main id="main-content" ref={mainContentRef} tabIndex="-1">
                <Suspense fallback={<LoadingFallback />}>
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                </Suspense>
              </main>
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
