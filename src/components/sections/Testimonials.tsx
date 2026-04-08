import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const testimonials = t.testimonials;
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  const cardWidth = 350; 
  const gap = 24;
  
  const [centerOffset, setCenterOffset] = useState(0);

  useEffect(() => {
    const getCenterOffset = () => {
        const containerWidth = Math.min(window.innerWidth, 1280); 
        return (containerWidth - cardWidth) / 2;
    };
    setCenterOffset(getCenterOffset());
    const handleResize = () => setCenterOffset(getCenterOffset());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardWidth]);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const mobileOffset = (window.innerWidth - 280) / 2;
    const targetX = -index * (cardWidth + gap) + (window.innerWidth < 768 ? mobileOffset : centerOffset);
    const controls = animate(x, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    });
    return controls.stop;
  }, [index, x, cardWidth, gap, centerOffset]);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/4" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
        >
          <MessageSquareCode size={14} />
          {language === 'es' ? 'Testimonios' : 'Testimonials'}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-display font-bold leading-tight"
        >
          {language === 'es' ? 'Opiniones de ' : 'Voices from '} 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-400 to-indigo-400">
            {language === 'es' ? 'Colegas' : 'Industry'}
          </span>
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="relative h-[450px] md:h-[400px]">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -((testimonials.length - 1) * (cardWidth + gap)), right: 0 }}
            className="flex gap-6 absolute left-0 h-full"
          >
            {testimonials.map((test: any, i: number) => (
              <motion.div
                key={test.id}
                animate={{ 
                  scale: i === index ? 1 : 0.9,
                  opacity: i === index ? 1 : 0.4
                }}
                transition={{ duration: 0.5 }}
                className="shrink-0 w-[280px] md:w-[350px] h-full"
              >
                <div className={`bg-card/40 backdrop-blur-xl border ${i === index ? 'border-primary/30 shadow-2xl shadow-primary/5' : 'border-border/50'} rounded-4xl p-8 md:p-10 relative overflow-hidden group h-full flex flex-col justify-between transition-colors duration-500`}>
                  <Quote size={80} className={`absolute -top-4 -left-4 ${i === index ? 'text-primary/10' : 'text-primary/5'} -rotate-12 transition-all duration-700`} />
                  
                  <div className="relative z-10">
                    <p className={`text-lg md:text-xl font-light leading-relaxed italic ${i === index ? 'text-foreground' : 'text-muted-foreground'}`}>
                      "{test.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-5 relative z-10 pt-6 border-t border-white/5">
                    <div className="relative shrink-0">
                      {i === index && (
                        <div className="absolute -inset-1.5 bg-primary/20 rounded-full blur animate-pulse" />
                      )}
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className={`relative w-16 h-16 rounded-full border-2 ${i === index ? 'border-primary/50' : 'border-background'} object-cover shadow-xl`}
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-lg font-display font-bold text-foreground truncate">
                        {test.name}
                      </h4>
                      <p className="text-[11px] text-primary font-mono tracking-widest font-bold uppercase truncate">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="container px-4 md:px-6 mx-auto max-w-7xl absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-30">
          <button
            onClick={prev}
            className="pointer-events-auto w-14 h-14 rounded-full border border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-110 transition-all shadow-2xl active:scale-95 group -translate-x-1/2 md:translate-x-0"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-14 h-14 rounded-full border border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-110 transition-all shadow-2xl active:scale-95 group translate-x-1/2 md:translate-x-0"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      <div className="mt-16 flex justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-12 bg-primary" : "w-3 bg-primary/10 hover:bg-primary/20"
            }`}
            aria-label={`Ir al testimonio ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
