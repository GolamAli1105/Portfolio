import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0, duration = 1500, className = '', style = {} }) {
  const [output, setOutput] = useState('');
  const [trigger, setTrigger] = useState(0); // Used to re-trigger animation
  const frameRequest = useRef(null);
  
  useEffect(() => {
    let start = null;
    let timeoutId;
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      let result = '';
      for (let i = 0; i < text.length; i++) {
        // If this character's reveal threshold has been passed, show actual character
        if (percent >= (i / text.length)) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          // Otherwise, show random glitch character
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setOutput(result);
      
      if (percent < 1) {
        frameRequest.current = requestAnimationFrame(animate);
      }
    };
    
    const actualDelay = trigger === 0 ? delay : 0;
    
    timeoutId = setTimeout(() => {
      frameRequest.current = requestAnimationFrame(animate);
    }, actualDelay);
    
    return () => {
      clearTimeout(timeoutId);
      if (frameRequest.current) {
        cancelAnimationFrame(frameRequest.current);
      }
    };
  }, [text, delay, duration, trigger]);

  const handleMouseEnter = () => {
    // Re-trigger the scramble immediately on hover without initial delay
    setTrigger(prev => prev + 1);
  };

  return (
    <span 
      className={className} 
      style={{ ...style, cursor: 'none' }} 
      onMouseEnter={handleMouseEnter}
    >
      {output || ' '}
    </span>
  );
}
