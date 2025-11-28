"""Document-related Pydantic models"""
from pydantic import BaseModel, Field


class DocumentInfo(BaseModel):
    """Basic document information (list view)"""

    id: str = Field(..., description="Document ID (filename without extension)")
    name: str = Field(..., description="Document filename")
    size: int = Field(..., description="Document size in bytes", ge=0)


class DocumentDetail(BaseModel):
    """Detailed document with content"""

    id: str = Field(..., description="Document ID (filename without extension)")
    name: str = Field(..., description="Document filename")
    content: str = Field(..., description="Full document content")
