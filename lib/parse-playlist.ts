import type { ParsedSong } from '@/types/playlist'

export function parsePlaylistText(text: string): ParsedSong[] {
  if (!text.trim()) return []

  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const songs: ParsedSong[] = []

  for (const line of lines) {
    let cleanedLine = line
      .replace(/^\d+[\.\)]\s*/, '')
      .replace(/^[•\-\*]\s*/, '')
      .trim()

    if (!cleanedLine) continue

    let title = ''
    let artist: string | null = null

    if (cleanedLine.includes(' - ')) {
      const parts = cleanedLine.split(' - ').map((p) => p.trim())
      if (parts.length >= 2) {
        artist = parts[0]
        title = parts.slice(1).join(' - ')
      }
    } else if (cleanedLine.toLowerCase().includes(' by ')) {
      const parts = cleanedLine.split(/\s+by\s+/i)
      title = parts[0].trim()
      artist = parts.slice(1).join(' by ').trim()
    } else if (cleanedLine.includes(',')) {
      const parts = cleanedLine.split(',').map((p) => p.trim())
      artist = parts[0]
      title = parts.slice(1).join(', ')
    } else {
      title = cleanedLine
      artist = null
    }

    if (title) {
      songs.push({ title, artist })
    }
  }

  return songs
}

