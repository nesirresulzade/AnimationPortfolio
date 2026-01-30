import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RotatingText = ({
  texts = [],
  rotationInterval = 2000,
  stagger = 0.025,
  auto = true,
  loop = true,
  className = '',
  onNext
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!auto || texts.length <= 1) return

    const timeout = setTimeout(() => {
      const nextIndex = index === texts.length - 1 ? (loop ? 0 : index) : index + 1
      if (nextIndex !== index) {
        setIndex(nextIndex)
        onNext?.(nextIndex)
      }
    }, rotationInterval)

    return () => clearTimeout(timeout)
  }, [index, auto, rotationInterval, texts.length, loop, onNext])

  const currentText = texts[index] || ''
  const characters = typeof Intl !== 'undefined' && Intl.Segmenter
    ? [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(currentText)].map(s => s.segment)
    : Array.from(currentText)

  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="flex flex-wrap"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {characters.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { y: '100%', opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: '-100%', opacity: 0 }
              }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
                delay: i * stagger
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default RotatingText
