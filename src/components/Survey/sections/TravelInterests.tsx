'use client';

import { motion } from 'framer-motion';
import {
  Compass,
  Calendar,
  Clock,
  DollarSign,
  Car,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import Card3D from '@/components/ui/Card3D';
import Button from '@/components/ui/Button';

interface TravelInterestsProps {
  data: {
    interests?: string[];
    preferred_time?: string;
    trip_duration?: string;
    budget?: string;
    transport_mode?: string;
  };
  onChange: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  lang: 'en' | 'si';
}

const interests = [
  { value: 'beaches', icon: 'Umbrella', en: 'Beaches', si: 'වෙරළ' },
  { value: 'mountains', icon: 'Mountain', en: 'Mountains', si: 'කඳු' },
  {
    value: 'heritage',
    icon: 'Landmark',
    en: 'Culture & Heritage',
    si: 'සංස්කෘතිය සහ උරුමය',
  },
  { value: 'wildlife', icon: 'Palmtree', en: 'Wildlife', si: 'වන ජීවී' },
  { value: 'food', icon: 'UtensilsCrossed', en: 'Food', si: 'ආහාර' },
  { value: 'festivals', icon: 'PartyPopper', en: 'Festivals', si: 'උත්සව' },
  { value: 'adventure', icon: 'Waves', en: 'Adventure', si: 'වික්‍රමාන්විත' },
  {
    value: 'urban',
    icon: 'Building2',
    en: 'Urban Getaways',
    si: 'නාගරික විනෝද',
  },
];

const preferredTimes = [
  { value: 'weekends', en: 'Weekends', si: 'සති අන්තය' },
  { value: 'holidays', en: 'Public holidays', si: 'රජයේ නිවාඩු දින' },
  { value: 'school_vacation', en: 'School vacations', si: 'පාසල් නිවාඩු' },
  { value: 'anytime', en: 'Anytime I feel like it', si: 'ඕනෑම වේලාවක' },
];

const durations = [
  { value: '1_day', en: '1 day', si: 'දින 1' },
  { value: '2_3_days', en: '2-3 days', si: 'දින 2-3' },
  { value: '4_7_days', en: '4-7 days', si: 'දින 4-7' },
  { value: '7_plus', en: 'More than a week', si: 'සතියකට වැඩි' },
];

const budgets = [
  {
    value: 'below_5000',
    icon: 'DollarSign',
    en: 'Below LKR 5,000',
    si: 'රු. 5,000 ට අඩු',
  },
  {
    value: '5000_15000',
    icon: 'DollarSign',
    en: 'LKR 5,000-15,000',
    si: 'රු. 5,000-15,000',
  },
  {
    value: '15000_25000',
    icon: 'DollarSign',
    en: 'LKR 15,000-25,000',
    si: 'රු. 15,000-25,000',
  },
  {
    value: 'above_25000',
    icon: 'DollarSign',
    en: 'Above LKR 25,000',
    si: 'රු. 25,000 ට වැඩි',
  },
];

const transportModes = [
  { value: 'own_vehicle', icon: 'Car', en: 'My own vehicle', si: 'මගේම වාහනය' },
  {
    value: 'rented_car',
    icon: 'Car',
    en: 'Rented driver/car',
    si: 'කුලියට රියදුරු/කාර්',
  },
  {
    value: 'public',
    icon: 'Bus',
    en: 'Public transport',
    si: 'පොදු ප්‍රවාහනය',
  },
  {
    value: 'tour',
    icon: 'Compass',
    en: 'Organized tour',
    si: 'සංවිධිත සංචාරය',
  },
];

export default function TravelInterests({
  data,
  onChange,
  onNext,
  onBack,
  lang,
}: TravelInterestsProps) {
  const isComplete =
    data.interests &&
    data.interests.length > 0 &&
    data.preferred_time &&
    data.trip_duration &&
    data.budget &&
    data.transport_mode;

  const handleInterestToggle = (value: string) => {
    const current = data.interests || [];
    const updated = current.includes(value)
      ? current.filter((i) => i !== value)
      : [...current, value];
    onChange('interests', updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            🧭
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {lang === 'en' ? 'Your Travel Vibe' : 'ඔබේ සංචාරක විලාසය'}
          </h2>
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✈️
          </motion.span>
        </motion.div>
        <p className="text-base text-gray-600">
          {lang === 'en'
            ? 'What makes your heart race?'
            : 'ඔබේ හදවත වේගවත් කරන්නේ කුමක්ද?'}
        </p>
      </div>

      {/* Q5: Interests */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Compass className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? 'What type of trips do you enjoy most?'
            : 'ඔබ වඩාත්ම රසවිඳින සංචාර වර්ගය කුමක්ද?'}
          <span className="text-sm text-gray-500 font-normal">
            ({lang === 'en' ? 'Select all that apply' : 'අදාළ සියල්ල තෝරන්න'})
          </span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
          {interests.map((interest) => (
            <Card3D
              key={interest.value}
              icon={interest.icon}
              selected={data.interests?.includes(interest.value)}
              onClick={() => handleInterestToggle(interest.value)}
              className="h-28 flex flex-col items-center justify-center"
            >
              {lang === 'en' ? interest.en : interest.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Q6: Preferred Time */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? 'When do you usually prefer to travel?'
            : 'ඔබ සාමාන්‍යයෙන් සංචාරය කිරීමට කැමති කවදාද?'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferredTimes.map((time) => (
            <Card3D
              key={time.value}
              selected={data.preferred_time === time.value}
              onClick={() => onChange('preferred_time', time.value)}
            >
              {lang === 'en' ? time.en : time.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Q7: Duration */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? 'How long are your typical getaways?'
            : 'ඔබේ සාමාන්‍ය සංචාර කාලය කොපමණද?'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {durations.map((duration) => (
            <button
              key={duration.value}
              onClick={() => onChange('trip_duration', duration.value)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all
                ${
                  data.trip_duration === duration.value
                    ? 'bg-teal-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300'
                }
              `}
            >
              {lang === 'en' ? duration.en : duration.si}
            </button>
          ))}
        </div>
      </div>

      {/* Q8: Budget */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? "What's your average budget per day?"
            : 'ඔබේ දෛනික සාමාන්‍ය අයවැය කොපමණද?'}
          <span className="text-sm text-gray-500 font-normal">
            (
            {lang === 'en'
              ? 'per person, excluding food'
              : 'පුද්ගලයෙකුට, ආහාර හැර'}
            )
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <Card3D
              key={budget.value}
              icon={budget.icon}
              selected={data.budget === budget.value}
              onClick={() => onChange('budget', budget.value)}
            >
              {lang === 'en' ? budget.en : budget.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Q9: Transport */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Car className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? 'How do you usually travel?'
            : 'ඔබ සාමාන්‍යයෙන් ගමන් කරන්නේ කෙසේද?'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {transportModes.map((mode) => (
            <Card3D
              key={mode.value}
              icon={mode.icon}
              selected={data.transport_mode === mode.value}
              onClick={() => onChange('transport_mode', mode.value)}
            >
              {lang === 'en' ? mode.en : mode.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onBack}
          variant="outline"
          size="md"
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          {lang === 'en' ? 'Back' : 'ආපසු'}
        </Button>
        <Button
          onClick={onNext}
          disabled={!isComplete}
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {lang === 'en' ? 'Continue' : 'ඊළඟ'}
        </Button>
      </div>
    </motion.div>
  );
}
