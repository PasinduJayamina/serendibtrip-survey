import { z } from 'zod';

export const surveySchema = z.object({
  // Metadata
  language: z.enum(['en', 'si']),
  completion_time_seconds: z.number().optional(),
  user_agent: z.string().optional(),

  // Demographics
  travel_frequency: z.string().min(1, 'Please select travel frequency'),
  age_group: z.string().min(1, 'Please select age group'),
  travel_companions: z
    .array(z.string())
    .min(1, 'Please select at least one companion type'),
  district: z.string().min(1, 'Please select your district'),

  // Travel Style
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  preferred_time: z.string().min(1, 'Please select preferred travel time'),
  trip_duration: z.string().min(1, 'Please select trip duration'),
  budget: z.string().min(1, 'Please select budget range'),
  transport_mode: z.string().min(1, 'Please select transport mode'),

  // Preferences
  accommodation: z
    .array(z.string())
    .min(1, 'Please select at least one accommodation type'),
  food_style: z
    .array(z.string())
    .min(1, 'Please select at least one food style'),

  // Reactions
  reaction_adams_peak: z.enum(['like', 'skip']),
  reaction_mirissa_whales: z.enum(['like', 'skip']),
  reaction_galle_fort: z.enum(['like', 'skip']),
  reaction_anuradhapura: z.enum(['like', 'skip']),
  reaction_colombo_food: z.enum(['like', 'skip']),

  // Behavior
  spontaneity: z.string().min(1, 'Please select spontaneity level'),
  wants_events: z.enum(['yes', 'maybe', 'no']),

  // Consent
  wants_marketing: z.boolean().default(false),
  data_consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to data usage to submit',
  }),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
