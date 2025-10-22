'use client';

import { motion } from 'framer-motion';
import { ReactNode, memo, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

function Input({
  label,
  error,
  icon,
  helperText,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border-2 transition-all',
            'text-gray-800 text-sm font-medium',
            'placeholder:text-gray-400 placeholder:font-normal',
            'focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:scale-[1.01]',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-teal-500 hover:border-gray-300',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default memo(Input);
