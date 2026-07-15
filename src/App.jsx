import { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <div className="noise" />
      <GlobalBackground />
      <CustomCursor />
      
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      
      <main style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
        
        {/* SVG Filters for Liquid Hover Effects */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="liquid-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </main>
    </SmoothScroll>
  );
}
