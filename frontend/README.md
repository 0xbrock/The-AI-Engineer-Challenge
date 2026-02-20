# Forest Whisper — Chat Frontend

A Next.js chat interface for the `/api/chat` backend, styled with a creative nature/forest theme. Features an immersive animated background and a star-explosion submit button.

## Features

- **Forest Background** — Moving CSS animations evoke dappled sunlight, floating leaves, and mist
- **Star Explosion** — The Send button bursts into golden stars while waiting for the AI response
- **Chat Integration** — Connects to the FastAPI `/api/chat` endpoint

## Run Locally

### 1. Start the Backend

From the project root:

```bash
# Set your API key (GEMINI_API_KEY or OPENAI_API_KEY depending on backend config)
export GEMINI_API_KEY=your-key-here

# Run the FastAPI server
uv run uvicorn api.index:app --reload
```

The API runs at `http://localhost:8000`.

### 2. Start the Frontend

From the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Set the API URL so the frontend proxies to the backend (optional; only needed when using the separate backend):

```bash
export NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. (Optional) Custom API URL

To use a different backend URL (e.g. another host), set:

```bash
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

Leave **unset** when deploying to Vercel so `/api/chat` is served by the built-in Python function.

## Deploy to Vercel

The app is set up for a single Vercel deployment: Next.js frontend + Python `/api/chat` serverless function.

### 1. Connect the repo

1. Go to [vercel.com/new](https://vercel.com/new) and import your Git repository.
2. **Important:** Set **Root Directory** to `frontend` (click “Edit” next to the root and enter `frontend`). If you skip this, the root URL will show `{"status":"ok"}` from the repo’s API instead of the chat UI.
3. Add environment variables in **Settings → Environment Variables**:
   - **`GEMINI_API_KEY`** — for Gemini (recommended), or  
   - **`OPENAI_API_KEY`** — for OpenAI.  
   Optionally: **`OPENAI_MODEL`** or **`GEMINI_MODEL`** (e.g. `gpt-4`, `gpt-4o-mini`).
4. Deploy. The first deployment will build the Next.js app and the Python API.

### 2. Deploy from CLI

From the **frontend** directory:

```bash
cd frontend
npm i -g vercel
vercel
```

When prompted, set the project root to the current directory (`.`). Add `GEMINI_API_KEY` or `OPENAI_API_KEY` in the Vercel project settings (or via `vercel env add`).

### If the root URL shows `{"status":"ok"}`

The project is building from the repo root instead of the frontend. In Vercel: **Project → Settings → General → Root Directory** → set to `frontend` and save, then redeploy.

## Scripts

| Command       | Description                    |
|--------------|--------------------------------|
| `npm run dev` | Start dev server (port 3000)   |
| `npm run build` | Build for production           |
| `npm run start` | Run production build           |
| `npm test`     | Run unit tests                 |
| `npm run test:watch` | Run tests in watch mode |

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- TypeScript
- Jest + React Testing Library
