import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CentralCore() {
  const outerRef = useRef();
  const middleRef = useRef();
  const innerRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.2;
      outerRef.current.rotation.y = time * 0.3;
      outerRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    }

    if (middleRef.current) {
      middleRef.current.rotation.x = -time * 0.4;
      middleRef.current.rotation.y = time * 0.5;
      const scale = 1 + Math.sin(time * 1.5) * 0.1;
      middleRef.current.scale.setScalar(scale);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.6;
      innerRef.current.rotation.z = -time * 0.4;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2.5) * 0.15;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.x = time * 1.2;
      coreRef.current.rotation.y = time * 0.9;
    }
  });

  return (
    <group>
      {}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          color="#6366F1"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {}
      <mesh ref={middleRef}>
        <dodecahedronGeometry args={[1.8]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#EC4899"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>

      {}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.2]} />
        <meshBasicMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

function TechSpheres() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const techs = [
    { name: "React", color: "#61DAFB", distance: 4 },
    { name: "JS", color: "#F7DF1E", distance: 5 },
    { name: "CSS", color: "#1572B6", distance: 3.5 },
    { name: "HTML", color: "#E34F26", distance: 4.5 },
  ];

  return (
    <group ref={groupRef}>
      {techs.map((tech, index) => (
        <TechSphere key={index} tech={tech} index={index} />
      ))}
    </group>
  );
}

function TechSphere({ tech, index }) {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.elapsedTime;
      const angle = time * (0.3 + index * 0.1) + (index / 4) * Math.PI * 2;

      sphereRef.current.position.x = Math.cos(angle) * tech.distance;
      sphereRef.current.position.z = Math.sin(angle) * tech.distance;
      sphereRef.current.position.y = Math.sin(time * 0.8 + index) * 1;

      sphereRef.current.rotation.x = time * (0.5 + index * 0.2);
      sphereRef.current.rotation.y = time * (0.7 + index * 0.1);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial
        color={tech.color}
        emissive={tech.color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
}

function FloatingShapes() {
  const shapes = [
    { type: "torus", position: [5, 2, -3], color: "#06B6D4" },
    { type: "box", position: [-5, -1, 3], color: "#10B981" },
    { type: "cone", position: [3, -2, 1], color: "#F59E0B" },
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

      shapeRef.current.rotation.x = Math.sin(time * (0.4 + index * 0.1)) * 0.3;
      shapeRef.current.rotation.y = time * (0.2 + index * 0.05);
      shapeRef.current.rotation.z = Math.cos(time * (0.3 + index * 0.08)) * 0.2;

      shapeRef.current.position.x =
        shape.position[0] + Math.sin(time * 0.5 + index) * 0.8;
      shapeRef.current.position.y =
        shape.position[1] + Math.cos(time * 0.3 + index) * 0.6;
      shapeRef.current.position.z =
        shape.position[2] + Math.sin(time * 0.4 + index) * 0.5;
    }
  });

  const getGeometry = () => {
    switch (shape.type) {
      case "torus":
        return <torusGeometry args={[0.8, 0.3, 16, 32]} />;
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "cone":
        return <coneGeometry args={[0.6, 1.5, 8]} />;
      default:
        return <sphereGeometry args={[0.8]} />;
    }
  };

  return (
    <mesh ref={shapeRef}>
      {getGeometry()}
      <meshStandardMaterial
        color={shape.color}
        emissive={shape.color}
        emissiveIntensity={0.2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

const Working3D = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
      >
        {}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[-10, -10, -5]} intensity={0.5} color="#6366F1" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#EC4899" />

        {}
        <CentralCore />
        <TechSpheres />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default Working3D;
