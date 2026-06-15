import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [videoId, setVideoId] = useState(null)
  const [error, setError] = useState(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if chrome.tabs API is available
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0]
        if (currentTab && currentTab.url) {
          try {
            const url = new URL(currentTab.url)
            if (url.hostname.includes('youtube.com') && url.searchParams.has('v')) {
              setVideoId(url.searchParams.get('v'))
            } else {
              setError('Not a YouTube video page.')
            }
          } catch (e) {
            setError('Invalid URL format.')
          }
        } else {
          setError('Could not read tab URL.')
        }
      })
    } else {
      // Mock for local browser tab development (e.g. testing at http://localhost:5173/)
      setVideoId('dQw4w9WgXcQ')
    }
  }, [])

  const handleSend = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    setError(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          videoId: videoId,
          question: question
        })
      })

      const data = await response.json()
      if (data.success) {
        setAnswer(data.answer)
      } else {
        setError(data.error || 'Failed to get answer.')
      }
    } catch (e) {
      setError('Could not connect to the backend server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="popup">
      <h1 className="popup-title">YouTube RAG Chatbot</h1>
      
      {videoId ? (
        <div className="chat-container">
          <p className="popup-subtitle">Video ID: <strong>{videoId}</strong></p>
          
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Ask something about this video..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !question.trim()}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {answer && (
            <div className="response-box">
              <p className="response-label">Answer:</p>
              <p className="response-text">{answer}</p>
            </div>
          )}

          {error && <p className="popup-subtitle error">{error}</p>}
        </div>
      ) : (
        <p className="popup-subtitle error">{error || 'Detecting YouTube Video...'}</p>
      )}
    </div>
  )
}

export default App
