import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

function MessageList({ messages, loading }) {
  const listEndRef = useRef(null)

  // Smoothly scroll the container to the anchor at the bottom
  const scrollToBottom = () => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  return (
    <div className="messages-list">
      {messages.length === 0 ? (
        <div className="welcome-state">
          <p>Hello! Ask me anything about this video.</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} content={msg.content} />
        ))
      )}

      {/* Typing Indicator */}
      {loading && (
        <div className="message-bubble model">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {/* Auto-scroll anchor */}
      <div ref={listEndRef} />
    </div>
  )
}

export default MessageList
