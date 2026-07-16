import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RollingText from './RollingText';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: '01', title: 'APEX ENGINE', tags: 'C++ / VULKAN / HLSL', desc: 'A custom rendering engine built from scratch. Features clustered forward shading, real-time raytraced reflections, and a multi-threaded job system.', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000' },
  { id: '02', title: 'CYBER CORE', tags: 'UNREAL ENGINE 5 / BLUEPRINTS', desc: 'A cyberpunk stealth-action prototype. Implemented custom AI perception systems and complex procedural animation blending for seamless character traversal.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000' },
  { id: '03', title: 'NEBULA FX', tags: 'HLSL / NIAGARA / HOUDINI', desc: 'A library of high-quality visual effects. Developed shaders for volumetric clouds, explosive fluid simulations, and energy fields.', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1000' },
  { id: '04', title: 'VOID REALM', tags: 'UNITY / C# / DOTS', desc: 'A multiplayer prototype testing Unitys Data-Oriented Technology Stack to handle numerous networked entities efficiently.', img: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=1000' },
];

function TiltImage({ src, alt }) {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imgRef.current, {
      rotationY: x * 30, // 30 degrees max tilt
      rotationX: -y * 30,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div 
      className="project-image-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img ref={imgRef} src={src} alt={alt} className="project-image" style={{ transformStyle: 'preserve-3d' }} />
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    
    // Calculate total width to scroll
    // (Number of items - 1) * 100vw
    const sliderDistance = (PROJECTS.length - 1) * window.innerWidth;
    const scrollDistance = sliderDistance * 0.5; // Requires 50% less vertical scrolling

    const images = gsap.utils.toArray(containerRef.current.querySelectorAll('.project-image'));
    gsap.set(images, { scale: 1.2, transformOrigin: 'center center' });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 1,
      }
    });

    tl.to(slider, {
      x: -sliderDistance,
      ease: 'none'
    }, 0);
    
    // Parallax effect on images
    tl.to(images, {
      xPercent: 15,
      ease: 'none'
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="horizontal-scroll-section" ref={containerRef} id="projects">
      <div className="horizontal-slider" ref={sliderRef}>
        {PROJECTS.map((proj) => (
          <div key={proj.id} className="horizontal-card">
            <div className="project-info">
              <span className="project-idx">{proj.id}</span>
              <h2 className="project-title">{proj.title}</h2>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-tags">
                {proj.tags.split(' / ').map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <a href="#" className="project-link">
                <RollingText text="VIEW PROJECT" />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <TiltImage src={proj.img} alt={proj.title} />
          </div>
        ))}
      </div>
    </section>
  );
}
