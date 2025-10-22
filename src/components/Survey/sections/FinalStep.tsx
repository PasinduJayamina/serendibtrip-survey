'use client';

import { motion } from 'framer-motion';
import { Mail, Shield, Sparkles } from 'lucide-react';
import Checkbox from '@/components/ui/Checkbox';

interface FinalStepProps {
  data: {
    wants_marketing?: boolean;
    data_consent?: boolean;
  };
  onChange: (field: string, value: unknown) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError?: string | null;
  lang: 'en' | 'si';
}

export default function FinalStep({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
  lang,
}: FinalStepProps) {
  const canSubmit = data.data_consent === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <Sparkles className="w-10 h-10 text-teal-500" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {lang === 'en' ? 'One Last Thing' : 'අවසාන පියවර'}
          </h2>
        </motion.div>
        <p className="text-lg text-gray-600">
          {lang === 'en'
            ? 'Almost there! Just a couple of quick questions.'
            : 'මෙහෙම පැමිණිලා! ඉක්මන් ප්‍රශ්න කිහිපයක් පමණයි.'}
        </p>
      </div>

      {/* Marketing Opt-in */}
      <Checkbox
        variant="card"
        checked={data.wants_marketing || false}
        onChange={(e) => onChange('wants_marketing', e.target.checked)}
        label={
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
            <span className="font-semibold text-gray-800 text-base">
              {lang === 'en'
                ? 'Get travel insights & early beta access 📬'
                : 'සංචාරක තොරතුරු සහ මුල් බීටා ප්‍රවේශය ලබා ගන්න 📬'}
            </span>
          </div>
        }
        description={
          lang === 'en'
            ? 'Exclusive Sri Lankan travel tips, hidden gems, and first access to new features.'
            : 'විශේෂ ශ්‍රී ලාංකික සංචාරක උපදෙස්, සැඟවුණු මැණික්, සහ නව විශේෂාංග සඳහා පළමු ප්‍රවේශය.'
        }
      />

      {/* Privacy Consent (Required) */}
      <Checkbox
        variant="card"
        checked={data.data_consent || false}
        onChange={(e) => onChange('data_consent', e.target.checked)}
        label={
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <span className="font-semibold text-gray-800 text-base">
              {lang === 'en' ? 'Privacy Consent' : 'පෞද්ගලිකත්ව එකඟතාව'}
              <span className="text-red-500 ml-1">*</span>
            </span>
          </div>
        }
        description={
          lang === 'en'
            ? "I agree that my anonymous answers may be used to improve SerendibTrip's personalization."
            : 'SerendibTrip හි පුද්ගලාරෝපණය වැඩිදියුණු කිරීම සඳහා මගේ නිර්නාමික පිළිතුරු භාවිතා කළ හැකි බවට මම එකඟ වෙමි.'
        }
        className={data.data_consent ? 'border-teal-400' : 'border-gray-200'}
      />

      {/* Submit Note */}
      {!data.data_consent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-gray-500"
        >
          {lang === 'en'
            ? '* Required to submit the survey'
            : '* සමීක්ෂණය ඉදිරිපත් කිරීමට අවශ්‍යයි'}
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800">
              {lang === 'en' ? 'Submission Failed' : 'ඉදිරිපත් කිරීම අසාර්ථකයි'}
            </p>
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-full font-semibold text-base bg-white border-2 border-gray-300 text-gray-700 hover:border-teal-400 hover:text-teal-600 transition-all disabled:opacity-50"
        >
          ← {lang === 'en' ? 'Back' : 'ආපසු'}
        </button>
        <motion.button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`
            relative px-8 py-3 rounded-full font-bold text-base transition-all flex items-center gap-2 overflow-hidden
            ${
              canSubmit && !isSubmitting
                ? 'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {lang === 'en' ? 'Submitting...' : 'ඉදිරිපත් කරමින්...'}
              </>
            ) : (
              <>
                {lang === 'en'
                  ? 'Submit & Reveal My Type'
                  : 'ඉදිරිපත් කර මගේ වර්ගය හෙළි කරන්න'}{' '}
                🚀
              </>
            )}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
