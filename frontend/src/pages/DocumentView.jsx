import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { documentAPI } from '../services/api'

function DocumentView() {
  const { docId } = useParams()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDocument()
  }, [docId])

  const loadDocument = async () => {
    try {
      setLoading(true)
      const doc = await documentAPI.getDocument(docId)
      setDocument(doc)
      setError(null)
    } catch (err) {
      setError('Failed to load document. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={loadDocument}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
            <Link
              to="/"
              className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Back to Documents
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Documents
        </Link>
      </div>

      {document && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900">{document.name}</h1>
          </div>
          <div className="px-6 py-6">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
              {document.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentView
