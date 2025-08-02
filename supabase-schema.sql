-- Drop existing tables to start fresh
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS user_preferences;

-- Create user_preferences table with snake_case column names (matching API expectations)
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  
  -- Food & Grocery Preferences
  grocery_brands TEXT[] DEFAULT '{}',
  delivery_time_preference TEXT,
  go_to_restaurants TEXT[] DEFAULT '{}',
  usual_meal_times JSONB DEFAULT '{}',
  is_vegetarian BOOLEAN DEFAULT false,
  spice_tolerance_level TEXT,
  
  -- Travel Preferences
  frequent_flight_routes TEXT[] DEFAULT '{}',
  flight_booking_sites TEXT[] DEFAULT '{}',
  flight_preferences JSONB DEFAULT '{}',
  cab_services TEXT[] DEFAULT '{}',
  cab_type_preference TEXT,
  
  -- Shopping Preferences
  product_categories TEXT[] DEFAULT '{}',
  favorite_brands TEXT[] DEFAULT '{}',
  ecommerce_sites TEXT[] DEFAULT '{}',
  monthly_shopping_budget TEXT,
  preferred_payment_method TEXT,
  payment_methods TEXT[] DEFAULT '{}',
  spending_limits JSONB DEFAULT '{}',
  
  -- Location Preferences
  home_location TEXT,
  work_location TEXT,
  
  -- Work Preferences
  calendar_app TEXT,
  working_hours JSONB DEFAULT '{}',
  
  -- Legacy fields (for backward compatibility)
  grocery_apps TEXT[] DEFAULT '{}',
  food_apps TEXT[] DEFAULT '{}',
  preferred_cuisines TEXT[] DEFAULT '{}',
  
  -- AI Behavior Preferences (moved to user_profiles)
  ai_personality TEXT DEFAULT 'FRIENDLY',
  response_length TEXT DEFAULT 'DETAILED',
  budget_level TEXT DEFAULT 'MEDIUM',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table with all the fields you specified
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  
  -- Personal Information
  full_name TEXT,
  nickname TEXT,
  gender TEXT,
  birthday DATE,
  
  -- Location Information
  home_address TEXT,
  work_address TEXT,
  frequent_locations JSONB DEFAULT '{}',
  
  -- Work Information
  working_hours JSONB DEFAULT '{}',
  
  -- AI Behavior Preferences (moved from user_preferences)
  ai_personality TEXT DEFAULT 'FRIENDLY',
  response_length TEXT DEFAULT 'DETAILED',
  nudge_permission BOOLEAN DEFAULT true,
  
  -- Legacy fields (for backward compatibility)
  age INTEGER,
  occupation TEXT,
  lifestyle TEXT,
  interests TEXT[] DEFAULT '{}',
  location TEXT,
  family_status TEXT,
  tech_savviness TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table for voice chat history
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);

-- DISABLE Row Level Security (RLS) for development
-- This fixes the "new row violates row-level security policy" errors
ALTER TABLE user_preferences DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE conversations DISABLE ROW LEVEL SECURITY; 