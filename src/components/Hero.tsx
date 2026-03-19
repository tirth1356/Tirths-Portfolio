import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DecryptedText } from './ui/DecryptedText';

export function Hero() {
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    'Full-Stack Developer',
    'AI/ML Voyager',
    'Web Dev Craftsman',
    'Blockchain enthusiast',
    'Competitive Programmer',
  ];

  useEffect(() => {
    const role = roles[currentRole];
    if (!role) return;
    let index = 0;
    setIsTyping(true);
    const roleLength = role.length;

    const typeInterval = setInterval(() => {
      if (index <= roleLength) {
        setTypedText(role.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (index > 0) {
              setTypedText(role.slice(0, index - 1));
              index--;
            } else {
              clearInterval(deleteInterval);
              setCurrentRole((prev) => (prev + 1) % roles.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <DecryptedText
                text="Hi, I'm Tirth Patel"
                animateOn="view"
                speed={55}
                maxIterations={18}
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                encryptedClassName="text-primary/40"
              />
            </motion.h1>

            <div className="h-12 md:h-16 flex items-center justify-center">
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {typedText}
                <motion.span
                  className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1"
                  animate={{ opacity: isTyping ? [1, 0, 1] : 0 }}
                  transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0, ease: 'easeInOut' }}
                />
              </motion.p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            B.Tech CSE student at Nirma University specializing in full-stack engineering, blockchain, and AI systems.
            Demonstrated ability to design and deliver scalable, real-world solutions through hackathon-winning projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={() => scrollToSection('#projects')} className="group">
                <span>View My Work →</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('#contact')}>
                Get In Touch
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://drive.google.com/file/d/1cdM7JXBQQpFuV-buI4qCZM5e0xgLu_BQ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  View Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Github, href: 'https://github.com/tirth1356', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/tirth1356/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:tirthpatel1356@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/40 transition-all duration-300">
                  <social.icon className="h-7 w-7" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
