import { useEffect, useState } from 'react'
import Header from './components/Header'
import MessageList from './components/MessageList'
import InputArea from './components/InputArea'
import './App.css'

function App() {
  const [videoId, setVideoId] = useState(null)
  const [error, setError] = useState(null)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  // Detect YouTube video ID from active tab URL
  useEffect(() => {
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
      // Mock fallback for local browser development
      setVideoId('dQw4w9WgXcQ')
    }
  }, [])

  // Clear chat log
  const handleClearChat = () => {
    setMessages([])
    setError(null)
  }

  // Handle request submission
  const handleSend = async () => {
    if (!question.trim()) return

    const userQuery = question.trim()
    const newUserMessage = { role: 'user', content: userQuery }

    // Update message state locally and clear input area
    setMessages((prev) => [...prev, newUserMessage])
    setQuestion('')
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          videoId: videoId,
          question: userQuery
        })
      })

      const data = await response.json()

      if (data.success) {
        const newModelMessage = { role: 'model', content: data.answer }
        setMessages((prev) => [...prev, newModelMessage])
      } else {
        setError(data.error || 'Failed to retrieve answer.')
      }
    } catch (e) {
      setError('Could not connect to the backend server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="popup">
      {/* Header component containing Title and Clear button */}
      <Header showClearBtn={messages.length > 0} onClearChat={handleClearChat} />

      {videoId ? (
        <div className="chat-container">
          <div className="video-banner">
            <span>✓ Transcript Loaded</span>
          </div>

          {/* Scrollable list of chat messages */}
          <MessageList messages={messages} loading={loading} />

          {/* Error notification banner */}
          {error && (
            <div className="error-banner">
              <span>{error}</span>
            </div>
          )}

          {/* Bottom input area */}
          <InputArea 
            question={question} 
            setQuestion={setQuestion} 
            onSend={handleSend} 
            loading={loading} 
          />
        </div>
      ) : (
        <div className="detection-error">
          <p className="error">{error || 'Detecting YouTube Video...'}</p>
        </div>
      )}
    </div>
  )
}

export default App
