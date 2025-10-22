'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingNavProps {
  currentSection: number;
  totalSections: number;
  onSectionChange?: (section: number) => void;
  lang: 'en' | 'si';
}

const sectionNames = {
  en: ['Welcome', 'About You', 'Travel', 'Food & Stay', 'Reactions', 'Final'],
  si: ['ආයුබෝවන්', 'ඔබ ගැන', 'සංචාරය', 'ආහාර', 'ප්‍රතික්‍රියා', 'අවසාන'],
};

export default function FloatingNav({
  currentSection,
  totalSections,
  onSectionChange,
  lang,
}: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.8)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(8px)', 'blur(20px)']
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
    >
      <div className="flex items-center gap-4 px-6 py-3 rounded-full shadow-premium border border-white/20">
        {/* Logo/Brand */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="flex items-center gap-2"
        >
          <div className="text-2xl">🏝️</div>
          <span className="font-heading font-bold text-lg bg-gradient-to-r from-teal-600 to-coral-600 bg-clip-text text-transparent">
            SerendibTrip
          </span>
        </motion.div>

        {/* Divider */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

        {/* Progress Indicator */}
        <div className="flex items-center gap-3">
          {/* Section dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalSections }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => onSectionChange?.(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSection
                      ? 'bg-gradient-to-r from-teal-500 to-coral-500 w-8'
                      : index < currentSection
                      ? 'bg-teal-400'
                      : 'bg-gray-300'
                  }`}
                  animate={
                    index === currentSection
                      ? {
                          boxShadow: [
                            '0 0 0px rgba(46, 139, 87, 0)',
                            '0 0 20px rgba(46, 139, 87, 0.6)',
                            '0 0 0px rgba(46, 139, 87, 0)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap
                             px-3 py-1 rounded-lg bg-gray-900/90 text-white text-xs font-medium
                             backdrop-blur-sm pointer-events-none"
                >
                  {sectionNames[lang][index]}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45" />
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Progress percentage */}
          <motion.div
            className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-500/20 to-coral-500/20 backdrop-blur-sm"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-bold bg-gradient-to-r from-teal-600 to-coral-600 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </div>

        {/* Language toggle */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700"
        >
          {lang === 'en' ? '🇬🇧 EN' : '🇱🇰 සිං'}
        </motion.div>
      </div>

      {/* Floating progress bar below */}
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gray-200/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 via-golden-500 to-coral-500 rounded-full"
          style={{ width: `${progress}%` }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.nav>
  );
}
