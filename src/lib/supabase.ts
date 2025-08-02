import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// More robust error handling
if (!supabaseUrl) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in environment variables')
  console.error('Please add NEXT_PUBLIC_SUPABASE_URL to your .env.local file')
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required')
}

if (!supabaseAnonKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables')
  console.error('Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file')
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
}

console.log('✅ Supabase environment variables loaded successfully')
console.log('URL:', supabaseUrl.substring(0, 20) + '...')
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 