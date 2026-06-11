# Project Plan

This file is the step-by-step phase roadmap for the YouTube RAG Chatbot Chrome Extension.

The main purpose of this project is learning. We will build one phase at a time, understand it, document it, commit it, and only then move forward.

For architecture details, see `ARCHITECTURE.md`.

For performance, security, logging, and MVP requirements, see `REQUIREMENTS.md`.

For coding rules and project discipline, see `IMPLEMENTATION_RULES.md`.

## Phase Workflow

Before starting a new phase:

1. Review what the previous phase did.
2. Confirm the current code runs.
3. Update the relevant README.
4. Create a Git commit for the completed phase.
5. Only then move to the next phase.

## MVP Boundary

Build only through Phase 9 first.

Phases 10 through 15 are enhancements after the MVP is stable.

## Phase 0: Project Setup

### Goal

Create the base project structure.

### Backend

Create a FastAPI application.

Endpoint:

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

### Extension

Create popup UI.

Display:

```text
YouTube RAG Chatbot
```

### Deliverable

- Frontend runs.
- Backend runs.
- Health endpoint works.

### Learning Focus

- Understand the project folders.
- Understand how the extension, frontend, and backend will communicate.
- Understand the first FastAPI route.

## Phase 1: Detect Current YouTube Video

### Goal

Detect the currently opened YouTube video.

Example:

```text
https://youtube.com/watch?v=abc123
```

Extract:

```text
abc123
```

### Deliverable

Popup displays:

```text
Current Video ID:
abc123
```

### Learning Focus

- Understand YouTube video URLs.
- Understand content scripts and browser tab access.
- Learn how Manifest V3 permissions work.

## Phase 2: Transcript Retrieval

### Goal

Retrieve the transcript using the backend.

Install:

```bash
pip install youtube-transcript-api
```

Endpoint:

```http
POST /transcript
```

Request:

```json
{
  "videoId": "abc123"
}
```

Response:

```json
{
  "success": true,
  "transcript": "..."
}
```

### Transcript Rules

1. Prefer English.
2. Fallback to an available language.
3. Handle transcript unavailable cases.
4. Return meaningful error messages.

### Deliverable

- Transcript successfully loads.

### Learning Focus

- Understand backend service logic.
- Understand API request and response models.
- Learn how to handle external API failures.

## Phase 3: Basic AI Chat Without RAG

### Goal

Validate the product idea before adding the full RAG pipeline.

Flow:

```text
Video
  |
  v
Transcript
  |
  v
Gemini
  |
  v
Answer
```

Endpoint:

```http
POST /chat
```

Request:

```json
{
  "videoId": "abc123",
  "question": "What is this video about?"
}
```

Prompt:

```text
Answer ONLY from the transcript.

If information is not available, say:

"I couldn't find that information in the transcript."

Transcript:
{transcript}

Question:
{question}
```

### Deliverable

- Working chatbot using the full transcript as context.

### Learning Focus

- Understand prompt construction.
- Understand why strict transcript-only answering matters.
- Learn the limitation of sending the full transcript directly.

## Phase 4: Better Chat UI

### Features

- Chat bubbles.
- Loading state.
- Error state.
- Typing indicator.
- Markdown rendering.
- Auto scroll.
- Clear chat button.

### Deliverable

- ChatGPT-like chat experience.

### Learning Focus

- Understand frontend state.
- Learn how to display async API responses.
- Improve user feedback during loading and errors.

## Phase 5: Chunking

### Goal

Prepare the transcript for RAG.

Configuration:

```text
Chunk Size: 1000
Chunk Overlap: 200
```

Metadata:

```json
{
  "videoId": "...",
  "chunkId": "...",
  "text": "...",
  "startTime": 123
}
```

### Deliverable

- Transcript is converted into chunks.

### Learning Focus

- Understand why chunking is needed.
- Learn how overlap helps preserve context.
- Design chunk data models.

## Phase 6: Embeddings

### Goal

Generate embeddings for transcript chunks.

Service:

```python
EmbeddingService
```

Flow:

```text
Chunk
  |
  v
Embedding
```

### Deliverable

- Embeddings are generated successfully.

### Learning Focus

- Understand what embeddings are.
- Learn how text becomes searchable vectors.
- Keep API keys and secrets in environment variables.

