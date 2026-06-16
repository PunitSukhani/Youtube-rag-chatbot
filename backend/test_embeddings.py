from dotenv import load_dotenv
load_dotenv()

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.embedding_service import embed_text, embed_texts

print("--- Testing Single Embedding (embed_query) ---")
text = "What is database sharding?"
embedding = embed_text(text)
print(f"Text: \"{text}\"")
print(f"Returned type: {type(embedding)}")
print(f"Vector Dimensions: {len(embedding)} (Expected: 768)")
print(f"First 5 dimensions: {embedding[:5]}\n")

print("--- Testing Batch Embedding (embed_documents) ---")
texts = [
    "Hello everyone.",
    "Today we are learning RAG.",
    "LangChain is a powerful orchestration framework."
]
embeddings = embed_texts(texts)
print(f"Sent {len(texts)} texts.")
print(f"Returned list size: {len(embeddings)} (Expected: 3)")
print(f"Dimension size of first result: {len(embeddings[0]) if embeddings else 0} (Expected: 768)")
