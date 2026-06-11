# Requirements

This file captures performance, security, logging, and MVP requirements.

## Performance Requirements

- Transcript retrieval should take less than 5 seconds.
- Query response should take less than 3 seconds.
- Re-index only once per video.

## Security Requirements

- Never expose the Gemini API key in the extension.
- Store secrets only in the backend.
- Validate all API requests.
- Use environment variables for secrets.

## Logging Requirements

Track:

```text
Video Loaded
Transcript Loaded
Chunks Created
Embeddings Created
Retrieval Time
LLM Response Time
Errors
```

## MVP Definition

The MVP is complete when:

- Extension detects the current YouTube video.
- Transcript loads successfully.
- Transcript is chunked.
- Embeddings are generated.
- FAISS retrieval works.
- Gemini answers using retrieved chunks.
- User can chat with the video.

Build only through Phase 9 first.

Phases 10 through 15 are enhancements after the MVP is stable.

