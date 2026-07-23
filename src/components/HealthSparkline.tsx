import { useEffect, useRef, useState } from 'react'

const HISTORY = [68, 65, 61, 55, 47, 39, 34, 33, 35, 37, 38, 39, 40, 42]

const VIEW_WIDTH = 120
const VIEW_HEIGHT = 32
const PADDING_Y = 4

function buildPoints(data: number[]) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  return data.map((value, i) => ({
    x: (i / (data.length - 1)) * VIEW_WIDTH,
    y: PADDING_Y + (1 - (value - min) / range) * (VIEW_HEIGHT - PADDING_Y * 2),
  }))
}

export function HealthSparkline() {
  const pathRef = useRef<SVGPathElement>(null)
  const [isDrawn, setIsDrawn] = useState(false)

  const points = buildPoints(HISTORY)
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
  const lastPoint = points[points.length - 1]

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    path.style.transition = 'none'
    // Force a layout flush so the hidden state paints before the transition starts.
    path.getBoundingClientRect()

    const frame = requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 1000ms ease-out'
      path.style.strokeDashoffset = '0'
      setIsDrawn(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-8 w-full"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r={2.4}
          fill="var(--color-teal)"
          className={`transition-opacity duration-300 ${isDrawn ? 'opacity-100' : 'opacity-0'}`}
        />
      </svg>
      <p className="mt-0.5 text-[10px] text-navy/30">14-day trend</p>
    </div>
  )
}
