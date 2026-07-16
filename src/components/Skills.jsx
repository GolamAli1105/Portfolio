import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  'C++', 'UNREAL ENGINE 5', 'VULKAN', 'HLSL / GLSL', 'UNITY', 'DIRECTX 12', 'BLUEPRINTS', 'MATH', 'PYTHON'
];

export default function Skills() {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // 1. Setup infinite marquee
    const marqueeAnim = gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    });
    
    // 2. Tie timescale of marquee to scroll velocity
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        // Map velocity (0 - ~3000) to timeScale (1 - 10)
        let timeScale = 1 + (velocity / 500);
        if (timeScale > 3) timeScale = 3; // Cap max speed
        
        gsap.to(marqueeAnim, {
          timeScale: timeScale,
          duration: 0.2,
          overwrite: true
        });
        
        // Decay back to normal speed
        gsap.to(marqueeAnim, {
          timeScale: 1,
          duration: 1,
          delay: 0.2,
          overwrite: 'auto'
        });
      }
    });

    // 3. Float animation for tags
    const tags = gsap.utils.toArray('.floating-skill');
    tags.forEach((tag, i) => {
      gsap.to(tag, {
        y: 'random(-10, 10)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(4, 6)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      marqueeAnim.kill();
    };
  }, []);

  return (
    <section className="skills-section" id="skills" ref={containerRef}>
      <div className="marquee-container" ref={marqueeRef}>
        {[...SKILLS, ...SKILLS].map((skill, i) => (
          <span key={i} className="marquee-text">{skill}</span>
        ))}
      </div>

      <div className="skills-floating-container">
        {['C++ / Core Engine', 'Unreal Engine / Blueprints', 'Vulkan / Graphics API', 'HLSL / Custom Shaders', 'Unity / C#', 'Mathematics / Linear Algebra'].map((s, i) => (
          <div key={i} className="floating-skill glass-panel">
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}
