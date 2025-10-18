import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const playlists = pgTable('playlists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  songs: jsonb('songs').notNull().default('[]'),
  shareId: varchar('share_id', { length: 20 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Playlist = typeof playlists.$inferSelect
export type NewPlaylist = typeof playlists.$inferInsert

export type PlaylistSong = {
  title: string
  artist: string | null
}
