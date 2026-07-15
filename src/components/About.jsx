import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPH = "I architect rendering pipelines and interactive systems that push hardware to its limits. With a deep background in C++, Vulkan, and Unreal Engine, I build the technical foundations that allow artists to create immersive virtual worlds without compromising performance.";

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
