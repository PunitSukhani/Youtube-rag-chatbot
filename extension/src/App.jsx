import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [videoId, setVideoId] = useState(null)
  const [error, setError] = useState(null)

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
      setError('Chrome API not available. Run as extension.')
    }
  }, [])

  return (
    <div className="popup">
      <h1 className="popup-title">YouTube RAG Chatbot</h1>
      <div className="video-info">
        {videoId ? (
          <>
            <p className="popup-subtitle">Current Video ID:</p>
            <p className="video-id">{videoId}</p>
          </>
        ) : (
          <p className="popup-subtitle error">{error || 'Detecting...'}</p>
        )}
      </div>
    </div>
  )
}

export default App
