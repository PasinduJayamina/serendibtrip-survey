'use client';

import { motion } from 'framer-motion';
import { ReactNode, memo, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: string;
  variant?: 'default' | 'card';
}

function Checkbox({
  label,
  description,
  variant = 'default',
  className,
  checked,
  ...props
}: CheckboxProps) {
  if (variant === 'card') {
    return (
      <motion.label
        className={cn(
          'relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all group',
          'hover:shadow-md hover:scale-[1.01]',
          checked
            ? 'bg-teal-50 border-teal-400 shadow-sm'
            : 'bg-white border-gray-200 hover:border-teal-300',
          className
        )}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative flex items-center justify-center flex-shrink-0">
          <input
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={cn(
              'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
              checked
                ? 'bg-teal-500 border-teal-500'
                : 'bg-white border-gray-300 group-hover:border-teal-400'
            )}
            animate={{
              scale: checked ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: checked ? 1 : 0,
                scale: checked ? 1 : 0,
              }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              'text-sm font-medium transition-colors',
              checked
                ? 'text-teal-900'
                : 'text-gray-700 group-hover:text-teal-700'
            )}
          >
            {label}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </motion.label>
    );
  }

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer group',
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={cn(
            'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
            checked
              ? 'bg-teal-500 border-teal-500'
              : 'bg-white border-gray-300 group-hover:border-teal-400'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
          >
            <Check className="w-3 h-3 text-white stroke-[3]" />
          </motion.div>
        </motion.div>
      </div>
      {label && (
        <span className="text-sm text-gray-700 group-hover:text-teal-600 transition-colors select-none">
          {label}
        </span>
      )}
    </label>
  );
}

export default memo(Checkbox);
