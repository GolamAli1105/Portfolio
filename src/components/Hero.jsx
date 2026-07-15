import { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrambleText from './ScrambleText';

export default function Hero() {
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
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10 }}>
        <h1 className="hero-title">
          <ScrambleText text="GOLAM" delay={2500} duration={1200} />
          <ScrambleText text="ALI" delay={2800} duration={1000} style={{ paddingLeft: '10vw' }} />
          <ScrambleText text="TECH ARTIST" delay={3200} duration={1500} style={{ paddingLeft: '5vw', color: 'transparent', WebkitTextStroke: '2px #fff', textShadow: 'none' }} />
        </h1>
        
        <div className="hero-stats">
          <div className="hero-stat-block">
            <span className="hero-stat-num">06</span>
            <span className="hero-stat-label">Years Exp</span>
          </div>
          <div className="hero-stat-block">
            <span className="hero-stat-num">C++</span>
            <span className="hero-stat-label">Primary</span>
          </div>
          <div className="hero-stat-block">
            <span className="hero-stat-num">AAA</span>
            <span className="hero-stat-label">Shipped</span>
          </div>
        </div>
        
        <div className="hero-subtitle">
          Golam Ali<br/>
          Engine Programmer.<br/>
          Building virtual worlds.<br/>
          Scroll to engage.
        </div>
      </div>
    </section>
  );
}
