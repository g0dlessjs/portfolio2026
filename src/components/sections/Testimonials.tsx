import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const testimonials = t.testimonials;
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive dimensions
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardWidth = isMobile ? window.innerWidth * 0.85 - 16 : 350; // 85vw - gap on mobile
  const gap = isMobile ? 16 : 24;
  const cardHeight = isMobile ? 380 : 400;

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Animate carousel position
  useEffect(() => {
    const maxOffset = -(testimonials.length - 1) * (cardWidth + gap);
    const targetX = -index * (cardWidth + gap);
    const constrainedX = Math.min(0, Math.max(targetX, maxOffset));
    const controls = animate(x, constrainedX, {
      type: "spring",
      stiffness: 300,
      damping: 28,
    });
    return controls.stop;
  }, [index, x, cardWidth, gap, testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  // Total width for centering
  const totalWidth = testimonials.length * (cardWidth + gap) - gap;

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/4" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-4 md:mb-6"
        >
          <MessageSquareCode size={14} />
          {language === 'es' ? 'Testimonios' : 'Testimonials'}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-tight text-center mb-8 md:mb-12"
        >
          {language === 'es' ? 'Opiniones de ' : 'Voices from '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-400 to-indigo-400">
            {language === 'es' ? 'Colegas' : 'Industry'}
          </span>
        </motion.h2>
      </div>

      {/* Carousel Section */}
      <div className="relative" ref={containerRef}>
        {/* Desktop Navigation - sides with proper spacing */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-4 md:px-12 pointer-events-none z-20">
          <button
            onClick={prev}
            className="pointer-events-auto w-12 h-12 rounded-full border border-border bg-background/90 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 group"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-12 h-12 rounded-full border border-border bg-background/90 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 group"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Navigation - below carousel */}
        <div className="flex justify-center gap-6 mb-6 md:hidden">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border-2 border-border bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 hover:bg-background/80 transition-all active:scale-95"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border-2 border-border bg-background/50 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 hover:bg-background/80 transition-all active:scale-95"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Carousel Track - Centered */}
        <div className="overflow-hidden">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -((testimonials.length - 1) * (cardWidth + gap)),
              right: 0
            }}
            className="flex gap-4 md:gap-6"
            style={{
              width: totalWidth,
              margin: '0 auto',
              paddingLeft: 'max(1rem, calc((100vw - ' + totalWidth + 'px) / 2))'
            }}
          >
            {testimonials.map((test: any, i: number) => (
              <motion.div
                key={test.id}
                animate={{
                  scale: i === index ? 1 : 0.9,
                  opacity: i === index ? 1 : 0.45
                }}
                transition={{ duration: 0.4 }}
                className="shrink-0 cursor-pointer"
                style={{ width: cardWidth }}
                onClick={() => setIndex(i)}
              >
                <div className={`bg-card/40 backdrop-blur-xl border ${i === index ? 'border-primary/40 shadow-2xl shadow-primary/10' : 'border-border/50'} rounded-3xl md:rounded-4xl p-5 md:p-10 relative overflow-hidden group h-full flex flex-col justify-between transition-all duration-500`}>
                  {/* Quote icon */}
                  <Quote size={50} className={`absolute -top-3 -left-3 ${i === index ? 'text-primary/10' : 'text-primary/5'} -rotate-12 transition-all duration-700 hidden md:block`} />
                  <Quote size={40} className={`absolute -top-2 -left-2 ${i === index ? 'text-primary/15' : 'text-primary/5'} -rotate-12 transition-all duration-700 md:hidden`} />

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex items-center">
                    <p className={`${i === index ? 'text-foreground' : 'text-muted-foreground/50'} text-sm md:text-xl leading-relaxed italic`}>
                      "{test.content}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 md:gap-4 relative z-10 pt-4 md:pt-5 border-t border-white/10">
                    <div className="relative shrink-0">
                      {i === index && (
                        <div className="absolute -inset-2 bg-primary/20 rounded-full blur animate-pulse md:block hidden" />
                      )}
                      {i === index && (
                        <div className="absolute -inset-1.5 bg-primary/30 rounded-full blur animate-pulse md:hidden block" />
                      )}
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className={`relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 ${i === index ? 'border-primary/50 scale-105' : 'border-background'} object-cover shadow-xl transition-transform duration-300`}
                      />
                    </div>
                    <div className="overflow-hidden min-w-0">
                      <h4 className="text-sm md:text-base lg:text-lg font-display font-bold text-foreground truncate">
                        {test.name}
                      </h4>
                      <p className="text-[10px] md:text-xs lg:text-sm text-muted-foreground truncate">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8 md:mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-primary"
                : "w-2 bg-primary/20 hover:bg-primary/40 hover:w-3"
            }`}
            aria-label={`Ver testimonio ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
