'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export default function IconButton({
  icon,
  onClick,
  selected,
  className,
}: IconButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center transition-all
        ${
          selected
            ? 'bg-teal-500 text-white shadow-lg'
            : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-teal-300'
        }
        ${className}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.button>
  );
}
