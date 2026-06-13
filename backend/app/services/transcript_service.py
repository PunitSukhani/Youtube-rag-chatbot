from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound
from app.models.transcript import TranscriptResponse

def get_video_transcript(video_id: str) -> TranscriptResponse:
    try:
        # First, query the YouTube Transcript API to list all available transcripts (manual/generated, translations) for the video ID.
        ytt_api = YouTubeTranscriptApi()
        transcript_list = ytt_api.list(video_id)
        
        try:
            # 1. Prefer English transcript if available
            transcript = transcript_list.find_transcript(['en'])
        except NoTranscriptFound:
            # 2. Fallback to the first available transcript in the list
            transcript = list(transcript_list)[0]

        # Fetch the transcript data chunks.
        # NOTE: The returned items in `transcript_data` are instances of `FetchedTranscriptSnippet` objects (not dictionaries).
        # We must access the attributes using dot notation (e.g., `item.text`, `item.start`, `item.duration`) 
        # instead of key indexing (e.g., `item['text']`), which throws a TypeError.
        transcript_data = transcript.fetch()

        # Combine all the text chunks into a single readable string
        full_text = " ".join([item.text for item in transcript_data])
        
        return TranscriptResponse(success=True, transcript=full_text)

    except TranscriptsDisabled:
        # 3. Handle transcript unavailable cases explicitly
        return TranscriptResponse(
            success=False, 
            error="Transcripts are disabled for this video."
        )
    except Exception as e:
        # 4. Return meaningful error messages for any other failure
        return TranscriptResponse(
            success=False, 
            error=f"Failed to retrieve transcript: {str(e)}"
        )
