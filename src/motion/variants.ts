/* Custom motion helpers compatible with framer-motion Variants */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MotionVariant = Record<string, any>;

export function fadeInUp(delay = 0): MotionVariant {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

export const staggerContainer: MotionVariant = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  viewport: { once: true },
};

export function staggerItem(i = 0): MotionVariant {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    },
    viewport: { once: true },
  };
}

export const pageTransition: MotionVariant = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

export const scaleIn: MotionVariant = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};
