'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollSection({
  children,
  className = '',
  delay = 0,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 100, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
      }}
      className={`
        min-h-screen snap-start snap-always
        flex items-center justify-center
        px-4 py-20
        ${className}
      `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className="w-full max-w-7xl"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
