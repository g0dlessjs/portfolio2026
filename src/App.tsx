import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Experience } from "./components/sections/Experience";
import {
  ProjectsSection,
  AllProjects,
  ProjectDetail,
} from "./components/sections/Projects";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/layout/Footer";
import { SEO } from "./components/SEO";
import { CustomCursor } from "./components/ui/CustomCursor";
import { portfolioConfig } from "./config/portfolio";
import { ThemeValue } from "./types/index";

type ViewState = "home" | "all-projects" | "project-detail";

const AppContent: React.FC = () => {
    const { language } = useLanguage();
    const { sections } = portfolioConfig;

  // SEO Page Title
  const getPageTitle = () => {
    if (currentView === "all-projects") return language === 'es' ? "Archivo de Proyectos" : "Project Archive";
    return "Home";
  };

  // Theme state initialization
  const [theme, setTheme] = useState<ThemeValue>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeValue;
      return savedTheme || "system";
    }
    return "system";
  });

  // Routing Logic
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const systemIsDark = mediaQuery.matches;
      const isDark = theme === "dark" || (theme === "system" && systemIsDark);

      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeValue) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Navigation Handlers
  const handleNavigate = (sectionId: string) => {
    if (currentView !== "home") {
      // If we're in another view, go back to home first
      setCurrentView("home");
      // After home renders, scroll to the section (or top if home)
      setTimeout(() => {
        if (sectionId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(sectionId);
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home
      if (sectionId === "home") {
        // Scroll to top (shows the badge, hero content properly)
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openProject = (id: number) => {
    setSelectedProjectId(id);
    setCurrentView("project-detail");
  };

  // Disable browser scroll restoration to prevent position persistence
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <main
      className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/30 selection:text-foreground pt-16"
    >
      <SEO title={getPageTitle()} />
      <CustomCursor />
      <Navbar
        onThemeChange={handleThemeChange}
        theme={theme}
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      <div className="flex flex-col w-full transition-all duration-500">
        {currentView === "home" && (
          <>
            {sections.showHero && <Hero onNavigate={handleNavigate} />}
            {sections.showAbout && <About />}
            {sections.showServices && <Services />}
            {sections.showExperience && <Experience />}
            {sections.showProjects && (
              <ProjectsSection
                onProjectClick={openProject}
                onViewAll={() => setCurrentView("all-projects")}
              />
            )}
            {sections.showTestimonials && <Testimonials />}
            {sections.showContact && <Contact />}
          </>
        )}

        {currentView === "all-projects" && (
          <AllProjects
            onProjectClick={openProject}
            onBack={() => setCurrentView("home")}
          />
        )}

        {currentView === "project-detail" && selectedProjectId !== null && (
          <ProjectDetail
            id={selectedProjectId}
            onBack={() => setCurrentView("all-projects")}
          />
        )}

        <Footer />
      </div>
    </main>
  );
};

const App: React.FC = () => {
    return (
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    );
};

export default App;
