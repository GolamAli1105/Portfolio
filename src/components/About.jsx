import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPH = "I am a passionate Software Engineer focused on high-performance graphics and interactive systems. With 8 months of hands-on experience in a fast-paced startup, I am rapidly leveling up my skills in C++, Unreal Engine, and shader development to help build immersive virtual worlds.";

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll('.reveal-word');
    
    gsap.fromTo(words, 
      { opacity: 0.1 }, 
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section className="about-extreme" id="about" ref={containerRef}>
      <div className="section-title-small" style={{ marginBottom: '10vh' }}>Player Profile</div>
      <h2 className="about-reveal-text" ref={textRef}>
        {PARAGRAPH.split(' ').map((word, i) => (
          <span key={i} className="reveal-word" style={{ display: 'inline-block', marginRight: '0.3em', paddingBottom: '0.1em' }}>
            {word}
          </span>
        ))}
      </h2>
    </section>
  );
}
