import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background absolute inset-0 z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border border-primary/20 bg-primary/5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner spinner */}
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center dot */}
        <div className="absolute w-2 h-2 rounded-full bg-primary" />
      </div>

      <motion.p
        className="mt-8 text-sm font-bold font-display uppercase tracking-widest text-primary/70"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Cargando...
      </motion.p>
    </div>
  );
};
