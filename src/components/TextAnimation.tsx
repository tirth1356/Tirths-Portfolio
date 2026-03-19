import { motion } from 'motion/react';

interface TextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextAnimation({ text, className = '', delay = 0 }: TextAnimationProps) {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.03,
            ease: 'easeOut'
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}

interface GradientTextProps {
  text: string;
  className?: string;
}

export function GradientText({ text, className = '' }: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{ backgroundSize: '200% 100%' }}
    >
      {text}
    </motion.span>
  );
}

interface BounceInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BounceIn({ children, className = '', delay = 0 }: BounceInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SlideUp({ children, className = '', delay = 0 }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
