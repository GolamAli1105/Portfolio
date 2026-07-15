import RollingText from './RollingText';

export default function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => scrollTo('hero')} style={{cursor: 'pointer'}}>G.A.</div>
      <div className="nav-links">
        <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}><RollingText text="About" /></a>
        <a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}><RollingText text="Work" /></a>
        <a href="#experience" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}><RollingText text="Experience" /></a>
        <a href="#skills" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}><RollingText text="Expertise" /></a>
      </div>
      <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}><RollingText text="AVAILABLE FOR HIRE" /></a>
    </nav>
  );
}
