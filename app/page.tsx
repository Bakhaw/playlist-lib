import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HomeNav from '@/components/HomeNav'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <HomeNav />

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8">
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            From notes to playlist.
            <br />
            In seconds.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop manually adding songs one by one. Just copy your playlist from anywhere and paste it here.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="shadow-lg">
                Try it now
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Section */}
        <div className="py-20">
          <Card className="p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Before */}
              <div>
                <div className="mb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Before</span>
                </div>
                <Card className="p-6 shadow-md">
                  <div className="text-sm text-muted-foreground mb-3">Notes.app</div>
                  <div className="space-y-2 font-mono text-sm">
                    <div>1. Blinding Lights - The Weeknd</div>
                    <div>2. Levitating - Dua Lipa</div>
                    <div>3. Save Your Tears - The Weeknd</div>
                    <div>4. Good 4 U - Olivia Rodrigo</div>
                    <div>5. Peaches - Justin Bieber</div>
                  </div>
                </Card>
              </div>

              {/* After */}
              <div>
                <div className="mb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">After</span>
                </div>
                <Card className="p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold">Summer Vibes 2024</div>
                    <div className="text-xs text-muted-foreground">5 songs</div>
                  </div>
                  <div className="space-y-3">
                    {['Blinding Lights', 'Levitating', 'Save Your Tears', 'Good 4 U', 'Peaches'].map((song, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{song}</div>
                          <div className="text-xs text-muted-foreground">Added just now</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Instant playlist creation</span>
              </div>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Copy your list
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                From Notes, Messages, or anywhere. Any format works.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Paste it here
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI instantly recognizes songs and artists.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Done!
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your playlist is ready. Share or export anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Smart recognition
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Paste any format. With numbers, dashes, bullet points, or plain text. 
                We'll figure it out automatically.
              </p>
              <Card className="p-4 font-mono text-sm shadow-inner">
                <div>• Radiohead - Creep</div>
                <div>2) The Beatles - Hey Jude</div>
                <div>Queen Bohemian Rhapsody</div>
                <div>- Nirvana, Smells Like Teen Spirit</div>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">
                Export anywhere
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Once created, export your playlist to Spotify, Apple Music, or share a link with friends.
              </p>
              <div className="flex gap-4">
                <Card className="flex-1 p-4 text-center shadow-md">
                  <div className="text-2xl mb-2">🎵</div>
                  <div className="text-sm font-medium">Spotify</div>
                </Card>
                <Card className="flex-1 p-4 text-center shadow-md">
                  <div className="text-2xl mb-2">🎶</div>
                  <div className="text-sm font-medium">Apple Music</div>
                </Card>
                <Card className="flex-1 p-4 text-center shadow-md">
                  <div className="text-2xl mb-2">🔗</div>
                  <div className="text-sm font-medium">Share Link</div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stop wasting time on manual entry
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Create your first playlist in under 10 seconds.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-xl">
              Get started for free
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Built with Next.js & Supabase
          </p>
        </div>
      </footer>
    </div>
  )
}
