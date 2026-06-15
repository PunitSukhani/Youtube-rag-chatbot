import React from 'react'

function Header({ showClearBtn, onClearChat }) {
  return (
    <header className="popup-header">
      <h1 className="popup-title">YouTube RAG Chatbot</h1>
      {showClearBtn && (
        <button className="clear-btn" onClick={onClearChat} title="Clear Chat">
          Clear
        </button>
      )}
    </header>
  )
}

export default Header
