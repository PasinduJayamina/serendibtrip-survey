'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface CardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export default function Card({
  children,
  selected,
  onClick,
  className,
  icon,
}: CardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl border-2 transition-all duration-300
        ${
          selected
            ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-2xl scale-105'
            : 'border-gray-200 bg-white hover:border-teal-400 hover:shadow-lg hover:bg-gray-50'
        }
        ${className}
      `}
      whileHover={{ scale: selected ? 1.05 : 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.div
          className="text-4xl mb-3"
          animate={
            selected ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}
          }
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      )}

      <div
        className={`text-base font-semibold ${
          selected ? 'text-teal-700' : 'text-gray-700'
        }`}
      >
        {children}
      </div>

      {selected && (
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        </motion.div>
      )}

      {selected && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-teal-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
