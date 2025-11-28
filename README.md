# Document Chatbot with AG-UI Protocol

A full-stack document Q&A application using React, FastAPI, and the AG-UI protocol for streaming AI responses.

## Overview

This project demonstrates the AG-UI (Agent-User Interaction Protocol) for real-time streaming communication between a React frontend and FastAPI backend. Users can browse documents and ask questions using a local LLM (Ollama).

## Features

- **Document Management**: Browse and view documents stored in the file system
- **AG-UI Streaming Chatbot**: Ask questions about documents with real-time streaming responses
- **Local LLM**: Uses Ollama with Llama models (no external API calls)
- **Modern Stack**: React + FastAPI + AG-UI protocol

## Architecture

```
doc-chatbot/
├── backend/          # FastAPI + Ollama
│   ├── app/
│   │   ├── api/      # REST endpoints + AG-UI streaming
│   │   ├── services/ # Document, LLM, and AG-UI services
│   │   └── models/   # Pydantic schemas
│   └── docs/         # Document storage
└── frontend/         # React + Vite
    └── src/
        ├── pages/    # DocumentList, DocumentView, Chatbot
        ├── services/ # API client and AG-UI SSE client
        └── hooks/    # useAGUIStream custom hook
```

## Tech Stack

**Backend:**
- FastAPI (async web framework)
- UV (Python package manager)
- Ollama + LangChain (local LLM)
- AG-UI Protocol (Server-Sent Events)

**Frontend:**
- React 18 + Vite
- React Router
- TailwindCSS
- Custom AG-UI client

## Prerequisites

1. **Python 3.11+** and **UV**:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Node.js 20+** and **npm**

3. **Ollama** for local LLM:
   ```bash
   # Install from https://ollama.ai
   ollama pull llama3.2
   ```

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Install dependencies with UV
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .

# Start the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Usage

1. **Browse Documents**: Navigate to the home page to see all documents in `backend/docs/`
2. **View Document**: Click on a document card to view its content
3. **Chat with Documents**: Go to the Chatbot page, optionally select documents, and ask questions
4. **Watch AG-UI Streaming**: Observe real-time streaming responses using the AG-UI protocol

## AG-UI Protocol

This app implements the AG-UI protocol for streaming agent-user interactions:

**Event Types Used:**
- `RUN_STARTED`: Chat session begins
- `TEXT_MESSAGE_START`: Assistant starts responding
- `TEXT_MESSAGE_CONTENT`: Streaming text chunks
- `TEXT_MESSAGE_END`: Response complete
- `RUN_FINISHED`: Session ends

**Transport**: Server-Sent Events (SSE) over HTTP

## API Endpoints

**Documents:**
- `GET /api/documents` - List all documents
- `GET /api/documents/{doc_id}` - Get document content

**Chat (AG-UI):**
- `POST /api/chat/stream` - Stream chat response
  - Body: `{message: string, doc_ids?: string[]}`
  - Response: SSE stream of AG-UI events

## Adding Documents

Add `.txt` or `.md` files to `backend/docs/`:

```bash
echo "Your content here" > backend/docs/my-document.txt
```

The document will automatically appear in the frontend.

## Development

**Backend:**
```bash
cd backend
uv pip install -e ".[dev]"  # Install dev dependencies
pytest                       # Run tests (when added)
```

**Frontend:**
```bash
cd frontend
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

## Project Status

Phase 1 Complete: Skeleton architecture with all core files and configuration

**Next Steps:**
- Test backend and frontend integration
- Verify AG-UI streaming works end-to-end
- Add error handling and edge cases
- Enhance UI/UX

## Resources

- [AG-UI Protocol Documentation](https://docs.ag-ui.com)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Ollama Documentation](https://ollama.ai)
- [React Documentation](https://react.dev)

## License

MIT
