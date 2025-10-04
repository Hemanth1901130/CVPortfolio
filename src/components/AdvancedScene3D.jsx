import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function ComplexCore() {
  const coreRef = useRef();
  const layer1Ref = useRef();
  const layer2Ref = useRef();
  const layer3Ref = useRef();
  const layer4Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.5;
    }

    if (layer1Ref.current) {
      layer1Ref.current.rotation.x = -time * 0.4;
      layer1Ref.current.rotation.y = time * 0.6;
      layer1Ref.current.rotation.z = Math.sin(time * 0.3) * 0.2;
    }

    if (layer2Ref.current) {
      layer2Ref.current.rotation.x = time * 0.3;
      layer2Ref.current.rotation.z = -time * 0.4;
      layer2Ref.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }

    if (layer3Ref.current) {
      layer3Ref.current.rotation.y = -time * 0.8;
      layer3Ref.current.rotation.x = Math.cos(time * 0.5) * 0.3;
    }

    if (layer4Ref.current) {
      const scale = 1 + Math.sin(time * 3) * 0.2;
      layer4Ref.current.scale.setScalar(scale);
      layer4Ref.current.rotation.x = time * 1.2;
      layer4Ref.current.rotation.z = time * 0.9;
    }
  });

  return (
    <group ref={coreRef}>
      {}
      <mesh ref={layer1Ref}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial
          color="#6366F1"
          emissive="#6366F1"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {}
      <mesh ref={layer2Ref}>
        <dodecahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#EC4899"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>

      {}
      <mesh ref={layer3Ref}>
        <octahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {}
      <mesh ref={layer4Ref}>
        <tetrahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.8}
          roughness={0.0}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

function TechSpheres() {
  const techRef = useRef();
  const technologies = [
    { name: "React", color: "#61DAFB", radius: 4.5 },
    { name: "JavaScript", color: "#F7DF1E", radius: 5.2 },
    { name: "CSS3", color: "#1572B6", radius: 3.8 },
    { name: "HTML5", color: "#E34F26", radius: 4.1 },
    { name: "Node.js", color: "#339933", radius: 5.8 },
    { name: "Three.js", color: "#000000", radius: 3.5 },
  ];

  useFrame((state) => {
    if (techRef.current) {
      techRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={techRef}>
      {technologies.map((tech, index) => {
        const angle = (index / technologies.length) * Math.PI * 2;

        return (
          <TechSphere key={tech.name} tech={tech} angle={angle} index={index} />
        );
      })}
    </group>
  );
}

function TechSphere({ tech, angle, index }) {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.elapsedTime;
      const orbitSpeed = 0.3 + index * 0.05;
      const currentAngle = angle + time * orbitSpeed;

      sphereRef.current.position.x = Math.cos(currentAngle) * tech.radius;
      sphereRef.current.position.z = Math.sin(currentAngle) * tech.radius;
      sphereRef.current.position.y = Math.sin(time * 0.8 + index) * 1.5;

      sphereRef.current.rotation.x = time * (0.5 + index * 0.1);
      sphereRef.current.rotation.y = time * (0.7 + index * 0.15);
    }
  });

  return (
    <Float speed={1 + index * 0.3} rotationIntensity={0.5}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function AdvancedParticles() {
  const particlesRef = useRef();
  const particleCount = 400;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    const armIndex = i % 3;
    const armOffset = (armIndex / 3) * Math.PI * 2;
    const spiralAngle = (i / particleCount) * Math.PI * 6 + armOffset;
    const radius = (i / particleCount) * 12;

    positions[i3] = Math.cos(spiralAngle) * radius + (Math.random() - 0.5) * 2;
    positions[i3 + 1] = (Math.random() - 0.5) * 8;
    positions[i3 + 2] =
      Math.sin(spiralAngle) * radius + (Math.random() - 0.5) * 2;

    velocities[i3] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

    const hue = (armIndex * 0.3 + (radius / 12) * 0.4) % 1;
    const color = new THREE.Color().setHSL(hue, 0.8, 0.7);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        positions[i3] +=
          velocities[i3] + Math.sin(time * 0.5 + i * 0.01) * 0.005;
        positions[i3 + 1] +=
          velocities[i3 + 1] + Math.cos(time * 0.7 + i * 0.02) * 0.003;
        positions[i3 + 2] +=
          velocities[i3 + 2] + Math.sin(time * 0.3 + i * 0.015) * 0.005;

        ["x", "y", "z"].forEach((axis, axisIndex) => {
          if (positions[i3 + axisIndex] > 15) positions[i3 + axisIndex] = -15;
          if (positions[i3 + axisIndex] < -15) positions[i3 + axisIndex] = 15;
        });
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      particlesRef.current.rotation.y = time * 0.05;
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShapes() {
  const shapes = [
    {
      geometry: "torus",
      args: [1, 0.4, 16, 32],
      position: [5, 2, -3],
      color: "#06B6D4",
    },
    {
      geometry: "torusKnot",
      args: [0.8, 0.3, 64, 16],
      position: [-5, -1, 2],
      color: "#10B981",
    },
    {
      geometry: "dodecahedron",
      args: [0.9, 2],
      position: [3, -3, 1],
      color: "#F59E0B",
    },
    {
      geometry: "icosahedron",
      args: [0.7, 1],
      position: [-3, 3, -1],
      color: "#EF4444",
    },
    {
      geometry: "octahedron",
      args: [0.8, 2],
      position: [4, 0, 3],
      color: "#8B5CF6",
    },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <FloatingShape key={index} shape={shape} index={index} />
      ))}
    </>
  );
}

