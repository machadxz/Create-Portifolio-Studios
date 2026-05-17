import { motion } from 'framer-motion'
import { MOODS, applyMoodToCSS } from '../lib/moods'

const moodList = Object.values(MOODS)

export default function MoodSelector({ currentMood, onSelect }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
        Mood do Portfólio
      </h3>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {moodList.find(m => m.id === currentMood)?.descricao || 'Selecione um mood'}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {moodList.map((mood) => {
          const active = currentMood === mood.id
          return (
            <motion.button
              key={mood.id}
              onClick={() => {
                onSelect(mood.id)
                applyMoodToCSS(mood.id)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-xl p-3 text-left transition-all duration-300 cursor-pointer"
              style={{
                background: active
                  ? `linear-gradient(135deg, ${mood.colors.surface}, ${mood.colors.card})`
                  : 'rgba(255,255,255,0.03)',
                border: active
                  ? `1px solid ${mood.colors.primary}`
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: active ? `0 0 20px ${mood.colors.glow}` : 'none',
              }}
            >
              <div
                className="absolute inset-0 opacity-10 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                }}
              />
              <div className="relative flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                    boxShadow: `0 0 8px ${mood.colors.glow}`,
                  }}
                />
                <div className="min-w-0">
                  <span
                    className="block text-sm font-medium truncate"
                    style={{ color: active ? mood.colors.text : 'rgba(255,255,255,0.7)' }}
                  >
                    {mood.nome}
                  </span>
                  <span
                    className="block text-[10px] truncate"
                    style={{ color: mood.colors.muted }}
                  >
                    {mood.descricao}
                  </span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
