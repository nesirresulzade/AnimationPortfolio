import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = [],
    rotationInterval = 2000,
    stagger = 0.04,
    auto = true,
    loop = true,
    className = '',
    onNext
  } = props

  const containerRef = useRef(null)
  const charsRef = useRef([])
  const [index, setIndex] = useState(0)

  const splitChars = text =>
    typeof Intl !== 'undefined' && Intl.Segmenter
      ? [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)].map(s => s.segment)
      : Array.from(text)

  const animateIn = () => {
    gsap.fromTo(
      charsRef.current,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger
      }
    )
  }

  const animateOut = callback => {
    gsap.to(charsRef.current, {
      yPercent: -120,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      stagger,
      onComplete: callback
    })
  }

  const next = () => {
    animateOut(() => {
      const nextIndex =
        index === texts.length - 1 ? (loop ? 0 : index) : index + 1
      setIndex(nextIndex)
      onNext?.(nextIndex)
    })
  }

  useImperativeHandle(ref, () => ({
    next
  }))

  useEffect(() => {
    animateIn()
  }, [index])

  useEffect(() => {
    if (!auto) return
    const id = setInterval(next, rotationInterval)
    return () => clearInterval(id)
  }, [index, auto, rotationInterval])

  const characters = splitChars(texts[index] || '')

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap overflow-hidden ${className}`}
      aria-label={texts[index]}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          ref={el => (charsRef.current[i] = el)}
          className="inline-block will-change-transform"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
})

RotatingText.displayName = 'RotatingText'
export default RotatingText
