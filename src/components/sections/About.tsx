import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Code2,
  Database,
  Zap,
  GitBranch,
  Box,
  Shield,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { fadeInUp, staggerContainer, staggerItem } from "../../motion/variants";

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="py-24 bg-muted/20 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <motion.div className="mb-12 md:mb-16 text-left" {...fadeInUp()}>
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {t.about.title}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {language === 'es' ? 'Constructor de software, ' : 'Software builder, '}
            <span className="text-muted-foreground">
              {language === 'es' ? 'aprendiz constante.' : 'constant learner.'}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Narrative */}
          <motion.div className="space-y-6" {...fadeInUp(0.2)}>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                {about.narrative.split(".")[0]}.
              </p>
              <blockquote className="border-l-2 border-primary pl-4 py-2 text-foreground font-medium italic">
                "{about.quote}"
              </blockquote>
              <p>
                {about.narrative.split(".").slice(1).join(".")}
              </p>
            </div>

            {/* Tech Arsenal */}
            <div className="pt-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 mb-4 flex items-center gap-2">
                <Zap size={14} className="text-primary" />
                {language === 'es' ? 'Arsenal Técnico' : 'Technical Arsenal'}
              </h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {about.skills.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={staggerItem()}
                    className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-sm transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Focus Card */}
          <motion.div 
            className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/5 space-y-6"
            {...fadeInUp(0.4)}
          >
            <div className="flex items-center gap-4 pb-6 border-b border-border/50">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-inner">
                <Terminal size={24} />
              </div>
              <div>
                <h3 className="font-bold font-display text-xl">
                  {language === 'es' ? 'Enfoque Actual' : 'Current Focus'}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {about.currentFocus.description}
                </p>
              </div>
            </div>

            {/* Active Project */}
            <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 group hover:border-primary/20 transition-colors">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-3 flex items-center gap-2 tracking-widest">
                <GitBranch size={12} className="group-hover:rotate-12 transition-transform" />
                {language === 'es' ? 'Proyecto Activo' : 'Active Project'}
              </p>
              <p className="font-bold text-base text-foreground flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                {about.currentFocus.title}
              </p>
            </div>

            {/* Technologies Grid */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {language === 'es' ? 'Ecosistema Principal' : 'Core Ecosystem'}
              </p>
              <div className="grid grid-cols-4 gap-3">
                <TechIcon icon={<Code2 size={20} />} label="React" color="blue" />
                <TechIcon icon={<Box size={20} />} label="TS" color="blue-dark" />
                <TechIcon icon={<Database size={20} />} label="Node" color="green" />
                <TechIcon icon={<Shield size={20} />} label="AI/Agentes" color="purple" />
              </div>
            </div>

            {/* CodeRabbit Badge */}
            <div className="p-5 rounded-2xl bg-linear-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-400" />
                <h4 className="text-sm font-bold text-indigo-300">CodeRabbit AI Reviews</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Uso CodeRabbit para garantizar que cada línea de código cumpla con estándares de clase mundial antes de integrarse. La calidad no es negociable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechIcon: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
}> = ({ icon, label, color }) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    "blue-dark": { bg: "bg-blue-600/10", border: "border-blue-600/20", text: "text-blue-500" },
    green: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
  };
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div
        className={`p-3 rounded-xl ${c.bg} border ${c.border} ${c.text} group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
      >
        {icon}
      </div>
      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{label}</span>
    </div>
  );
};
