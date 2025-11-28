# Document Chatbot Backend

FastAPI backend with AG-UI protocol for streaming document-based chat responses.

## Setup

1. Install UV (if not installed):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Create virtual environment and install dependencies:
```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .
```

3. Install Ollama and download a model:
```bash
# Install Ollama from https://ollama.ai
ollama pull llama3.2
```

4. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

- `GET /api/documents` - List all documents
- `GET /api/documents/{doc_id}` - Get document content
- `POST /api/chat/stream` - AG-UI streaming chat endpoint

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── api/                 # API routes
│   ├── services/            # Business logic
│   └── models/              # Pydantic models
└── docs/                    # Document storage
```
