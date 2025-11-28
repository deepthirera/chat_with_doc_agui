# Document Chatbot Frontend

React frontend with AG-UI protocol client for streaming document-based chat.

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

- **Document List**: Browse all available documents
- **Document Viewer**: View document content
- **AG-UI Chatbot**: Ask questions about documents with streaming responses

## Tech Stack

- React 18 + Vite
- React Router (navigation)
- TailwindCSS (styling)
- Axios (HTTP client)
- Custom AG-UI SSE client

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx              # Main app with routing
│   ├── pages/               # Page components
│   ├── components/          # Reusable components
│   ├── services/            # API and AG-UI client
│   └── hooks/               # Custom React hooks
├── package.json
└── vite.config.js
```

## AG-UI Protocol

The chatbot uses a custom AG-UI client (`services/aguiClient.js`) that:
- Connects to the backend streaming endpoint
- Parses Server-Sent Events (SSE)
- Handles AG-UI event types: RUN_STARTED, TEXT_MESSAGE_START, TEXT_MESSAGE_CONTENT, TEXT_MESSAGE_END, RUN_FINISHED
- Provides real-time streaming updates to the UI
