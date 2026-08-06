import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Menu, X, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LineSidebar from './LineSidebar';

export function Header() {
  const [darkMode, setDarkMode] = useState(true); // Start with dark mode
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('rose'); // Start with rose theme
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const themes = [
    { id: 'default', name: 'Default', primary: '#030213', secondary: '#ececf0' },
    { id: 'ocean', name: 'Ocean', primary: '#0ea5e9', secondary: '#0369a1' },
    { id: 'forest', name: 'Forest', primary: '#059669', secondary: '#065f46' },
    { id: 'sunset', name: 'Sunset', primary: '#f97316', secondary: '#ea580c' },
    { id: 'purple', name: 'Purple', primary: '#9333ea', secondary: '#7c3aed' },
    { id: 'rose', name: 'Rose', primary: '#e11d48', secondary: '#be123c' }
  ];

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Track active section for line sidebar
      const sectionIds = ['#home', '#about', '#experience', '#projects', '#contact'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.querySelector(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveNavIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const changeTheme = (theme: typeof themes[0]) => {
    setCurrentTheme(theme.id);
    const root = document.documentElement;
    
    if (theme.id === 'default') {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--secondary');
    } else {
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--secondary', theme.secondary);
    }
    
    setShowThemeMenu(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/40 backdrop-blur-xl border-b border-white/10 shadow-2xl py-6' 
            : 'bg-background/20 backdrop-blur-lg border-b border-white/5 py-6'
        }`}
      >
        <nav className="container mx-auto px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold tracking-tight relative cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
                style={{
                  background: 'linear-gradient(90deg, var(--foreground), var(--primary), var(--foreground))',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Tirth Patel
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors relative group py-1"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {/* Theme Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <Palette className="h-5 w-5" />
                </Button>

                <AnimatePresence>
                  {showThemeMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute top-14 right-0 bg-background/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-2 min-w-44 z-50"
                    >
                      {themes.map((theme) => (
                        <motion.button
                          key={theme.id}
                          onClick={() => changeTheme(theme)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors ${
                            currentTheme === theme.id ? 'bg-white/10 font-semibold' : ''
                          }`}
                        >
                          <div className="flex gap-1">
                            <div 
                              className="w-3.5 h-3.5 rounded-full border border-white/20"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <div 
                              className="w-3.5 h-3.5 rounded-full border border-white/20"
                              style={{ backgroundColor: theme.secondary }}
                            />
                          </div>
                          {theme.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: darkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-purple-400" />}
                </motion.div>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left py-2.5 px-3 rounded-lg text-foreground/90 hover:bg-white/10 transition-colors text-base"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Floating LineSidebar for PC Quick Navigation */}
      <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
        <LineSidebar
          items={navItems.map(item => item.name)}
          accentColor="var(--primary, #e11d48)"
          textColor="#a1a1aa"
          markerColor="#52525b"
          showIndex
          showMarker
          proximityRadius={60}
          maxShift={20}
          falloff="sharp"
          markerLength={45}
          markerGap={6}
          tickScale={0.5}
          scaleTick
          itemGap={24}
          fontSize={0.95}
          smoothing={100}
          activeIndex={activeNavIndex}
          onItemClick={(index) => {
            if (navItems[index]) {
              scrollToSection(navItems[index].href);
            }
          }}
        />
      </div>
    </>
  );
}