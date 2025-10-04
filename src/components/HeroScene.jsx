import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useThreeD } from "../context/ThreeDContext";

const Working3D = lazy(() =>
  import("./Working3D").catch((error) => {
    console.warn("Failed to load Working3D:", error);

    return {
      default: () => (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl backdrop-blur-sm">
          <div className="text-center p-6">
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ⚛️
            </motion.div>
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Interactive 3D
            </motion.h3>
            <p className="text-gray-300">Showcasing technical expertise</p>
          </div>
        </div>
      ),
    };
  })
);

const SceneLoading = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl backdrop-blur-sm">
    <div className="text-center p-6">
      <motion.div
        className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-gray-300">Loading 3D Scene...</p>
    </div>
  </div>
);

const HeroScene = () => {
  const [show3D, setShow3D] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const { hasError, handleError, resetError } = useThreeD();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      setHasWebGL(false);
      console.warn("WebGL not supported");
    }
  }, []);

  useEffect(() => {
    if (!hasWebGL) return;

    const timer = setTimeout(() => {
      setShow3D(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasWebGL]);

  const FallbackScene = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl backdrop-blur-sm">
      <div className="text-center p-6">
        <motion.div
          className="text-6xl mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotateY: [0, 15, -15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🚀
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Interactive 3D</h3>
        <p className="text-gray-300">Showcasing my technical skills</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full absolute inset-0">
      {}
      {!hasWebGL ? (
        <FallbackScene />
      ) : (
        <>
          {}
          {show3D && !hasError ? (
            <Suspense fallback={<SceneLoading />}>
              <div className="absolute inset-0" style={{ zIndex: 5 }}>
                <Working3D onError={handleError} />
              </div>
            </Suspense>
          ) : hasError ? (
            <div className="w-full h-full flex items-center justify-center">
              <FallbackScene />
              <button
                onClick={resetError}
                className="absolute bottom-4 right-4 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Retry 3D
              </button>
            </div>
          ) : (
            <SceneLoading />
          )}
        </>
      )}
    </div>
  );
};

export default HeroScene;
