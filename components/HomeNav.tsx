'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'

export default function HomeNav() {
  return (
    <nav className="border-b bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center h-14">
          <h1 className="text-base font-semibold">
            Playlist Library
          </h1>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="shadow-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
