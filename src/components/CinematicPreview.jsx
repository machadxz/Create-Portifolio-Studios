import { motion } from 'framer-motion'
import BackgroundEngine from './BackgroundEngine'
import { getMood } from '../lib/moods'

export default function CinematicPreview({ mood = 'futurista', portfolio, children }) {
  const m = getMood(mood)
  const c = m.colors

  return (
    <div
      className="relative overflow-hidden rounded-2xl min-h-[400px]"
      style={{
        background: `linear-gradient(180deg, ${c.bg}, ${c.surface})`,
        border: `1px solid ${c.border}`,
      }}
    >
      <BackgroundEngine mood={mood} />

      <div className="relative" style={{ zIndex: 1 }}>
        {children || (
          <div className="p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1
                className="text-4xl font-bold mb-3"
                style={{ fontFamily: m.fonts.heading, color: c.text }}
              >
                {portfolio?.nome || 'Seu Nome'}
              </h1>
              <p
                className="text-lg max-w-md mx-auto"
                style={{ fontFamily: m.fonts.body, color: c.muted }}
              >
                {portfolio?.bio || 'Sua descrição profissional aparece aqui'}
              </p>

              {portfolio?.skills?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {portfolio.skills.slice(0, 6).map((skill) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-1.5 rounded-full text-sm"
                      style={{
                        background: `${c.primary}15`,
                        color: c.primary,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              )}

              {portfolio?.projetos?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
                  {portfolio.projetos.slice(0, 4).map((proj, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl text-left"
                      style={{
                        background: c.card,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <h3 className="font-semibold text-sm mb-1" style={{ color: c.text }}>
                        {proj.titulo}
                      </h3>
                      <p className="text-xs" style={{ color: c.muted }}>
                        {proj.descricao}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
