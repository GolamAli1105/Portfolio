import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const [text, setText] = useState('INITIALIZING ENGINE...');

  useEffect(() => {
    gsap.to('.loader-polygon', {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power3.inOut'
    });
    gsap.to('.loader-polygon', {
      rotation: 360,
      transformOrigin: '50% 50%',
      duration: 10,
      repeat: -1,
      ease: 'none'
    });
    gsap.to('.loader-polygon-inner', {
      strokeDashoffset: 0,
      duration: 2,
      delay: 0.5,
      ease: 'power3.inOut'
    });
    gsap.to('.loader-polygon-inner', {
      rotation: -360,
      transformOrigin: '50% 50%',
      duration: 8,
      repeat: -1,
      ease: 'none'
    });

    const sequence = [
      { t: 0, text: 'INITIALIZING ENGINE...' },
      { t: 500, text: 'LOADING NEURAL WEIGHTS [████░░░░░░]' },
      { t: 900, text: 'LOADING NEURAL WEIGHTS [████████░░]' },
      { t: 1200, text: 'LOADING NEURAL WEIGHTS [██████████]' },
      { t: 1500, text: 'COMPILING SHADERS...' },
      { t: 2000, text: 'MOUNTING UI COMPONENTS...' },
      { t: 2400, text: 'SYSTEM READY.' },
    ];

    sequence.forEach((seq) => {
      setTimeout(() => setText(seq.text), seq.t);
    });

    const tl = gsap.timeline({
      delay: 2.8,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut'
    });

  }, [onComplete]);

  return (
    <div className="loader-wrapper" ref={containerRef} style={{ background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', padding: '5vw' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 100" style={{ width: '20vmin', height: '20vmin', overflow: 'visible' }}>
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="300" strokeDashoffset="300" className="loader-polygon" />
          <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" fill="none" stroke="#ff00ff" strokeWidth="1" strokeDasharray="300" strokeDashoffset="300" className="loader-polygon-inner" />
        </svg>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '1rem', marginTop: 'auto', marginBottom: '5vh' }}>
        {text}
      </div>
    </div>
  );
}
