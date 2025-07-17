import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function CodeModel(props) {
  const mesh = useRef();
  
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
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

function Particles({ count = 100 }) {
  const mesh = useRef();
  const positions = useRef(new Float32Array(count * 3));
  const initialAngles = useRef(new Float32Array(count));
  const radii = useRef(new Float32Array(count));
  const speeds = useRef(new Float32Array(count));
  
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      radii.current[i] = 3 + Math.random() * 3;
      
      initialAngles.current[i] = Math.random() * Math.PI * 2;
      
      speeds.current[i] = 0.001 + Math.random() * 0.002;
      
      const idx = i * 3;
      const radius = radii.current[i];
      const angle = initialAngles.current[i];
      
      const planeAngle = Math.random() * Math.PI;
      
      positions.current[idx] = radius * Math.cos(angle);
      positions.current[idx + 1] = radius * Math.sin(planeAngle);
      positions.current[idx + 2] = radius * Math.sin(angle);
    }
  }, [count]);
  
  const frameCounter = useRef(0);
  const time = useRef(0);
  
  useFrame((state) => {
    frameCounter.current += 1;
    if (frameCounter.current % 2 !== 0) return;
    
    time.current += 0.01;
    
    const positions = mesh.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const radius = radii.current[i];
      const angle = initialAngles.current[i] + time.current * speeds.current[i];
      const planeAngle = (i % 5) * Math.PI / 5;
      
      positions[idx] = radius * Math.cos(angle);
      positions[idx + 1] = radius * Math.sin(planeAngle) * 0.5;
      positions[idx + 2] = radius * Math.sin(angle);
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
        size={0.08}
        color="#cd0018"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

const Scene3D = () => {
  const [contextLost, setContextLost] = useState(false);
  
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
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
        dpr={[0.8, 1.2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false
        }}
        frameloop="demand"
        performance={{ min: 0.3 }}
        onCreated={({ gl }) => {
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
            
            gl.setClearColor(0x000000, 0);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
          }
        }}
      >
        <ambientLight intensity={1.0} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <CodeModel position={[0, 0, 0]} />
        <Particles count={100} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;