import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Mail,
  Sun,
  Moon,
  Menu,
  X,
  Wrench,
  Quote,
  CalendarDays,
  Globe,
} from 'lucide-react';
import { ThemeValue } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { portfolioConfig } from '../../config/portfolio';

interface NavbarProps {
  onThemeChange: (theme: ThemeValue) => void;
  theme: ThemeValue;
  onNavigate: (sectionId: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onThemeChange,
  theme,
  onNavigate,
  currentView,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolling = React.useRef(false);

  const sections = [
    {
      id: 'home',
      icon: Home,
      label: language === 'es' ? 'Inicio' : 'Home',
      show: portfolioConfig.sections.showHero,
    },
    {
      id: 'about',
      icon: User,
      label: language === 'es' ? 'Perfil' : 'About',
      show: portfolioConfig.sections.showAbout,
    },
    {
      id: 'services',
      icon: Wrench,
      label: language === 'es' ? 'Servicios' : 'Services',
      show: portfolioConfig.sections.showServices,
    },
    {
      id: 'experience',
      icon: CalendarDays,
      label: language === 'es' ? 'Experiencia' : 'Experience',
      show: portfolioConfig.sections.showExperience,
    },
    {
      id: 'projects',
      icon: Briefcase,
      label: language === 'es' ? 'Trabajo' : 'Work',
      show: portfolioConfig.sections.showProjects,
    },
    {
      id: 'testimonials',
      icon: Quote,
      label: language === 'es' ? 'Opiniones' : 'Testimonials',
      show: portfolioConfig.sections.showTestimonials,
    },
    {
      id: 'contact',
      icon: Mail,
      label: language === 'es' ? 'Contacto' : 'Contact',
      show: portfolioConfig.sections.showContact,
    },
  ].filter(s => s.show);

  // Detect active section
  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection('projects');
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (isScrolling.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [currentView, sections]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = () => {
      setIsLangMenuOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleNavClick = useCallback(
    (id: string) => {
      isScrolling.current = true;
      onNavigate(id);
      setActiveSection(id);
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    },
    [onNavigate]
  );

  const toggleTheme = () => {
    onThemeChange(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Top Bar — Glassmorphism */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="bg-background/60 dark:bg-background/40 backdrop-blur-xl border-b border-border/40">
          <div className="container px-4 md:px-6 mx-auto flex items-center justify-between h-20">
            {/* Brand */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-xl font-black font-display tracking-tighter hover:opacity-80 transition-opacity"
              aria-label="Ir al inicio"
            >
              {t.profile.brandName.split('.')[0]}
              <span className="text-secondary">
                {t.profile.brandName.includes('.') ? '.' : ''}
              </span>
              {t.profile.brandName.split('.')[1] || ''}
            </button>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegación principal"
            >
              {sections.map(({ id, icon: Icon, label }) => (
                <NavButton
                  key={id}
                  icon={<Icon size={22} />}
                  label={label}
                  isActive={
                    id === 'projects'
                      ? activeSection === 'projects'
                      : activeSection === id && currentView === 'home'
                  }
                  onClick={() => handleNavClick(id)}
                />
              ))}

              {/* Divider */}
              <div className="w-px h-8 bg-border/50 mx-4" />

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsLangMenuOpen(o => !o);
                  }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
                  aria-label={language === 'es' ? 'Cambiar idioma' : 'Change language'}
                  title={language === 'es' ? 'Cambiar idioma' : 'Change language'}
                >
                  <Globe size={22} />
                  <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-primary text-primary-foreground px-1 rounded-sm uppercase">
                    {language}
                  </span>
                </button>

                {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-32 bg-popover/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden p-1">
                    {(['es', 'en'] as const).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                          language === lang
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {lang === 'es' ? 'Español' : 'English'}
                        {language === lang && (
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Theme Toggle Button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={
                  theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
                }
                className="w-11 h-11 ml-2 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
              >
                {theme === 'dark' ? (
                  <Sun size={22} className="text-amber-400" />
                ) : (
                  <Moon size={22} className="text-zinc-800" />
                )}
              </button>
            </nav>

            {/* Mobile Trigger */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 inset-x-4 bg-popover border border-border rounded-4xl shadow-2xl overflow-hidden animate-slide-down p-2">
            <nav className="flex flex-col gap-1">
              {sections.map(({ id, icon: Icon, label }) => {
                const isActive =
                  id === 'projects'
                    ? activeSection === 'projects'
                    : activeSection === id && currentView === 'home';
                return (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon size={24} />
                    {label}
                  </button>
                );
              })}

              <div className="h-px bg-border my-2 mx-4" />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-muted text-foreground font-bold text-xs"
                >
                  <Globe size={18} /> {language === 'es' ? 'English' : 'Español'}
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-muted text-foreground font-bold text-xs"
                >
                  {theme === 'dark' ? (
                    <Sun size={18} className="text-amber-400" />
                  ) : (
                    <Moon size={18} className="text-zinc-800" />
                  )}
                  {theme === 'dark'
                    ? language === 'es'
                      ? 'Claro'
                      : 'Light'
                    : language === 'es'
                      ? 'Oscuro'
                      : 'Dark'}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- Nav Button ---------- */
const NavButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, isActive, onClick, label }) => (
  <button
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
      isActive
        ? 'text-primary bg-primary/10 shadow-inner'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    }`}
  >
    {icon}
    {isActive && (
      <motion.div
        layoutId="nav-active"
        className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary"
      />
    )}
  </button>
);
