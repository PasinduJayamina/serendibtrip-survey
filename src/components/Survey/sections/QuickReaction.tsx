'use client';

import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import ReactionCard from '../../ui/ReactionCard';
import Button from '@/components/ui/Button';

interface QuickReactionProps {
  data: {
    reaction_adams_peak?: 'like' | 'skip' | null;
    reaction_mirissa_whales?: 'like' | 'skip' | null;
    reaction_galle_fort?: 'like' | 'skip' | null;
    reaction_anuradhapura?: 'like' | 'skip' | null;
    reaction_colombo_food?: 'like' | 'skip' | null;
    spontaneity?: string;
    wants_events?: 'yes' | 'maybe' | 'no';
  };
  onChange: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  lang: 'en' | 'si';
}

const experiences = [
  {
    key: 'reaction_adams_peak',
    icon: 'Sunrise',
    en: "Sunrise hike at Adam's Peak",
    si: 'ශ්‍රී පාදයේ හිරු උදාව දැකීම',
  },
  {
    key: 'reaction_mirissa_whales',
    icon: 'FishIcon',
    en: 'Watching whales in Mirissa',
    si: 'මීරිස්සෙහි තල්මසුන් නැරඹීම',
  },
  {
    key: 'reaction_galle_fort',
    icon: 'Castle',
    en: 'Exploring Galle Fort',
    si: 'ගාල්ල කොටුව ගවේෂණය',
  },
  {
    key: 'reaction_anuradhapura',
    icon: 'Landmark',
    en: 'Cultural walk in Anuradhapura',
    si: 'අනුරාධපුරයේ සංස්කෘතික ගමන',
  },
  {
    key: 'reaction_colombo_food',
    icon: 'Building2',
    en: 'Street food night in Colombo',
    si: 'කොළඹ වීදි ආහාර රාත්‍රිය',
  },
];

const spontaneityLevels = [
  {
    value: 'always_ready',
    icon: 'Luggage',
    emoji: '🚀',
    en: 'Always ready to go',
    si: 'සෑම විටම යාමට සූදානම්',
  },
  {
    value: 'sometimes',
    icon: 'Backpack',
    emoji: '😎',
    en: 'Sometimes',
    si: 'සමහර විට',
  },
  {
    value: 'plan_ahead',
    icon: 'Calendar',
    emoji: '📅',
    en: 'Rarely — I plan ahead',
    si: 'කලාතුරකින් — මම සැලසුම් කරමි',
  },
];

export default function QuickReaction({
  data,
  onChange,
  onNext,
  onBack,
  lang,
}: QuickReactionProps) {
  const allReactionsComplete = experiences.every(
    (exp) =>
      data[exp.key as keyof typeof data] !== null &&
      data[exp.key as keyof typeof data] !== undefined
  );

  const isComplete =
    allReactionsComplete && data.spontaneity && data.wants_events;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {lang === 'en' ? 'Quick Reactions' : 'ඉක්මන් ප්‍රතික්‍රියා'}
          </h2>
        </motion.div>
        <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
          {lang === 'en' ? 'Tap' : 'තට්ටු කරන්න'}
          <ThumbsUp className="w-4 h-4 text-teal-500" />
          {lang === 'en' ? "if you'd love it" : 'ඔබ එයට කැමති නම්'}
          |
          <ThumbsDown className="w-4 h-4 text-red-500" />
          {lang === 'en' ? 'if not your vibe' : 'ඔබේ විලාසය නොවේ නම්'}
        </p>
      </div>

      {/* Experience Reactions */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <ReactionCard
            key={exp.key}
            icon={exp.icon}
            title={lang === 'en' ? exp.en : exp.si}
            reaction={
              data[exp.key as keyof typeof data] as 'like' | 'skip' | null
            }
            onReact={(reaction: 'like' | 'skip') => onChange(exp.key, reaction)}
          />
        ))}
      </div>

      {/* Q17: Spontaneity */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Zap className="w-4 h-4 text-golden-500" />
          {lang === 'en'
            ? 'How spontaneous are you with trips?'
            : 'සංචාර සඳහා ඔබ කෙතරම් ස්වයංසිද්ධද?'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {spontaneityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onChange('spontaneity', level.value)}
              className={`
                p-4 rounded-xl border-2 transition-all text-center
                ${
                  data.spontaneity === level.value
                    ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-md ring-2 ring-teal-400'
                    : 'border-gray-200 bg-white hover:border-teal-200 hover:bg-teal-50/30'
                }
              `}
            >
              <div className="text-2xl mb-1" role="img" aria-label="icon">
                {level.emoji}
              </div>
              <div
                className={`text-sm font-semibold ${
                  data.spontaneity === level.value
                    ? 'text-teal-900'
                    : 'text-gray-700'
                }`}
              >
                {lang === 'en' ? level.en : level.si}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Q18: Events */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-gray-700">
          {lang === 'en'
            ? 'Would you like SerendibTrip to show exclusive local events/festivals while planning your trip?'
            : 'ඔබේ සංචාරය සැලසුම් කරන විට SerendibTrip විසින් විශේෂ දේශීය උත්සව පෙන්වීමට කැමතිද?'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onChange('wants_events', 'yes')}
            className={`
              px-4 py-3.5 rounded-xl font-semibold transition-all text-sm
              ${
                data.wants_events === 'yes'
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50/30'
              }
            `}
          >
            🎉 {lang === 'en' ? 'Yes, definitely' : 'ඔව්, අනිවාර්යයෙන්'}
          </button>
          <button
            onClick={() => onChange('wants_events', 'maybe')}
            className={`
              px-4 py-3.5 rounded-xl font-semibold transition-all text-sm
              ${
                data.wants_events === 'maybe'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/30'
              }
            `}
          >
            🤔 {lang === 'en' ? 'Maybe later' : 'පසුව විය හැක'}
          </button>
          <button
            onClick={() => onChange('wants_events', 'no')}
            className={`
              px-4 py-3.5 rounded-xl font-semibold transition-all text-sm
              ${
                data.wants_events === 'no'
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            ❌ {lang === 'en' ? 'Not interested' : 'උනන්දුවක් නැත'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onBack} variant="outline" icon={<ArrowLeft />}>
          {lang === 'en' ? 'Back' : 'ආපසු'}
        </Button>
        <Button
          onClick={onNext}
          variant="primary"
          icon={<ArrowRight />}
          disabled={!isComplete}
        >
          {lang === 'en' ? 'Continue' : 'ඊළඟ'}
        </Button>
      </div>
    </motion.div>
  );
}
