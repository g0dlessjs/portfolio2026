import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:brightness-125 hover:scale-[1.05] hover:shadow-[0_0_40px_-5px_rgba(var(--primary-rgb),0.6)] shadow-xl shadow-primary/30 ring-1 ring-white/10 hover:ring-white/30",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:scale-[1.03] border border-white/5 dark:border-white/10 shadow-lg",
    outline: "border-2 border-border bg-transparent hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-[1.05] dark:bg-white/5 hover:shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)]",
    ghost: "hover:bg-primary/10 hover:text-primary hover:scale-[1.1]",
    gradient: "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110 hover:scale-[1.05] shadow-lg shadow-purple-500/25 border-0"
  };

  const sizes = {
    sm: "h-9 px-4 text-xs tracking-wider uppercase",
    md: "h-12 px-8 text-sm tracking-wide",
    lg: "h-16 px-10 text-base tracking-wide",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};