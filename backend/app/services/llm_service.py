"""LLM integration service using Ollama"""
from typing import AsyncIterator
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage


class LLMService:
    """Service for interacting with local LLM via Ollama"""

    def __init__(self, model: str = "mistral:latest", base_url: str = "http://localhost:11434"):
        """
        Initialize LLM service

        Args:
            model: Ollama model name
            base_url: Ollama server URL
        """
        self.llm = ChatOllama(
            model=model,
            base_url=base_url,
            temperature=0.7,
        )

    async def stream_response(
        self, user_message: str, context: str = ""
    ) -> AsyncIterator[str]:
        """
        Stream LLM response

        Args:
            user_message: User's question
            context: Document context for answering

        Yields:
            Text chunks from LLM
        """
        messages = []

        if context:
            system_prompt = f"""You are a helpful assistant that answers questions based on the provided documents.

Documents:
{context}

Answer the user's question based only on the information in the documents above. If the information is not in the documents, say so."""
            messages.append(SystemMessage(content=system_prompt))
        else:
            messages.append(
                SystemMessage(
                    content="You are a helpful assistant. Answer questions concisely and clearly."
                )
            )

        messages.append(HumanMessage(content=user_message))

        # Stream the response
        async for chunk in self.llm.astream(messages):
            if chunk.content:
                yield chunk.content


# Global instance
llm_service = LLMService()
