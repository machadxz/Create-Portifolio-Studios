import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, Loader2, Check, X, ArrowRight } from 'lucide-react'

const LOADING_PHRASES = [
  'Analisando seu perfil...',
  'Criando identidade visual...',
  'Gerando layout inteligente...',
  'Selecionando paleta de cores...',
  'Estruturando seções...',
  'Aplicando animações...',
  'Otimizando experiência...',
  'Quase pronto...',
]

const PROMPT_SUGGESTIONS = [
  'Sou editor de vídeos cinematográficos',
  'Desenvolvedor full stack com foco em React',
  'Designer UX/UI especializado em fintechs',
  'Fotógrafo de eventos e retratos',
  'Criador de conteúdo tech no YouTube',
]

const MOCK_RESULTS = {
  'editor': {
    nome: 'Editor Cinematográfico',
    bio: 'Transformo ideias em narrativas visuais impactantes. Especializado em edição de vídeos cinematográficos com mais de 6 anos de experiência em pós-produção, color grading e motion design.',
    skills: ['DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Final Cut Pro', 'Color Grading', 'Motion Design', 'Sound Design'],
    projetos: [
      { titulo: 'Curta-metragem "Horizontes"', descricao: 'Edição e color grading de curta-metragem premiado em festival internacional', link: '#' },
      { titulo: 'Videoclipe Artista X', descricao: 'Direção de edição e efeitos visuais para videoclipe com 2M+ views', link: '#' },
      { titulo: 'Documentário Corporativo', descricao: 'Pós-produção completa de documentário institucional para empresa Fortune 500', link: '#' },
    ],
    tema: 'roxo',
    template: 'futurista',
    mood: 'studioDark',
  },
}

function generateMockResult(input) {
  const lower = input.toLowerCase()
  if (lower.includes('edit') || lower.includes('cinematográfic') || lower.includes('video')) {
    return MOCK_RESULTS.editor
  }
  if (lower.includes('developer') || lower.includes('full stack') || lower.includes('react') || lower.includes('programador')) {
    return {
      nome: 'Desenvolvedor Full Stack',
      bio: 'Criando soluções digitais robustas com React, Node.js e TypeScript. Apaixonado por arquitetura limpa, performance e experiência do usuário.',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
      projetos: [
        { titulo: 'SaaS Analytics', descricao: 'Plataforma de análise de dados em tempo real', link: '#' },
        { titulo: 'API Marketplace', descricao: 'API RESTful para marketplace digital', link: '#' },
        { titulo: 'Dashboard IoT', descricao: 'Painel de monitoramento para dispositivos IoT', link: '#' },
      ],
      tema: 'azul',
      template: 'moderno',
      mood: 'futurista',
    }
  }
  if (lower.includes('design') || lower.includes('ux') || lower.includes('ui') || lower.includes('criativo')) {
    return {
      nome: 'Designer UX/UI',
      bio: 'Criando experiências digitais que conectam pessoas e marcas. Foco em design thinking, prototipação avançada e sistemas de design escaláveis.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems', 'UX Research', 'Motion Design'],
      projetos: [
        { titulo: 'App Bancário Redesign', descricao: 'Redesign completo melhorando conversão em 40%', link: '#' },
        { titulo: 'Design System SaaS', descricao: 'Sistema de design para plataforma B2B', link: '#' },
        { titulo: 'Landing Page Premium', descricao: 'Landing page com taxa de conversão recorde', link: '#' },
      ],
      tema: 'roxo',
      template: 'futurista',
      mood: 'minimalista',
    }
  }
  if (lower.includes('fotógraf') || lower.includes('fotograf') || lower.includes('photo')) {
    return {
      nome: 'Fotógrafo Profissional',
      bio: 'Capturando momentos que contam histórias. Especializado em fotografia de eventos, retratos e ensaios artísticos com mais de 8 anos de experiência.',
      skills: ['Lightroom', 'Photoshop', 'Iluminação Profissional', 'Fotografia de Eventos', 'Retratos', 'Edição Avançada'],
      projetos: [
        { titulo: 'Ensaio Artístico "Alma"', descricao: 'Série de retratos com iluminação cinematográfica', link: '#' },
        { titulo: 'Casamento Premium', descricao: 'Cobertura completa de casamento de luxo', link: '#' },
        { titulo: 'Campanha Publicitária', descricao: 'Fotografia para campanha nacional de moda', link: '#' },
      ],
      tema: 'laranja',
      template: 'minimalista',
      mood: 'indie',
    }
  }
  return {
    nome: 'Profissional Criativo',
    bio: input || 'Profissional dedicado a criar soluções inovadoras com excelência e criatividade.',
    skills: ['Criatividade', 'Inovação', 'Tecnologia', 'Gestão de Projetos', 'Comunicação'],
    projetos: [
      { titulo: 'Projeto Principal', descricao: 'Descrição do seu projeto mais relevante', link: '#' },
      { titulo: 'Segundo Projeto', descricao: 'Descrição de outro projeto importante', link: '#' },
    ],
    tema: 'azul',
    template: 'moderno',
    mood: 'futurista',
  }
}

