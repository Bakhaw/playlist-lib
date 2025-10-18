import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { playlists } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// GET /api/playlists/share/[shareId] - Get a playlist by share ID (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { shareId } = await params

    const db = getDb()
    const playlist = await db
      .select()
      .from(playlists)
      .where(eq(playlists.shareId, shareId))
      .limit(1)

    if (playlist.length === 0) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
    }

    // Return playlist without userId for privacy
    const { userId, ...publicPlaylist } = playlist[0]

    return NextResponse.json(publicPlaylist)
  } catch (error) {
    console.error('Error fetching shared playlist:', error)
    return NextResponse.json({ error: 'Failed to fetch playlist' }, { status: 500 })
  }
}
