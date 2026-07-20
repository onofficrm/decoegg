import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  disabled = false,
  ...props 
}: ButtonProps) {
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: 'bg-brand-yellow',
          hoverBg: 'group-hover:bg-brand-orange',
          text: 'text-brand-bg font-bold',
          border: 'border-transparent'
        };
      case 'secondary':
        return {
          bg: 'bg-brand-card',
          hoverBg: 'group-hover:bg-gray-800',
          text: 'text-brand-title font-bold',
          border: 'border-brand-yellow/50 group-hover:border-brand-yellow border-2'
        };
      case 'outline':
        return {
          bg: 'bg-transparent',
          hoverBg: 'group-hover:bg-brand-yellow/10',
          text: 'text-brand-yellow font-bold',
          border: 'border-brand-yellow border'
        };
      case 'ghost':
        return {
          bg: 'bg-transparent',
          hoverBg: 'group-hover:bg-brand-card',
          text: 'text-brand-title font-medium',
          border: 'border-transparent'
        };
      case 'accent':
        return {
          bg: 'bg-brand-orange',
          hoverBg: 'group-hover:bg-[#e64c14]',
          text: 'text-white font-bold',
          border: 'border-transparent'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <button 
      className={`group relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-bg ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Background shape with slant */}
      <span className={`absolute inset-0 h-full w-full -skew-x-12 transition-all duration-300 ${styles.bg} ${styles.hoverBg} ${styles.border}`}></span>
      
      {/* Inner Content */}
      <span className={`relative flex items-center justify-center gap-2 ${sizeClasses[size]} ${styles.text}`}>
        {children}
      </span>
    </button>
  );
}
