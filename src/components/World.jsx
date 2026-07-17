import { Html, Float, Text, Sparkles, Grid } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import House from './House';

function InteractiveProject({ position, color, title, subtitle, description, geometryType }) {
  const [hovered, setHovered] = useState(false);
  
  // Interactive properties
  const scale = hovered ? 1.5 : 1;
  const speed = hovered ? 4 : 1;

  // Render the appropriate geometry
  const Geometry = geometryType === 'torus' ? (
    <torusGeometry args={[0.4, 0.1, 16, 32]} />
  ) : (
    <icosahedronGeometry args={[0.5, 0]} />
  );

  return (
    <group position={position}>
      {/* Pedestal */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
      </mesh>
      
      {/* Floating Geometry */}
      <Float speed={speed} rotationIntensity={speed} floatIntensity={1}>
        <mesh 
          position={[0, 2, 0]} 
          castShadow 
          scale={scale}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
          onClick={() => window.open('https://github.com/golamali', '_blank')}
        >
          {Geometry}
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.2} />
        </mesh>
      </Float>
      
      <pointLight position={[0, 2, 0]} intensity={hovered ? 2 : 0.5} color={color} distance={8} />

      {/* Info Panel */}
      <mesh castShadow position={position[0] < 0 ? [-0.8, 1, 0] : [0.8, 1, 0]} rotation={[0, position[0] < 0 ? Math.PI / 4 : -Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        <Html transform scale={0.3} position={[0, 0, 0.03]} occlude="blending" style={{ width: '300px', padding: '15px', color: '#ccc', fontFamily: 'serif', background: 'rgba(5,5,5,0.9)', border: `1px solid ${color}`, transition: 'all 0.3s' }}>
          <h3 style={{ margin: '0 0 10px 0', color: color, textShadow: hovered ? `0 0 15px ${color}` : 'none', transition: 'all 0.3s' }}>{title}</h3>
          <p style={{ fontSize: '0.8rem', color: '#888', margin: '0 0 10px 0' }}>{subtitle}</p>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>{description}</p>
          {hovered && <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#000', background: color, padding: '5px', display: 'inline-block', borderRadius: '3px' }}>Examine</div>}
        </Html>
      </mesh>
    </group>
  );
}

export default function World() {
  // Force pointer to center for FPS raycasting (crosshair)
  useFrame((state) => {
    state.pointer.set(0, 0);
  });

  return (
    <group>
      {/* ----------------- INTERNAL LIGHTING ----------------- */}
      <pointLight position={[0, 2.5, -5]} intensity={1} color="#ffeedd" castShadow shadow-bias={-0.0001} />

      {/* ----------------- THE HOUSE (SOLE ENVIRONMENT) ----------------- */}
      {/* Reverted to 1x scale. The 3D model was originally exported at perfect human scale! */}
      <House position={[0, 0, 0]} scale={1} />

      {/* ----------------- PORTFOLIO DETAILS (HIDDEN FOR NOW) ----------------- */}
      
      {/* 
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text position={[0, 2.5, -2]} fontSize={0.6} color="#00ffff" maxWidth={8} textAlign="center">
          GOLAM ALI
        </Text>
      </Float>

      <mesh position={[-3.1, 2.16, -0.47]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#111" />
        <Html transform scale={0.5} position={[0, 0, 0.03]} occlude="blending" style={{ width: '300px', padding: '15px', color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.8)', border: '1px solid #00ffff' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: '#00ffff' }}>ABOUT ME</h2>
          <p style={{ margin: 0, lineHeight: 1.4, fontSize: '0.9rem' }}>I am a passionate Software Engineer focused on high-performance graphics and interactive systems.</p>
        </Html>
      </mesh>

      <mesh position={[3.3, 1.5, -0.22]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[1.8, 1.1, 0.05]} />
        <meshStandardMaterial color="#000" />
        <Html transform scale={0.5} position={[0, 0, 0.03]} occlude="blending" style={{ width: '360px', padding: '15px', color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.8)', border: '1px solid #ff00ff' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: '#ff00ff' }}>EXPERIENCE</h2>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>Junior Software Engineer</h3>
          <p style={{ margin: 0, lineHeight: 1.4, fontSize: '0.9rem' }}>Collaborating closely with developers and artists to optimize assets and build custom shaders.</p>
        </Html>
      </mesh>

      <group position={[0.24, 1.6, 0.21]}>
        <Text position={[0, 0.6, 0]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={10} textAlign="center">
          SELECTED WORKS
        </Text>
        
        <group scale={0.4}>
          <InteractiveProject 
            position={[-1.5, 0, 0]} 
            color="#00ffff" 
            title="Shader Toy" 
            subtitle="WebGL / GLSL" 
            description="A real-time shader editor." 
            geometryType="torus" 
          />
          <InteractiveProject 
            position={[1.5, 0, 0]} 
            color="#ff00ff" 
            title="Voxel Engine" 
            subtitle="C++ / OpenGL" 
            description="A high-performance voxel renderer." 
            geometryType="icosahedron" 
          />
        </group>
      </group>
      */}

    </group>
  );
}
