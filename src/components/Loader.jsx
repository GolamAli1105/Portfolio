import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const [text, setText] = useState('INITIALIZING ENGINE...');

  useEffect(() => {
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
    <div className="loader-wrapper" ref={containerRef} style={{ background: '#000', display: 'flex', flexDirection: 'column', padding: '5vw' }}>
      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '1rem', marginTop: 'auto', marginBottom: '5vh' }}>
        {text}
      </div>
    </div>
  );
}
