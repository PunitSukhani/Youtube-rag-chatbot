from pydantic import BaseModel
from typing import Optional

class TranscriptRequest(BaseModel):
    videoId: str

class TranscriptResponse(BaseModel):
    success: bool
    transcript: Optional[str] = None
    error: Optional[str] = None
