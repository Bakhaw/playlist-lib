# Supabase Authentication Setup

This project uses Supabase for authentication. Follow these steps to set up your environment.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed

## Setup Steps

### 1. Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created

### 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Find your:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Anon/Public Key** (a long string starting with `eyJ...`)

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root of your project:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project-url` and `your-anon-key` with the values from step 2.

### 4. Configure Authentication Providers (Optional)

#### Email Authentication (Enabled by Default)
Email/password authentication is enabled by default. Users will receive a confirmation email when they sign up.

#### Google OAuth (Optional)
To enable Google sign-in:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Google** provider
4. Follow the instructions to set up Google OAuth credentials
5. Add your authorized redirect URLs

### 5. Configure Email Templates (Optional)

Customize your authentication emails:

1. Go to **Authentication** → **Email Templates** in your Supabase dashboard
2. Customize the templates for:
   - Confirm signup
   - Magic link
   - Password reset
   - Email change confirmation

### 6. Set Up URL Configuration

In your Supabase project settings, add these URLs to the allowed list:

**Development:**
- `http://localhost:3000`
- `http://localhost:3000/auth/callback`

**Production (when you deploy):**
- `https://your-domain.com`
- `https://your-domain.com/auth/callback`

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features Included

- ✅ Email/Password authentication
- ✅ Google OAuth (configurable)
- ✅ Protected routes with middleware
- ✅ Login page
- ✅ Signup page
- ✅ Dashboard page
- ✅ Logout functionality
- ✅ Email verification
- ✅ Beautiful, modern UI with dark mode

## File Structure

```
/app
  /auth
    /callback
      route.ts          # OAuth callback handler
  /login
    page.tsx           # Login page
  /signup
    page.tsx           # Signup page
  /dashboard
    page.tsx           # Protected dashboard
  page.tsx             # Home page
  layout.tsx           # Root layout

/lib
  /supabase
    client.ts          # Client-side Supabase client
    server.ts          # Server-side Supabase client
    middleware.ts      # Auth middleware utilities

/components
  LogoutButton.tsx     # Logout component

middleware.ts          # Next.js middleware for route protection
```

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file exists and contains the correct values
- Restart your development server after creating/updating `.env.local`

### Email confirmation not working
- Check your Supabase email settings in **Authentication** → **Settings**
- For development, you can disable email confirmation in Supabase settings

### Redirect issues
- Verify your callback URLs are properly configured in Supabase dashboard
- Check that your site URL is correct in Supabase settings

## Next Steps

- Set up database tables for your playlists
- Add user profile management
- Implement playlist CRUD operations
- Add social features (sharing, collaboration)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

