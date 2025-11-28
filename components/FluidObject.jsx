import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Torus, Sphere } from '@react-three/drei';

const OrbitalSystem = () => {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    // Rotate rings on different axes
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.2;
      ring1.current.rotation.y += delta * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x += delta * 0.15;
      ring2.current.rotation.y -= delta * 0.2;
    }
    if (ring3.current) {
      ring3.current.rotation.x -= delta * 0.1;
      ring3.current.rotation.z += delta * 0.15;
    }
    // Pulse the core
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  const materialProps = {
    color: "#ffffff",
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0,
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group scale={1.2}>
        {/* Core */}
        <Sphere ref={core} args={[0.8, 64, 64]}>
          <meshPhysicalMaterial 
            {...materialProps} 
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </Sphere>

        {/* Orbiting Rings */}
        <group rotation={[Math.PI / 3, 0, 0]}>
          <Torus ref={ring1} args={[1.8, 0.05, 16, 100]}>
            <meshPhysicalMaterial {...materialProps} />
          </Torus>
        </group>

        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Torus ref={ring2} args={[2.4, 0.05, 16, 100]}>
            <meshPhysicalMaterial {...materialProps} />
          </Torus>
        </group>

        <group rotation={[0, Math.PI / 4, 0]}>
          <Torus ref={ring3} args={[3.0, 0.05, 16, 100]}>
            <meshPhysicalMaterial {...materialProps} />
          </Torus>
        </group>
      </group>
    </Float>
  );
};

const FluidObject = () => {
  return (
    <div className="relative w-[40vw] h-[40vw] max-w-[600px] max-h-[600px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <OrbitalSystem />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default FluidObject;
