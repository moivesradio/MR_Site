'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState, Suspense } from 'react';

function ScrollCameraControl({ enableOrbit, setEnableOrbit }) {
  const { camera } = useThree();
  const targetZ = useRef(camera.position.z);

  useEffect(() => {
    const onScroll = () => {
      if (enableOrbit) return;

      const scrollY = window.scrollY;
      const normalizedScroll = Math.min(scrollY / 1000, 4);
      targetZ.current = 4 + normalizedScroll;

      if (normalizedScroll >= 4) {
        setEnableOrbit(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [enableOrbit]);

  useFrame(() => {
    if (!enableOrbit) {
      camera.position.set(0, 0, targetZ.current);
    }
  });

  return null;
}

function RotatingGLB({ enableOrbit }) {
  const { scene } = useGLTF('/models/moviesradio.glb');
  scene.translateX(0.02);
  const modelRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (!enableOrbit && modelRef.current) {
        const scrollY = window.scrollY;
        modelRef.current.rotation.y = scrollY * 0.0022;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [enableOrbit]);

  return <primitive ref={modelRef} object={scene} />;
}

export default function GLBScrollRotateViewer() {
  const [enableOrbit, setEnableOrbit] = useState(false);
  const [fov, setFov] = useState(20); // default for desktop

  useEffect(() => {
    const onScrollBack = () => {
      if (window.scrollY <= 0) {
        setEnableOrbit(false);
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      // You can fine-tune these values based on your needs
      if (width <= 768 || aspectRatio < 0.65) {
        setFov(60); // Wider view for mobile or tall screens
      } else {
        setFov(20); // Tighter view for desktop
      }
    };

    window.addEventListener('scroll', onScrollBack);
    window.addEventListener('resize', handleResize);

    handleResize(); // call once on mount

    return () => {
      window.removeEventListener('scroll', onScrollBack);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 0], fov }} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, backgroundColor: 'rgb(0, 6, 3)' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Environment preset="sunset" background={false} />
        <RotatingGLB enableOrbit={enableOrbit} />
        <ScrollCameraControl enableOrbit={enableOrbit} setEnableOrbit={setEnableOrbit} />
        {enableOrbit && (
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
        )}
      </Suspense>
    </Canvas>
  );
}
