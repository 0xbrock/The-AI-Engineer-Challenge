"""
Vercel serverless function: POST /api/chat
Mirrors the FastAPI backend for deployment on Vercel.
Set GEMINI_API_KEY (or OPENAI_API_KEY) in Vercel project environment.
"""
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_client():
    if os.getenv("GEMINI_API_KEY"):
        return OpenAI(
            api_key=os.environ["GEMINI_API_KEY"],
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        )
    if os.getenv("OPENAI_API_KEY"):
        return OpenAI(api_key=os.environ["OPENAI_API_KEY"])
    return None


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/")
def chat(request: ChatRequest):
    client = get_client()
    if not client:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY or OPENAI_API_KEY must be set in environment",
        )
    try:
        user_message = request.message
        model = os.getenv("OPENAI_MODEL") or os.getenv("GEMINI_MODEL") or "gpt-4"
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a supportive mental coach."},
                {"role": "user", "content": user_message},
            ],
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
