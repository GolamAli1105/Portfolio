import { Html, Float, Text, MeshReflectorMaterial } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function World() {
  return (
    <group>
      {/* ----------------- MUSEUM STRUCTURE ----------------- */}
      <RigidBody type="fixed">
        {/* Continuous Floor (Z = 30 to Z = -100, length = 130, center = -35) */}
        <mesh receiveShadow position={[0, -0.5, -35]}>
          <boxGeometry args={[10, 1, 130]} />
          <MeshReflectorMaterial blur={[300, 100]} resolution={1024} mixBlur={1} mixStrength={80} roughness={0.1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4} color="#02020a" metalness={0.8} />
        </mesh>
        
        {/* Continuous Walls */}
        <mesh receiveShadow position={[-5.5, 4, -35]}><boxGeometry args={[1, 10, 130]} /><meshStandardMaterial color="#0a0a1a" /></mesh>
        <mesh receiveShadow position={[5.5, 4, -35]}><boxGeometry args={[1, 10, 130]} /><meshStandardMaterial color="#0a0a1a" /></mesh>
        
        {/* Neon Floor Trims */}
        <mesh position={[-4.9, 0, -35]}><boxGeometry args={[0.2, 0.2, 130]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} /></mesh>
        <mesh position={[4.9, 0, -35]}><boxGeometry args={[0.2, 0.2, 130]} /><meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} /></mesh>
        
        {/* Doorway 1 (Z = 0) */}
        <mesh receiveShadow position={[-3.5, 4, 0]}><boxGeometry args={[3, 10, 1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh receiveShadow position={[3.5, 4, 0]}><boxGeometry args={[3, 10, 1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh receiveShadow position={[0, 9.5, 0]}><boxGeometry args={[4, 1, 1]} /><meshStandardMaterial color="#111" /></mesh>

        {/* Doorway 2 (Z = -30) */}
        <mesh receiveShadow position={[-3.5, 4, -30]}><boxGeometry args={[3, 10, 1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh receiveShadow position={[3.5, 4, -30]}><boxGeometry args={[3, 10, 1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh receiveShadow position={[0, 9.5, -30]}><boxGeometry args={[4, 1, 1]} /><meshStandardMaterial color="#111" /></mesh>

        {/* Doorway 3 (Z = -60) */}
        <mesh receiveShadow position={[-3.5, 4, -60]}><boxGeometry args={[3, 10, 1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh receiveShadow position={[3.5, 4, -60]}><boxGeometry args={[3, 10, 1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh receiveShadow position={[0, 9.5, -60]}><boxGeometry args={[4, 1, 1]} /><meshStandardMaterial color="#111" /></mesh>
        
        {/* Back Wall (Z = -100) */}
        <mesh receiveShadow position={[0, 4, -100.5]}><boxGeometry args={[10, 10, 1]} /><meshStandardMaterial color="#0a0a1a" /></mesh>
      </RigidBody>

      {/* ----------------- INTRO ROOM (Z: 20 to 0) ----------------- */}
      <group position={[0, 4, 10]}>
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
          <Text position={[0, 1, 0]} fontSize={1.5} color="#ffffff">
            GOLAM ALI
          </Text>
          <Text position={[0, 0, 0]} fontSize={0.6} color="#00ffff">
            Use WASD. Walk Forward.
          </Text>
        </Float>
      </group>

      {/* ----------------- ABOUT ROOM (Z: 0 to -30) ----------------- */}
      {/* Content mounted on Left Wall */}
      <mesh castShadow position={[-4.9, 3, -15]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial color="#111" />
        <Html transform position={[0, 0, 0.11]} occlude style={{ width: '600px', padding: '30px', color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.8)', border: '1px solid #00ffff' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0', color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>ABOUT ME</h2>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1.2rem' }}>I am a passionate Software Engineer focused on high-performance graphics and interactive systems. With hands-on experience in a fast-paced startup, I am rapidly leveling up my skills in C++, Unreal Engine, and shader development.</p>
        </Html>
      </mesh>

      {/* ----------------- EXPERIENCE ROOM (Z: -30 to -60) ----------------- */}
      {/* Content mounted on Right Wall */}
      <mesh castShadow position={[4.9, 3, -45]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial color="#111" />
        <Html transform position={[0, 0, 0.11]} occlude style={{ width: '600px', padding: '30px', color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.8)', border: '1px solid #ff00ff' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0', color: '#ff00ff', textShadow: '0 0 10px #ff00ff' }}>EXPERIENCE</h2>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '1.5rem' }}>Junior Software Engineer</h3>
          <p style={{ opacity: 0.7, margin: '0 0 20px 0' }}>INNOVATIVE STARTUP (2023 - PRESENT)</p>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1.2rem' }}>Collaborating closely with developers and artists to optimize assets and build custom shaders. Rapidly prototyping visual effects.</p>
        </Html>
      </mesh>

      {/* ----------------- PROJECTS ROOM (Z: -60 to -100) ----------------- */}
      <Text position={[0, 6, -75]} fontSize={2} color="#ffffff" anchorX="center" anchorY="middle">
        SELECTED WORKS
      </Text>
      
      {/* Project 1 on Left Wall */}
      <mesh castShadow position={[-4.9, 2.5, -70]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 5, 0.2]} />
        <meshStandardMaterial color="#111" />
        <Html transform position={[0, 0, 0.11]} occlude style={{ width: '400px', padding: '20px', color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.8)', border: '1px solid #00ffff' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#00ffff' }}>APEX ENGINE</h3>
          <p style={{ fontSize: '0.9rem', color: '#aaaaaa', margin: '0 0 15px 0' }}>C++ / VULKAN</p>
          <p style={{ fontSize: '1rem', margin: 0 }}>A custom rendering engine built from scratch.</p>
        </Html>
      </mesh>

      {/* Project 2 on Right Wall */}
      <mesh castShadow position={[4.9, 2.5, -80]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[6, 5, 0.2]} />
        <meshStandardMaterial color="#111" />
        <Html transform position={[0, 0, 0.11]} occlude style={{ width: '400px', padding: '20px', color: '#fff', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.8)', border: '1px solid #ff00ff' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ff00ff' }}>CYBER CORE</h3>
          <p style={{ fontSize: '0.9rem', color: '#aaaaaa', margin: '0 0 15px 0' }}>UNREAL ENGINE 5</p>
          <p style={{ fontSize: '1rem', margin: 0 }}>A cyberpunk stealth-action prototype.</p>
        </Html>
      </mesh>
    </group>
  );
}
