import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Globe, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { profile, hero } = t;

  const jsonContent = {
    name: profile.name,
    role: profile.role,
    location: profile.location,
    status: profile.available ? 'Open to Work' : 'In Progress',
    skills: ['React', 'Next.js', 'Node.js', 'Cloud'],
    hobbies: ['Coding', 'Design', 'Gaming'],
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-16 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none opacity-30" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7" id="home">
            {profile.available && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase mb-8 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {hero.badge}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-display font-medium text-muted-foreground text-sm mb-4 uppercase tracking-[0.4em]">
                {profile.name} <span className="mx-2 text-primary/40 font-bold">•</span>{' '}
                {profile.role}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-6xl sm:text-7xl md:text-[7rem] lg:text-[8.8rem] font-display font-black tracking-tight leading-[1.05] mb-12 flex flex-col"
            >
              <span className="block text-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {hero.headline.split(' ')[0]}
              </span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-primary to-rose-400 pb-7">
                {hero.headline.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground/80 max-w-md leading-relaxed font-light mb-10"
            >
              {profile.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mb-20"
            >
              <Button
                variant="default"
                size="lg"
                className="group"
                onClick={() => onNavigate('projects')}
              >
                <Globe className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                {hero.cta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() => onNavigate('contact')}
              >
                <Mail className="mr-3 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                {hero.contact}
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Simplified JSON Window */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-purple-500/30 rounded-3xl blur opacity-30" />

            <div className="relative bg-zinc-950/90 dark:bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-mono ring-1 ring-white/10 min-h-[400px]">
              {/* Header */}
              <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 opacity-60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 opacity-60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 opacity-60" />
                </div>
                <div className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
                  profile.json
                </div>
              </div>

              {/* JSON Content */}
              <div className="p-8 text-sm sm:text-base leading-relaxed text-zinc-400">
                <span className="text-pink-400">{'{'}</span>
                <div className="pl-6 space-y-1">
                  <p>
                    <span className="text-sky-400">"name"</span>:{' '}
                    <span className="text-amber-200">"{jsonContent.name}"</span>,
                  </p>
                  <p>
                    <span className="text-sky-400">"role"</span>:{' '}
                    <span className="text-amber-200">"{jsonContent.role}"</span>,
                  </p>
                  <p>
                    <span className="text-sky-400">"location"</span>:{' '}
                    <span className="text-amber-200">"{jsonContent.location}"</span>,
                  </p>
                  <p>
                    <span className="text-sky-400">"status"</span>:{' '}
                    <span className="text-emerald-400">"{jsonContent.status}"</span>,
                  </p>
                  <p>
                    <span className="text-sky-400">"skills"</span>:{' '}
                    <span className="text-pink-400">[</span>
                    <span className="text-amber-200">
                      {jsonContent.skills.map((s, i) => (
                        <React.Fragment key={s}>
                          "{s}"{i < jsonContent.skills.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </span>
                    <span className="text-pink-400">]</span>,
                  </p>
                  <p>
                    <span className="text-sky-400">"hobbies"</span>:{' '}
                    <span className="text-pink-400">[</span>
                    <span className="text-amber-200">
                      {jsonContent.hobbies.map((h, i) => (
                        <React.Fragment key={h}>
                          "{h}"{i < jsonContent.hobbies.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </span>
                    <span className="text-pink-400">]</span>
                  </p>
                </div>
                <span className="text-pink-400">{'}'}</span>
              </div>

              {/* Footer Decoration */}
              <div className="mt-auto px-8 py-6 opacity-30 border-t border-white/5 flex items-center gap-2">
                <Terminal size={14} className="text-primary" />
                <span className="text-[10px] tracking-widest uppercase font-bold">
                  ReadOnly • UTF-8
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Explorer indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => onNavigate('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
        aria-label="Ir a siguiente sección"
      >
        <div className="w-px h-16 relative bg-white/10 dark:bg-white/5">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            animate={{ top: ['0%', '50%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>
    </section>
  );
};
