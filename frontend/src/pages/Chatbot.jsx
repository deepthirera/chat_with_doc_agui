import { useState, useRef, useEffect } from 'react'
import { documentAPI } from '../services/api'
import { useAGUIStream } from '../hooks/useAGUIStream'
import ChatMessage from '../components/ChatMessage'

function Chatbot() {
  const [inputMessage, setInputMessage] = useState('')
  const [documents, setDocuments] = useState([])
  const [selectedDocs, setSelectedDocs] = useState([])
  const messagesEndRef = useRef(null)

  const { messages, isStreaming, error, sendMessage, clearMessages } = useAGUIStream()

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadDocuments = async () => {
    try {
      const docs = await documentAPI.listDocuments()
      setDocuments(docs)
    } catch (err) {
      console.error('Failed to load documents:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isStreaming) return

    const message = inputMessage.trim()
    setInputMessage('')

    await sendMessage(message, selectedDocs.length > 0 ? selectedDocs : null)
  }

  const toggleDocSelection = (docId) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Chatbot</h1>
        <p className="mt-2 text-sm text-gray-700">
          Ask questions about your documents using AG-UI streaming protocol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Document Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Select Documents
            </h2>
            <p className="text-xs text-gray-600 mb-3">
              Choose documents to query (optional)
            </p>
            {documents.length === 0 ? (
              <p className="text-xs text-gray-500">No documents available</p>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <label
                    key={doc.id}
                    className="flex items-start space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => toggleDocSelection(doc.id)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{doc.name}</span>
                  </label>
                ))}
              </div>
            )}
            {selectedDocs.length > 0 && (
              <button
                onClick={() => setSelectedDocs([])}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Start a conversation
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Ask questions about your documents
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}

              {isStreaming && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isStreaming}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isStreaming}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isStreaming ? 'Sending...' : 'Send'}
                </button>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearMessages}
                    disabled={isStreaming}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                )}
              </form>
              {selectedDocs.length > 0 && (
                <p className="mt-2 text-xs text-gray-600">
                  Querying {selectedDocs.length} selected{' '}
                  {selectedDocs.length === 1 ? 'document' : 'documents'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
