import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Smooth mouse tracking with slightly energetic physics
  const mouseX = useSpring(0, { damping: 22, stiffness: 280, restDelta: 0.001 });
  const mouseY = useSpring(0, { damping: 22, stiffness: 280, restDelta: 0.001 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      // Improved pointer detection that checks computed style
      const computedStyle = window.getComputedStyle(target);
      const isSelectable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        computedStyle.cursor === "pointer" ||
        target.classList.contains("cursor-pointer");
      
      setIsPointer(!!isSelectable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Dynamic Colorful Ring */}
      <motion.div
        className="fixed w-6 h-6 border rounded-full flex items-center justify-center pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          borderWidth: isPointer ? "1px" : "1.5px",
          backgroundColor: isPointer ? "rgba(var(--primary-rgb), 0.15)" : "rgba(255, 255, 255, 0.03)", 
          borderColor: isPointer ? "rgba(255, 255, 255, 0.9)" : "rgba(var(--primary-rgb), 0.4)", 
          boxShadow: isPointer ? "0 0 30px rgba(var(--primary-rgb), 0.5)" : "0 0 10px rgba(var(--primary-rgb), 0.1)",
          backdropFilter: isPointer ? "blur(6px)" : "blur(0px)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
          {/* Inner Core */}
          <motion.div 
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              scale: isPointer ? 0.8 : 1,
              backgroundColor: isPointer ? "#ffffff" : "var(--primary)",
              boxShadow: isPointer ? "0 0 10px #ffffff" : "none",
            }}
          />
          
          {/* subtle Spinning Orbit */}
          {isPointer && (
              <motion.div 
                className="absolute inset-0 border-t-2 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
          )}
      </motion.div>

      {/* colorful Glow Trail */}
      <motion.div
        className="fixed w-3 h-3 rounded-full blur-xs pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 12 : 0, // Un poco más de rastro en hover
          opacity: isPointer ? 0.25 : 0,
          background: "radial-gradient(circle, #ff00ff, transparent)",
        }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
};
