import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../styles/animations.css';
import './globals.css';

// Optimized font loading with subset and reduced weights
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'SerendibTrip Explorer - Discover Your Sri Lankan Travel Personality',
  description:
    'Take a 2-minute interactive survey to discover what kind of Sri Lankan traveler you are. Explore beaches, mountains, heritage sites, and more!',
  keywords: [
    'Sri Lanka',
    'travel',
    'survey',
    'tourism',
    'SerendibTrip',
    'travel personality',
  ],
  authors: [{ name: 'PasinduJayamina' }],
  openGraph: {
    title: 'SerendibTrip Explorer',
    description:
      'Discover your Sri Lankan travel personality in just 2 minutes!',
    type: 'website',
  },
  // Performance hints
  other: {
    'theme-color': '#14b8a6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.className} antialiased bg-cream`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
