'use client';

import { motion } from 'framer-motion';

export default function SriLankanLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated Stupa/Dagoba */}
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            {/* Base */}
            <rect x="20" y="80" width="60" height="10" fill="#E5C9A5" />

            {/* Middle tiers */}
            <motion.path
              d="M25,80 L30,70 L70,70 L75,80 Z"
              fill="#FFA500"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />

            {/* Dome */}
            <motion.ellipse
              cx="50"
              cy="50"
              rx="25"
              ry="30"
              fill="#FFD166"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />

            {/* Spire */}
            <motion.path
              d="M50,10 L45,40 L55,40 Z"
              fill="#B22222"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            />

            {/* Top ornament */}
            <motion.circle
              cx="50"
              cy="8"
              r="3"
              fill="#FFA500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Animated wave dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-gradient-to-br from-ocean-400 to-teal-500"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        className="text-sm font-medium text-jungle-700"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading your journey...
      </motion.p>
    </div>
  );
}