## Phase 7: FAISS Index

### Goal

Store embeddings in a FAISS index.

Service:

```python
VectorStoreService
```

Functions:

```python
create_index()
add_documents()
search()
save()
load()
```

### Deliverable

- FAISS index is created successfully.

### Learning Focus

- Understand vector indexes.
- Learn how embeddings are stored and searched.
- Learn why save/load matters for performance.

## Phase 8: Retrieval Testing

### Goal

Verify retrieval before using Gemini.

Flow:

```text
Question
  |
  v
Embedding
  |
  v
FAISS Search
  |
  v
Top K Chunks
```

Configuration:

```text
Top K = 5
```

Debug endpoint:

```http
POST /retrieve
```

Response:

```json
{
  "chunks": []
}
```

### Deliverable

- Relevant chunks are returned correctly.

### Learning Focus

- Understand retrieval before generation.
- Learn how to inspect retrieved chunks.
- Debug answer quality at the retrieval layer.

## Phase 9: Full RAG Chat

### Goal

Combine retrieval with Gemini.

Flow:

```text
Question
  |
  v
Embedding
  |
  v
Retrieve Chunks
  |
  v
Gemini
  |
  v
Answer
```

Prompt:

```text
You are a YouTube video assistant.

Use ONLY the provided context.

If answer is not present, say:

"I couldn't find that information in the transcript."

Context:
{chunks}

Question:
{question}
```

### Deliverable

- Fully working RAG chatbot.

### Learning Focus

- Understand the full RAG loop.
- Learn how retrieval improves prompt size and relevance.
- Compare full-transcript chat with RAG chat.

## Phase 10: Timestamp Support

### Goal

Support timestamp citations.

Metadata:

```json
{
  "startTime": 340,
  "endTime": 360
}
```

Example response:

```text
The speaker discusses React Hooks around 05:40.
```

Clickable timestamp:

```text
youtube.com/watch?v=xxx&t=340s
```

### Deliverable

- Clickable timestamps.

### Learning Focus

- Understand citation metadata.
- Learn how transcript times map to YouTube links.

## Phase 11: Auto Reindex On Video Change

### Goal

Handle YouTube single-page app navigation.

Flow:

```text
Video A
  |
  v
Video B
```

Automatically:

```text
Clear old chat
Load transcript
Create embeddings
Re-index
Ready
```

### Deliverable

- Video changes work without a page refresh.

### Learning Focus

- Understand YouTube SPA navigation.
- Learn how to detect URL changes in a content script.

## Phase 12: Caching

### Goal

Avoid re-indexing the same video.

Cache by:

```text
videoId
```

Store:

```text
Transcript
Chunks
Embeddings
FAISS Index
```

Flow:

```text
Already Indexed?
  |-- Yes -> Load Cache
  `-- No  -> Create Index
```

### Deliverable

- Fast reloads for previously indexed videos.

### Learning Focus

- Understand cache keys.
- Learn how caching improves user experience.
- Learn when cached data should be invalidated.

## Phase 13: Chat History

### Goal

Restore chat history after reopening the extension.

Store:

```json
{
  "videoId": "...",
  "question": "...",
  "answer": "...",
  "timestamp": "..."
}
```

### Deliverable

- History is restored after reopening the extension.

### Learning Focus

- Understand local persistence.
- Learn how chat history relates to video IDs.

## Phase 14: Advanced RAG

### Features

- Hybrid retrieval.
- Metadata filtering.
- Reranking.
- Context compression.
- Conversation memory.
- Citation generation.

### Deliverable

- Higher answer quality.

### Learning Focus

- Learn common RAG quality improvements.
- Understand when advanced retrieval is worth adding.

## Phase 15: Resume-Worthy Features

### Features

- Video summary.
- Key takeaways.
- Study notes.
- Quiz mode.
- Multi-video knowledge base.

Example prompts:

```text
Summarize this video
Give me 10 key takeaways
Generate notes
Generate 10 questions from this video
Compare React Hooks and Redux from all indexed videos
```

### Deliverable

- Extra features that make the project more polished and portfolio-ready.

### Learning Focus

- Learn how to extend a working product.
- Understand feature prioritization after the MVP is stable.

