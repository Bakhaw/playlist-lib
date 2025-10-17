'use client'

import LogoutButton from './LogoutButton'
import ThemeToggle from './ThemeToggle'

export default function DashboardNav({ userEmail }: { userEmail: string }) {
  return (
    <nav className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center h-14">
          <h1 className="text-base font-semibold">
            Playlist Library
          </h1>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {userEmail}
            </span>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
