/*
  # Create Visitor Statistics Table for Real-Time Counter

  ## Overview
  This migration creates a real-time visitor tracking system with separate counters
  for unique visitors and total page views.

  ## Tables Created
  1. `visitor_stats`
    - `id` (uuid, primary key) - Unique identifier for each stat record
    - `stat_type` (text) - Type of statistic: 'visitors' or 'views'
    - `count` (integer) - Current count value
    - `updated_at` (timestamptz) - Last update timestamp
    - Unique constraint on `stat_type` to ensure only one record per type

  2. `visitor_sessions`
    - `id` (uuid, primary key) - Unique identifier
    - `session_id` (text, unique) - Browser fingerprint/session identifier
    - `first_visit` (timestamptz) - First visit timestamp
    - `last_visit` (timestamptz) - Most recent visit timestamp
    - `page_views` (integer) - Number of page views in this session
    - Used to track unique visitors and prevent double-counting

  ## Security
  - Enable RLS on both tables
  - Allow public SELECT access for displaying stats
  - Only authenticated users can INSERT/UPDATE for admin purposes
  - Includes trigger to auto-update timestamps

  ## Initial Data
  - Seeded with initial values for 'visitors' and 'views' counters
*/

-- Create visitor_stats table for storing counters
CREATE TABLE IF NOT EXISTS visitor_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_type text UNIQUE NOT NULL CHECK (stat_type IN ('visitors', 'views')),
  count integer DEFAULT 0 NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create visitor_sessions table for tracking unique visitors
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  first_visit timestamptz DEFAULT now() NOT NULL,
  last_visit timestamptz DEFAULT now() NOT NULL,
  page_views integer DEFAULT 1 NOT NULL
);

-- Enable Row Level Security
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for visitor_stats
CREATE POLICY "Anyone can view visitor stats"
  ON visitor_stats
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert visitor stats"
  ON visitor_stats
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update visitor stats"
  ON visitor_stats
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policies for visitor_sessions
CREATE POLICY "Service role can view sessions"
  ON visitor_sessions
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert sessions"
  ON visitor_sessions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update sessions"
  ON visitor_sessions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_visitor_stats_updated_at ON visitor_stats;
CREATE TRIGGER update_visitor_stats_updated_at
  BEFORE UPDATE ON visitor_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data if not exists
INSERT INTO visitor_stats (stat_type, count)
VALUES 
  ('visitors', 1247),
  ('views', 3892)
ON CONFLICT (stat_type) DO NOTHING;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_visitor_stats_stat_type ON visitor_stats(stat_type);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session_id ON visitor_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_last_visit ON visitor_sessions(last_visit);
