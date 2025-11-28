import { useState, useCallback } from 'react'
import AGUIClient from '../services/aguiClient'
import { chatAPI } from '../services/api'

/**
 * Custom hook for AG-UI streaming chat
 * @returns {Object} Hook utilities
 */
export function useAGUIStream() {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (userMessage, docIds = null) => {
    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage, timestamp: new Date().toISOString() },
    ])

    setIsStreaming(true)
    setError(null)

    // Initialize assistant message
    let assistantMessage = { role: 'assistant', content: '', timestamp: new Date().toISOString() }

    try {
      const client = new AGUIClient(chatAPI.getStreamURL())

      await client.stream(userMessage, docIds, {
        onRunStarted: (event) => {
          console.log('AG-UI: Run started', event)
        },
        onMessageStart: (event) => {
          console.log('AG-UI: Message start', event)
          // Add empty assistant message to UI
          setMessages((prev) => [...prev, assistantMessage])
        },
        onMessageContent: (event) => {
          // Append content to assistant message
          assistantMessage.content += event.content
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { ...assistantMessage }
            return updated
          })
        },
        onMessageEnd: (event) => {
          console.log('AG-UI: Message end', event)
        },
        onRunFinished: (event) => {
          console.log('AG-UI: Run finished', event)
          setIsStreaming(false)
        },
        onError: (err) => {
          console.error('AG-UI: Error', err)
          setError(err.message)
          setIsStreaming(false)
        },
      })
    } catch (err) {
      setError(err.message)
      setIsStreaming(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  }
}

export default useAGUIStream
