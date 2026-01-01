import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const RadialProgress = ({ size = 96, stroke = 8, percentage = 75, color = '#61DAFB', label, icon, animate = true }) => {
  const circleRef = useRef(null)
  const textRef = useRef(null)
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r

  useEffect(() => {
    if (!animate) return
    const el = circleRef.current
    const txt = textRef.current
    if (!el) return
    // start with 0 and animate to target
    gsap.fromTo(el, { strokeDashoffset: circumference }, { strokeDashoffset: circumference * (1 - percentage / 100), duration: 1.2, ease: 'power2.out' })
    if (txt) gsap.fromTo(txt, { innerText: 0 }, { innerText: Math.round(percentage), duration: 1.2, snap: { innerText: 1 }, ease: 'power2.out', onUpdate() { txt.textContent = `${Math.round(this.targets()[0].innerText)}%` } })
  }, [circumference, percentage, animate])

  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ width: size, height: size }} className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} fill="none" />
          <circle
            ref={circleRef}
            cx={size/2}
            cy={size/2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            transform={`rotate(-90 ${size/2} ${size/2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon ? <div className="text-xl">{icon}</div> : null}
          <div ref={textRef} className="text-sm font-semibold text-white">0%</div>
        </div>
      </div>
      <div className="text-sm text-white/90 font-medium">{label}</div>
    </div>
  )
}

export default RadialProgress
