import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Briefcase } from "lucide-react";

export const Experience: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <section id="experience" className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {language === 'en' ? 'Journey' : 'Trayectoria'}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {language === 'en' ? 'Professional ' : 'Experiencia '} 
            <span className="text-muted-foreground">{language === 'en' ? 'Experience.' : 'Profesional.'}</span>
          </h2>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2 hidden md:block" />

          {t.experience.map((exp: any, index: number) => (
            <div
              key={exp.id}
              className={`flex flex-col md:flex-row gap-8 items-start relative ${
                index % 2 === 0 ? "md:flex-row-reverse text-left md:text-right" : "text-left"
              }`}
            >
              {/* Dot on Timeline (only for md and up) */}
              <div className="absolute left-0 md:left-1/2 top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 -translate-x-1/2 hidden md:block" />

              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-2rem)] bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="p-2 bg-muted rounded-lg text-primary">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-display group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-primary font-mono">{exp.company}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-start lg:justify-end" : ""}`}>
                  {exp.skills.map((s: string) => (
                    <span
                      key={s}
                      className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-transparent hover:border-primary/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className={`absolute top-6 ${index % 2 === 0 ? "-left-12 pr-4 text-right hidden xl:block" : "-right-12 pl-4 text-left hidden xl:block"} min-w-32`}>
                   <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                     {exp.period}
                   </span>
                </div>
                
                {/* Mobile Period */}
                <div className="mt-4 md:hidden">
                    <span className="text-xs font-mono text-primary font-bold">
                     {exp.period}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
