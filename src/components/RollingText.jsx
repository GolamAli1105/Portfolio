import { useState } from 'react';

export default function RollingText({ text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rolling-text-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'hidden', display: 'inline-flex', flexDirection: 'column', height: '1.2em' }}
    >
      <div 
        className="rolling-text-inner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
          transform: isHovered ? 'translateY(-1.2em)' : 'translateY(0)'
        }}
      >
        <span style={{ height: '1.2em', display: 'flex', alignItems: 'center' }}>{text}</span>
        <span style={{ height: '1.2em', display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>{text}</span>
      </div>
    </div>
  );
}
