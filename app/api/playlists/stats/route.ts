import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDb } from '@/lib/db/client'
import { playlists } from '@/lib/db/schema'
import { eq, and, gte, sql } from 'drizzle-orm'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getDb()

    const result = await db
      .select({
        totalPlaylists: sql<number>`count(*)`,
        totalSongs: sql<number>`coalesce(sum(jsonb_array_length(${playlists.songs})), 0)`,
      })
      .from(playlists)
      .where(eq(playlists.userId, user.id))

    const totalPlaylists = Number(result[0]?.totalPlaylists || 0)
    const totalSongs = Number(result[0]?.totalSongs || 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const createdTodayResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(playlists)
      .where(
        and(
          eq(playlists.userId, user.id),
          gte(playlists.createdAt, today)
        )
      )

    const createdToday = Number(createdTodayResult[0]?.count || 0)

    return NextResponse.json({
      totalPlaylists,
      totalSongs,
      createdToday,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
