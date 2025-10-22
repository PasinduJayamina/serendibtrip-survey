'use client';

import { useState } from 'react';
import { SurveySection } from '@/types/survey';

export function useFormProgress() {
  const [currentSection, setCurrentSection] =
    useState<SurveySection>('welcome');

  const sections: SurveySection[] = [
    'welcome',
    'about',
    'interests',
    'foodstay',
    'reactions',
    'final',
  ];

  const goToNext = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const goToPrevious = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const goToSection = (section: SurveySection) => {
    setCurrentSection(section);
  };

  const progress = () => {
    const currentIndex = sections.indexOf(currentSection);
    return ((currentIndex + 1) / sections.length) * 100;
  };

  return {
    currentSection,
    goToNext,
    goToPrevious,
    goToSection,
    progress: progress(),
    isFirst: currentSection === 'welcome',
    isLast: currentSection === 'final',
  };
}
