from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.transcript import router as transcript_router
from app.routes.chat import router as chat_router

app = FastAPI(title="YouTube RAG Chatbot API")

app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(transcript_router, prefix="/transcript", tags=["transcript"])
app.include_router(chat_router, prefix="/chat", tags=["chat"])
