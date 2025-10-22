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
        transition-all duration-200
        group
        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1
        sm:backdrop-blur-md
        ${
          selected
            ? [
                // Mobile: solid subtle selection background and border
                'bg-teal-50 ring-2 ring-teal-400',
                // Desktop+: premium gradient selection
                'sm:bg-gradient-to-br sm:from-teal-50 sm:via-emerald-50 sm:to-cyan-50 sm:shadow-md',
              ].join(' ')
            : [
                // Mobile: clean solid card with soft border/shadow
                'bg-white border border-gray-200 shadow-sm',
                // Desktop+: subtle glass gradient
                'sm:border-0 sm:bg-gradient-to-br sm:from-white sm:via-white sm:to-gray-50/50 sm:shadow-sm',
              ].join(' ')
        }
        ${className}
      `}
    >
      {/* Gradient glow effect (desktop only) */}
      <div
        className={`hidden sm:block absolute inset-0 rounded-xl bg-gradient-to-br ${
          selected
            ? 'from-teal-400/20 via-emerald-400/10 to-cyan-400/20'
            : 'from-white/50 via-white/30 to-transparent'
        } opacity-60 pointer-events-none`}
      />

      {/* Content */}
      <div className="relative z-10 min-h-[72px] sm:min-h-[90px]">
        {icon && (
          <div
            className={`mb-2 ${
              selected ? 'text-teal-600' : 'text-gray-600'
            } transition-colors duration-200`}
          >
            {IconComponent ? (
              <IconComponent
                className="w-6 h-6 sm:w-7 sm:h-7"
                aria-hidden="true"
              />
            ) : (
              <span
                className="text-xl sm:text-2xl filter drop-shadow-lg"
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
          className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md"
          aria-label="Selected"
        >
          <span
            className="text-white text-xs sm:text-sm font-bold"
            aria-hidden="true"
          >
            ✓
          </span>
        </div>
      )}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Card3D);
