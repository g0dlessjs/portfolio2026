import React from "react";
import { Github, Twitter, Linkedin, ArrowUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { portfolioConfig } from "../../config/portfolio";

const ICON_MAP: Record<string, React.ReactNode> = {
  GitHub: <Github size={16} />,
  Twitter: <Twitter size={16} />,
  LinkedIn: <Linkedin size={16} />,
};

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { socialLinks } = portfolioConfig;

  return (
    <footer className="border-t border-border py-12 bg-background/50 backdrop-blur-md">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black font-display tracking-tight text-foreground">
            {t.profile.name.split(' ')[0]}<span className="text-primary">.</span>{t.profile.name.split(' ')[1] || ''}
          </h2>
          <p className="text-xs text-muted-foreground font-mono mt-1 opacity-60">
            &copy; {new Date().getFullYear()} {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              aria-label={s.platform}
            >
              {ICON_MAP[s.platform] || <Github size={18} />}
            </a>
          ))}
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl border border-border bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-95 shadow-sm"
            aria-label="Volver arriba"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