function FloatingShape({ shape, index }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      meshRef.current.rotation.x = Math.sin(time * (0.5 + index * 0.1)) * 0.4;
      meshRef.current.rotation.y = time * (0.3 + index * 0.05);
      meshRef.current.rotation.z = Math.cos(time * (0.4 + index * 0.08)) * 0.3;

      meshRef.current.position.x =
        shape.position[0] + Math.sin(time * 0.7 + index) * 0.8;
      meshRef.current.position.y =
        shape.position[1] + Math.cos(time * 0.5 + index) * 0.6;
      meshRef.current.position.z =
        shape.position[2] + Math.sin(time * 0.6 + index) * 0.7;

      const scale = 1 + Math.sin(time * 2 + index) * 0.15;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const getGeometry = () => {
    switch (shape.geometry) {
      case "torus":
        return <torusGeometry args={shape.args} />;
      case "torusKnot":
        return <torusKnotGeometry args={shape.args} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={shape.args} />;
      case "icosahedron":
        return <icosahedronGeometry args={shape.args} />;
      case "octahedron":
        return <octahedronGeometry args={shape.args} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float
      speed={1.5 + index * 0.3}
      rotationIntensity={0.6}
      floatIntensity={0.8}
    >
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial
          color={shape.color}
          emissive={shape.color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRings() {
  const ringsRef = useRef();

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      ringsRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  const rings = [
    { radius: 3.5, color: "#61DAFB", thickness: 0.1, speed: 1 },
    { radius: 4.2, color: "#F7DF1E", thickness: 0.08, speed: -0.8 },
    { radius: 5.1, color: "#1572B6", thickness: 0.12, speed: 0.6 },
  ];

  return (
    <group ref={ringsRef}>
      {rings.map((ring, index) => (
        <RingElement key={index} ring={ring} index={index} />
      ))}
    </group>
  );
}

function RingElement({ ring, index }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * ring.speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[ring.radius, ring.thickness, 8, 32]} />
      <meshStandardMaterial
        color={ring.color}
        emissive={ring.color}
        emissiveIntensity={0.4}
        wireframe={index % 2 === 0}
        transparent
        opacity={0.7}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

const AdvancedScene3D = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {}
        <ambientLight intensity={0.2} />

        {}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          color="#FFFFFF"
        />

        {}
        <spotLight
          position={[-8, 8, 4]}
          intensity={0.8}
          color="#6366F1"
          angle={0.4}
          penumbra={0.5}
        />

        <spotLight
          position={[8, -8, -4]}
          intensity={0.6}
          color="#EC4899"
          angle={0.4}
          penumbra={0.7}
        />

        <pointLight position={[0, 6, 0]} intensity={0.5} color="#06B6D4" />

        <pointLight position={[0, -6, 0]} intensity={0.4} color="#F59E0B" />

        <Suspense fallback={null}>
          {}
          <ComplexCore />

          {}
          <TechSpheres />

          {}
          <FloatingShapes />

          {}
          <OrbitingRings />

          {}
          <AdvancedParticles />

          {}
          <Sparkles
            count={150}
            scale={[20, 20, 20]}
            size={3}
            speed={0.3}
            color="#FFFFFF"
            opacity={0.8}
          />

          <Sparkles
            count={80}
            scale={[12, 12, 12]}
            size={2}
            speed={0.8}
            color="#6366F1"
            opacity={0.6}
          />

          <Sparkles
            count={60}
            scale={[8, 8, 8]}
            size={1.5}
            speed={1.2}
            color="#EC4899"
            opacity={0.5}
          />
        </Suspense>

        {}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 8}
          enableDamping
          dampingFactor={0.03}
        />

        {}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default AdvancedScene3D;
