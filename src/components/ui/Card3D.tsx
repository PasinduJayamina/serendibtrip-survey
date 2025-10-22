'use client';

import { ReactNode, memo } from 'react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Card3DProps {
  children: ReactNode;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
}

function Card3D({
  children,
  icon,
  selected = false,
  onClick,
  className = '',
}: Card3DProps) {
  // Dynamic icon rendering
  const IconComponent = icon
    ? (Icons[icon as keyof typeof Icons] as LucideIcon)
    : null;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`
        relative cursor-pointer rounded-xl p-4
        backdrop-blur-md
        transition-all duration-200
        group
        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1
        ${
          selected
            ? 'bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 shadow-md ring-2 ring-teal-400'
            : 'bg-gradient-to-br from-white via-white to-gray-50/50 shadow-sm'
        }
        ${className}
      `}
    >
      {/* Gradient glow effect */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
          selected
            ? 'from-teal-400/20 via-emerald-400/10 to-cyan-400/20'
            : 'from-white/50 via-white/30 to-transparent'
        } opacity-60 pointer-events-none`}
      />

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div
            className={`mb-2 ${
              selected ? 'text-teal-600' : 'text-gray-600'
            } transition-colors duration-200`}
          >
            {IconComponent ? (
              <IconComponent className="w-7 h-7" aria-hidden="true" />
            ) : (
              <span
                className="text-2xl filter drop-shadow-lg"
                aria-hidden="true"
              >
                {icon}
              </span>
            )}
          </div>
        )}
        <div
          className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
            selected ? 'text-teal-900' : 'text-gray-800'
          }`}
        >
          {children}
        </div>
      </div>

      {/* Selected indicator - simple checkmark */}
      {selected && (
        <div
          className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md"
          aria-label="Selected"
        >
          <span className="text-white text-sm font-bold" aria-hidden="true">
            ✓
          </span>
        </div>
      )}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Card3D);
