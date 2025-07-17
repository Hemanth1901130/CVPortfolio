import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model component
function CodeModel(props) {
  const mesh = useRef();
  
  // Rotate the model
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3; // Faster rotation
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={mesh} {...props}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#cd0018" metalness={0.8} roughness={0.2} />
        
        {/* Front face (+Z) */}
        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.6}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            React
          </Text>
        </mesh>

        {/* Back face (-Z) */}
        <mesh position={[0, 0, -1.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.6}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            Node
          </Text>
        </mesh>

        {/* Right face (+X) */}
        <mesh position={[1.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
          {/* Adjusted text position and rotation for better visibility */}
          <group rotation={[0, Math.PI, 0]}>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.8}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font={undefined}
              fontWeight="bold"
              outlineWidth={0.03}
              outlineColor="#ffffff"
            >
              TS
            </Text>
          </group>
        </mesh>

        {/* Left face (-X) */}
        <mesh position={[-1.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
          {/* Adjusted text position and rotation for better visibility */}
          <group rotation={[0, Math.PI, 0]}>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.8}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font={undefined}
              fontWeight="bold"
              outlineWidth={0.03}
              outlineColor="#ffffff"
            >
              JS
            </Text>
          </group>
        </mesh>

        {/* Top face (+Y) */}
        <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.6}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            HTML
          </Text>
        </mesh>

        {/* Bottom face (-Y) */}
        <mesh position={[0, -1.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.6}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            CSS
          </Text>
        </mesh>
      </mesh>
    </Float>
  );
}

// Animated particles
function Particles({ count = 100 }) {
  const mesh = useRef();
  const positions = useRef(new Float32Array(count * 3));
  
  useEffect(() => {
    for (let i = 0; i < count * 3; i += 3) {
      positions.current[i] = (Math.random() - 0.5) * 10;
      positions.current[i + 1] = (Math.random() - 0.5) * 10;
      positions.current[i + 2] = (Math.random() - 0.5) * 10;
    }
  }, [count]);
  
  // Optimize animation by using a counter to update less frequently
  const frameCounter = useRef(0);
  
  useFrame(() => {
    // Only update every 2 frames for better performance
    frameCounter.current += 1;
    if (frameCounter.current % 2 !== 0) return;
    
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 9) { // Update fewer particles
      positions[i + 1] += 0.01 * Math.sin(positions[i] + positions[i + 2]);
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08} // Larger size to compensate for fewer particles
        color="#cd0018"
        sizeAttenuation
        transparent
        opacity={0.6} // Lower opacity for better performance
      />
    </points>
  );
}

// Main scene component
const Scene3D = () => {
  const [contextLost, setContextLost] = useState(false);
  
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault(); // This allows the context to be restored
      setContextLost(true);
      console.warn('WebGL context lost. Attempting to restore...');
    };
    
    const handleContextRestored = () => {
      setContextLost(false);
      console.log('WebGL context restored successfully');
    };
    
    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);
  
  if (contextLost) {
    return (
      <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 bg-opacity-20 rounded-xl">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">3D Rendering Unavailable</h3>
          <p className="text-gray-600 dark:text-gray-300">Your browser encountered an issue with 3D rendering.</p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full absolute inset-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[0.8, 1.2]} // Even lower DPR for better performance
        gl={{
          antialias: false, // Disable antialiasing for better performance
          alpha: true,
          powerPreference: 'low-power', // Prefer low power mode
          failIfMajorPerformanceCaveat: false, // Don't fail on low-end devices
          preserveDrawingBuffer: false // Better performance
        }}
        frameloop="demand" // Only render when needed
        performance={{ min: 0.3 }} // Lower performance threshold
        onCreated={({ gl }) => {
          // Add error handling for WebGL context
          if (gl && gl.canvas) {
            gl.canvas.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              setContextLost(true);
              console.warn('WebGL context lost in Canvas component');
            });
            
            gl.canvas.addEventListener('webglcontextrestored', () => {
              setContextLost(false);
              console.log('WebGL context restored in Canvas component');
            });
            
            // Set renderer parameters for better stability
            gl.setClearColor(0x000000, 0); // Transparent background
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); // Limit pixel ratio
          }
        }}
      >
        {/* Simplified lighting for better performance */}
        <ambientLight intensity={1.0} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <CodeModel position={[0, 0, 0]} />
        {/* Reduce particle count for better performance */}
        <Particles count={100} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0} // Faster auto-rotation
          minPolarAngle={Math.PI / 3} // Limit rotation to prevent seeing from below
          maxPolarAngle={Math.PI / 1.5} // Limit rotation to prevent seeing from above
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;