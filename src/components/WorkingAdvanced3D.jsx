import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function ComplexCore() {
  const mainRef = useRef();
  const shell1Ref = useRef();
  const shell2Ref = useRef();
  const shell3Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (mainRef.current) {
      mainRef.current.rotation.y = time * 0.3;
    }

    if (shell1Ref.current) {
      shell1Ref.current.rotation.x = -time * 0.5;
      shell1Ref.current.rotation.z = Math.sin(time * 0.3) * 0.2;
    }

    if (shell2Ref.current) {
      shell2Ref.current.rotation.y = time * 0.7;
      shell2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.3;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      shell2Ref.current.scale.setScalar(scale);
    }

    if (shell3Ref.current) {
      shell3Ref.current.rotation.z = -time * 0.6;
      shell3Ref.current.rotation.y = Math.sin(time * 0.2) * 0.4;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.15;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.x = time * 1.1;
      coreRef.current.rotation.z = time * 0.9;
    }
  });

  return (
    <group ref={mainRef}>
      {}
      <mesh ref={shell1Ref}>
        <icosahedronGeometry args={[3, 2]} />
        <meshStandardMaterial
          color="#6366F1"
          emissive="#6366F1"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {}
      <mesh ref={shell2Ref}>
        <dodecahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#EC4899"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>

      {}
      <mesh ref={shell3Ref}>
        <octahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {}
      <mesh ref={coreRef}>
        <tetrahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.7}
          roughness={0.0}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

function TechOrbiters() {
  const orbitRef = useRef();
  const techs = [
    { name: "React", color: "#61DAFB", size: 0.3, distance: 5 },
    { name: "JS", color: "#F7DF1E", size: 0.25, distance: 4.2 },
    { name: "CSS", color: "#1572B6", size: 0.28, distance: 6.1 },
    { name: "HTML", color: "#E34F26", size: 0.22, distance: 3.8 },
    { name: "Node", color: "#339933", size: 0.32, distance: 7.2 },
    { name: "3D", color: "#000000", size: 0.26, distance: 5.7 },
  ];

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={orbitRef}>
      {techs.map((tech, index) => (
        <TechOrbiter key={tech.name} tech={tech} index={index} />
      ))}
    </group>
  );
}

function TechOrbiter({ tech, index }) {
  const orbiterRef = useRef();
  const miniSphereRef = useRef();

  useFrame((state) => {
    if (orbiterRef.current) {
      const time = state.clock.elapsedTime;
      const orbitSpeed = 0.2 + index * 0.03;
      const angle = time * orbitSpeed + (index / 6) * Math.PI * 2;

      orbiterRef.current.position.x = Math.cos(angle) * tech.distance;
      orbiterRef.current.position.z = Math.sin(angle) * tech.distance;
      orbiterRef.current.position.y = Math.sin(time * 0.7 + index * 0.5) * 2;

      orbiterRef.current.rotation.x = time * (0.8 + index * 0.1);
      orbiterRef.current.rotation.y = time * (0.6 + index * 0.15);
    }

    if (miniSphereRef.current) {
      const time = state.clock.elapsedTime;
      miniSphereRef.current.position.x = Math.cos(time * 3 + index) * 0.5;
      miniSphereRef.current.position.z = Math.sin(time * 3 + index) * 0.5;
      miniSphereRef.current.position.y = Math.sin(time * 2 + index) * 0.3;
    }
  });

  return (
    <group ref={orbiterRef}>
      {}
      <mesh>
        <sphereGeometry args={[tech.size, 16, 16]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {}
      <mesh ref={miniSphereRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function ComplexParticles() {
  const particlesRef = useRef();
  const particleCount = 500;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const armCount = 3;
    const armIndex = i % armCount;
    const armOffset = (armIndex / armCount) * Math.PI * 2;
    const angle = (i / particleCount) * Math.PI * 8 + armOffset;
    const radius = (i / particleCount) * 15;

    positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 3;

    const hue = (armIndex * 0.33 + (radius / 15) * 0.5) % 1;
    const color = new THREE.Color().setHSL(hue, 0.8, 0.7);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i += 3) {
        const i3 = i;
        positions[i3] += Math.sin(time * 0.5 + i * 0.01) * 0.01;
        positions[i3 + 1] += Math.cos(time * 0.7 + i * 0.02) * 0.008;
        positions[i3 + 2] += Math.sin(time * 0.3 + i * 0.015) * 0.01;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingGeometries() {
  const shapes = [
    { type: "torus", position: [6, 3, -4], color: "#06B6D4" },
    { type: "torusKnot", position: [-6, -2, 3], color: "#10B981" },
    { type: "dodecahedron", position: [4, -4, 2], color: "#F59E0B" },
    { type: "icosahedron", position: [-4, 4, -2], color: "#EF4444" },
    { type: "octahedron", position: [5, 0, 4], color: "#8B5CF6" },
    { type: "cone", position: [-3, -3, -3], color: "#F97316" },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <FloatingGeometry key={index} shape={shape} index={index} />
      ))}
    </>
  );
}

function FloatingGeometry({ shape, index }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      meshRef.current.rotation.x = Math.sin(time * (0.4 + index * 0.1)) * 0.5;
      meshRef.current.rotation.y = time * (0.2 + index * 0.05);
      meshRef.current.rotation.z = Math.cos(time * (0.3 + index * 0.08)) * 0.4;

      meshRef.current.position.x =
        shape.position[0] + Math.sin(time * 0.6 + index) * 1.2;
      meshRef.current.position.y =
        shape.position[1] + Math.cos(time * 0.4 + index) * 0.8;
      meshRef.current.position.z =
        shape.position[2] + Math.sin(time * 0.5 + index) * 1.0;
    }
  });

  const getGeometry = () => {
    switch (shape.type) {
      case "torus":
        return <torusGeometry args={[1.2, 0.4, 16, 32]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 2]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.9, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.1, 2]} />;
      case "cone":
        return <coneGeometry args={[0.8, 2, 8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {getGeometry()}
      <meshStandardMaterial
        color={shape.color}
        emissive={shape.color}
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

const WorkingAdvanced3D = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[-8, 8, 4]} intensity={0.6} color="#6366F1" />
        <spotLight position={[8, -8, -4]} intensity={0.5} color="#EC4899" />
        <pointLight position={[0, 8, 0]} intensity={0.4} color="#06B6D4" />

        <Suspense fallback={null}>
          {}
          <ComplexCore />

          {}
          <TechOrbiters />

          {}
          <ComplexParticles />

          {}
          <FloatingGeometries />
        </Suspense>

        {}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          enableDamping
          dampingFactor={0.03}
        />
      </Canvas>
    </div>
  );
};

export default WorkingAdvanced3D;
