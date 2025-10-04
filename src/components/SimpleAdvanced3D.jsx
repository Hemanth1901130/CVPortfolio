import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ComplexGeometry() {
  const group1Ref = useRef();
  const group2Ref = useRef();
  const group3Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (group1Ref.current) {
      group1Ref.current.rotation.x = time * 0.2;
      group1Ref.current.rotation.y = time * 0.3;
      group1Ref.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    }

    if (group2Ref.current) {
      group2Ref.current.rotation.x = -time * 0.4;
      group2Ref.current.rotation.y = time * 0.5;
      group2Ref.current.rotation.z = Math.cos(time * 0.2) * 0.2;
    }

    if (group3Ref.current) {
      group3Ref.current.rotation.x = time * 0.6;
      group3Ref.current.rotation.y = -time * 0.4;
      group3Ref.current.rotation.z = Math.sin(time * 0.3) * 0.3;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.2;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.x = time * 1.1;
      coreRef.current.rotation.y = time * 0.8;
      coreRef.current.rotation.z = time * 0.9;
    }
  });

  return (
    <group>
      {}
      <group ref={group1Ref}>
        <mesh>
          <icosahedronGeometry args={[3, 1]} />
          <meshStandardMaterial
            color="#6366F1"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {}
      <group ref={group2Ref}>
        <mesh>
          <dodecahedronGeometry args={[2.2]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {}
      <group ref={group3Ref}>
        <mesh>
          <octahedronGeometry args={[1.5]} />
          <meshStandardMaterial
            color="#06B6D4"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>

      {}
      <mesh ref={coreRef}>
        <tetrahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

function OrbitingSpheres() {
  const orbitRef = useRef();
  const spheres = [
    { color: "#61DAFB", radius: 4, size: 0.3, speed: 1 },
    { color: "#F7DF1E", radius: 5, size: 0.25, speed: -0.8 },
    { color: "#1572B6", radius: 3.5, size: 0.35, speed: 1.2 },
    { color: "#E34F26", radius: 6, size: 0.2, speed: -0.6 },
    { color: "#339933", radius: 4.5, size: 0.28, speed: 0.9 },
  ];

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={orbitRef}>
      {spheres.map((sphere, index) => (
        <OrbitingSphere key={index} sphere={sphere} index={index} />
      ))}
    </group>
  );
}

function OrbitingSphere({ sphere, index }) {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.elapsedTime;
      const angle = time * sphere.speed + (index / 5) * Math.PI * 2;

      sphereRef.current.position.x = Math.cos(angle) * sphere.radius;
      sphereRef.current.position.z = Math.sin(angle) * sphere.radius;
      sphereRef.current.position.y = Math.sin(time * 0.8 + index) * 1.5;

      sphereRef.current.rotation.x = time * (1 + index * 0.2);
      sphereRef.current.rotation.y = time * (0.8 + index * 0.1);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[sphere.size, 16, 16]} />
      <meshStandardMaterial
        color={sphere.color}
        emissive={sphere.color}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function FloatingShapes() {
  const shapes = [
    { type: "torus", position: [6, 2, -3], color: "#06B6D4" },
    { type: "box", position: [-6, -1, 3], color: "#10B981" },
    { type: "cone", position: [4, -3, 2], color: "#F59E0B" },
    { type: "cylinder", position: [-4, 3, -2], color: "#EF4444" },
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
  const shapeRef = useRef();

  useFrame((state) => {
    if (shapeRef.current) {
      const time = state.clock.elapsedTime;

      shapeRef.current.rotation.x = Math.sin(time * (0.5 + index * 0.1)) * 0.4;
      shapeRef.current.rotation.y = time * (0.3 + index * 0.05);
      shapeRef.current.rotation.z = Math.cos(time * (0.4 + index * 0.08)) * 0.3;

      const baseX = shape.position[0];
      const baseY = shape.position[1];
      const baseZ = shape.position[2];

      shapeRef.current.position.x = baseX + Math.sin(time * 0.6 + index) * 1;
      shapeRef.current.position.y = baseY + Math.cos(time * 0.4 + index) * 0.8;
      shapeRef.current.position.z = baseZ + Math.sin(time * 0.5 + index) * 0.6;
    }
  });

  const getGeometry = () => {
    switch (shape.type) {
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "box":
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case "cone":
        return <coneGeometry args={[0.8, 2, 8]} />;
      case "cylinder":
        return <cylinderGeometry args={[0.6, 0.6, 2, 8]} />;
      default:
        return <sphereGeometry args={[1]} />;
    }
  };

  return (
    <mesh ref={shapeRef}>
      {getGeometry()}
      <meshStandardMaterial
        color={shape.color}
        emissive={shape.color}
        emissiveIntensity={0.2}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

const SimpleAdvanced3D = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: "transparent" }}
      >
        {}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[-10, -10, -5]} intensity={0.5} color="#6366F1" />
        <pointLight position={[0, 8, 0]} intensity={0.3} color="#EC4899" />

        {}
        <ComplexGeometry />

        {}
        <OrbitingSpheres />

        {}
        <FloatingShapes />

        {}
        <mesh>
          <ringGeometry args={[0.1, 0.2, 32]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default SimpleAdvanced3D;
