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
    <button
      onClick={onClick}
      type="button"
      aria-pressed={selected}
      className={`
        w-full text-left cursor-pointer rounded-xl p-4 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1
        ${
          selected
            ? 'bg-teal-50 shadow-md ring-2 ring-teal-500 border-2 border-teal-500'
            : 'bg-white shadow-sm border-2 border-gray-300 hover:border-teal-300 active:border-teal-400'
        }
        ${className}
      `}
    >
      {/* Content */}
      <div className="flex flex-col gap-2">
        {icon && (
          <div
            className={`${
              selected ? 'text-teal-600' : 'text-gray-600'
            } transition-colors duration-200`}
          >
            {IconComponent ? (
              <IconComponent className="w-6 h-6" aria-hidden="true" />
            ) : (
              <span className="text-xl" aria-hidden="true">
                {icon}
              </span>
            )}
          </div>
        )}
        <div
          className={`text-sm font-medium leading-snug ${
            selected ? 'text-teal-900' : 'text-gray-800'
          }`}
        >
          {children}
        </div>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div
          className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"
          aria-label="Selected"
        >
          <span className="text-white text-xs font-bold" aria-hidden="true">
            ✓
          </span>
        </div>
      )}
    </button>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Card3D);
