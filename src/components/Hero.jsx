import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrambleText from './ScrambleText';

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // We delay the hero subtitle animation until the scramble is mostly done
    const tl = gsap.timeline({ delay: 3.5 });
    
    tl.from('.hero-stats', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8');

    // 3D Parallax effect on mouse move
    const onMouseMove = (e) => {
      if (!titleRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(titleRef.current, {
        rotationY: x * 20,
        rotationX: -y * 20,
        x: x * 40,
        y: y * 40,
        duration: 1,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10 }}>
        <div ref={titleRef} style={{ transformStyle: 'preserve-3d' }}>
          <h1 className="hero-title">
          <ScrambleText text="GOLAM" delay={2500} duration={1200} />
          <ScrambleText text="ALI" delay={2800} duration={1000} style={{ paddingLeft: '10vw' }} />
          <ScrambleText text="SOFTWARE ENGINEER" delay={3200} duration={1500} style={{ paddingLeft: '5vw', color: 'transparent', WebkitTextStroke: '2px #fff', textShadow: 'none' }} />
          </h1>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat-block">
            <span className="hero-stat-num">8</span>
            <span className="hero-stat-label">Months Exp</span>
          </div>
          <div className="hero-stat-block">
            <span className="hero-stat-num">C++</span>
            <span className="hero-stat-label">Primary</span>
          </div>
          <div className="hero-stat-block">
            <span className="hero-stat-num">1</span>
            <span className="hero-stat-label">Startup</span>
          </div>
        </div>
        
        <div className="hero-subtitle">
          Golam Ali<br/>
          Software Engineer.<br/>
          Learning & Building.<br/>
          Scroll to engage.
        </div>
      </div>
    </section>
  );
}
