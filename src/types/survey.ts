export interface SurveyResponse {
  // Metadata
  language: 'en' | 'si';
  completion_time_seconds?: number;
  user_agent?: string;

  // Demographics
  travel_frequency: string;
  age_group: string;
  travel_companions: string[];
  district: string;

  // Travel Style
  interests: string[];
  preferred_time: string;
  trip_duration: string;
  budget: string;
  transport_mode: string;

  // Preferences
  accommodation: string[];
  food_style: string[];

  // Reactions
  reaction_adams_peak: 'like' | 'skip';
  reaction_mirissa_whales: 'like' | 'skip';
  reaction_galle_fort: 'like' | 'skip';
  reaction_anuradhapura: 'like' | 'skip';
  reaction_colombo_food: 'like' | 'skip';

  // Behavior
  spontaneity: string;
  wants_events: 'yes' | 'maybe' | 'no';

  // Consent
  wants_marketing: boolean;
  data_consent: boolean;
}

export type SurveySection =
  | 'welcome'
  | 'about'
  | 'interests'
  | 'foodstay'
  | 'reactions'
  | 'final';
