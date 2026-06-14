from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    videoId: str
    question: str

class ChatResponse(BaseModel):
    success: bool
    answer: Optional[str] = None
    error: Optional[str] = None
