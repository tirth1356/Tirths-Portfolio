import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  className = '',
  encryptedClassName = '',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;
    const revealed = new Array(text.length).fill(false);

    const interval = setInterval(() => {
      iteration++;
      const newText = text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (revealed[i]) return char;
        if (iteration > (i / text.length) * maxIterations) {
          revealed[i] = true;
          return char;
        }
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');

      setDisplayText(newText);

      if (revealed.every(Boolean)) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animateOn]);

  useEffect(() => {
    if (animateOn === 'hover' && isHovered) animate();
  }, [isHovered, animateOn]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => animateOn === 'hover' && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={char !== text[i] ? encryptedClassName : ''}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
