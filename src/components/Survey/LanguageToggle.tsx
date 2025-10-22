'use client';

import { motion } from 'framer-motion';
import { Languages, Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: 'en' | 'si';
  onToggle: () => void;
}

export default function LanguageToggle({
  currentLang,
  onToggle,
}: LanguageToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-gray-100"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Globe className="w-5 h-5 text-teal-600" />
      </motion.div>
      <span className="text-sm font-bold text-gray-800">
        {currentLang === 'en' ? 'සිංහල' : 'English'}
      </span>
      <Languages className="w-5 h-5 text-teal-500" />
    </motion.button>
  );
}
