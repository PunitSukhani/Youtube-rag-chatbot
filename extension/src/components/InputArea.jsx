import React, { useEffect, useRef } from 'react'

function InputArea({ question, setQuestion, onSend, loading }) {
  const inputRef = useRef(null)

  // Auto-focus the input field when the component mounts (popup opens)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend()
    }
  }

  return (
    <div className="input-area">
      <input 
        ref={inputRef}
        type="text" 
        placeholder="Ask a question..." 
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button onClick={onSend} disabled={loading || !question.trim()}>
        Send
      </button>
    </div>
  )
}

export default InputArea
