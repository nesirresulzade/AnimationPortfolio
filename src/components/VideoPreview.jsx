import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect()
    const xOffset = clientX - (rect.left + rect.width / 2)
    const yOffset = clientY - (rect.top + rect.height / 2)

    if (isHovering) {
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2,
        rotationX: -yOffset / 2,
        transformPerspective: 500,
        duration: 1,
        ease: 'power1.out',
      })

      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
      })
    }
  }

  useEffect(() => {
    if (!isHovering) {
      gsap.to([sectionRef.current, contentRef.current], {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
      })
    }
  }, [isHovering])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ perspective: '500px' }}
    >
      <div ref={contentRef} style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </section>
  )
}

export default VideoPreview
