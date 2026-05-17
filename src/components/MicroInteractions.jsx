import { motion } from 'framer-motion'

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.05)',
    transition: { duration: 0.3 },
  },
}

export const springTap = {
  whileTap: { scale: 0.97 },
}

export const magneticButton = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

export const floatAnimation = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const shineEffect = {
  style: {
    position: 'relative',
    overflow: 'hidden',
  } as any,
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
}

function ShineOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }}
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default function MicroInteractions({ children, type = 'none', className = '' }) {
  switch (type) {
    case 'glow':
      return <motion.div {...hoverGlow} className={className}>{children}<ShineOverlay /></motion.div>
    case 'magnetic':
      return <motion.div {...magneticButton} className={className}>{children}</motion.div>
    case 'float':
      return <motion.div {...floatAnimation} className={className}>{children}</motion.div>
    case 'fade':
      return <motion.div {...fadeInUp} className={className}>{children}</motion.div>
    default:
      return <div className={className}>{children}</div>
  }
}
