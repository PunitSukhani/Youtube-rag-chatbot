# YouTube RAG Chatbot

A learning-first project for building a Chrome extension that lets users chat with the currently open YouTube video.

The project uses:

- FastAPI for the backend.
- React + Vite for the frontend.
- Chrome Extension Manifest V3 for the extension.
- Gemini, embeddings, and FAISS for the RAG pipeline.

## Project Documents

- `PROJECT_PLAN.md`: phase-by-phase roadmap.
- `ARCHITECTURE.md`: system design, tech stack, and folder structure.
- `IMPLEMENTATION_RULES.md`: coding rules and project workflow.
- `REQUIREMENTS.md`: performance, security, logging, and MVP requirements.

## Learning Approach

This project should move one phase at a time. Each phase should be understood, documented, tested manually or automatically where appropriate, and committed before starting the next phase.

## Current Status

We have completed and verified **Phase 6: Embeddings** of the MVP roadmap:
* Extension UI is polished and detects YouTube videos.
* Transcript retrieval is working with language fallback.
* Chat setup is integrated using Google GenAI client.
* LangChain chunking service extracts document segments with timing metadata.
* LangChain embedding service generates 768-dimensional vectors using `gemini-embedding-001`.


