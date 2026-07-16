import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function GlobalBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#000000', 0.05); // Fade to black in distance

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.y = 2;
    camera.position.z = 10;
    
    // Look slightly down at the grid
    camera.rotation.x = -0.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Synthwave Grid (Terrain)
    const geometry = new THREE.PlaneGeometry(100, 100, 40, 40);
    
    // Displace vertices to make it look like terrain/mountains on the sides
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      // Keep center flat for the "road", raise the edges
      if (Math.abs(x) > 5) {
        positions[i + 2] = Math.random() * (Math.abs(x) - 5) * 0.5;
      }
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0xff3333, // Neon Red/Crimson
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -2;
    scene.add(grid);

    // Floating Particles (Data streams)
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Interactions
    let scrollY = window.scrollY;
    let targetSpeed = 0.05;
    let currentSpeed = 0.05;

    const onScroll = () => {
      const newScrollY = window.scrollY;
      const delta = Math.abs(newScrollY - scrollY);
      
      // Accelerate the grid when scrolling
      targetSpeed = 0.05 + (delta * 0.002);
      
      // Clamp speed
      if (targetSpeed > 0.3) targetSpeed = 0.3;
      
      scrollY = newScrollY;
      
      // Move camera slightly down on scroll for parallax
      gsap.to(camera.position, {
        y: 2 - (scrollY * 0.001),
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Decay speed back to base
      currentSpeed += (0.05 - currentSpeed) * 0.05;
      if (currentSpeed < 0.05) currentSpeed = 0.05;

      // Move grid towards camera continuously
      grid.position.z += currentSpeed;
      
      // Reset grid position to loop seamlessly
      if (grid.position.z > 2.5) {
        grid.position.z = 0;
      }

      // Move particles towards camera
      particlesMesh.position.z += currentSpeed * 2;
      if (particlesMesh.position.z > 10) {
          particlesMesh.position.z = -20;
      }

      // Parallax camera rotation based on mouse (looking around the HUD)
      camera.rotation.y = mouseX * 0.1;
      camera.rotation.x = -0.2 + (mouseY * 0.05);

      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, background: '#000' }} ref={containerRef} />;
}
