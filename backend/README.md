# YouTube RAG Chatbot - Backend

FastAPI backend for the YouTube RAG Chatbot.

## Setup and Running

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Activate the virtual environment**:
   * **Windows PowerShell**:
     ```powershell
     .\.venv\Scripts\Activate.ps1
     ```
   * **Linux/macOS**:
     ```bash
     source .venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the development server**:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## API Endpoints

### 1. Health Check
* **Endpoint**: `GET /health/`
* **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

### 2. Transcript Retrieval (Phase 2)
* **Endpoint**: `POST /transcript/`
* **Request Body**:
  ```json
  {
    "videoId": "string"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "transcript": "Full combined transcript text...",
    "error": null
  }
  ```
* **Error Response (200 OK)**:
  ```json
  {
    "success": false,
    "transcript": null,
    "error": "Failed to retrieve transcript: [Error Message]"
  }
  ```

#### Transcript Logic Rules:
1. **Prefer English**: Attempts to retrieve English transcript (`en`).
2. **Fallback**: If English transcript is not found, falls back to the first available transcript language.
3. **Explicit Error Handling**: Catches `TranscriptsDisabled` and other exceptions to return user-friendly errors.
4. **Data Model Note**: Under the hood, `youtube-transcript-api` returns a list of `FetchedTranscriptSnippet` objects rather than dictionaries. Data is accessed via attributes (e.g., `item.text`).
