'use client';

import { motion } from 'framer-motion';
import { Hotel, Utensils, ArrowRight, ArrowLeft } from 'lucide-react';
import Card3D from '@/components/ui/Card3D';
import Button from '@/components/ui/Button';

interface FoodStayProps {
  data: {
    accommodation?: string[];
    food_style?: string[];
  };
  onChange: (field: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  lang: 'en' | 'si';
}

const accommodations = [
  { value: 'hotels', icon: 'Hotel', en: 'Hotels', si: 'හෝටල්' },
  { value: 'guesthouses', icon: 'Home', en: 'Guesthouses', si: 'ගෙස්ට් හවුස්' },
  { value: 'homestays', icon: 'Home', en: 'Homestays', si: 'නිවාස නවාතැන්' },
  { value: 'camping', icon: 'Tent', en: 'Camping', si: 'කඳවුරු බැඳීම' },
  {
    value: 'luxury',
    icon: 'Gem',
    en: 'Luxury resorts',
    si: 'සුඛෝපභෝගී නිවාඩු නිකේතන',
  },
  {
    value: 'budget',
    icon: 'DollarSign',
    en: 'Budget stays',
    si: 'අඩු වියදම් නවාතැන්',
  },
];

const foodStyles = [
  {
    value: 'rice_curry',
    icon: 'UtensilsCrossed',
    en: 'Rice & curry',
    si: 'බත් සහ ව්‍යංජන',
  },
  {
    value: 'street_food',
    icon: 'Utensils',
    en: 'Street food',
    si: 'වීදි ආහාර',
  },
  { value: 'seafood', icon: 'Fish', en: 'Seafood', si: 'මුහුදු ආහාර' },
  { value: 'fast_food', icon: 'Beef', en: 'Fast food', si: 'ක්ෂණික ආහාර' },
  {
    value: 'vegetarian',
    icon: 'Leaf',
    en: 'Vegetarian/Vegan',
    si: 'නිර්මාංශ/වීගන්',
  },
];

export default function FoodStay({
  data,
  onChange,
  onNext,
  onBack,
  lang,
}: FoodStayProps) {
  const isComplete =
    data.accommodation &&
    data.accommodation.length > 0 &&
    data.food_style &&
    data.food_style.length > 0;

  const handleAccommodationToggle = (value: string) => {
    const current = data.accommodation || [];
    const updated = current.includes(value)
      ? current.filter((a) => a !== value)
      : [...current, value];
    onChange('accommodation', updated);
  };

  const handleFoodToggle = (value: string) => {
    const current = data.food_style || [];
    const updated = current.includes(value)
      ? current.filter((f) => f !== value)
      : [...current, value];
    onChange('food_style', updated);
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
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🍽️
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {lang === 'en' ? 'Food & Stay' : 'ආහාර සහ නවාතැන'}
          </h2>
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🏨
          </motion.span>
        </motion.div>
        <p className="text-base text-gray-600">
          {lang === 'en'
            ? 'Tell us how you like to eat & sleep!'
            : 'ඔබ කන්න සහ නිදන්න කැමති විදිය කියන්න!'}
        </p>
      </div>

      {/* Q10: Accommodation */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Hotel className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? 'Where do you like to stay when traveling?'
            : 'සංචාරය කරන විට ඔබ නවාතැන් ගැනීමට කැමති කොහේද?'}
          <span className="text-sm text-gray-500 font-normal">
            ({lang === 'en' ? 'Select all that apply' : 'අදාළ සියල්ල තෝරන්න'})
          </span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {accommodations.map((acc) => (
            <Card3D
              key={acc.value}
              icon={acc.icon}
              selected={data.accommodation?.includes(acc.value)}
              onClick={() => handleAccommodationToggle(acc.value)}
            >
              {lang === 'en' ? acc.en : acc.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Q11: Food Styles */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-teal-500" />
          {lang === 'en'
            ? 'Favorite food styles while traveling:'
            : 'සංචාරය කරන විට කැමති ආහාර විලාසය:'}
          <span className="text-sm text-gray-500 font-normal">
            ({lang === 'en' ? 'Select all that apply' : 'අදාළ සියල්ල තෝරන්න'})
          </span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {foodStyles.map((food) => (
            <Card3D
              key={food.value}
              icon={food.icon}
              selected={data.food_style?.includes(food.value)}
              onClick={() => handleFoodToggle(food.value)}
            >
              {lang === 'en' ? food.en : food.si}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onBack} variant="outline" icon={<ArrowLeft />}>
          {lang === 'en' ? 'Back' : 'ආපසු'}
        </Button>
        <Button
          onClick={onNext}
          variant="primary"
          icon={<ArrowRight />}
          disabled={!isComplete}
        >
          {lang === 'en' ? 'Continue' : 'ඊළඟ'}
        </Button>
      </div>
    </motion.div>
  );
}
