from pydantic import BaseModel

class TranscriptChunk(BaseModel):
    videoId: str
    chunkId: str      # E.g., "{videoId}_chunk_{index}"
    text: str         # The chunk content (~1000 characters)
    startTime: float  # Starting timestamp in seconds
