# Frontend (Next.js)

This frontend is a Next.js app that talks to the existing API Gateway.

## Run

1. Install dependencies:
   npm install
2. Create auth env file from `.env.example` and fill Google OAuth values
3. Ensure backend services are running:
   - API Gateway on `http://localhost:5000`
   - NLP service on `http://localhost:8000`
4. Start dev server:
   npm run dev
5. Open:
   http://localhost:3000

## API wiring

By default the frontend calls:
- http://localhost:5000/api/nlq

Set `NEXT_PUBLIC_API_URL` to override the base URL.
Examples:
- `NEXT_PUBLIC_API_URL=http://localhost:5000`
- `NEXT_PUBLIC_API_URL=http://localhost:5000/api/nlq`

## Google Auth setup

Set these variables in `frontend/.env.local`:
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET=<strong-random-secret>`
- `GOOGLE_CLIENT_ID=<from-google-cloud>`
- `GOOGLE_CLIENT_SECRET=<from-google-cloud>`

In Google Cloud Console OAuth client:
- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
