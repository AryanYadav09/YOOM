This is a React (Vite) video-calling app with Clerk authentication and Stream Video SDK.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app in development mode (client + token server):

```bash
npm run dev
```

This starts:
- Vite client on `http://localhost:5173`
- Stream token server on `http://localhost:3001`

Build for production:

```bash
npm run build
```

Preview build (also starts token server):

```bash
npm run preview
```

## Environment

Required variables in `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STREAM_API_KEY`
- `STREAM_SECRET_KEY`

Optional:
- `VITE_API_BASE_URL` (default: `http://localhost:3001`)
