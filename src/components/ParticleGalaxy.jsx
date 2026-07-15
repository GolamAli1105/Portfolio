import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleGalaxy() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 4, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const clock = new THREE.Clock();
    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;

    // Galaxy
    const particleCount = 4000;
    const galaxyRadius = 12;
    const branches = 5;
    const spin = 1.2;
    const randomness = 0.4;
    const randomnessPow = 3;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const insideColor = new THREE.Color('#818cf8');
    const outsideColor = new THREE.Color('#a78bfa');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * galaxyRadius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;
      const rx = Math.pow(Math.random(), randomnessPow) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const ry = Math.pow(Math.random(), randomnessPow) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius * 0.4;
      const rz = Math.pow(Math.random(), randomnessPow) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;

      const mixed = insideColor.clone().lerp(outsideColor, radius / galaxyRadius);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: 2, sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0.8,
    });
    const particles = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(particles);

    // Stars
    const starsCount = 2000;
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      const r = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = r * Math.cos(phi);
      const b = 0.5 + Math.random() * 0.5;
      starColors[i3] = b; starColors[i3 + 1] = b; starColors[i3 + 2] = b + Math.random() * 0.2;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 1.2, sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0.6,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = mouseY * 0.15;
      particles.position.x = mouseX * 0.3;
      particles.position.y = -mouseY * 0.2;

      stars.rotation.y = elapsed * 0.01;
      stars.rotation.x = elapsed * 0.005;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      galaxyGeo.dispose();
      galaxyMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero__canvas" ref={containerRef} />;
}
