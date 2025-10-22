'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SunriseTransitionProps {
  children: ReactNode;
  stage: number; // 0-5 representing survey progress
}

export default function SunriseTransition({
  children,
  stage,
}: SunriseTransitionProps) {
  const gradients = [
    'from-saffron-400 via-coral-400 to-ocean-400', // Dawn
    'from-golden-400 via-saffron-400 to-coral-500', // Early morning
    'from-ocean-300 via-aqua-400 to-teal-400', // Mid-morning
    'from-jungle-400 via-teal-500 to-ocean-500', // Noon
    'from-heritage-400 via-saffron-500 to-golden-500', // Afternoon
    'from-ocean-600 via-jungle-600 to-heritage-700', // Evening
  ];

  const currentGradient = gradients[Math.min(stage, gradients.length - 1)];

  return (
    <motion.div
      className={`relative min-h-screen bg-gradient-to-br ${currentGradient} transition-all duration-1000`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated sun */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-golden-300 to-saffron-500 shadow-2xl"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 30px rgba(249, 199, 79, 0.5)',
            '0 0 60px rgba(255, 165, 0, 0.8)',
            '0 0 30px rgba(249, 199, 79, 0.5)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          top: `${20 + stage * 10}%`,
          filter: 'blur(2px)',
        }}
      />

      {/* Cloud layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-16 bg-white/20 rounded-full blur-xl"
          animate={{
            x: ['0%', '100%'],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-40 h-20 bg-white/15 rounded-full blur-xl"
          animate={{
            x: ['100%', '0%'],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {children}
    </motion.div>
  );
}
