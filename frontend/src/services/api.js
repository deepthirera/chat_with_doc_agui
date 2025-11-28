import axios from 'axios'
import { API_CONFIG } from '../constants'

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
  },
})

export const documentAPI = {
  /**
   * Get list of all documents
   */
  listDocuments: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.DOCUMENTS)
    return response.data
  },

  /**
   * Get specific document by ID
   */
  getDocument: async (docId) => {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.DOCUMENTS}/${docId}`)
    return response.data
  },
}

export const chatAPI = {
  /**
   * Get streaming chat endpoint URL
   */
  getStreamURL: () => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT_STREAM}`,
}

export default api
