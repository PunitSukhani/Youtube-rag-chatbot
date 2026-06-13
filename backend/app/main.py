from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.transcript import router as transcript_router

app = FastAPI(title="YouTube RAG Chatbot API")

app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(transcript_router, prefix="/transcript", tags=["transcript"])
