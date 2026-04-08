import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const testimonials = t.testimonials;
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  const cardWidth = 280;
  const gap = 24;

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById('testimonials-container');
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const maxOffset = -(testimonials.length - 1) * (cardWidth + gap);
    const targetX = -index * (cardWidth + gap);
    const constrainedX = Math.min(0, Math.max(targetX, maxOffset));
    const controls = animate(x, constrainedX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
    return controls.stop;
  }, [index, x, cardWidth, gap, testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/4" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
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

      {/* Mobile/Desktop Layout */}
      <div className="relative" id="testimonials-container">
        {/* Desktop: Navigation arrows on sides */}
        <div className="hidden md:flex absolute -top-24 left-0 right-0 justify-between pointer-events-none px-4">
          <button
            onClick={prev}
            className="pointer-events-auto w-14 h-14 rounded-full border border-border bg-background/80 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-14 h-14 rounded-full border border-border bg-background/80 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[380px] md:h-[400px] overflow-visible">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -((testimonials.length - 1) * (cardWidth + gap)),
              right: 0
            }}
            className="flex gap-4 md:gap-6 absolute left-1/2 -translate-x-1/2 top-0"
          >
            {testimonials.map((test: any, i: number) => (
              <motion.div
                key={test.id}
                animate={{
                  scale: i === index ? 1 : 0.92,
                  opacity: i === index ? 1 : 0.4
                }}
                transition={{ duration: 0.4 }}
                className="shrink-0 w-[85vw] md:w-[350px] h-[340px] md:h-[400px]"
              >
                <div className={`bg-card/40 backdrop-blur-xl border ${i === index ? 'border-primary/30 shadow-2xl shadow-primary/5' : 'border-border/50'} rounded-3xl md:rounded-4xl p-5 md:p-10 relative overflow-hidden group h-full flex flex-col justify-between transition-all duration-500`}>
                  <Quote size={50} className={`absolute -top-3 -left-3 ${i === index ? 'text-primary/10' : 'text-primary/5'} -rotate-12 transition-all duration-700 hidden md:block`} />
                  <Quote size={40} className={`absolute -top-2 -left-2 ${i === index ? 'text-primary/15' : 'text-primary/5'} -rotate-12 transition-all duration-700 block md:hidden`} />

                  <div className="relative z-10 flex-1 flex items-center">
                    <p className={`text-sm md:text-xl font-light leading-relaxed italic ${i === index ? 'text-foreground' : 'text-muted-foreground'}`}>
                      "{test.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 md:gap-5 relative z-10 pt-4 md:pt-6 border-t border-white/5">
                    <div className="relative shrink-0">
                      {i === index && (
                        <div className="absolute -inset-1.5 bg-primary/20 rounded-full blur animate-pulse hidden md:block" />
                      )}
                      {i === index && (
                        <div className="absolute -inset-1 bg-primary/30 rounded-full blur animate-pulse md:hidden" />
                      )}
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 ${i === index ? 'border-primary/50' : 'border-background'} object-cover shadow-xl`}
                      />
                    </div>
                    <div className="overflow-hidden min-w-0">
                      <h4 className="text-sm md:text-lg font-display font-bold text-foreground truncate">
                        {test.name}
                      </h4>
                      <p className="text-[10px] md:text-sm text-muted-foreground truncate">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Previous/Next buttons (below card) */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border bg-background/80 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border bg-background/80 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
