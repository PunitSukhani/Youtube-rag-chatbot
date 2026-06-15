import React from 'react'

/**
 * Parses basic markdown text into React JSX elements.
 * Supports:
 * - Bullet lists (- or * at the start of a line)
 * - Bold text (**text**)
 * - Inline code (`code`)
 * - Paragraph separation (\n)
 */
export const renderMessageContent = (text) => {
  if (!text) return ''
  
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    let trimmed = line.trim()
    
    // 1. Detect bullet points
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ')
    if (isBullet) {
      trimmed = trimmed.substring(2)
    }
    
    // 2. Parse inline bold (**text**) and inline code (`code`)
    const regex = /(\*\*.*?\*\*|`.*?`)/g
    const parts = trimmed.split(regex)
    
    const parsedElements = parts.map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIdx}>{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={partIdx} className="inline-code">{part.slice(1, -1)}</code>
      }
      return part
    })

    // 3. Return a list item or standard paragraph element
    if (isBullet) {
      return (
        <li key={lineIdx} className="bullet-item">
          {parsedElements}
        </li>
      )
    }
    return (
      <p key={lineIdx} className="paragraph-item">
        {parsedElements}
      </p>
    )
  })
}
