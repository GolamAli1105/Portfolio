import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, Loader, Sky, Environment } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import World from './components/World';
import CharacterController from './components/CharacterController';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD', 'd', 'D'] },
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
          <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
          <Environment preset="city" />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={20} shadow-camera-bottom={-20} />
          
          <Suspense fallback={null}>
            {ready && (
              <Physics gravity={[0, -30, 0]}>
                <World />
                <CharacterController />
              </Physics>
            )}
            
            {/* AAA Post Processing (Softened) */}
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.4} />
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
        Click to focus. WASD to move. Mouse to look. Press ESC to release cursor.
      </div>
    </div>
  );
}
