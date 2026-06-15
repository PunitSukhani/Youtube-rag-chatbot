import React from 'react'
import { renderMessageContent } from '../utils/markdown'

function MessageBubble({ role, content }) {
  return (
    <div className={`message-bubble ${role}`}>
      <div className="message-content">
        {renderMessageContent(content)}
      </div>
    </div>
  )
}

export default MessageBubble
