import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes without conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format time in MM:SS format
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Calculate progress percentage
export function calculateProgress(section: string): number {
  const progressMap: Record<string, number> = {
    welcome: 0,
    about: 15,
    interests: 35,
    foodstay: 60,
    reactions: 80,
    final: 95,
    complete: 100,
  };
  return progressMap[section] || 0;
}

// Get browser info
export function getBrowserInfo() {
  if (typeof window === 'undefined') return 'unknown';

  const ua = window.navigator.userAgent;
  let browserName = 'Unknown';

  if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
  } else if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
  } else if (ua.indexOf('Edge') > -1) {
    browserName = 'Edge';
  }

  return browserName;
}

// Shuffle array (for randomizing question order if needed)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
