"""AG-UI Chat streaming endpoint"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List

from app.services import agui_service

router = APIRouter()


class ChatRequest(BaseModel):
    """Chat request model"""
    message: str
    doc_ids: Optional[List[str]] = None


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Stream chat responses using AG-UI protocol via Server-Sent Events (SSE)

    AG-UI Events emitted:
    - RUN_STARTED: Chat session begins
    - TEXT_MESSAGE_START: Agent starts responding
    - TEXT_MESSAGE_CONTENT: Streaming text chunks
    - TEXT_MESSAGE_END: Response complete
    - RUN_FINISHED: Session ends
    """
    try:
        return StreamingResponse(
            agui_service.stream_chat_response(request.message, request.doc_ids),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
