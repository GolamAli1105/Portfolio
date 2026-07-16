import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JOBS = [
  { year: '2023 — PRESENT', title: 'Junior Software Engineer', company: 'INNOVATIVE STARTUP', desc: 'Collaborating closely with developers and artists to optimize assets and build custom shaders. Rapidly prototyping visual effects and learning the ins and outs of real-time rendering pipelines.' }
];

export default function Experience() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.exp-card');
    const path = pathRef.current;
    
    // Set up SVG path animation manually
    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    // Animate the line drawing down
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
    
    // Animate cards popping in
    items.forEach((item, i) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section className="experience-extreme" id="experience" ref={containerRef}>
      <div className="section-title-small" style={{ marginBottom: '10vh' }}>Experience</div>
      
      <div className="exp-grid-container">
        {/* SVG Connecting Wire */}
        <svg className="exp-wire" viewBox="0 0 100 800" preserveAspectRatio="none">
          <path 
            ref={pathRef}
            d="M 50 0 C 50 200, 10 200, 10 400 C 10 600, 90 600, 90 800" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="2" 
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 51, 51, 0.8))' }}
          />
        </svg>

        {JOBS.map((job, i) => (
          <div 
            key={i} 
            className={`exp-card align-${i % 2 === 0 ? 'left' : 'right'}`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.3 : 1
            }}
          >
            <div className="exp-card-inner glass-panel">
              <div className="timeline-date">{job.year}</div>
              <h3 className="timeline-title">{job.title}</h3>
              <div className="timeline-company">{job.company}</div>
              <p className="timeline-desc">{job.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
