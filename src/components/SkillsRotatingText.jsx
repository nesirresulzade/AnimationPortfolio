import { useEffect, useState, useRef } from 'react'
import '../styles/SkillsRotatingText.css'

const SkillsRotatingText = ({ texts, rotationInterval = 2000, staggerDuration = 0.04, className = '' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [chars, setChars] = useState([])
  const containerRef = useRef(null)

  const splitIntoCharacters = text => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
      return Array.from(segmenter.segment(text), segment => segment.segment)
    }
    return Array.from(text)
  }

  useEffect(() => {
    const currentText = texts[currentTextIndex] || ''
    const textChars = splitIntoCharacters(currentText)
    setChars(textChars)
  }, [currentTextIndex, texts])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length)
    }, rotationInterval)

    return () => clearInterval(intervalId)
  }, [texts.length, rotationInterval])

  return (
    <span className={`skills-rotating-text ${className}`} ref={containerRef} role="status" aria-live="polite">
      {chars.map((char, index) => (
        <span
          key={index}
          className="char"
          style={{
            animationDelay: `${index * staggerDuration}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default SkillsRotatingText
