# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `rajni-ai`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to you (e.g., Asia Pacific - Singapore)
6. Click "Create new project"

## Step 2: Get Your Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon/Public Key** (starts with `eyJ`)

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

## Step 4: Create Database Tables

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to execute the SQL

## Step 5: Test the Setup

1. Restart your development server: `npm run dev`
2. Try signing up a new user
3. Set preferences - they should now persist in Supabase!

## Benefits of Using Supabase

✅ **Real Database**: PostgreSQL with real-time features
✅ **Authentication**: Built-in auth system (can replace current localStorage)
✅ **Persistent Storage**: Data survives server restarts
✅ **Real-time**: Live updates across devices
✅ **Free Tier**: 500MB database, 50MB file storage
✅ **Row Level Security**: Automatic data protection
✅ **API**: Auto-generated REST and GraphQL APIs

## Next Steps

1. **Authentication**: Replace localStorage with Supabase Auth
2. **Real-time**: Add live updates for voice chat
3. **File Storage**: Store voice recordings
4. **Edge Functions**: Serverless functions for AI processing

## Troubleshooting

- **Connection Error**: Check your environment variables
- **Table Not Found**: Make sure you ran the SQL schema
- **Permission Error**: Check Row Level Security policies 