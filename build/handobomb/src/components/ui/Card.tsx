import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  borderGlow?: boolean;
}

export function Card({ children, className = '', glow = false, borderGlow = false }: CardProps) {
  const baseClasses = "relative bg-brand-card clip-chamfer p-6 sm:p-8 overflow-hidden transition-all duration-300";
  const glowClasses = glow ? "dashboard-glow" : "";
  const borderClasses = borderGlow ? "dashboard-border" : "border border-white/5";
  
  return (
    <div className={`${baseClasses} ${glowClasses} ${borderClasses} ${className}`}>
      {/* Abstract Dashboard Accents */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-1 h-1 bg-brand-yellow/40 rounded-full"></div>
      <div className="absolute top-4 right-6 w-1 h-1 bg-brand-yellow/40 rounded-full"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
