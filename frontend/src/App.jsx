import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DocumentList from './pages/DocumentList'
import DocumentView from './pages/DocumentView'
import Chatbot from './pages/Chatbot'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  Documents
                </Link>
                <Link
                  to="/chat"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  Chatbot
                </Link>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Doc Chatbot
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DocumentList />} />
            <Route path="/document/:docId" element={<DocumentView />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
