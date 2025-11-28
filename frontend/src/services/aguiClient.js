/**
 * AG-UI Protocol SSE Client
 * Handles Server-Sent Events for streaming chat responses
 */

import { AGUI_EVENTS, SSE_CONFIG, API_CONFIG } from '../constants'

export class AGUIClient {
  constructor(url) {
    this.url = url
    this.eventSource = null
  }

  /**
   * Stream chat response with AG-UI protocol events
   * @param {string} message - User message
   * @param {Array<string>} docIds - Optional document IDs
   * @param {Object} callbacks - Event callbacks
   */
  async stream(message, docIds = null, callbacks = {}) {
    const {
      onRunStarted = () => {},
      onMessageStart = () => {},
      onMessageContent = () => {},
      onMessageEnd = () => {},
      onRunFinished = () => {},
      onError = () => {},
    } = callbacks

    try {
      // Create request body
      const body = JSON.stringify({
        message,
        doc_ids: docIds,
      })

      // Initiate fetch with streaming
      const response = await fetch(this.url, {
        method: API_CONFIG.METHODS.POST,
        headers: {
          'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
        },
        body,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Read stream
      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        // Decode chunk
        const chunk = decoder.decode(value, { stream: true })

        // Parse SSE events (format: data: {json}\n\n)
        const events = chunk
          .split(SSE_CONFIG.EVENT_DELIMITER)
          .filter((line) => line.startsWith(SSE_CONFIG.DATA_PREFIX))
          .map((line) => line.replace(SSE_CONFIG.DATA_PREFIX, ''))

        // Process each event
        for (const eventStr of events) {
          try {
            const event = JSON.parse(eventStr)

            // Dispatch based on AG-UI event type
            switch (event.type) {
              case AGUI_EVENTS.RUN_STARTED:
                onRunStarted(event)
                break
              case AGUI_EVENTS.TEXT_MESSAGE_START:
                onMessageStart(event)
                break
              case AGUI_EVENTS.TEXT_MESSAGE_CONTENT:
                onMessageContent(event)
                break
              case AGUI_EVENTS.TEXT_MESSAGE_END:
                onMessageEnd(event)
                break
              case AGUI_EVENTS.RUN_FINISHED:
                onRunFinished(event)
                break
              default:
                console.log('Unknown event type:', event.type)
            }
          } catch (e) {
            // Skip invalid JSON
            console.warn('Failed to parse event:', e)
          }
        }
      }
    } catch (error) {
      onError(error)
      throw error
    }
  }
}

export default AGUIClient
