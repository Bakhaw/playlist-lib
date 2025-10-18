import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

declare global {
  var postgresClient: ReturnType<typeof postgres> | undefined
}

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set')
    throw new Error('DATABASE_URL not found. Get it from Supabase Project Settings > Database > Connection String')
  }

  if (!global.postgresClient) {
    global.postgresClient = postgres(databaseUrl, {
      max: 1,
      idle_timeout: 20,
      max_lifetime: 60 * 30,
    })
  }

  return drizzle(global.postgresClient, { schema })
}

