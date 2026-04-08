import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Github,
  Globe,
  Plus,
  Minus,
  Briefcase,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { useLanguage } from "../../context/LanguageContext";
import { fadeInUp, staggerContainer, staggerItem } from "../../motion/variants";

export const ProjectsSection: React.FC<{
  onProjectClick: (id: number) => void;
  onViewAll: () => void;
}> = ({ onProjectClick, onViewAll }) => {
  const { t } = useLanguage();
  const projectsData = t.projectsList || t.projects; 
  const heroProject = projectsData[0];
  const subProjects = projectsData.slice(1, 4);

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-7xl sm:text-9xl md:text-[12rem] font-bold text-foreground/[0.02] pointer-events-none select-none font-display uppercase tracking-widest">
        Solutions
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        {/* Heading */}
        <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12 gap-4" {...fadeInUp()}>
          <div>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              Portafolio
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight">
              {t.projects.title.split(' ')[0]}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400">
                {t.projects.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
          </div>
          <Button onClick={onViewAll} className="rounded-full px-5 h-10 text-sm shrink-0 mt-2 sm:mt-0" variant="outline">
            {t.projects.viewAll} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {heroProject && (
            <motion.div
              variants={staggerItem(0)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="md:col-span-2 min-h-[350px] md:h-auto"
              onClick={() => onProjectClick(heroProject.id)}
            >
              <ProjectCard project={heroProject} />
            </motion.div>
          )}
          {subProjects.map((project: any, idx: number) => (
            <motion.div 
                key={project.id} 
                variants={staggerItem(idx + 1)}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                onClick={() => onProjectClick(project.id)}
            >
              <ProjectGridCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="group relative rounded-4xl overflow-hidden cursor-pointer bg-muted/20 h-full transition-all duration-700 hover:shadow-[0_0_50px_-12px_rgba(var(--primary-rgb),0.3)] ring-1 ring-white/10 hover:ring-primary/40">
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute top-6 left-6 flex gap-2">
         {project.tags.slice(0, 2).map((tag: string) => (
            <span key={tag} className="text-[9px] font-bold tracking-widest text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
                {tag}
            </span>
         ))}
      </div>

      <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center justify-between mb-4">
           <div className="h-px flex-1 bg-primary/30 mr-4" />
           <ArrowUpRight className="text-primary w-6 h-6 rotate-45 group-hover:rotate-0 transition-transform duration-500" />
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 leading-tight">{project.title}</h3>
        <p className="text-muted-foreground text-base md:text-lg line-clamp-2 max-w-xl mb-6 font-light">{project.description}</p>
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
            {t.projects.details} <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

const ProjectGridCard: React.FC<{ project: any }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group cursor-pointer rounded-3xl overflow-hidden bg-white/3 border border-white/10 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 min-h-[250px] md:h-full relative">
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 1).map((tag: string) => (
            <span key={tag} className="text-[8px] font-bold text-primary tracking-widest uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full backdrop-blur-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shrink-0">
            <ArrowUpRight className="text-primary w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AllProjects: React.FC<{
  onProjectClick: (id: number) => void;
  onBack: () => void;
}> = ({ onProjectClick, onBack }) => {
  const { t } = useLanguage();
  const projectsData = t.projectsList || t.projects;
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="pt-12 md:pt-16 pb-24 container px-4 md:px-6 mx-auto max-w-7xl min-h-screen">
      <nav className="mb-8 md:mb-12">
        <Button variant="ghost" onClick={onBack} className="pl-0 hover:pl-2 text-muted-foreground hover:text-foreground transition-all gap-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.projects.backHome}
        </Button>
      </nav>

      <motion.div className="mb-12 md:mb-16" {...fadeInUp()}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          {t.projects.archiveTitle.split(' ')[0]} <span className="text-primary">{t.projects.archiveTitle.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light">
          {t.projects.archiveDesc}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projectsData.map((project: any, idx: number) => (
          <motion.div 
            key={project.id} 
            variants={staggerItem(idx)} 
            initial="initial"
            animate="whileInView"
            viewport={{ once: true }}
            onClick={() => onProjectClick(project.id)}
          >
            <ProjectGridCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const ProjectDetail: React.FC<{ id: number; onBack: () => void }> = ({ id, onBack }) => {
  const { t } = useLanguage();
  const projectsData = t.projectsList || t.projects;
  const project = projectsData.find((p: any) => p.id === id);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => window.scrollTo(0, 0), [id]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        {t.projects.notFound}
    </div>
  );

  return (
    <section className="pb-24 pt-12 md:pt-16">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <nav className="mb-10 md:mb-14">
            <Button variant="ghost" onClick={onBack} className="pl-0 hover:pl-2 text-muted-foreground hover:text-foreground transition-all gap-2 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.projects.backArchive}
            </Button>
        </nav>

        <motion.div className="space-y-12 mb-16 md:mb-24" {...fadeInUp()}>
             <div className="space-y-6">
                <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-primary tracking-widest uppercase border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
                    {project.title}
                </h1>
                <p className="text-lg md:text-3xl font-light text-muted-foreground max-w-3xl leading-snug italic">
                    "{project.description}"
                </p>
             </div>

             <div className="aspect-video w-full rounded-3xl overflow-hidden bg-muted relative group">
                {!loaded && <Skeleton className="absolute inset-0" />}
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    onLoad={() => setLoaded(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
             </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            <motion.div className="lg:col-span-4 space-y-10" {...fadeInUp(0.1)}>
                <div className="space-y-8 sticky top-24">
                    <DetailItem label="Cliente" value={project.client || "Sector Tech"} icon={<Briefcase size={16}/>} />
                    <DetailItem label="Período" value={project.year || "2026"} icon={<Calendar size={16}/>} />
                    <DetailItem label="Rol" value={project.role || "Lead Architect"} icon={<Layers size={16}/>} />
                    
                    <div className="pt-6 border-t border-border flex gap-4">
                         <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
                            Live Demo <Globe size={16} />
                         </a>
                         <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted border border-border text-muted-foreground hover:text-foreground transition-all">
                            <Github size={20} />
                         </a>
                    </div>
                </div>
            </motion.div>

            <motion.div className="lg:col-span-8 space-y-16 md:space-y-24" {...fadeInUp(0.2)}>
                <ProjectContentSection 
                    title={t.projects.challenge} 
                    content={project.challenge || "Desarrollar una infraestructura robusta que soporte el crecimiento exponencial del tráfico web."} 
                    number="01"
                />
                <ProjectContentSection 
                    title={t.projects.strategy} 
                    content={project.solution || "Implementación de una arquitectura basada en microservicios comunicados vía gRPC."} 
                    number="02"
                />
                <ProjectContentSection 
                    title={t.projects.results} 
                    content={project.result || "Aumento de la eficiencia en el procesamiento en un 40%."} 
                    number="03"
                />

                <div className="space-y-8">
                     <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <h3 className="text-base font-bold font-display uppercase tracking-widest text-muted-foreground">{t.projects.techStack}</h3>
                        <div className="h-px flex-1 bg-border" />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {project.techStack?.map((group: any) => (
                            <div key={group.category} className="space-y-4">
                                <h4 className="text-sm font-bold text-primary uppercase tracking-tighter">{group.category}</h4>
                                <ul className="space-y-2">
                                    {group.tools.map((tool: string) => (
                                        <li key={tool} className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <ChevronRight size={14} className="text-primary/50" /> {tool}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                     </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const DetailItem: React.FC<{ label: string; value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="group cursor-default">
    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">
        {icon} {label}
    </div>
    <div className="text-xl font-display font-bold text-foreground">{value}</div>
  </div>
);

const ProjectContentSection: React.FC<{ title: string; content: string; number: string }> = ({ title, content, number }) => (
    <div className="space-y-6 relative">
        <div className="absolute -left-8 md:-left-14 top-0 text-5xl md:text-7xl font-display font-bold text-primary/5 select-none">{number}</div>
        <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground">{title}</h3>
        <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-light">{content}</p>
    </div>
);
