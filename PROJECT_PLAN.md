# YouTube RAG Chatbot Project Plan

## Project Goal

Build a YouTube RAG Chatbot step by step as a learning project.

The app will let a user work with YouTube video content and ask questions using a retrieval-augmented generation workflow. The project should be built in clear phases so each part can be understood before moving to the next one.

## Learning First Approach

The main purpose of this project is learning.

Each phase should be small, explainable, and committed separately. Do not rush into advanced features before the foundation is understood. Prefer simple, readable code over clever abstractions.

Before starting a new phase:

1. Review what was built in the previous phase.
2. Confirm that the current code runs.
3. Add or update the milestone README.
4. Create a Git commit for the completed phase.

## Major Components

### Backend

Technology: Python 3.12+ and FastAPI.

Responsibilities:

- Provide API routes for the frontend and extension.
- Handle YouTube transcript ingestion.
- Prepare text chunks for retrieval.
- Store and search embeddings.
- Coordinate chatbot responses.
- Keep secrets in environment variables.

Architecture:

- `routes`: HTTP API endpoints.
- `services`: application logic.
- `models`: request and response schemas.

### Frontend

Technology: React + Vite.

Responsibilities:

- Provide the main user interface.
- Let the user submit a YouTube video URL.
- Show transcript or processing status.
- Let the user ask questions.
- Display chatbot answers clearly.

### Browser Extension

Technology: Manifest V3.

Responsibilities:

- Connect the project to YouTube pages.
- Detect the current video page.
- Send video information to the backend or frontend.
- Provide a lightweight extension interface.

## Milestones

### Milestone 1: Project Setup

Goal: Create the basic project structure.

Deliverables:

- Backend scaffold.
- Frontend scaffold.
- Extension scaffold.
- Project plan.
- Implementation rules.
- Initial README files.

Learning focus:

- Understand the folder structure.
- Understand how backend, frontend, and extension will fit together.

### Milestone 2: Backend Health API

Goal: Run the FastAPI backend and verify a basic API route.

Deliverables:

- Working FastAPI app.
- Health check route.
- Backend README with setup instructions.

Learning focus:

- FastAPI application structure.
- Routes, services, and models.
- Python type hints.

### Milestone 3: Frontend App Shell

Goal: Run the React + Vite frontend and connect it to the backend health API.

Deliverables:

- Working Vite app.
- Basic app layout.
- API call to backend health route.
- Frontend README with setup instructions.

Learning focus:

- React components.
- Vite project structure.
- Frontend-to-backend communication.

### Milestone 4: Extension App Shell

Goal: Create a basic Manifest V3 extension.

Deliverables:

- `manifest.json`.
- Popup UI.
- Content script for YouTube pages.
- Extension README with loading instructions.

Learning focus:

- Manifest V3 structure.
- Browser extension permissions.
- Content scripts and popup scripts.

### Milestone 5: YouTube Transcript Ingestion

Goal: Accept a YouTube URL and retrieve transcript text.

Deliverables:

- Backend route for submitting a video URL.
- Transcript service.
- Transcript response model.
- Basic error handling.

Learning focus:

- API request and response design.
- Separating route logic from service logic.
- Handling external data safely.

### Milestone 6: Chunking and Storage

Goal: Split transcript text into searchable chunks.

Deliverables:

- Chunking service.
- Chunk models.
- Simple local storage approach.

Learning focus:

- Why chunking matters in RAG.
- Designing data models.
- Keeping logic testable.

### Milestone 7: Embeddings and Retrieval

Goal: Convert chunks into embeddings and retrieve relevant chunks for a question.

Deliverables:

- Embedding service.
- Retrieval service.
- Environment variable setup for secrets.

Learning focus:

- What embeddings are.
- How similarity search works.
- How to keep API keys out of source code.

### Milestone 8: Chatbot Answers

Goal: Generate answers using retrieved transcript context.

Deliverables:

- Chat route.
- Chat service.
- Request and response models.
- Frontend chat interface.

Learning focus:

- Retrieval-augmented generation flow.
- Prompt construction.
- User-facing answer design.

### Milestone 9: Extension Integration

Goal: Let the extension pass the current YouTube video to the app.

Deliverables:

- Extension detects YouTube video URL.
- Popup sends video URL to the app.
- Frontend or backend receives video information.

Learning focus:

- Extension-to-app communication.
- Browser APIs.
- End-to-end workflow.

### Milestone 10: Polish, Tests, and Documentation

Goal: Make the project easier to run, understand, and maintain.

Deliverables:

- Focused tests for backend services.
- Clear root README.
- Updated milestone READMEs.
- Cleanup of rough edges.

Learning focus:

- Testing service logic.
- Documentation habits.
- Preparing a project for future improvement.

## Development Rhythm

Work one milestone at a time.

For each milestone:

1. Explain the goal.
2. Build the smallest useful version.
3. Run it.
4. Fix obvious issues.
5. Update the relevant README.
6. Create a Git commit.
7. Review what was learned before moving on.

