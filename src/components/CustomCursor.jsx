import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  // Track mouse position and cursor position separately for lerping
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  // Ref for the currently hovered magnetic element
  const magneticTarget = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const setupHovers = () => {
      document.querySelectorAll('a, button, .marquee-text, .project-card').forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
          dot.classList.add('hovering');
          ringEl.classList.add('hovering');
          // If it's a link or button, make it magnetic
          if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.classList.contains('nav-cta')) {
             magneticTarget.current = el;
          }
        });
        
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovering');
          ringEl.classList.remove('hovering');
          if (magneticTarget.current === el) {
            magneticTarget.current = null;
            // Reset the element's position using GSAP
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
          }
        });
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    setupHovers();
    setTimeout(setupHovers, 2000);

    let animId;
    const render = () => {
      // If we have a magnetic target, pull the cursor to its center
      if (magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Pull element slightly towards mouse
        const pullX = (mouse.current.x - centerX) * 0.2;
        const pullY = (mouse.current.y - centerY) * 0.2;
        
        gsap.to(magneticTarget.current, { x: pullX, y: pullY, duration: 0.2, ease: 'power2.out' });
        
        // Snap cursor perfectly to center of element
        cursor.current.x += (centerX - cursor.current.x) * 0.2;
        cursor.current.y += (centerY - cursor.current.y) * 0.2;
      } else {
        // Normal cursor follow
        cursor.current.x += (mouse.current.x - cursor.current.x) * 0.2;
        cursor.current.y += (mouse.current.y - cursor.current.y) * 0.2;
      }
      
      // Ring follows cursor with more delay (spring effect)
      ring.current.x += (cursor.current.x - ring.current.x) * 0.08;
      ring.current.y += (cursor.current.y - ring.current.y) * 0.08;

      dot.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      
      animId = requestAnimationFrame(render);
    };
    
    animId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} style={{ top: 0, left: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '8px', height: '1px', background: 'var(--accent)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '-10px', width: '8px', height: '1px', background: 'var(--accent)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', top: '-10px', left: '50%', width: '1px', height: '8px', background: 'var(--accent)', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', width: '1px', height: '8px', background: 'var(--accent)', transform: 'translateX(-50%)' }} />
      </div>
      <div className="cursor-ring" ref={ringRef} style={{ top: 0, left: 0 }}></div>
    </>
  );
}
