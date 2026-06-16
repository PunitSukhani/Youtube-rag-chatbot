import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings

def get_embeddings_client() -> GoogleGenerativeAIEmbeddings:
    """
    Initializes and returns the LangChain GoogleGenerativeAIEmbeddings client.
    Passes the GEMINI_API_KEY explicitly to avoid environment naming conflicts.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment or .env file.")
        
    return GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-001",
        google_api_key=api_key,
        output_dimensionality=768
    )

def embed_text(text: str) -> list[float]:
    """
    Generates a 768-dimensional vector embedding for a single text block
    (used to embed the user's question query).
    """
    client = get_embeddings_client()
    return client.embed_query(text)

def embed_texts(texts: list[str]) -> list[list[float]]:
    """
    Generates vector embeddings for a list of document chunks in a single batch request
    (used to embed the video transcript).
    """
    if not texts:
        return []
    client = get_embeddings_client()
    return client.embed_documents(texts)
