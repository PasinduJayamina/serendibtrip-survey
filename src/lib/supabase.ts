import { createClient } from '@supabase/supabase-js';
import type { SurveyResponse } from '@/types/survey';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate environment variables
if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl === 'your-project-url.supabase.co'
) {
  const errorMsg =
    '⚠️ SUPABASE NOT CONFIGURED! Please create .env.local with your Supabase credentials. See SETUP_SUPABASE.md for instructions.';
  console.error(errorMsg);
  throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No user auth needed
    autoRefreshToken: false,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application': 'serendibtrip-explorer',
    },
  },
});

// Type-safe database insert
export async function submitSurveyResponse(data: Partial<SurveyResponse>) {
  console.log('🔄 Attempting to insert into Supabase...');

  const { data: response, error } = await supabase
    .from('survey_responses')
    .insert([data])
    .select();

  if (error) {
    console.error('❌ Supabase error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }

  return response;
}
