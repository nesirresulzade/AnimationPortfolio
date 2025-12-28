import { useRef, useEffect, useState, useMemo, useId } from 'react';

const InfiniteCurvedLoop = ({
  marqueeText = '',
  speed = 1.5,
  className = '',
  curveAmount = 200,
  direction = 'left',
  interactive = true,
  containerHeight = 120,
}) => {
  // Hazırlanan text
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,${containerHeight / 2} Q500,${containerHeight / 2 + curveAmount} 1540,${containerHeight / 2}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const [totalText, setTotalText] = useState(text);

  const ready = spacing > 0;

  // Text uzunluğunu ölçmək
  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  // TotalText-i çoxaltmaq ki sonsuz görünsün
  useEffect(() => {
    if (!spacing) return;
    // minimum 2-3 dəfə çoxalt ki boşluq görünməsin
    const repeatCount = Math.ceil(2000 / spacing);
    setTotalText(text.repeat(repeatCount));
  }, [spacing, text]);

  // Başlanğıc offset
  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = 0;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing, totalText]);

  // Sonsuz loop animasiya
  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        // Sonsuz loop logic
        if (dirRef.current === 'left' && Math.abs(newOffset) >= spacing) {
          newOffset = 0;
        } else if (dirRef.current === 'right' && newOffset >= spacing) {
          newOffset = 0;
        }

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  // Drag funksiyaları
  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;

    // Sonsuz loop logic
    if (newOffset <= -spacing) newOffset += spacing;
    if (newOffset > 0) newOffset -= spacing;

    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ height: `${containerHeight}px`, visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className={`select-none w-full overflow-visible block text-[3rem] font-bold uppercase leading-none ${className}`}
        viewBox={`0 0 1440 ${containerHeight}`}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text xmlSpace="preserve" className={`fill-white ${className}`}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default InfiniteCurvedLoop;
