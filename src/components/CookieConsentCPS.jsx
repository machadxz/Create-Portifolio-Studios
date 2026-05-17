import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, X } from 'lucide-react'
import { storage } from '../lib/storage'

const STORAGE_KEY = 'cookie-consent'
const AUTO_HIDE_DELAY = 30000
const DISMISS_THRESHOLD = 3

const particles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  size: 1.5 + Math.random() * 2,
  delay: Math.random() * 3,
  duration: 3 + Math.random() * 4,
}))

export default function CookieConsentCPS() {
  const [consent, setConsent] = useState(() => storage.get(STORAGE_KEY))
  const [visible, setVisible] = useState(false)
  const pendingAction = useRef(null)
  const dismissCount = useRef(0)

  useEffect(() => {
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [consent])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      pendingAction.current = 'dismiss'
      setVisible(false)
    }, AUTO_HIDE_DELAY)
    return () => clearTimeout(timer)
  }, [visible])

  const handleAccept = useCallback(() => {
    pendingAction.current = 'accept'
    setVisible(false)
  }, [])

  const handleDismiss = useCallback(() => {
    pendingAction.current = 'dismiss'
    dismissCount.current += 1
    setVisible(false)
  }, [])

  const handleExitComplete = useCallback(() => {
    if (pendingAction.current === 'accept') {
      storage.set(STORAGE_KEY, { accepted: true, timestamp: Date.now() })
      setConsent({ accepted: true })
    } else if (pendingAction.current === 'dismiss') {
      const count = dismissCount.current
      if (count >= DISMISS_THRESHOLD) {
        storage.set(STORAGE_KEY, { accepted: false, timestamp: Date.now() })
        setConsent({ accepted: false })
      }
    }
    pendingAction.current = null
  }, [])

  if (consent !== null) return null

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="cookie-consent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-end justify-center px-4 pb-6 sm:pb-8 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 240,
              mass: 0.7,
            }}
            className="relative w-full max-w-lg overflow-hidden pointer-events-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(18,18,26,0.94) 0%, rgba(21,21,31,0.94) 50%, rgba(18,18,26,0.94) 100%)',
              backdropFilter: 'blur(28px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 40px rgba(59,130,246,0.06)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)',
                borderRadius: '20px',
              }}
            />

            <div className="relative p-5 sm:p-6">
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full opacity-40 hover:opacity-100 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)' }}
                aria-label="Fechar"
              >
                <X size={14} color="rgba(255,255,255,0.6)" />
              </button>

              <div className="flex items-start gap-4">
                <div className="relative shrink-0 mt-0.5">
                  <motion.div
                    animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: [0, -6, 6, -3, 0], scale: [1, 1.03, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)',
                      border: '1px solid rgba(59,130,246,0.15)',
                    }}
                  >
                    <Cookie size={20} color="#60a5fa" />
                  </motion.div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      Consentimento de Cookies
                    </h3>
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.1) 100%)',
                        color: 'rgba(147,197,253,0.9)',
                        border: '1px solid rgba(59,130,246,0.15)',
                      }}
                    >
                      <Shield size={10} style={{ marginRight: 3 }} />
                      Privacidade
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Olá 👋 Utilizamos cookies para salvar seus projetos, manter seu progresso e oferecer uma experiência mais rápida e personalizada dentro do <strong style={{ color: 'rgba(255,255,255,0.8)' }}>CPS Studio</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <motion.button
                  onClick={handleAccept}
                  whileHover={{ y: -1, boxShadow: '0 8px 28px rgba(59,130,246,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 relative overflow-hidden"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
                    cursor: 'pointer',
                  }}
                >
                  <span className="relative text-sm font-semibold text-white tracking-wide">
                    Aceitar Cookies
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleDismiss}
                  whileHover={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Negar
                </motion.button>
              </div>

              <p className="text-[11px] mt-3 text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Você pode gerenciar suas preferências a qualquer momento.
              </p>
            </div>

            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: 'rgba(59,130,246,0.25)',
                  boxShadow: '0 0 4px rgba(59,130,246,0.2)',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                }}
                animate={{ y: [0, -20, 0], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
