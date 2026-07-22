import { useMemo, type CSSProperties } from 'react'

const COLORS = ['#0E7C7B', '#2E9E6B', '#E8A13D', '#6B4FA0', '#1F3A5F']
const PARTICLE_COUNT = 14

type Particle = {
  id: number
  color: string
  tx: number
  ty: number
  rot: number
  delay: number
}

export function ConfettiBurst() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * 2 * Math.PI + Math.random() * 0.5
      const distance = 36 + Math.random() * 36
      return {
        id: i,
        color: COLORS[i % COLORS.length],
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        rot: Math.round(Math.random() * 360),
        delay: Math.random() * 0.12,
      }
    })
  }, [])

  return (
    <div className="relative flex h-16 items-center justify-center">
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-green text-white animate-[checkmark-pop_450ms_ease-out]">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute h-1.5 w-1.5 rounded-sm animate-[confetti-burst_700ms_ease-out_forwards]"
          style={
            {
              backgroundColor: p.color,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              '--rot': `${p.rot}deg`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
