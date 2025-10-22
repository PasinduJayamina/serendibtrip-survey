'use client';

import { memo } from 'react';

function PremiumBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Static gradient orbs - better performance than animated */}
      <div className="absolute w-96 h-96 top-[20%] left-[10%] rounded-full bg-gradient-to-br from-teal-400/15 to-teal-600/5 blur-3xl" />
      <div className="absolute w-80 h-80 top-[50%] left-[60%] rounded-full bg-gradient-to-br from-emerald-400/15 to-emerald-600/5 blur-3xl" />

      {/* Static mesh gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.03),transparent_50%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(PremiumBackground);
