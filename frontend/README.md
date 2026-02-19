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

Open [http://localhost:3000](http://localhost:3000). The frontend proxies `/api/*` to the backend automatically.

### 3. (Optional) Custom API URL

To use a different backend URL (e.g. production), set:

```bash
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

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
