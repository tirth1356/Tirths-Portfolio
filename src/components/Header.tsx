import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Menu, X, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [darkMode, setDarkMode] = useState(true); // Start with dark mode
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('rose'); // Start with rose theme

  const themes = [
    { id: 'default', name: 'Default', primary: '#030213', secondary: '#ececf0' },
    { id: 'ocean', name: 'Ocean', primary: '#0ea5e9', secondary: '#0369a1' },
    { id: 'forest', name: 'Forest', primary: '#059669', secondary: '#065f46' },
    { id: 'sunset', name: 'Sunset', primary: '#f97316', secondary: '#ea580c' },
    { id: 'purple', name: 'Purple', primary: '#9333ea', secondary: '#7c3aed' },
    { id: 'rose', name: 'Rose', primary: '#e11d48', secondary: '#be123c' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      // Reset to default theme
      root.style.removeProperty('--primary');
      root.style.removeProperty('--secondary');
    } else {
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--secondary', theme.secondary);
    }
    
    setShowThemeMenu(false);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-medium relative"
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
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                />
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="w-9 h-9 relative"
              >
                <Palette className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-12 right-0 bg-background border border-border rounded-lg shadow-lg p-2 min-w-40"
                  >
                    {themes.map((theme) => (
                      <motion.button
                        key={theme.id}
                        onClick={() => changeTheme(theme)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors ${
                          currentTheme === theme.id ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex gap-1">
                          <div 
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full border"
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
              className="w-9 h-9 relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-9 h-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
              className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}