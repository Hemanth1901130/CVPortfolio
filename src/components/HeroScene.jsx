import { useState, useEffect, lazy, Suspense } from 'react';
import { useThreeD } from '../context/ThreeDContext';

// Lazy load the 3D scene to prevent it from affecting page transitions
const Scene3D = lazy(() => import('./Scene3D'));

// Main component with optimized 3D scene
const HeroScene = () => {
  const [show3D, setShow3D] = useState(false);
  const { hasError, handleError } = useThreeD();
  
  // Only attempt to load 3D scene after component is mounted
  useEffect(() => {
    // Small delay to ensure page transition is complete
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-full absolute inset-0">
      {/* Only attempt to load 3D scene if conditions are right */}
      {show3D && !hasError && (
        <Suspense fallback={null}>
          <div className="absolute inset-0" style={{ zIndex: 5 }}>
            <Scene3D onError={handleError} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default HeroScene;