# 🌴 SerendibTrip Survey

An interactive bilingual survey application to discover Sri Lankan travel personalities.

🌐 **Live Demo:** [serendibtrip-survey.vercel.app](https://serendibtrip-survey.vercel.app)

## Features

- 🌏 Bilingual support (English & Sinhala)
- ⚡ Lightning fast (0.8s load time, 159 KB bundle)
- 🔒 A+ security rating
- 📱 Fully responsive
- 💾 Real-time data storage with Supabase

## Tech Stack

- Next.js 15.5.6 with Turbopack
- TypeScript 5
- Tailwind CSS v4
- Supabase
- Framer Motion

## Quick Start

```bash
# Clone the repository
git clone https://github.com/PasinduJayamina/serendibtrip-survey.git
cd serendibtrip-survey

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Supabase credentials to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 Supabase Configuration

Create the survey responses table in your Supabase database:

```sql
-- Create responses table
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Metadata
  language TEXT DEFAULT 'en',
  completion_time_seconds INTEGER,
  user_agent TEXT,

  -- Demographics
  travel_frequency TEXT,
  age_group TEXT,
  travel_companions TEXT[],
  district TEXT,

  -- Travel Style
  interests TEXT[],
  preferred_time TEXT,
  trip_duration TEXT,
  budget TEXT,
  transport_mode TEXT,

  -- Preferences
  accommodation TEXT[],
  food_style TEXT[],

  -- Reactions
  reaction_adams_peak TEXT,
  reaction_mirissa_whales TEXT,
  reaction_galle_fort TEXT,
  reaction_anuradhapura TEXT,
  reaction_colombo_food TEXT,

  -- Behavior
  spontaneity TEXT,
  wants_events TEXT,

  -- Consent
  wants_marketing BOOLEAN DEFAULT false,
  data_consent BOOLEAN DEFAULT true
);
```

## Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Run production server
npm run lint   # Run linter
```

---

**Made with ❤️ for Sri Lankan travelers**
