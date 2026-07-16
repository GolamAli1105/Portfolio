import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const SPEED = 8;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function CharacterController() {
  const ref = useRef();
  const [, get] = useKeyboardControls();
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;

    const { forward, backward, left, right } = get();
    
    // Get current velocity and position from RigidBody
    const velocity = ref.current.linvel();
    const position = ref.current.translation();

    // Update camera position to follow the body
    camera.position.set(position.x, position.y + 0.8, position.z);

    // Calculate movement directions relative to camera (ignore pitch/vertical)
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    cameraDir.y = 0;
    cameraDir.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(camera.up, cameraDir).normalize();

    direction.set(0, 0, 0);
    if (forward) direction.add(cameraDir);
    if (backward) direction.sub(cameraDir);
    if (left) direction.add(cameraRight);
    if (right) direction.sub(cameraRight);
    
    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(SPEED);
    }

    // Apply movement velocity and WAKE UP the rigid body if it's sleeping
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);
  });

  return (
    <>
      {/* Native FPS Mouse Aiming (Reduced Sensitivity) */}
      <PointerLockControls pointerSpeed={0.3} />
      
      {/* Player Physics Body */}
      <RigidBody 
        ref={ref} 
        colliders="capsule" 
        mass={1} 
        type="dynamic" 
        position={[0, 2, 20]} // Spawn at the start of the museum
        enabledRotations={[false, false, false]} // Prevent tipping over
        friction={0} // Smooth sliding against walls
      >
        <mesh visible={false}>
          <capsuleGeometry args={[0.4, 0.8, 4, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </RigidBody>
    </>
  );
}
