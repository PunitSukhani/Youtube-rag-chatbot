from fastapi import APIRouter
from app.models.transcript import TranscriptRequest, TranscriptResponse
from app.services.transcript_service import get_video_transcript

router = APIRouter()

@router.post("/", response_model=TranscriptResponse)
def fetch_transcript(request: TranscriptRequest) -> TranscriptResponse:
    # Pass the videoId from the incoming JSON request into our service logic
    return get_video_transcript(request.videoId)
