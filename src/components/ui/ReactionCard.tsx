'use client';

import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ReactionCardProps {
  icon: string;
  title: string;
  reaction: 'like' | 'skip' | null;
  onReact: (reaction: 'like' | 'skip') => void;
}

export default function ReactionCard({
  icon,
  title,
  reaction,
  onReact,
}: ReactionCardProps) {
  // Dynamic icon rendering
  const IconComponent = icon
    ? (Icons[icon as keyof typeof Icons] as LucideIcon)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 border-2 border-gray-200 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-teal-600">
            {IconComponent ? (
              <IconComponent className="w-7 h-7" />
            ) : (
              <span className="text-3xl">{icon}</span>
            )}
          </div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onReact('like')}
            className={`
              p-2.5 rounded-full transition-all
              ${
                reaction === 'like'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-400 hover:bg-teal-50 hover:text-teal-500'
              }
            `}
          >
            <ThumbsUp className="w-5 h-5" />
          </button>

          <button
            onClick={() => onReact('skip')}
            className={`
              p-2.5 rounded-full transition-all
              ${
                reaction === 'skip'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border-2 border-gray-300'
              }
            `}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
