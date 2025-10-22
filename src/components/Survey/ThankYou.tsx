'use client';

import { motion } from 'framer-motion';
import { Sparkles, Trophy, Share2 } from 'lucide-react';
import { useEffect } from 'react';

interface ThankYouProps {
  lang: 'en' | 'si';
}

export default function ThankYou({ lang }: ThankYouProps) {
  useEffect(() => {
    // Dynamically import confetti only when needed
    import('canvas-confetti').then((confetti) => {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: ReturnType<typeof setInterval> = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti.default({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti.default({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    });
  }, []);

  const content = {
    en: {
      congrats: 'Congratulations!',
      badge: "You're a Sri Lanka Travel Explorer!",
      message: 'Thanks for helping us build better travel experiences',
      description: 'Your personalized travel insights are being crafted...',
      cta: 'Explore SerendibTrip',
      share: 'Share with Friends',
      home: 'Back to Home',
      footer: 'Built with ❤️ for Sri Lankan travelers',
    },
    si: {
      congrats: 'සුභපැතුම්!',
      badge: 'ඔබ ශ්‍රී ලංකා සංචාරක ගවේෂකයෙක්!',
      message: 'වඩා හොඳ සංචාරක අත්දැකීම් ගොඩනැගීමට අපට උදව් කිරීම ගැන ස්තූතියි',
      description: 'ඔබේ පුද්ගලාරෝපිත සංචාරක තොරතුරු සකස් කරමින් පවතී...',
      cta: 'SerendibTrip ගවේෂණය කරන්න',
      share: 'මිතුරන් සමඟ බෙදා ගන්න',
      home: 'මුල් පිටුවට',
      footer: 'ශ්‍රී ලාංකික සංචාරකයින් සඳහා ❤️ සමඟ ගොඩනගා ඇත',
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-golden-50 to-coral-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-teal-400 to-coral-400 rounded-full flex items-center justify-center shadow-2xl">
            <Trophy className="w-24 h-24 text-white" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-golden-500 absolute top-4 left-1/4" />
            <Sparkles className="w-6 h-6 text-teal-500 absolute bottom-8 right-1/4" />
            <Sparkles className="w-7 h-7 text-coral-500 absolute top-1/3 right-8" />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-800"
          >
            ✨ {t.congrats} ✨
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-coral-500 text-white text-xl font-semibold rounded-full shadow-lg"
          >
            {t.badge}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-700"
          >
            {t.message} 🇱🇰
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg font-semibold text-gray-800 relative z-10"
          >
            {t.description}
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => (window.location.href = '/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-coral-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            {t.cta}
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'SerendibTrip Explorer',
                  text: 'I just discovered my Sri Lankan travel personality!',
                  url: window.location.origin,
                });
              }
            }}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 font-semibold rounded-full border-2 border-teal-500 hover:bg-teal-50 transition-all"
          >
            <Share2 className="w-5 h-5" />
            {t.share}
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-gray-500 pt-8"
        >
          {t.footer}
        </motion.p>
      </motion.div>
    </div>
  );
}
