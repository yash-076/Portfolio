import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Ball = (props) => {
  const [texture] = useTexture([props.imageUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={texture}
          castShadow
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({icon}) =>{
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100%' }}>
      <Canvas 
        frameloop='demand'
        dpr={isMobile ? 1 : window.devicePixelRatio}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: !isMobile,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          failIfMajorPerformanceCaveat: false,
          alpha: true
        }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false}
          />
          <Ball imageUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  )
}
export default BallCanvas