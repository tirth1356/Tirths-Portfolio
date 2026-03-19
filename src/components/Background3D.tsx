import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars(props: any) {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 10;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);
  const meshRef3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
    
    if (meshRef2.current) {
      meshRef2.current.rotation.x = t * 0.15;
      meshRef2.current.rotation.z = t * 0.2;
      meshRef2.current.position.y = Math.sin(t * 0.3 + 1) * 0.15;
    }

    if (meshRef3.current) {
      meshRef3.current.rotation.y = t * 0.25;
      meshRef3.current.rotation.z = t * 0.1;
      meshRef3.current.position.y = Math.sin(t * 0.4 + 2) * 0.18;
    }
  });

  return (
    <>
      {/* First Shape - Icosahedron */}
      <mesh ref={meshRef} position={[-2, 1, -3]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.6}
        />
      </mesh>

      {/* Second Shape - Octahedron */}
      <mesh ref={meshRef2} position={[2.5, -0.5, -2]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          wireframe 
          transparent 
          opacity={0.5}
        />
      </mesh>

      {/* Third Shape - Torus */}
      <mesh ref={meshRef3} position={[1.5, 1.5, -4]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial 
          color="#f43f5e" 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>
    </>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial 
        color="#6366f1" 
        wireframe 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={['#0a0a0a', 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars />
        <FloatingShapes />
        <GridFloor />
      </Canvas>
    </div>
  );
}
