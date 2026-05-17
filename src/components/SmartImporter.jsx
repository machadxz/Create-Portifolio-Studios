import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, Globe, Camera, Linkedin, Youtube, Music2,
  Loader2, Check, ExternalLink, X, AlertCircle,
} from 'lucide-react'
import { storage } from '../lib/storage'

const BASE = 'http://localhost:3001'

const PLATFORMS = [
  { id: 'github', icon: Github, name: 'GitHub', color: '#6e5494', desc: 'Repositórios públicos' },
  { id: 'behance', icon: Globe, name: 'Behance', color: '#053eff', desc: 'Projetos de design' },
  { id: 'dribbble', icon: Camera, name: 'Dribbble', color: '#ea4c89', desc: 'Design shots' },
  { id: 'youtube', icon: Youtube, name: 'YouTube', color: '#ff0000', desc: 'Canal e vídeos' },
  { id: 'linkedin', icon: Linkedin, name: 'LinkedIn', color: '#0a66c2', desc: 'Perfil profissional' },
  { id: 'tiktok', icon: Music2, name: 'TikTok', color: '#00f2ea', desc: 'Perfil no TikTok' },
]

function getLabel(platformId) {
  const map = {
    github: 'do GitHub',
    behance: 'do Behance',
    dribbble: 'do Dribbble',
    youtube: 'do YouTube',
    linkedin: 'do LinkedIn',
    tiktok: 'do TikTok',
  }
  return map[platformId] || ''
}

export default function SmartImporter({ onImport }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState('select')
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const handleStartImport = useCallback(async () => {
    if (!selectedPlatform || !username.trim()) return
    setError(null)
    setProgress(0)
    setStep('importing')
    setLoading(true)

    const interval = setInterval(() => {
      setProgress((p) => Math.min(90, p + Math.random() * 12))
    }, 400)

    try {
      const token = storage.get('token')
      const res = await fetch(`${BASE}/api/import/${selectedPlatform.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ username: username.trim() }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Erro ao importar (${res.status})`)
      }

      const data = await res.json()
      clearInterval(interval)
      setProgress(100)
      setResult(data)
      setStep('result')
    } catch (err) {
      clearInterval(interval)
      setError(err.message)
      setStep('error')
    } finally {
      setLoading(false)
    }
  }, [selectedPlatform, username])

  const handleApply = useCallback(() => {
    if (result && onImport) {
      onImport(result.projetos)
      setOpen(false)
    }
  }, [result, onImport])

  const reset = useCallback(() => {
    setStep('select')
    setSelectedPlatform(null)
    setUsername('')
    setResult(null)
    setProgress(0)
    setError(null)
  }, [])

  return (
    <>
      <motion.button
        onClick={() => { reset(); setOpen(true) }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.05))',
          border: '1px solid rgba(59,130,246,0.1)',
          color: 'rgba(147,197,253,0.8)',
        }}
      >
        <ExternalLink size={14} />
        Importar Projetos
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(18,18,26,0.96), rgba(21,21,31,0.96))',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              }}
            >
              <div className="relative p-6">
                <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={14} />
                </button>

                <AnimatePresence mode="wait">
                  {step === 'select' && (
                    <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-base font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Importar Projetos
                      </h2>
                      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Conecte suas plataformas e importe automaticamente
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {PLATFORMS.map((p) => (
                          <motion.button
                            key={p.id}
                            onClick={() => { setSelectedPlatform(p); setError(null) }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-xl text-left cursor-pointer transition-all ${
                              selectedPlatform?.id === p.id ? 'ring-2' : ''
                            }`}
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1px solid ${selectedPlatform?.id === p.id ? p.color : 'rgba(255,255,255,0.06)'}`,
                              ...(selectedPlatform?.id === p.id ? { boxShadow: `0 0 12px ${p.color}33` } : {}),
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <p.icon size={16} color={p.color} />
                              <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                {p.name}
                              </span>
                            </div>
                            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                              {p.desc}
                            </p>
                          </motion.button>
                        ))}
                      </div>

                      {selectedPlatform && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          <div className="flex items-center gap-3 mb-3 p-3 rounded-xl"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <selectedPlatform.icon size={18} color={selectedPlatform.color} />
                            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                              {selectedPlatform.name}
                            </span>
                          </div>
                          <div className="input-group mb-3">
                            <label className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                              Nome de usuário
                            </label>
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleStartImport()}
                              placeholder={`username do ${selectedPlatform.name}`}
                              className="w-full text-sm rounded-xl px-4 py-2.5"
                              style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.8)',
                                outline: 'none',
                              }}
                            />
                          </div>
                          <motion.button
                            onClick={handleStartImport}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={loading}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                            style={{
                              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                              color: 'white',
                              opacity: loading ? 0.6 : 1,
                            }}
                          >
                            {loading ? 'Importando...' : 'Importar'}
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {step === 'importing' && (
                    <motion.div key="importing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="py-8 flex flex-col items-center">
                      <div className="relative mb-4">
                        <motion.div className="w-14 h-14 rounded-full"
                          style={{ background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #3b82f6)' }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                        <div className="absolute inset-1 rounded-full" style={{ background: 'rgba(18,18,26,0.95)' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 size={22} color="#60a5fa" className="animate-spin" />
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        Buscando projetos {getLabel(selectedPlatform?.id)}...
                      </p>
                      <div className="w-40 h-1 rounded-full mt-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #3b82f6, #a855f7)', width: `${progress}%` }} />
                      </div>
                    </motion.div>
                  )}

                  {step === 'error' && error && (
                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
                            border: '1px solid rgba(239,68,68,0.15)',
                          }}>
                          <AlertCircle size={20} color="#f87171" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                            Erro ao importar
                          </h2>
                          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {error}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <motion.button onClick={() => setStep('select')}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>
                          Tentar novamente
                        </motion.button>
                        <motion.button onClick={() => setOpen(false)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="py-2.5 px-5 rounded-xl text-sm cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                          Fechar
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 'result' && result && (
                    <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
                            border: '1px solid rgba(34,197,94,0.15)',
                          }}>
                          <Check size={20} color="#4ade80" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                            {result.projetos.length} {result.projetos.length === 1 ? 'projeto' : 'projetos'} encontrado{result.projetos.length !== 1 ? 's' : ''}
                          </h2>
                          {result.stats && (
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                              {result.stats.seguidores > 0 && `${result.stats.seguidores} seguidores · `}
                              {result.stats.estrelas > 0 && `${result.stats.estrelas} ⭐ · `}
                              {result.stats.reposPublicos || result.stats.projetos || ''} {result.stats.reposPublicos ? 'repositórios' : result.stats.projetos ? 'projetos' : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                        {result.projetos.map((p, i) => (
                          <div key={i} className="p-3 rounded-xl"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                              {p.titulo}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                              {p.descricao || 'Link para o perfil'}
                            </p>
                          </div>
                        ))}
                      </div>

                      {result.note && (
                        <p className="text-[10px] mb-3 text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                          ⚡ {result.note}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <motion.button onClick={handleApply}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
                          Adicionar ao Studio
                        </motion.button>
                        <motion.button onClick={() => setOpen(false)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="py-2.5 px-5 rounded-xl text-sm cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                          Fechar
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
