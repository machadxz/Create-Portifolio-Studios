import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getMood } from '../lib/moods'

function Particles({ count = 30, color = 'rgba(59,130,246,0.3)' }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      drift: (Math.random() - 0.5) * 30,
    })), [count])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 4px ${color}`,
          }}
          animate={{
            y: [0, -20 - Math.abs(p.drift), 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function Aurora({ color1 = 'rgba(59,130,246,0.08)', color2 = 'rgba(168,85,247,0.05)' }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${color1}, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '-10%', '5%', '0%'],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${color2}, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['0%', '-10%', '5%', '0%'],
          y: ['0%', '10%', '-5%', '0%'],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function Grid({ color = 'rgba(59,130,246,0.04)' }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let anim
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const step = 40
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      anim = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
    }
  }, [color])
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  )
}

function Stars({ count = 50, color = 'rgba(255,255,255,0.4)' }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      duration: 1 + Math.random() * 3,
      delay: Math.random() * 2,
    })), [count])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: color,
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function BackgroundEngine({ mood, className = '' }) {
  const m = getMood(mood)
  const bg = m.background
  const c = m.colors

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      {bg === 'particles' && <Particles color={c.glow} />}
      {bg === 'aurora' && <Aurora color1={c.glow} color2={`${c.secondary}22`} />}
      {bg === 'grid' && <Grid color={c.border} />}
      {(bg === 'particles' || bg === 'aurora') && <Stars color={c.muted} />}
      {bg === 'none' && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${c.glow}, transparent 70%)`,
            opacity: 0.5,
          }}
        />
      )}
    </div>
  )
}
