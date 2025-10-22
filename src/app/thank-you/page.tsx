'use client';

import { useState, useEffect } from 'react';
import ThankYou from '@/components/Survey/ThankYou';

export default function ThankYouPage() {
  const [lang, setLang] = useState<'en' | 'si'>('en');

  useEffect(() => {
    // Get language from localStorage or URL param
    const savedLang = localStorage.getItem('survey_language') as 'en' | 'si';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  return <ThankYou lang={lang} />;
}
