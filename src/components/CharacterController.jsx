import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';

const SPEED = 7;
const DAMPING = 12; // Controls how fast they reach max speed (snappiness)

export default function CharacterController() {
  const ref = useRef();
  const [, getKeys] = useKeyboardControls();
  const { camera } = useThree();
  
  // Keep track of the current smoothed velocity for X and Z
  const currentVel = useRef(new THREE.Vector2(0, 0));

  const canJump = useRef(true);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const { forward, backward, left, right, jump, run } = getKeys();
    
    // Reset jump ability when key is released
    if (!jump) {
      canJump.current = true;
    }

    const velocity = ref.current.linvel();
    const SPEED = run ? 8 : 4;
    const DAMPING = 5.0; // Smooth sliding
    const position = ref.current.translation();

    // Simple head bob effect based on movement and time
    let headBob = 0;
    const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);
    // Only bob if moving fast enough and grounded
    if (speed > 0.5 && Math.abs(velocity.y) < 0.1) {
      headBob = Math.sin(state.clock.elapsedTime * 10) * 0.05;
    }
    camera.position.set(position.x, position.y + 0.8 + headBob, position.z);

    // Calculate movement directions relative to camera yaw
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    cameraDir.y = 0;
    cameraDir.normalize();

    // Cross product of UP and FRONT gives LEFT vector
    const cameraLeft = new THREE.Vector3();
    cameraLeft.crossVectors(camera.up, cameraDir).normalize();

    const targetDirection = new THREE.Vector3(0, 0, 0);
    if (forward) targetDirection.add(cameraDir);
    if (backward) targetDirection.sub(cameraDir);
    if (left) targetDirection.add(cameraLeft);
    if (right) targetDirection.sub(cameraLeft);
    
    if (targetDirection.lengthSq() > 0) {
      targetDirection.normalize().multiplyScalar(SPEED);
    }

    // By damping from the actual physics velocity, we allow the physics engine to properly stop us when we hit a wall!
    const nextX = THREE.MathUtils.damp(velocity.x, targetDirection.x, DAMPING, delta);
    const nextZ = THREE.MathUtils.damp(velocity.z, targetDirection.z, DAMPING, delta);

    // Jump Logic: If jump is pressed, we haven't already jumped, and we are relatively still on the Y axis (grounded)
    let nextY = velocity.y;
    if (jump && canJump.current && Math.abs(velocity.y) < 0.05) {
      nextY = 8; // Jump force
      canJump.current = false; // Prevent holding to jump
    }

    // Apply movement velocity and WAKE UP the rigid body if it's sleeping
    ref.current.setLinvel({ 
      x: nextX, 
      y: nextY, 
      z: nextZ 
    }, true);
  });

  return (
    <>
      {/* Native FPS Mouse Aiming (Reduced Sensitivity) */}
      <PointerLockControls pointerSpeed={0.3} />
      
      {/* Player Physics Body */}
      <RigidBody 
        ref={ref} 
        colliders={false} 
        mass={2} 
        type="dynamic" 
        position={[0, 2, 2]} // Spawn near the window/entrance, clear of the table
        enabledRotations={[false, false, false]} // Prevent tipping over
        friction={0} // Smooth sliding against walls
        ccd={true} // Continuous Collision Detection prevents tunneling!
      >
        <CapsuleCollider args={[0.4, 0.4]} />
      </RigidBody>
    </>
  );
}
