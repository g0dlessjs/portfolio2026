import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Briefcase, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../motion/variants';

export const Experience: React.FC = () => {
  const { t, language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <motion.div className="mb-16 md:mb-20" {...fadeInUp()}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <Sparkles size={12} />
            {language === 'en' ? 'Journey' : 'Trayectoria'}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {language === 'en' ? 'Professional ' : 'Experiencia '}
            <span className="text-muted-foreground">
              {language === 'en' ? 'Experience.' : 'Profesional.'}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base leading-relaxed">
            {language === 'en'
              ? 'A track record of building impactful digital products across industries.'
              : 'Un historial de construcción de productos digitales de alto impacto en diversas industrias.'}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Vertical Gradient Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          </div>

          {t.experience.map((exp: any, index: number) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredId === exp.id;

            return (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 mb-12 last:mb-0`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Timeline Node */}
                <div className="absolute left-[23px] md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                  <div className="relative">
                    {/* Pulse ring */}
                    {index === 0 && (
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    )}
                    {/* Outer ring */}
                    <div
                      className={`w-[46px] h-[46px] rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isHovered || index === 0
                          ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]'
                          : 'border-border bg-background'
                      }`}
                    >
                      {/* Inner number */}
                      <span
                        className={`text-xs font-mono font-bold transition-colors duration-300 ${
                          isHovered || index === 0
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content — Left or Right depending on index */}
                <div
                  className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${
                    isEven ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'
                  }`}
                >
                  <ExperienceCard
                    exp={exp}
                    index={index}
                    isEven={isEven}
                    isHovered={isHovered}
                    onHover={() => setHoveredId(exp.id)}
                    onLeave={() => setHoveredId(null)}
                    language={language}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ─────── Experience Card Sub-Component ─────── */

interface ExperienceCardProps {
  exp: any;
  index: number;
  isEven: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  language: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  exp,
  index,
  isEven,
  isHovered,
  onHover,
  onLeave,
  language,
}) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative rounded-2xl border bg-card p-6 md:p-7 transition-all duration-500 cursor-default overflow-hidden ${
        isHovered
          ? 'border-primary/40 shadow-xl shadow-primary/[0.08] -translate-y-1'
          : 'border-border/60 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Card glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02] rounded-2xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top accent line */}
      <div
        className={`absolute top-0 ${
          isEven ? 'left-0' : 'right-0'
        } h-[2px] bg-gradient-to-r from-primary/60 via-primary/30 to-transparent transition-all duration-700 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
      />

      <div className="relative z-10">
        {/* Period Badge */}
        <div
          className={`flex items-center gap-2 mb-4 ${!isEven ? 'md:justify-end' : ''}`}
        >
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold transition-colors duration-300 ${
              index === 0
                ? 'bg-primary/15 text-primary border border-primary/20'
                : 'bg-muted text-muted-foreground border border-border/50'
            }`}
          >
            <Calendar size={11} />
            {exp.period}
          </div>
          {index === 0 && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          )}
        </div>

        {/* Role & Company */}
        <div className={`mb-4 ${!isEven ? 'md:text-right' : ''}`}>
          <h3 className="text-lg md:text-xl font-display font-bold leading-snug group-hover:text-primary transition-colors duration-300">
            {exp.role}
          </h3>
          <div
            className={`flex items-center gap-2 mt-1.5 ${
              !isEven ? 'md:justify-end' : ''
            }`}
          >
            <div className="p-1 rounded-md bg-primary/10">
              <Briefcase size={12} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary/80 font-mono">
              {exp.company}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-sm text-muted-foreground leading-relaxed mb-5 ${
            !isEven ? 'md:text-right' : ''
          }`}
        >
          {exp.description}
        </p>

        {/* Skills */}
        <div className={`flex flex-wrap gap-2 ${!isEven ? 'md:justify-end' : ''}`}>
          {exp.skills.map((skill: string) => (
            <span
              key={skill}
              className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg border transition-all duration-300 ${
                isHovered
                  ? 'bg-primary/10 border-primary/20 text-primary'
                  : 'bg-muted/60 border-border/50 text-muted-foreground'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Hover CTA */}
        <div
          className={`flex items-center gap-1 mt-5 text-xs font-semibold text-primary transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${!isEven ? 'md:justify-end' : ''}`}
        >
          <ArrowRight size={12} />
          <span>{language === 'en' ? 'View details' : 'Ver detalles'}</span>
        </div>
      </div>
    </div>
  );
};
