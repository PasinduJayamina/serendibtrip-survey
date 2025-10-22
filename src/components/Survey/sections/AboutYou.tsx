'use client';

import { motion } from 'framer-motion';
import { Car, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import Card3D from '@/components/ui/Card3D';
import Button from '@/components/ui/Button';

interface AboutYouProps {
  data: {
    travel_frequency?: string;
    age_group?: string;
    travel_companions?: string[];
    district?: string;
  };
  onChange: (field: string, value: unknown) => void;
  onNext: () => void;
  lang: 'en' | 'si';
}

const travelFrequencies = [
  {
    value: 'several_month',
    icon: 'Car',
    en: 'Several times a month',
    si: 'මාසයකට කිහිප වතාවක්',
  },
  {
    value: 'few_months',
    icon: 'Calendar',
    en: 'Once every few months',
    si: 'මාස කිහිපයකට වරක්',
  },
  {
    value: 'once_twice_year',
    icon: 'Plane',
    en: 'Once or twice a year',
    si: 'වසරකට වරක් හෝ දෙවරක්',
  },
  { value: 'rarely', icon: 'Home', en: 'Rarely', si: 'කලාතුරකින්' },
];

const ageGroups = [
  { value: 'under_20', en: 'Under 20', si: '20 ට අඩු' },
  { value: '21_30', en: '21-30', si: '21-30' },
  { value: '31_40', en: '31-40', si: '31-40' },
  { value: '41_50', en: '41-50', si: '41-50' },
  { value: '51_plus', en: '51+', si: '51+' },
];

const companions = [
  { value: 'solo', icon: 'User', en: 'Solo', si: 'තනිවම' },
  { value: 'family', icon: 'Users', en: 'Family', si: 'පවුල සමඟ' },
  { value: 'friends', icon: 'Users', en: 'Friends', si: 'මිතුරන් සමඟ' },
  {
    value: 'tour_group',
    icon: 'Bus',
    en: 'Tour group',
    si: 'සංචාරක කණ්ඩායමක්',
  },
  { value: 'partner', icon: 'Heart', en: 'Partner', si: 'සහකරු සමඟ' },
];

const districts = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
];

export default function AboutYou({
  data,
  onChange,
  onNext,
  lang,
}: AboutYouProps) {
  const isComplete =
    data.travel_frequency &&
    data.age_group &&
    data.travel_companions &&
    data.travel_companions.length > 0 &&
    data.district;

  const handleCompanionToggle = (value: string) => {
    const current = data.travel_companions || [];
    const updated = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value];
    onChange('travel_companions', updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="text-center space-y-2 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {lang === 'en' ? 'About You' : 'ඔබ ගැන'}
          </h2>
        </motion.div>
        <p className="text-base text-gray-600">
          {lang === 'en'
            ? "Let's start with the basics!"
            : 'මූලික කරුණු එකතු කරමු!'}
        </p>
      </div>

      {/* Q1: Travel Frequency */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Car className="w-4 h-4 text-teal-500" />
          {lang === 'en'
            ? 'How often do you travel within Sri Lanka?'
            : 'ඔබ ශ්‍රී ලංකාව තුළ කොපමණ නිතර සංචාරය කරනවාද?'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {travelFrequencies.map((freq) => (
            <Card3D
              key={freq.value}
              icon={freq.icon}
              selected={data.travel_frequency === freq.value}
              onClick={() => onChange('travel_frequency', freq.value)}
              glowColor="rgba(46, 139, 87, 0.4)"
            >
              {lang === 'en' ? freq.en : freq.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Q2: Age Group */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-500" />
          {lang === 'en' ? "What's your age group?" : 'ඔබේ වයස් කාණ්ඩය කුමක්ද?'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((age) => (
            <button
              key={age.value}
              onClick={() => onChange('age_group', age.value)}
              className={`
                px-4 py-2 rounded-full font-medium text-sm transition-all
                ${
                  data.age_group === age.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200'
                }
              `}
            >
              {lang === 'en' ? age.en : age.si}
            </button>
          ))}
        </div>
      </div>

      {/* Q3: Travel Companions */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-500" />
          {lang === 'en'
            ? 'Who do you usually travel with?'
            : 'ඔබ සාමාන්‍යයෙන් සංචාරය කරන්නේ කවුරුන් සමඟද?'}
          <span className="text-xs text-gray-500 font-normal">
            ({lang === 'en' ? 'Select all' : 'සියල්ල තෝරන්න'})
          </span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {companions.map((comp) => (
            <Card3D
              key={comp.value}
              icon={comp.icon}
              selected={data.travel_companions?.includes(comp.value)}
              onClick={() => handleCompanionToggle(comp.value)}
              glowColor="rgba(249, 199, 79, 0.4)"
            >
              {lang === 'en' ? comp.en : comp.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Q4: District */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          {lang === 'en' ? 'Where do you live?' : 'ඔබ ජීවත් වන්නේ කොහේද?'}
        </h3>
        <select
          value={data.district || ''}
          onChange={(e) => onChange('district', e.target.value)}
          className="w-full px-4 py-3 text-base font-medium text-gray-900 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/95 backdrop-blur-sm transition-all shadow-sm"
        >
          <option value="" className="text-gray-500">
            {lang === 'en'
              ? '📍 Select your district'
              : '📍 ඔබේ දිස්ත්‍රික්කය තෝරන්න'}
          </option>
          {districts.map((district) => (
            <option
              key={district}
              value={district}
              className="text-gray-900 py-2"
            >
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Next Button */}
      <motion.div
        className="flex justify-center pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onNext}
          disabled={!isComplete}
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {lang === 'en' ? 'Continue' : 'ඊළඟ'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
