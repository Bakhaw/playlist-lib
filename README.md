# 🎵 Playlist Library

> Transform your notes into playlists in seconds. The fastest way to create and manage music playlists.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black?style=flat-square)](https://ui.shadcn.com/)

## ✨ Features

- **⚡ Instant Playlist Creation** - Copy your song list from anywhere, paste it here, and get a playlist in seconds
- **🧠 Smart Recognition** - AI-powered parsing supports any format: numbered lists, bullet points, plain text
- **🎨 Beautiful UI** - Clean, minimalist design inspired by iTunes with full dark mode support
- **🔐 Secure Authentication** - Email/password and Google OAuth via Supabase
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🌓 Theme Support** - Light, dark, and system themes with smooth transitions
- **🎯 Zero Learning Curve** - Just paste and go

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [Supabase Auth](https://supabase.com/auth)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📸 Screenshots

### Home Page
![Home Page](./docs/screenshots/home.png)

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

### Dark Mode
![Dark Mode](./docs/screenshots/dark-mode.png)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm/pnpm/yarn
- A Supabase account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Bakhaw/playlist-lib.git
cd playlist-lib
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API

4. **Configure Supabase Authentication**

- Go to your Supabase project dashboard
- Navigate to Authentication → URL Configuration
- Add these redirect URLs:
  - `http://localhost:3000/auth/callback` (development)
  - `https://yourdomain.com/auth/callback` (production)

**Optional: Disable email confirmation for development**
- Go to Authentication → Providers → Email
- Toggle off "Confirm email"

5. **Run the development server**

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

1. **Sign up** or **Log in** with your email or Google account
2. Navigate to your **Dashboard**
3. **Copy** your playlist from Notes, Messages, or anywhere
4. **Paste** it into the text area
5. Click **Create Playlist**
6. Your playlist is ready! Export to Spotify, Apple Music, or share the link

### Supported Formats

The AI can parse any of these formats:

```
1. Blinding Lights - The Weeknd
2. Levitating - Dua Lipa
3. Save Your Tears - The Weeknd
```

```
• Radiohead - Creep
• The Beatles - Hey Jude
• Queen - Bohemian Rhapsody
```

```
- Nirvana, Smells Like Teen Spirit
- Pink Floyd, Comfortably Numb
```

```
Coldplay Fix You
Adele Rolling in the Deep
```

## 🏗️ Project Structure

```
playlist-lib/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/           # Protected dashboard
│   ├── auth/callback/       # OAuth callback
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── DashboardNav.tsx
│   ├── HomeNav.tsx
│   ├── LogoutButton.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── lib/                     # Utilities
│   ├── supabase/           # Supabase client setup
│   │   ├── client.ts       # Client-side
│   │   ├── server.ts       # Server-side
│   │   └── middleware.ts   # Middleware
│   └── utils.ts            # Utility functions
└── middleware.ts           # Route protection
```

## 🎨 Customization

### Theme Colors

Modify the color scheme in `app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... more colors */
}
```

### Adding Components

Add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Bakhaw/playlist-lib)

### Environment Variables for Production

Remember to add these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Don't forget to update your Supabase redirect URLs with your production domain!

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [Apple Music](https://music.apple.com) and [iTunes](https://www.apple.com/itunes/)
- Built with [shadcn/ui](https://ui.shadcn.com) components
- Authentication powered by [Supabase](https://supabase.com)

## 📧 Contact

Created by [@Bakhaw](https://github.com/Bakhaw)

---

<p align="center">Made with ❤️ and Next.js</p>
