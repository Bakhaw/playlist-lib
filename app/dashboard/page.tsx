import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardNav from '@/components/DashboardNav'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <DashboardNav userEmail={user.email || ''} />

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
                  Paste your playlist
                </Label>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  placeholder="1. Blinding Lights - The Weeknd&#10;2. Levitating - Dua Lipa&#10;3. Save Your Tears - The Weeknd&#10;...or any format you have"
                  className="h-64 resize-none font-mono text-sm"
                />
                
                <div className="flex gap-3">
                  <Button className="flex-1 shadow-lg">
                    Create Playlist
                  </Button>
                  <Button variant="outline">
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
                  <span className="text-xs text-muted-foreground">0 songs</span>
                </div>
              </CardHeader>
              <CardContent>
                {/* Empty State */}
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
            <span className="text-sm text-muted-foreground">0 playlists</span>
          </div>

          {/* Empty State */}
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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <Card className="shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-sm text-muted-foreground">Total playlists</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-sm text-muted-foreground">Total songs</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-sm text-muted-foreground">Created today</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
