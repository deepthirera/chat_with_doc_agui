
## Directory Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI application entry point
│   ├── routers/          # API route handlers
│   ├── services/         # Business logic layer
│   ├── models/           # Pydantic models
│   ├── utils/            # Utility functions
│   └── config.py         # Configuration management
├── docs/                 # Document storage
├── tests/                # Test files
└── requirements.txt      # Python dependencies
```


## Code Quality Standards

### 1. Naming Conventions

```python
# ✅ Classes: PascalCase
class DocumentService:
    pass

# ✅ Functions/Variables: snake_case
def load_documents():
    pass

selected_docs = []

# ✅ Constants: UPPER_SNAKE_CASE
API_VERSION = "v1"
MAX_DOCUMENTS = 100

# ✅ Private members: _leading_underscore
class VectorStore:
    def __init__(self):
        self._client = None
```

### 2. Type Hints
```python
# ✅ Good: Always use type hints
from typing import List, Optional, Dict, Any

def search_documents(
    query: str,
    doc_ids: Optional[List[str]] = None,
    limit: int = 10
) -> List[Dict[str, Any]]:
    """Search documents with type safety."""
    pass

# ❌ Bad: No type hints
def search_documents(query, doc_ids=None, limit=10):
    pass
```

### 3. Docstrings
```python
# ✅ Good: Comprehensive docstrings
def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for a list of texts.

    Args:
        texts: List of text strings to embed

    Returns:
        List of embedding vectors (each is a list of floats)

    Raises:
        ValueError: If texts list is empty
        ModelError: If embedding model fails
    """
    pass
```

### 4. Error Handling

```python
# ✅ Good: Specific exceptions with context
from fastapi import HTTPException

try:
    document = await document_service.get_by_id(doc_id)
except DocumentNotFoundError as e:
    raise HTTPException(
        status_code=404,
        detail=f"Document {doc_id} not found"
    )
except Exception as e:
    logger.error(f"Unexpected error loading document: {e}")
    raise HTTPException(
        status_code=500,
        detail="Internal server error"
    )
```

### 5. Logging

```python
import logging

logger = logging.getLogger(__name__)

# ✅ Good: Structured logging with levels
logger.info(f"Loading document: {doc_id}")
logger.warning(f"Document {doc_id} not in cache, fetching from DB")
logger.error(f"Failed to load document {doc_id}: {error}")

# ❌ Bad: Print statements
print(f"Loading document: {doc_id}")
```

## API Design Principles

### 1. RESTful Endpoints
```python
# ✅ Good: RESTful design
GET    /api/v1/documents           # List all documents
GET    /api/v1/documents/{id}      # Get specific document
POST   /api/v1/chat/stream         # Stream chat response

# ❌ Bad: Non-RESTful
GET    /api/v1/get-all-docs
POST   /api/v1/chat-with-stream
```

### 2. Consistent Response Format
```python
# Success response
{
    "status": "success",
    "data": { ... }
}

# Error response
{
    "status": "error",
    "message": "Error description",
    "detail": { ... }
}

## Security Best Practices

### 1. Input Validation
- Use Pydantic models for all inputs
- Validate file uploads
- Sanitize user queries
- Limit request sizes


### 3. Error Information Disclosure
```python
# ✅ Good: Don't expose internal details
raise HTTPException(
    status_code=500,
    detail="An error occurred processing your request"
)

# ❌ Bad: Exposing stack traces
raise HTTPException(
    status_code=500,
    detail=str(exception)  # May contain sensitive info
)
```
## Common Pitfalls to Avoid

1. ❌ Not using async/await for I/O operations
2. ❌ Missing type hints
3. ❌ Poor error handling
4. ❌ No logging or excessive logging
5. ❌ Hardcoded configuration values
6. ❌ Not validating inputs
7. ❌ Blocking operations in async functions
8. ❌ Missing docstrings
9. ❌ Not following AG-UI protocol strictly
10. ❌ Inefficient vector database queries
