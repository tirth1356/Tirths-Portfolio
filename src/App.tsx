import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects_fixed';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';

import { Contact } from './components/Contact';
import { CursorEffect } from './components/CursorEffect';
import { Heart, Github, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from './components/ui/button';

export default function App() {
  useEffect(() => {
    // Set dark mode and rose theme by default
    document.documentElement.classList.add('dark');
    
    // Set rose theme
    const root = document.documentElement;
    root.style.setProperty('--primary', '#e11d48');
    root.style.setProperty('--secondary', '#be123c');
    
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-foreground relative">
      {/* Target Cursor */}
      <CursorEffect />

      {/* Gravity Stars Background */}
      <div className="fixed inset-0 -z-10 w-screen h-screen" style={{ color: '#a78bfa' }}>
        <GravityStarsBackground
          className="w-full h-full"
          starsCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 220}
          starsOpacity={0.35}
          starsSize={1.5}
          glowIntensity={8}
          movementSpeed={0.35}
        />
      </div>
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border py-12 relative">

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg mb-4">Tirth Patel</h3>
              <p className="text-sm text-muted-foreground mb-4">
                B.Tech CSE student at Nirma University passionate about blockchain, AI/ML, 
                and full-stack development. Building innovative solutions that make a difference.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/tirth1356"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Github className="h-4 w-4" />
                  </Button>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/tirth1356/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About & Skills', href: '#about' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-muted-foreground hover:text-foreground transition-colors relative group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {link.name}
                    <motion.div
                      className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>


          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground">
              © 2026 Tirth Patel. All rights reserved.
            </p>
            <motion.p 
              className="text-sm text-muted-foreground flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-3 w-3 text-red-500" />
              </motion.span>
              {' '}by Tirth and AI
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

    </div>
  );
}