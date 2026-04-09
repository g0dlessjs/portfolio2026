import React from 'react';

export const Skeleton: React.FC<{
  className?: string;
  shimmer?: boolean;
}> = ({ className = '', shimmer = true }) => (
  <div
    className={`bg-muted/50 relative overflow-hidden ${className}`}
    role="status"
    aria-busy="true"
    aria-label="Cargando..."
  >
    {shimmer && (
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    )}
  </div>
);
