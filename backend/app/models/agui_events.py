"""AG-UI Protocol event models"""
from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel, Field


class AGUIEvent(BaseModel):
    """Base AG-UI event"""

    type: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class RunStartedEvent(AGUIEvent):
    """RUN_STARTED: Chat session begins"""

    type: Literal["RUN_STARTED"] = "RUN_STARTED"
    run_id: str


class TextMessageStartEvent(AGUIEvent):
    """TEXT_MESSAGE_START: Agent starts responding"""

    type: Literal["TEXT_MESSAGE_START"] = "TEXT_MESSAGE_START"


class TextMessageContentEvent(AGUIEvent):
    """TEXT_MESSAGE_CONTENT: Streaming text chunk"""

    type: Literal["TEXT_MESSAGE_CONTENT"] = "TEXT_MESSAGE_CONTENT"
    content: str


class TextMessageEndEvent(AGUIEvent):
    """TEXT_MESSAGE_END: Response complete"""

    type: Literal["TEXT_MESSAGE_END"] = "TEXT_MESSAGE_END"


class RunFinishedEvent(AGUIEvent):
    """RUN_FINISHED: Session ends"""

    type: Literal["RUN_FINISHED"] = "RUN_FINISHED"
    status: Literal["success", "error"]
    error: Optional[str] = None
