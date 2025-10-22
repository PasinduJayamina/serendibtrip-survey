'use client';

import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  icon,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'font-bold rounded-full transition-all inline-flex items-center justify-center gap-2 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600 active:from-teal-700 active:via-emerald-700 active:to-cyan-700 focus:ring-teal-400',
    secondary:
      'bg-white text-teal-600 border-2 border-teal-400 hover:bg-teal-50 hover:shadow-md hover:border-teal-500 active:bg-teal-100 focus:ring-teal-400',
    outline:
      'bg-transparent text-gray-700 border-2 border-gray-300 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 active:bg-gray-100 focus:ring-gray-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={
        ariaLabel || (typeof children === 'string' ? children : undefined)
      }
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed hover:shadow-lg',
        className
      )}
      whileHover={!disabled ? { scale: 1.03, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Vibrant gradient overlay on hover */}
      {!disabled && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 opacity-0"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10 font-bold">{children}</span>
    </motion.button>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Button);
