import { motion } from 'framer-motion'
import {
  Layout, User, Award, Clock, Briefcase, Code2, Video, FolderOpen,
  Image, MessageCircle, BarChart3, HelpCircle, PanelTop, Share2,
  Layers, ArrowUpDown, Eye, EyeOff, Copy, Trash2, GripVertical,
} from 'lucide-react'

export const BLOCKS = [
  { id: 'hero', icon: Layout, label: 'Hero', desc: 'Seção principal de apresentação' },
  { id: 'about', icon: User, label: 'About', desc: 'Sobre você e sua história' },
  { id: 'skills', icon: Award, label: 'Skills', desc: 'Habilidades e competências' },
  { id: 'timeline', icon: Clock, label: 'Timeline', desc: 'Linha do tempo profissional' },
  { id: 'experience', icon: Briefcase, label: 'Experiência', desc: 'Experiências profissionais' },
  { id: 'stack', icon: Code2, label: 'Stack', desc: 'Stack tecnológica' },
  { id: 'videos', icon: Video, label: 'Vídeos', desc: 'Galeria de vídeos' },
  { id: 'projects', icon: FolderOpen, label: 'Projetos', desc: 'Portfólio de projetos' },
  { id: 'beforeAfter', icon: Image, label: 'Before/After', desc: 'Comparação visual' },
  { id: 'testimonials', icon: MessageCircle, label: 'Testimonials', desc: 'Depoimentos' },
  { id: 'contact', icon: PanelTop, label: 'Contato', desc: 'Formulário de contato' },
  { id: 'stats', icon: BarChart3, label: 'Estatísticas', desc: 'Métricas e números' },
  { id: 'faq', icon: HelpCircle, label: 'FAQ', desc: 'Perguntas frequentes' },
  { id: 'banner', icon: Layers, label: 'Banner', desc: 'Banner promocional' },
  { id: 'social', icon: Share2, label: 'Social Links', desc: 'Links das redes sociais' },
]

export default function BlockLibrary({ placedBlocks = [], onAddBlock, onRemoveBlock, onToggleVisibility, onReorder }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
        Blocos do Portfólio
      </h3>

      {placedBlocks.length > 0 && (
        <div className="space-y-1 mb-4">
          <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Blocos ativos ({placedBlocks.length})
          </p>
          {placedBlocks.map((block, i) => (
            <motion.div
              key={block.id}
              layout
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <GripVertical size={14} style={{ color: 'rgba(255,255,255,0.2)', cursor: 'grab' }} />
              <block.icon size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <span className="text-xs flex-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {block.label}
              </span>
              <button
                onClick={() => onToggleVisibility?.(block.id)}
                className="w-6 h-6 flex items-center justify-center rounded cursor-pointer"
                style={{ color: block.visible !== false ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
              >
                {block.visible !== false ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>
              <button
                onClick={() => onRemoveBlock?.(block.id)}
                className="w-6 h-6 flex items-center justify-center rounded cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                <Trash2 size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Adicionar blocos
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {BLOCKS.map((block) => {
          const placed = placedBlocks.find((b) => b.id === block.id)
          return (
            <motion.button
              key={block.id}
              onClick={() => !placed && onAddBlock?.(block)}
              whileHover={!placed ? { scale: 1.02 } : {}}
              whileTap={!placed ? { scale: 0.98 } : {}}
              className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                placed ? 'opacity-40' : ''
              }`}
              style={{
                background: placed ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${placed ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'}`,
              }}
              disabled={!!placed}
            >
              <block.icon size={16} style={{ color: placed ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.7)' }} />
              <span className="block text-xs font-medium mt-1" style={{ color: placed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)' }}>
                {block.label}
              </span>
              <span className="block text-[10px]" style={{ color: placed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)' }}>
                {block.desc}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
