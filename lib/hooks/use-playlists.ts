'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Playlist, CreatePlaylistInput } from '@/types/playlist'

// Fetch all playlists for the current user
export function usePlaylists() {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await fetch('/api/playlists')
      if (!response.ok) throw new Error('Failed to fetch playlists')
      return response.json() as Promise<Playlist[]>
    },
  })
}

// Create a new playlist
export function useCreatePlaylist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreatePlaylistInput) => {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      
      if (!response.ok) throw new Error('Failed to create playlist')
      return response.json() as Promise<Playlist>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      queryClient.invalidateQueries({ queryKey: ['playlist-stats'] })
    },
  })
}

// Delete a playlist
export function useDeletePlaylist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (playlistId: string) => {
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete playlist')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      queryClient.invalidateQueries({ queryKey: ['playlist-stats'] })
    },
  })
}

// Get playlist stats
export function usePlaylistStats() {
  return useQuery({
    queryKey: ['playlist-stats'],
    queryFn: async () => {
      const response = await fetch('/api/playlists/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json() as Promise<{
        totalPlaylists: number
        totalSongs: number
        createdToday: number
      }>
    },
  })
}
