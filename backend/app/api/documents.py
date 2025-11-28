"""Document API endpoints"""
from fastapi import APIRouter, HTTPException
from typing import List, Dict

from app.services import document_service

router = APIRouter()


@router.get("/documents")
async def list_documents() -> List[Dict[str, str]]:
    """List all available documents"""
    try:
        documents = await document_service.list_documents()
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/documents/{doc_id}")
async def get_document(doc_id: str) -> Dict[str, str]:
    """Get specific document content by ID"""
    try:
        document = await document_service.get_document(doc_id)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        return document
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
