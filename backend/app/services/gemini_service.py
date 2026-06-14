import os
from google import genai
from google.genai.errors import APIError
from app.models.chat import ChatResponse

def ask_gemini_about_transcript(transcript: str, question: str) -> ChatResponse:
    try:
        # Initialize client (picks up GEMINI_API_KEY from environment)
        client = genai.Client()

        # Construct a strict prompt that prevents external knowledge / hallucination
        prompt = f"""You are a YouTube video assistant.

Use ONLY the provided transcript context to answer the question. Do not make up information or use external knowledge.

If the answer is not present in the transcript context, say exactly:
"I couldn't find that information in the transcript."

Transcript:
{transcript}

Question:
{question}
"""

        # Call the model (use gemini-2.5-flash)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )

        return ChatResponse(success=True, answer=response.text)

    except APIError as e:
        return ChatResponse(success=False, error=f"Gemini API error: {str(e)}")
    except Exception as e:
        return ChatResponse(success=False, error=f"Unexpected error: {str(e)}")
