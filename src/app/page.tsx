'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/Survey/WelcomeScreen';
import ProgressBar from '@/components/Survey/ProgressBar';
import LanguageToggle from '@/components/Survey/LanguageToggle';
import SurveyLoader from '@/components/Survey/SurveyLoader';
import { useFormProgress } from '@/hooks/useFormProgress';
import { useTimer } from '@/hooks/useTimer';
import { SurveyResponse } from '@/types/survey';
import PremiumBackground from '@/components/effects/PremiumBackground';

// Lazy load survey sections for better performance
const AboutYou = lazy(() => import('@/components/Survey/sections/AboutYou'));
const TravelInterests = lazy(
  () => import('@/components/Survey/sections/TravelInterests')
);
const FoodStay = lazy(() => import('@/components/Survey/sections/FoodStay'));
const QuickReaction = lazy(
  () => import('@/components/Survey/sections/QuickReaction')
);
const FinalStep = lazy(() => import('@/components/Survey/sections/FinalStep'));

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'si'>('en');
  const [formData, setFormData] = useState<Partial<SurveyResponse>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { currentSection, goToNext, goToPrevious, progress } =
    useFormProgress();
  const { seconds } = useTimer();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'si' : 'en');
  };

  const handleStart = () => {
    goToNext();
  };

  const handleFieldChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const submissionData = {
        ...formData,
        completion_time_seconds: seconds,
        language,
        // Ensure boolean fields have default values
        wants_marketing: formData.wants_marketing || false,
        data_consent: formData.data_consent || false,
      };

      // Log what we're sending for debugging
      console.log('📤 Submitting survey data:', submissionData);
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        console.error('Failed to submit survey:', result);

        // Show detailed validation errors if available
        let errorMessage =
          result.message ||
          result.error ||
          'Failed to submit survey. Please try again.';

        if (
          result.details &&
          Array.isArray(result.details) &&
          result.details.length > 0
        ) {
          const missingFields = result.details
            .map((err: { path?: string[] }) => err.path?.join('.') || 'unknown')
            .join(', ');
          errorMessage = `Validation failed: ${missingFields}`;
          console.error('Missing or invalid fields:', result.details);
        }

        setSubmitError(errorMessage);
        // Show error for 10 seconds for validation errors
        setTimeout(() => setSubmitError(null), 10000);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitError(
        'Network error. Please check your connection and try again.'
      );
      setTimeout(() => setSubmitError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    const content = (() => {
      switch (currentSection) {
        case 'about':
          return (
            <AboutYou
              data={formData}
              onChange={handleFieldChange}
              onNext={goToNext}
              lang={language}
            />
          );
        case 'interests':
          return (
            <TravelInterests
              data={formData}
              onChange={handleFieldChange}
              onNext={goToNext}
              onBack={goToPrevious}
              lang={language}
            />
          );
        case 'foodstay':
          return (
            <FoodStay
              data={formData}
              onChange={handleFieldChange}
              onNext={goToNext}
              onBack={goToPrevious}
              lang={language}
            />
          );
        case 'reactions':
          return (
            <QuickReaction
              data={formData}
              onChange={handleFieldChange}
              onNext={goToNext}
              onBack={goToPrevious}
              lang={language}
            />
          );
        case 'final':
          return (
            <FinalStep
              data={formData}
              onChange={handleFieldChange}
              onSubmit={handleSubmit}
              onBack={goToPrevious}
              isSubmitting={isSubmitting}
              submitError={submitError}
              lang={language}
            />
          );
        default:
          return null;
      }
    })();

    return <Suspense fallback={<SurveyLoader />}>{content}</Suspense>;
  };

  // Section-specific visual themes for variety
  const getSectionTheme = () => {
    switch (currentSection) {
      case 'about':
        return {
          gradient: 'from-purple-400/5 via-transparent to-pink-400/5',
          glow: 'rgba(168, 85, 247, 0.12)',
        };
      case 'interests':
        return {
          gradient: 'from-orange-400/5 via-transparent to-amber-400/5',
          glow: 'rgba(251, 146, 60, 0.12)',
        };
      case 'foodstay':
        return {
          gradient: 'from-red-400/5 via-transparent to-rose-400/5',
          glow: 'rgba(239, 68, 68, 0.12)',
        };
      case 'reactions':
        return {
          gradient: 'from-teal-400/5 via-transparent to-cyan-400/5',
          glow: 'rgba(20, 184, 166, 0.12)',
        };
      case 'final':
        return {
          gradient: 'from-green-400/5 via-transparent to-emerald-400/5',
          glow: 'rgba(16, 185, 129, 0.12)',
        };
      default:
        return {
          gradient: 'from-teal-400/5 via-transparent to-emerald-400/5',
          glow: 'rgba(20, 184, 166, 0.12)',
        };
    }
  };

  const theme = getSectionTheme();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Premium animated background */}
      <PremiumBackground />

      <AnimatePresence mode="wait">
        {currentSection === 'welcome' ? (
          <div className="min-h-screen flex items-center justify-center">
            <WelcomeScreen onStart={handleStart} lang={language} />
          </div>
        ) : (
          <>
            {/* Language toggle - top right */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40"
            >
              <LanguageToggle
                currentLang={language}
                onToggle={toggleLanguage}
              />
            </motion.div>

            {/* Beautiful bottom progress bar with percentage */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-0 left-0 right-0 z-40"
            >
              <ProgressBar progress={progress} />
            </motion.div>

            {/* Survey sections with beautiful glassmorphic cards */}
            <div className="min-h-screen flex items-center justify-center px-4 py-24 pb-32 sm:px-6">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full max-w-5xl mx-auto"
              >
                {/* Glassmorphic card container with section-specific theme */}
                <div
                  className="relative backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 
                             rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-white/60"
                >
                  {/* Section-specific ambient glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-2xl pointer-events-none`}
                  />

                  {/* Content */}
                  <div className="relative z-10">{renderSection()}</div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
