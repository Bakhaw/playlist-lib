import { createClient } from '@supabase/supabase-js'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// For server-side usage with Supabase connection pooler
export function getDb(supabaseUrl?: string, supabaseKey?: string) {
  const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase credentials not found')
  }

  // Get the database URL from Supabase project settings
  // Format: postgres://[user]:[password]@[host]:[port]/postgres
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL not found. Get it from Supabase Project Settings > Database > Connection String')
  }

  const client = postgres(databaseUrl)
  return drizzle(client, { schema })
}

