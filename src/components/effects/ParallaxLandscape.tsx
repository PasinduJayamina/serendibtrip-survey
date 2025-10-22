'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxLandscape() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yMiddle = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yForeground = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Mountain silhouettes (background) */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute bottom-0 left-0 right-0 h-64 opacity-10"
      >
        <svg
          viewBox="0 0 1200 300"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,150 L200,80 L400,120 L600,60 L800,100 L1000,70 L1200,130 L1200,300 L0,300 Z"
            fill="#4B8B3B"
            opacity="0.5"
          />
          <path
            d="M0,180 L300,100 L500,140 L700,90 L900,130 L1200,110 L1200,300 L0,300 Z"
            fill="#2E8B57"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Palm trees (middle ground) */}
      <motion.div
        style={{ y: yMiddle }}
        className="absolute bottom-0 left-0 right-0 h-48 opacity-15"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 text-6xl"
            style={{ left: `${i * 15}%` }}
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🌴
          </motion.div>
        ))}
      </motion.div>

      {/* Ocean waves (foreground) */}
      <motion.div
        style={{ y: yForeground }}
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
      >
        <svg
          viewBox="0 0 1200 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 Q300,30 600,50 T1200,50 L1200,100 L0,100 Z"
            fill="#00B4D8"
            animate={{
              d: [
                'M0,50 Q300,30 600,50 T1200,50 L1200,100 L0,100 Z',
                'M0,50 Q300,70 600,50 T1200,50 L1200,100 L0,100 Z',
                'M0,50 Q300,30 600,50 T1200,50 L1200,100 L0,100 Z',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>

      {/* Floating birds */}
      <motion.div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${i * 40}px` }}
            animate={{
              x: [-100, 400],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          >
            🦜
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
