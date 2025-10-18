'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardNav from '@/components/DashboardNav'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { usePlaylists, useCreatePlaylist, useDeletePlaylist, usePlaylistStats } from '@/lib/hooks/use-playlists'
import { parsePlaylistText } from '@/lib/parse-playlist'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [userEmail, setUserEmail] = useState('')
  const [playlistName, setPlaylistName] = useState('')
  const [playlistText, setPlaylistText] = useState('')
  const [parsedSongs, setParsedSongs] = useState<ReturnType<typeof parsePlaylistText>>([])

  const { data: playlists, isLoading: playlistsLoading } = usePlaylists()
  const { data: stats } = usePlaylistStats()
  const createPlaylist = useCreatePlaylist()
  const deletePlaylist = useDeletePlaylist()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
      } else {
        setUserEmail(user.email || '')
      }
    })
  }, [router, supabase])

  // Parse playlist text as user types
  useEffect(() => {
    if (playlistText.trim()) {
      const parsed = parsePlaylistText(playlistText)
      setParsedSongs(parsed)
    } else {
      setParsedSongs([])
    }
  }, [playlistText])

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim() || parsedSongs.length === 0) {
      alert('Please enter a playlist name and at least one song')
      return
    }

    try {
      await createPlaylist.mutateAsync({
        name: playlistName,
        songs: parsedSongs.map((song, index) => ({
          ...song,
          position: index,
        })),
      })

      // Reset form
      setPlaylistName('')
      setPlaylistText('')
      setParsedSongs([])
    } catch (error) {
      console.error('Error creating playlist:', error)
      alert('Failed to create playlist')
    }
  }

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return

    try {
      await deletePlaylist.mutateAsync(playlistId)
    } catch (error) {
      console.error('Error deleting playlist:', error)
      alert('Failed to delete playlist')
    }
  }

  if (!userEmail) return null

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <DashboardNav userEmail={userEmail} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-3">
            Create a playlist
          </h2>
          <p className="text-muted-foreground text-lg">
            Paste your song list below and we'll do the rest
          </p>
        </div>

        {/* Main Create Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div>
            <Card className="shadow-xl">
              <CardHeader>
                <Label className="text-sm font-semibold">
                  Playlist Name
                </Label>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  placeholder="My Awesome Playlist"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="text-base"
                />

                <div>
                  <Label className="text-sm font-semibold mb-2 block">
                    Paste your playlist
                  </Label>
                  <Textarea
                    placeholder="1. Blinding Lights - The Weeknd&#10;2. Levitating - Dua Lipa&#10;3. Save Your Tears - The Weeknd&#10;...or any format you have"
                    value={playlistText}
                    onChange={(e) => setPlaylistText(e.target.value)}
                    className="h-64 resize-none font-mono text-sm"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleCreatePlaylist}
                    disabled={createPlaylist.isPending || !playlistName.trim() || parsedSongs.length === 0}
                    className="flex-1 shadow-lg"
                  >
                    {createPlaylist.isPending ? 'Creating...' : 'Create Playlist'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPlaylistName('')
                      setPlaylistText('')
                      setParsedSongs([])
                    }}
                  >
                    Clear
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Supports any format • Numbers, bullets, or plain text
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="text-sm font-semibold mb-3">
                  💡 Pro tips
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Include artist names for better accuracy</li>
                  <li>• Any format works (1., -, •, or plain)</li>
                  <li>• Paste from Notes, Messages, anywhere</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="shadow-xl min-h-[400px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">
                    Preview
                  </Label>
                  <span className="text-xs text-muted-foreground">{parsedSongs.length} songs</span>
                </div>
              </CardHeader>
              <CardContent>
                {parsedSongs.length > 0 ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {parsedSongs.map((song, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{song.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {song.artist || 'Unknown Artist'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Your playlist will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your Playlists */}
        <div className="border-t pt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">
              Your playlists
            </h3>
            <span className="text-sm text-muted-foreground">
              {playlists?.length || 0} playlists
            </span>
          </div>

          {playlistsLoading ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Loading playlists...</p>
            </Card>
          ) : playlists && playlists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <Card key={playlist.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{playlist.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {playlist.songs?.length || 0} songs
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        disabled={deletePlaylist.isPending}
                        className="ml-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {playlist.songs?.slice(0, 3).map((song, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground truncate">
                          • {song.title}{song.artist ? ` - ${song.artist}` : ''}
                        </div>
                      ))}
                      {(playlist.songs?.length || 0) > 3 && (
                        <div className="text-xs text-muted-foreground">
                          + {(playlist.songs?.length || 0) - 3} more...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No playlists yet
              </h3>
              <p className="text-muted-foreground mb-8">
                Create your first playlist using the form above
              </p>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <Card className="shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-1">{stats?.totalPlaylists || 0}</div>
              <div className="text-sm text-muted-foreground">Total playlists</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-1">{stats?.totalSongs || 0}</div>
              <div className="text-sm text-muted-foreground">Total songs</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-1">{stats?.createdToday || 0}</div>
              <div className="text-sm text-muted-foreground">Created today</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
