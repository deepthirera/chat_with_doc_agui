"""AG-UI protocol service for streaming events"""
import json
from datetime import datetime
from typing import AsyncIterator, Optional, List

from app.services.document_service import get_documents_content
from app.services.llm_service import llm_service
from app.models.agui_events import (
    AGUIEvent,
    RunStartedEvent,
    TextMessageStartEvent,
    TextMessageContentEvent,
    TextMessageEndEvent,
    RunFinishedEvent,
)


async def stream_chat_response(
    message: str, doc_ids: Optional[List[str]] = None
) -> AsyncIterator[str]:
    """
    Stream chat response as AG-UI events via SSE

    AG-UI Protocol: Streams a sequence of JSON events following the AG-UI spec
    Event format: data: {JSON}\n\n

    Args:
        message: User's message/question
        doc_ids: Optional list of document IDs to use as context

    Yields:
        SSE-formatted event strings
    """

    def format_sse_event(event: AGUIEvent) -> str:
        """Format event as SSE data"""
        return f"data: {event.model_dump_json()}\n\n"

    try:
        # Event 1: RUN_STARTED - Chat session begins
        yield format_sse_event(
            RunStartedEvent(
                run_id=f"run_{datetime.utcnow().timestamp()}",
            )
        )

        # Load document context if doc_ids provided
        context = ""
        if doc_ids:
            context = await get_documents_content(doc_ids)

        # Event 2: TEXT_MESSAGE_START - Agent starts responding
        yield format_sse_event(TextMessageStartEvent())

        # Event 3: TEXT_MESSAGE_CONTENT (streaming) - Stream LLM response chunks
        async for chunk in llm_service.stream_response(message, context):
            yield format_sse_event(TextMessageContentEvent(content=chunk))

        # Event 4: TEXT_MESSAGE_END - Response complete
        yield format_sse_event(TextMessageEndEvent())

        # Event 5: RUN_FINISHED - Session ends successfully
        yield format_sse_event(RunFinishedEvent(status="success"))

    except Exception as e:
        # Send error event
        yield format_sse_event(
            RunFinishedEvent(
                status="error",
                error=str(e),
            )
        )
