from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse
from app.services.transcript_service import get_video_transcript
from app.services.gemini_service import ask_gemini_about_transcript

router = APIRouter()

@router.post("/", response_model=ChatResponse)
def chat_with_video(request: ChatRequest) -> ChatResponse:
    # 1. Fetch transcript for the video
    transcript_res = get_video_transcript(request.videoId)
    
    # 2. If we failed to get the transcript, return failure response
    if not transcript_res.success:
        return ChatResponse(
            success=False, 
            error=f"Could not retrieve transcript: {transcript_res.error}"
        )
    
    # 3. Ask Gemini using the retrieved transcript text and the user's question
    return ask_gemini_about_transcript(transcript_res.transcript, request.question)
