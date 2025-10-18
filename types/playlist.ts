export interface Song {
  title: string
  artist: string | null
}

export interface Playlist {
  id: string
  userId: string
  name: string
  description: string | null
  songs: Song[]
  shareId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreatePlaylistInput {
  name: string
  description?: string
  songs: Song[]
}

export interface ParsedSong {
  title: string
  artist: string | null
}