export default function AIAutoBuild({ open, onClose, onResult }) {
  const [step, setStep] = useState('prompt')
  const [prompt, setPrompt] = useState('')
  const [progress, setProgress] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return
    setStep('generating')
    setProgress(0)
    setPhraseIndex(0)

    const phraseInterval = setInterval(() => {
      setPhraseIndex((i) => {
        if (i >= LOADING_PHRASES.length - 1) {
          clearInterval(phraseInterval)
          return i
        }
        return i + 1
      })
    }, 600)

    const startTime = Date.now()
    const duration = 3000

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(progressInterval)
        clearInterval(phraseInterval)
        const mock = generateMockResult(prompt)
        setResult(mock)
        setStep('result')
      }
    }, 50)
  }, [prompt])

  const handleApply = useCallback(() => {
    if (result) {
      onResult(result)
      onClose()
    }
  }, [result, onResult, onClose])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }, [handleGenerate])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(18,18,26,0.96), rgba(21,21,31,0.96))',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)',
              }}
            />

            <div className="relative p-6">
              <button onClick={onClose} className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }}>
                <X size={14} />
              </button>

              <AnimatePresence mode="wait">
                {step === 'prompt' && (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(168,85,247,0.1))',
                          border: '1px solid rgba(59,130,246,0.15)',
                        }}>
                        <Wand2 size={20} color="#60a5fa" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          Auto Build IA
                        </h2>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          Descreva seu trabalho e a IA cria tudo pra você
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        ref={inputRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ex: Sou editor de vídeos cinematográficos..."
                        rows={3}
                        className="w-full text-sm rounded-xl p-4 resize-none"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.8)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {PROMPT_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setPrompt(s)}
                          className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all"
                          style={{
                            background: 'rgba(59,130,246,0.08)',
                            color: 'rgba(147,197,253,0.8)',
                            border: '1px solid rgba(59,130,246,0.1)',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <motion.button
                      onClick={handleGenerate}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full mt-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
                      }}
                    >
                      <Sparkles size={16} />
                      Gerar Portfólio
                    </motion.button>
                  </motion.div>
                )}

                {step === 'generating' && (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 flex flex-col items-center"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #3b82f6)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="absolute inset-1 rounded-full"
                        style={{ background: 'rgba(18,18,26,0.95)' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 size={24} color="#60a5fa" className="animate-spin" />
                      </div>
                    </div>

                    <motion.p
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-center"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {LOADING_PHRASES[phraseIndex]}
                    </motion.p>

                    <div className="w-48 h-1 rounded-full mt-4 overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {Math.round(progress)}%
                    </p>
                  </motion.div>
                )}

                {step === 'result' && result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
                          border: '1px solid rgba(34,197,94,0.15)',
                        }}>
                        <Check size={20} color="#4ade80" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          Portfólio Gerado!
                        </h2>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          IA criou tudo baseado na sua descrição
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl p-4 mb-4"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                      <h3 className="text-base font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {result.nome}
                      </h3>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {result.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {result.skills.slice(0, 4).map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(59,130,246,0.1)',
                              color: 'rgba(147,197,253,0.8)',
                              border: '1px solid rgba(59,130,246,0.1)',
                            }}>
                            {s}
                          </span>
                        ))}
                        {result.skills.length > 4 && (
                          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            +{result.skills.length - 4}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Mood: {result.mood} · {result.projetos.length} projetos
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleApply}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          color: 'white',
                          boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
                        }}
                      >
                        <Check size={16} />
                        Aplicar ao Studio
                      </motion.button>

                      <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="py-3 px-6 rounded-xl text-sm font-medium cursor-pointer"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        Depois
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
  )
}
