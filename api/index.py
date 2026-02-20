from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import AzureOpenAI, OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_openai_client():
    # client = OpenAI()
                                                                    
    if os.getenv("GEMINI_API_KEY"):
        return OpenAI(
        api_key=os.environ["GEMINI_API_KEY"],
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
    )

    if os.getenv("OPENAI_API_KEY"):
        return AzureOpenAI(
              azure_endpoint=os.environ["AZURE_API_BASE"],
              api_key=os.environ["AZURE_API_KEY"],
              api_version=os.environ["AZURE_API_VERSION"],
          )
    return None

client = get_openai_client()


class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY or OPENAI_API_KEY must be set in environment",
        )
    
    try:
        user_message = request.message
        response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", os.getenv("GEMINI_MODEL", "gpt-4")),
            messages=[
                {"role": "system", "content": "You are a supportive mental coach."},
                {"role": "user", "content": user_message}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling model API: {str(e)}")
