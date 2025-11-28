"""FastAPI application entry point"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import chat, documents

app = FastAPI(
    title="Document Chatbot API",
    description="FastAPI backend with AG-UI protocol for document-based chat",
    version="0.1.0",
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(documents.router, prefix="/api", tags=["documents"])
app.include_router(chat.router, prefix="/api", tags=["chat"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Document Chatbot API",
        "status": "running",
        "docs": "/docs",
    }
