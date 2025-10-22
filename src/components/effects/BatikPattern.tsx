'use client';

import { motion } from 'framer-motion';

export default function BatikPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      {/* SVG Batik-inspired pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="batik-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Lotus petals */}
            <motion.path
              d="M100,50 Q110,60 100,70 Q90,60 100,50 Z"
              fill="#4B8B3B"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 60px' }}
            />
            <circle cx="100" cy="60" r="8" fill="#FFA500" />

            {/* Traditional paisley */}
            <path
              d="M50,100 Q50,80 70,80 Q80,80 80,90 Q80,110 50,100 Z"
              fill="#B22222"
              opacity="0.6"
            />

            {/* Geometric patterns */}
            <circle cx="150" cy="50" r="5" fill="#2E8B57" />
            <circle cx="50" cy="150" r="5" fill="#FF6F61" />
            <circle cx="150" cy="150" r="5" fill="#F9C74F" />

            {/* Lines */}
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="200"
              stroke="#4B8B3B"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="0"
              y1="100"
              x2="200"
              y2="100"
              stroke="#4B8B3B"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-pattern)" />
      </svg>
    </div>
  );
}
