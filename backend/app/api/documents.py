"""Document API endpoints"""
from fastapi import APIRouter, HTTPException
from typing import List

from app.models.document import DocumentInfo, DocumentDetail
from app.services import document_service

router = APIRouter()


@router.get("/documents", response_model=List[DocumentInfo])
async def list_documents() -> List[DocumentInfo]:
    """List all available documents"""
    try:
        documents = await document_service.list_documents()
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/documents/{doc_id}", response_model=DocumentDetail)
async def get_document(doc_id: str) -> DocumentDetail:
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


@router.get("/documents/search/{query}")
async def search_documents(query: str):
    try:
        data = await document_service.list_documents()
        result = []
        temp = query.lower()
        for x in data:
            if temp in x.title.lower() or temp in x.description.lower():
                result.append(x)
        if len(result) > 100:
            result = result[:100]
        return {"status": "ok", "results": result, "count": len(result)}
    except:
        return {"status": "error", "message": "Something went wrong"}
