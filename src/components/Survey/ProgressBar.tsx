'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const getEmoji = () => {
    if (progress < 25) return '\u{1F680}';
    if (progress < 50) return '\u{2728}';
    if (progress < 75) return '\u{1F3AF}';
    return '\u{1F389}';
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500 relative overflow-hidden rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </motion.div>
          </div>
          <motion.div
            className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-br from-teal-50 to-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-teal-200/50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <motion.span
              className="text-sm sm:text-base"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getEmoji()}
            </motion.span>
            <span className="text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
