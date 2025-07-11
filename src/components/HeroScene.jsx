import { useRef, useEffect } from 'react';
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
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
        
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
        color="#0ea5e9"
        sizeAttenuation
        transparent
        opacity={0.6} // Lower opacity for better performance
      />
    </points>
  );
}

// Main scene component
const HeroScene = () => {
  return (
    <div className="w-full h-full absolute inset-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Lower DPR for better performance
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }} // Improve performance
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

export default HeroScene;