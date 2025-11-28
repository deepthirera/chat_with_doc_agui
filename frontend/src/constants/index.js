/**
 * Application Constants
 * Centralized location for all magic strings and configuration values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  ENDPOINTS: {
    DOCUMENTS: '/documents',
    CHAT_STREAM: '/chat/stream',
  },
  HEADERS: {
    CONTENT_TYPE: 'application/json',
  },
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}

// AG-UI Protocol Event Types
export const AGUI_EVENTS = {
  RUN_STARTED: 'RUN_STARTED',
  TEXT_MESSAGE_START: 'TEXT_MESSAGE_START',
  TEXT_MESSAGE_CONTENT: 'TEXT_MESSAGE_CONTENT',
  TEXT_MESSAGE_END: 'TEXT_MESSAGE_END',
  RUN_FINISHED: 'RUN_FINISHED',
}

// SSE (Server-Sent Events) Configuration
export const SSE_CONFIG = {
  DATA_PREFIX: 'data: ',
  EVENT_DELIMITER: '\n\n',
  ENCODING: 'utf-8',
}

// HTTP Status Codes (commonly used)
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}
