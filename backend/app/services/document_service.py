"""Document file operations service"""
import os
from pathlib import Path
from typing import List, Dict, Optional

DOCS_DIR = Path(__file__).parent.parent.parent / "docs"


async def list_documents() -> List[Dict[str, str]]:
    """
    List all documents in the docs directory

    Returns:
        List of documents with id, name, and path
    """
    documents = []

    if not DOCS_DIR.exists():
        return documents

    for file_path in DOCS_DIR.iterdir():
        if file_path.is_file() and file_path.suffix in [".txt", ".md"]:
            documents.append({
                "id": file_path.stem,
                "name": file_path.name,
                "size": file_path.stat().st_size,
            })

    return sorted(documents, key=lambda x: x["name"])


async def get_document(doc_id: str) -> Optional[Dict[str, str]]:
    """
    Get document content by ID

    Args:
        doc_id: Document ID (filename without extension)

    Returns:
        Document with id, name, and content, or None if not found
    """
    # Try both .txt and .md extensions
    for ext in [".txt", ".md"]:
        file_path = DOCS_DIR / f"{doc_id}{ext}"
        if file_path.exists():
            content = file_path.read_text(encoding="utf-8")
            return {
                "id": doc_id,
                "name": file_path.name,
                "content": content,
            }

    return None


async def get_documents_content(doc_ids: Optional[List[str]] = None) -> str:
    """
    Get concatenated content of multiple documents for LLM context

    Args:
        doc_ids: List of document IDs, or None for all documents

    Returns:
        Concatenated document content with metadata
    """
    if doc_ids is None:
        # Get all documents
        docs = await list_documents()
        doc_ids = [doc["id"] for doc in docs]

    content_parts = []

    for doc_id in doc_ids:
        doc = await get_document(doc_id)
        if doc:
            content_parts.append(f"=== Document: {doc['name']} ===\n{doc['content']}\n")

    return "\n".join(content_parts)
