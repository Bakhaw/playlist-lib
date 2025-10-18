import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDb } from '@/lib/db/client'
import { playlists } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { generateShareId } from '@/lib/utils/generate-share-id'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getDb()
    const userPlaylists = await db
      .select()
      .from(playlists)
      .where(eq(playlists.userId, user.id))
      .orderBy(desc(playlists.createdAt))

    return NextResponse.json(userPlaylists)
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, songs: songsData } = body

    if (!name || !songsData || !Array.isArray(songsData)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const db = getDb()

    let shareId = generateShareId()
    let attempts = 0
    while (attempts < 5) {
      const existing = await db
        .select()
        .from(playlists)
        .where(eq(playlists.shareId, shareId))
        .limit(1)
      
      if (existing.length === 0) break
      shareId = generateShareId()
      attempts++
    }

    const [newPlaylist] = await db
      .insert(playlists)
      .values({
        userId: user.id,
        name,
        description: description || null,
        songs: songsData,
        shareId,
      })
      .returning()

    return NextResponse.json(newPlaylist, { status: 201 })
  } catch (error) {
    console.error('Error creating playlist:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create playlist'
    return NextResponse.json({ 
      error: 'Failed to create playlist',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
    }, { status: 500 })
  }
}
