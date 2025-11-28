import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const documentAPI = {
  /**
   * Get list of all documents
   */
  listDocuments: async () => {
    const response = await api.get('/documents')
    return response.data
  },

  /**
   * Get specific document by ID
   */
  getDocument: async (docId) => {
    const response = await api.get(`/documents/${docId}`)
    return response.data
  },
}

export const chatAPI = {
  /**
   * Get streaming chat endpoint URL
   */
  getStreamURL: () => `${API_BASE_URL}/chat/stream`,
}

export default api
