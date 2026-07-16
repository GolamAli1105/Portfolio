import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, Loader } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import World from './components/World';
import CharacterController from './components/CharacterController';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD', 'd', 'D'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA', 'a', 'A'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD', 'd', 'D'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait a bit before rendering physics to avoid heavy stutter on initial load
    const timeout = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#030014' }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 45 }}>
          <color attach="background" args={['#030014']} />
          <fog attach="fog" args={['#030014', 10, 80]} />
          
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#e0e0ff" castShadow />
          
          <Suspense fallback={null}>
            {ready && (
              <Physics gravity={[0, -30, 0]}>
                <World />
                <CharacterController />
              </Physics>
            )}
            
            {/* AAA Post Processing */}
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.4} mipmapBlur intensity={0.8} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <Loader />
      
      {/* UI Overlays */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '50%', left: '50%', 
          width: '4px', height: '4px', 
          background: '#00ffff', 
          transform: 'translate(-50%, -50%)', 
          borderRadius: '50%', 
          pointerEvents: 'none', 
          zIndex: 1000 
        }} 
      />
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '20px', left: '20px', 
          color: '#fff', 
          fontFamily: 'monospace', 
          opacity: 0.5, 
          pointerEvents: 'none',
          zIndex: 1000
        }}
      >
        Click to focus. WASD to move. Mouse to look. Space to jump.
      </div>
    </div>
  );
}
