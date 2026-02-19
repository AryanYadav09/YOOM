This project is split into two deployable apps:

- `frontend/`: React + Vite client
- `backend/`: Express token API for Stream

## Local Development

Install dependencies in each app:

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

Run each app in separate terminals:

```bash
cd frontend
npm run dev
```

```bash
cd backend
npm run dev
```

This starts:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Folder Setup

- `frontend/.env.local`: frontend environment variables
- `backend/.env.local`: backend environment variables
- `frontend/.env.example` and `backend/.env.example`: templates

Frontend env:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STREAM_API_KEY`
- `VITE_API_BASE_URL`

Backend env:
- `STREAM_API_KEY`
- `STREAM_SECRET_KEY`
- `PORT` (optional, default `3001`)

## Deploy

1. Deploy `frontend/` to Vercel.
2. Deploy `backend/` to a Node host (Render/Railway/Fly, etc.).
3. Set `frontend` env `VITE_API_BASE_URL` to your deployed backend URL.
