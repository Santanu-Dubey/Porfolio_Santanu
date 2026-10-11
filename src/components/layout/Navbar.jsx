import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Sun, Moon, Palette } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme, toggleTheme, isIndigoGreen } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 backdrop-blur-md bg-paper/85' : 'py-6 bg-transparent'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand signature */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink flex items-center gap-2 group"
          aria-label="Santanu Dubey Home"
        >
          {/* Mini mandala logo mark */}
          <svg
            className="w-6 h-6 stroke-pen transition-transform duration-500 group-hover:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" strokeWidth="1" strokeDasharray="1 2" />
            <path d="M12 2 V22 M2 12 H22" strokeWidth="0.8" />
          </svg>
          <span className="font-serif tracking-normal">Santanu.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-indigo font-semibold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}

                {/* Hand-drawn Pen Underline */}
                {isActive && (
                  <motion.svg
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 w-full h-1.5 stroke-indigo pointer-events-none"
                    viewBox="0 0 40 6"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M 1 4 Q 10 1, 20 4 T 39 3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </a>
            );
          })}
        </div>

        {/* Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle: Ink / Indigo-Green */}
          <button
            onClick={toggleTheme}
            className="relative px-3 py-1.5 rounded-full border border-ink/20 hover:border-indigo text-xs font-mono uppercase tracking-wider flex items-center gap-2 text-ink hover:text-indigo transition-colors"
            title={`Switch to ${isIndigoGreen ? 'Ink' : 'Indigo-Green'} palette`}
            aria-label={`Toggle theme: currently ${theme}`}
          >
            <Palette className="w-3.5 h-3.5 text-leaf" />
            <span className="hidden sm:inline">
              {isIndigoGreen ? 'Indigo-Green' : 'Ink'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink hover:text-indigo focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-ink/10 bg-paper/95 backdrop-blur-md px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-base font-serif py-1 ${
                    activeSection === item.href.slice(1)
                      ? 'text-indigo font-bold'
                      : 'text-ink hover:text-indigo'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
