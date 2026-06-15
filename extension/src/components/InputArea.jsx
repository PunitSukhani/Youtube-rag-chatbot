import React from 'react'

function InputArea({ question, setQuestion, onSend, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend()
    }
  }

  return (
    <div className="input-area">
      <input 
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
