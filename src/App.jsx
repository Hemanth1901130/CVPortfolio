import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import LoadingFallback from './components/LoadingFallback';
import Analytics from './components/Analytics';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Experience = lazy(() => import('./pages/Experience'));
const Education = lazy(() => import('./pages/Education'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Component for the skip to content link
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
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      <Router>
        <SkipToContent />
        <Analytics />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

// Separate component for routes to use the useLocation hook
function AppRoutes() {
  const location = useLocation();
  const mainContentRef = useRef(null);
  
  // Update page title based on current route
  useEffect(() => {
    const pageTitles = {
      '/': 'Home | Pamarthi Hemanth Srinivas',
      '/about': 'About | Pamarthi Hemanth Srinivas',
      '/skills': 'Skills | Pamarthi Hemanth Srinivas',
      '/experience': 'Experience | Pamarthi Hemanth Srinivas',
      '/education': 'Education | Pamarthi Hemanth Srinivas',
      '/achievements': 'Achievements | Pamarthi Hemanth Srinivas',
      '/projects': 'Projects | Pamarthi Hemanth Srinivas',
      '/contact': 'Contact | Pamarthi Hemanth Srinivas',
      '/dashboard': 'Analytics Dashboard | Pamarthi Hemanth Srinivas',
    };
    
    document.title = pageTitles[location.pathname] || 'Page Not Found | Pamarthi Hemanth Srinivas';
  }, [location.pathname]);
  
  // Scroll to top and focus main content on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Focus the main content for accessibility
    if (mainContentRef.current) {
      // Set tabIndex to -1 to make it focusable but not in the tab order
      mainContentRef.current.setAttribute('tabindex', '-1');
      mainContentRef.current.focus();
      // Remove the tabIndex after focus to avoid leaving unnecessary tabindex in the DOM
      mainContentRef.current.removeAttribute('tabindex');
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Home />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <About />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/skills" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Skills />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/experience" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Experience />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/education" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Education />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/achievements" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Achievements />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/projects" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Projects />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Contact />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <main id="main-content" ref={mainContentRef} tabIndex="-1">
              <Suspense fallback={<LoadingFallback />}>
                <PageTransition>
                  <NotFound />
                </PageTransition>
              </Suspense>
            </main>
          </Layout>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
