import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShapeCloud = ({ geometry, count = 500, seed = 0 }) => {
  const mesh = useRef();
  
  // Extended vibrant palette + random generation fallback
  const palette = [
    '#4285F4', '#DB4437', '#F4B400', '#0F9D58', // Google
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', // Pastels
    '#FFEEAD', '#FF69B4', '#00FFFF', '#FF00FF', // Neon
    '#1A1A1D', '#6F2232', '#950740', '#C3073F'  // Dark/Red
  ];
  
  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    const tempColor = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a wide area
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Random color: either from palette or fully random
      if (Math.random() > 0.5) {
        tempColor.set(palette[Math.floor(Math.random() * palette.length)]);
      } else {
        tempColor.setHSL(Math.random(), 0.8, 0.5); // Random vibrant color
      }
      
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;

      // Random sizes
      scales[i] = Math.random() * 0.5; 
    }
    return [positions, colors, scales];
  }, [count, seed]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();

    // Mouse tracking logic
    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.5;
    
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -y * 0.2, 0.1);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, x * 0.2, 0.1);

    // Random floating movement
    for (let i = 0; i < count; i++) {
      const mx = positions[i * 3];
      const my = positions[i * 3 + 1];
      const mz = positions[i * 3 + 2];
      
      // Offset time by seed to make clouds move differently
      const t = time * 0.3; 
      const px = mx + Math.sin(t + i * 0.1 + seed) * 0.5; 
      const py = my + Math.cos(t * 0.8 + i * 0.2 + seed) * 0.5;
      const pz = mz + Math.sin(t * 0.5 + i * 0.3 + seed) * 0.5;

      dummy.position.set(px, py, pz);
      dummy.scale.setScalar(scales[i] * 0.15);
      dummy.rotation.set(t * 0.2 + i, t * 0.1 + i, 0); // Rotate shapes themselves too
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  // Initialize instances
  useEffect(() => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        dummy.scale.setScalar(scales[i] * 0.15);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
        mesh.current.setColorAt(i, new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]));
      }
      mesh.current.instanceMatrix.needsUpdate = true;
      mesh.current.instanceColor.needsUpdate = true;
    }
  }, [positions, colors, scales, dummy]);

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {geometry}
      <meshStandardMaterial roughness={0.1} metalness={0.1} vertexColors />
    </instancedMesh>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={5} />
        
        {/* Render multiple clouds with different shapes */}
        <ShapeCloud count={700} seed={0} geometry={<sphereGeometry args={[0.15, 32, 32]} />} />
        <ShapeCloud count={700} seed={1} geometry={<boxGeometry args={[0.2, 0.2, 0.2]} />} />
        <ShapeCloud count={600} seed={2} geometry={<coneGeometry args={[0.15, 0.3, 32]} />} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
