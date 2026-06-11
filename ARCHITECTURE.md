# Architecture

This file describes how the YouTube RAG Chatbot Chrome Extension is organized.

## Project Overview

Build a Chrome extension that allows users to chat with the currently open YouTube video.

The extension should:

1. Detect the currently open YouTube video.
2. Extract the video ID.
3. Fetch the video transcript.
4. Build a RAG pipeline on the transcript.
5. Allow users to ask questions about the video.
6. Answer strictly from transcript content.
7. Support timestamps and citations.
8. Automatically re-index when the video changes.

## Recommended Tech Stack

### Frontend and Extension

- React
- Vite
- Chrome Extension Manifest V3
- Explicit `.js` and `.jsx` file extensions

### Backend

- Python 3.12+
- FastAPI
- Clean architecture: `routes -> services -> models`
- Type hints throughout Python code

### AI

- Gemini 2.5

### Embeddings

Choose one:

- Gemini Embeddings
- Sentence Transformers

### Vector Store

- FAISS

### Storage

Initial:

- SQLite

Future:

- MongoDB

## System Flow

```text
Chrome Extension
    |
    v
FastAPI Backend
    |
    |-- Transcript Service
    |-- Chunking Service
    |-- Embedding Service
    |-- Vector Store Service (FAISS)
    |-- Chat Service
          |
          v
        Gemini
```

## Target Folder Structure

```text
youtube-rag-chatbot/
|-- extension/
|   |-- src/
|   |-- public/
|   `-- manifest.json
|
|-- backend/
|   |-- app/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- models/
|   |   `-- main.py
|
|-- frontend/
|   |-- src/
|   |-- index.html
|   `-- package.json
|
|-- ARCHITECTURE.md
|-- IMPLEMENTATION_RULES.md
|-- PROJECT_PLAN.md
|-- REQUIREMENTS.md
`-- README.md
```

## Backend Layers

### Routes

Routes define HTTP endpoints and should stay thin.

Examples:

- `/health`
- `/transcript`
- `/chat`
- `/retrieve`

### Services

Services contain application logic.

Examples:

- Transcript service.
- Chunking service.
- Embedding service.
- Vector store service.
- Chat service.

### Models

Models define request and response schemas with Pydantic.

Examples:

- Health response.
- Transcript request and response.
- Chat request and response.
- Retrieved chunk response.

