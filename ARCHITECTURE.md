# Architecture Best Practices

> **Project Context**: Vide coded for learning how AG-UI works

## Overview

This document outlines the architecture best practices for the entire doc-chatbot project. This project demonstrates the AG-UI (Agentic UI) streaming protocol for building interactive document chatbots.

## File Header Requirements

**CRITICAL**: Every file that is part of this project MUST include a comment/docstring at the beginning:

### Python Files
```python
"""
Vide coded for learning how AG-UI works
"""
```

### JavaScript/JSX Files
```javascript
/**
 * Vide coded for learning how AG-UI works
 */
```

### File Formatting
**IMPORTANT**: Every file MUST end with a single empty line (newline at EOF).

### Other Files
Include the comment in the appropriate format for the language.

## Project Structure

```
doc-chatbot/
├── backend/          # FastAPI backend with AG-UI streaming
├── frontend/         # React frontend with SSE client
├── docs/             # Documentation
└── ARCHITECTURE.md   # This file
```

## Core Principles

### 1. Code Quality Standards
- **Descriptive naming**: Avoid generic names like `data`, `temp`, `result`
- **No magic strings**: Extract repeated strings to constants

### 2. Documentation
- Every file must have the project context header
- README files in each major directory

### 3. Configuration Management
- Use environment variables for configuration
- Never hardcode secrets or API keys
- Document all required environment variables

### 4. Error Handling & Logging
- Consistent error handling patterns across frontend and backend
- Structured logging with appropriate log levels
- User-friendly error messages in the UI
- Detailed error context for debugging

### Security
- Input validation on all endpoints
- Sanitize user inputs to prevent XSS
- CORS configuration for production
