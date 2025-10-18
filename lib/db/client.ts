import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

declare global {
  var postgresClient: ReturnType<typeof postgres> | undefined
}

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL not found')
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

