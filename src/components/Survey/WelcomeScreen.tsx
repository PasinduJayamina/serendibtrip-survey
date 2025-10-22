'use client';

import { motion } from 'framer-motion';
import { Palmtree, Waves, Sparkles, Rocket, Timer, Lock } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  lang: 'en' | 'si';
}

export default function WelcomeScreen({ onStart, lang }: WelcomeScreenProps) {
  const content = {
    en: {
      title: 'SerendibTrip',
      subtitle: 'Discover Your Sri Lankan Travel Personality',
      greeting: 'Hey there, wanderer!',
      description:
        "Ready to discover what kind of Sri Lankan traveler you are? Let's explore the island question by question.",
      time: 'Takes only 2 minutes',
      button: 'START YOUR JOURNEY',
      privacy: 'Your answers are 100% anonymous',
    },
    si: {
      title: 'SerendibTrip',
      subtitle: 'Discover Your Sri Lankan Travel Personality',
      greeting: 'Hey there, wanderer!',
      description:
        "Ready to discover what kind of Sri Lankan traveler you are? Let's explore the island question by question.",
      time: 'Takes only 2 minutes',
      button: 'START YOUR JOURNEY',
      privacy: 'Your answers are 100% anonymous',
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10">
          <Palmtree className="w-32 h-32 text-white" />
        </div>
        <div className="absolute top-40 right-20">
          <Waves className="w-40 h-40 text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <Sparkles className="w-24 h-24 text-white" />
        </div>
      </div>
      <motion.div
        className="max-w-2xl w-full text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-2xl">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
            {t.subtitle}
          </p>
        </motion.div>
        <motion.div
          className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t.greeting}
        </motion.div>
        <motion.p
          className="text-lg md:text-xl text-white/95 leading-relaxed max-w-xl mx-auto font-medium drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {t.description}
        </motion.p>
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full shadow-xl border border-white/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Timer className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">{t.time}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pt-4"
        >
          <motion.button
            onClick={onStart}
            className="group relative px-10 py-5 bg-white text-teal-600 rounded-full text-lg md:text-xl font-bold shadow-2xl overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              {t.button}
              <Rocket className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>
        <motion.div
          className="flex items-center justify-center gap-2 text-white/90 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Lock className="w-4 h-4 text-white" />
          <span className="text-sm md:text-base">{t.privacy}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
