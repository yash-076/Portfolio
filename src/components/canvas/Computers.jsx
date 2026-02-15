import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader.jsx'

const Computers = ({ isMobile }) => {
  const computer  = useGLTF('/desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={isMobile ? 0.4 : 0.5} groundColor='#444' />
      <ambientLight intensity={isMobile ? 0.3 : 0.5} />
      <directionalLight
        castShadow={!isMobile}
        intensity={isMobile ? 0.7 : 1}
        position={[5, 10, 5]}
        shadow-mapSize-width={isMobile ? 512 : 1024}
        shadow-mapSize-height={isMobile ? 512 : 1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />
      <pointLight intensity={isMobile ? 0.5 : 1} />
      <primitive 
        object={computer.scene}
        scale={ isMobile ? 0.7 : 0.75 }
        position={isMobile ? [ 0, -3, 2.2 ] : [0, -3.25, -1.5]}
        rotation={[-0.01, 0.2, -0.1]}
      />
    </mesh>
  )
}


const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!webgl) {
      setWebGLSupported(false);
      return;
    }

    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    }
  }, [])

  if (!webGLSupported) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-black'>
        <p className='text-white text-center'>WebGL is not supported on your device. Please use a modern browser.</p>
      </div>
    );
  }

  return (
    <div className='absolute inset-0 w-full h-full'>
      <Canvas 
        frameloop='demand'
        shadows={!isMobile}
        dpr={isMobile ? 1 : window.devicePixelRatio}
        camera={{ position: isMobile ? [20, 3, 8] : [20, 3, 5], fov: isMobile ? 30 : 25 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: !isMobile,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        onError={(error) => console.error('Canvas error:', error)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  )
}

export default ComputersCanvas;