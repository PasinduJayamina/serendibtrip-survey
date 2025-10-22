'use client';

import { motion } from 'framer-motion';

export default function SurveyLoader() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="text-center space-y-3">
        <div className="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg mx-auto animate-pulse" />
        <div className="h-4 w-48 bg-gray-100 rounded mx-auto animate-pulse" />
      </div>

      {/* Question Skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-72 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl animate-pulse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="flex justify-center pt-6">
        <div className="h-12 w-40 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
