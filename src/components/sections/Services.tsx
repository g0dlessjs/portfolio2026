import React from "react";
import {
  Layout,
  Database,
  Zap,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const ICON_MAP: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Layout,
  Database,
  Zap,
  Smartphone,
};

export const Services: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-16 md:py-24 bg-background relative">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 md:mb-16 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {t.services[0].id ? (t.language === 'en' ? 'Services' : 'Servicios') : 'Services'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight">
            {t.language === 'en' ? 'How can I ' : '¿Cómo te puedo '}
            <span className="text-muted-foreground">{t.language === 'en' ? 'help you?' : 'ayudar?'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.services.map((service: any) => {
            const IconComponent = ICON_MAP[service.iconName] || Zap;
            return (
              <div
                key={service.id}
                className="group p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-base md:text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
