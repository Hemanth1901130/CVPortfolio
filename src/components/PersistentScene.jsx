import { useEffect, useState, useRef } from 'react';
import { lazy, Suspense } from 'react';
import { useThreeD } from '../context/ThreeDContext';

// Lazy load the 3D scene
const Scene3D = lazy(() => import('./Scene3D'));

// This component will be mounted once and persist throughout the application
const PersistentScene = () => {
  const { isVisible, hasError, resetError } = useThreeD();
  const [mounted, setMounted] = useState(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  
  // Only mount the scene once after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1000); // Even longer delay to ensure app is fully loaded
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle error recovery
  useEffect(() => {
    if (hasError && retryCountRef.current < maxRetries) {
      console.log(`Attempting to recover 3D scene (attempt ${retryCountRef.current + 1}/${maxRetries})`);
      
      // Wait a bit before trying to recover
      const recoveryTimer = setTimeout(() => {
        retryCountRef.current += 1;
        resetError();
      }, 2000);
      
      return () => clearTimeout(recoveryTimer);
    }
  }, [hasError, resetError]);
  
  if (!mounted) return null;
  
  // Don't render anything if we've exceeded max retries
  if (hasError && retryCountRef.current >= maxRetries) {
    console.warn('Max retries exceeded for 3D scene, disabling');
    return null;
  }
  
  if (!mounted) return null;
  
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        willChange: 'opacity, visibility' // Optimize for animations
      }}
    >
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </div>
  );
};

export default PersistentScene;