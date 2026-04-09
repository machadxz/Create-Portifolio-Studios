import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AIAssistant from '../components/AIAssistant';
import { apiFetch } from '../lib/api';
import { 
  Save, Eye, Download, Sparkles, Plus, Trash2, Monitor, Smartphone,
  Link, Copy, Check, X, Palette, Github, Zap, Type, MousePointer2,
  Image as ImageIcon, Square, Layers, Grid3X3, RotateCcw, RotateCw,
  Camera, Upload, AlignLeft, AlignCenter, AlignRight, 
  Columns, Trash, Settings, Move, Maximize2, Minimize2, Link2,
  Video, FileText, Code, Layout, Grid, Bold, Italic, Underline,
  List, Heading1, Heading2, Heading3,
  Minus, PlusCircle, ArrowUp, ArrowDown, EyeOff, Lock, Unlock,
  ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Undo, Redo,
  Share2, Search, MousePointer, Box, Star, Heart,
  Play, Pause, Volume2, Mic, LayoutTemplate,
  Building2, GraduationCap, Award, Target, Users, Briefcase, Mail,
  Phone, MapPin, ExternalLink, Instagram, Twitter, Linkedin, Youtube,
  Facebook, Twitch, DollarSign, Percent, Calendar, Clock, RefreshCw,
  Wand2, Rocket, FileDown, BarChart2,
  MessageCircle, HelpCircle, Sparkle, Wand, ArrowRight, User2
} from 'lucide-react';
import './Studio.css';

const GRID_SIZE = 25;
const snap = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

// ============================================
// TEMPLATES PRONTOS
// ============================================
const TEMPLATE_PRESETS = {
  desenvolvedor: {
    nome: 'Desenvolvedor Full Stack',
    bio: 'Apaixonado por código e soluções inovadoras. 5+ anos de experiência em desenvolvimento web.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    projetos: [
      { titulo: 'E-commerce Platform', descricao: 'Plataforma completa de vendas com React e Node.js', link: 'https://github.com' },
      { titulo: 'AI Chatbot', descricao: 'Chatbot inteligente com Machine Learning', link: 'https://github.com' },
      { titulo: 'Dashboard Analytics', descricao: 'Painel de análise de dados em tempo real', link: 'https://github.com' }
    ],
    tema: 'azul',
    template: 'moderno'
  },
  designer: {
    nome: 'Designer UX/UI',
    bio: 'Criando experiências digitais memoráveis. Especializado em design de interfaces e experiência do usuário.',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI Design', 'UX Research', 'Prototyping'],
    projetos: [
      { titulo: 'App Banking Redesign', descricao: 'Redesign completo do app bancário', link: 'https://dribbble.com' },
      { titulo: 'Brand Identity - Startup', descricao: 'Identidade visual completa', link: 'https://behance.net' },
      { titulo: 'Design System', descricao: 'Sistema de design para SaaS', link: 'https://figma.com' }
    ],
    tema: 'roxo',
    template: 'futurista'
  },
  freelancer: {
    nome: 'Freelancer Digital',
    bio: 'Profissional independente focado em resultados. specialized em desenvolvimento de soluções digitais personalizadas.',
    skills: ['Desenvolvimento Web', 'Marketing Digital', 'SEO', 'Copywriting', 'Gestão de Projetos'],
    projetos: [
      { titulo: 'Site Restaurante', descricao: 'Website completo com reservas online', link: '#' },
      { titulo: 'Loja Virtual', descricao: 'E-commerce com pagamento integrado', link: '#' },
      { titulo: 'Landing Page', descricao: 'Página de conversão de alto impacto', link: '#' }
    ],
    tema: 'laranja',
    template: 'minimalista'
  },
  influencer: {
    nome: 'Criador de Conteúdo',
    bio: 'Criando conteúdo que inspira e transforma. Tecnologia, inovação e criatividade.',
    skills: ['YouTube', 'TikTok', 'Instagram', 'Edição de Vídeo', 'Copywriting', 'Marketing'],
    projetos: [
      { titulo: 'Canal YouTube', descricao: '100k+ inscritos - Tecnologia e Inovação', link: 'https://youtube.com' },
      { titulo: 'Curso Online', descricao: 'Programa de formação em tecnologia', link: '#' },
      { titulo: 'Podcast', descricao: 'Entrevistas com especialistas', link: '#' }
    ],
    tema: 'verde',
    template: 'moderno'
  },
  empresario: {
    nome: 'Empreendedor Tech',
    bio: 'Fundador de startup inovadora. Transformando ideias em negócios de sucesso.',
    skills: ['Estratégia', 'Liderança', 'Gestão', 'Inovação', 'Pitch', 'Investimento'],
    projetos: [
      { titulo: 'Startup SaaS', descricao: 'Plataforma B2B com 10k usuários', link: '#' },
      { titulo: 'App Mobile', descricao: 'App com 50k downloads', link: '#' },
      { titulo: 'Consultoria', descricao: 'Transformação digital para empresas', link: '#' }
    ],
    tema: 'vermelho',
    template: 'futurista'
  }
};

// ============================================
// TEMAS VISUAIS PRÉ-DEFINIDOS
// ============================================
const DESIGN_THEMES = {
  minimal: {
    nome: 'Minimalista',
    fonts: { heading: 'Inter', body: 'Inter' },
    colors: { primary: '#1a1a1a', secondary: '#666666', bg: '#ffffff', text: '#1a1a1a' },
    spacing: 'spacious',
    radius: 'sharp'
  },
  modern: {
    nome: 'Moderno',
    fonts: { heading: 'Poppins', body: 'Inter' },
    colors: { primary: '#3b82f6', secondary: '#60a5fa', bg: '#0f172a', text: '#f8fafc' },
    spacing: 'balanced',
    radius: 'medium'
  },
  dark: {
    nome: 'Dark Premium',
    fonts: { heading: 'Space Grotesk', body: 'Inter' },
    colors: { primary: '#a855f7', secondary: '#c084fc', bg: '#030712', text: '#f9fafb' },
    spacing: 'compact',
    radius: 'large'
  },
  neon: {
    nome: 'Cyberpunk',
    fonts: { heading: 'Orbitron', body: 'Rajdhani' },
    colors: { primary: '#06ffa5', secondary: '#ff00ff', bg: '#0a0a0f', text: '#00ffaa' },
    spacing: 'compact',
    radius: 'none'
  },
  elegant: {
    nome: 'Elegante',
    fonts: { heading: 'Playfair Display', body: 'Lora' },
    colors: { primary: '#b8860b', secondary: '#d4af37', bg: '#1c1c1c', text: '#f5f5f5' },
    spacing: 'spacious',
    radius: 'small'
  }
};

// ============================================
// ELEMENTOS PRONTOS (SEÇÕES)
// ============================================
const SECTION_TEMPLATES = {
  hero: [
    { type: 'heading1', x: 50, y: 50, content: 'Seu Nome', width: 400 },
    { type: 'text', x: 50, y: 110, content: 'Título Profissional / Tagline', width: 400 },
    { type: 'button', x: 50, y: 170, content: 'Ver Projetos', width: 150 }
  ],
  about: [
    { type: 'heading2', x: 50, y: 30, content: 'Sobre Mim', width: 300 },
    { type: 'paragraph', x: 50, y: 70, content: 'Descrição sobre você...', width: 500 }
  ],
  skills: [
    { type: 'heading2', x: 50, y: 30, content: 'Habilidades', width: 300 },
    { type: 'text', x: 50, y: 70, content: 'Skill 1 • Skill 2 • Skill 3 • Skill 4', width: 400 }
  ],
  projects: [
    { type: 'heading2', x: 50, y: 30, content: 'Projetos', width: 300 },
    { type: 'card', x: 50, y: 80, content: 'Projeto 1', width: 200 },
    { type: 'card', x: 270, y: 80, content: 'Projeto 2', width: 200 },
    { type: 'card', x: 490, y: 80, content: 'Projeto 3', width: 200 }
  ],
  contact: [
    { type: 'heading2', x: 50, y: 30, content: 'Contato', width: 300 },
    { type: 'text', x: 50, y: 70, content: 'email@exemplo.com', width: 300 },
    { type: 'button', x: 50, y: 120, content: 'Enviar Mensagem', width: 180 }
  ]
};

// ============================================
// MASCOTE (Feedback Interativo)
// ==========================================
const MASCOTE_MESSAGES = {
  welcome: ['Olá! Vamos criar algo incrível? 🚀', 'Bem-vindo! Vou te ajudar a criar seu portfólio!', 'Pronto para começar? Vamos lá! ✨'],
  save: ['Salvando... 💾', 'Tudo salvo! ✅', 'Suas mudanças estão seguras!'],
  addElement: ['Excelente escolha! 🎨', 'Ótimo elemento! Arraste onde quiser!', 'Bonito componente! 😎'],
  export: ['Preparando seu portfólio... 🎁', 'Quase pronto! ⏳', 'Seu portfólio está sendo exportado!'],
  error: ['Ops! Algo deu errado, mas estamos aqui! 💪', 'Não foi dessa vez! Tente novamente 😊', 'Vamos resolver isso! 🔧'],
  success: ['Incrível! Você está indo muito bem! 🌟', 'Perfeito! Continue assim! ⭐', 'Excelente trabalho! 👏']
};

const ELEMENT_TYPES = [
  { type: 'text', icon: Type, label: 'Texto', defaultContent: 'Novo texto' },
  { type: 'heading1', icon: Heading1, label: 'Título H1', defaultContent: 'Título Principal' },
  { type: 'heading2', icon: Heading2, label: 'Título H2', defaultContent: 'Subtítulo' },
  { type: 'heading3', icon: Heading3, label: 'Título H3', defaultContent: 'Seção' },
  { type: 'button', icon: MousePointer2, label: 'Botão', defaultContent: 'Clique aqui' },
  { type: 'link', icon: Link2, label: 'Link', defaultContent: 'Link' },
  { type: 'image', icon: ImageIcon, label: 'Imagem', defaultContent: '' },
  { type: 'video', icon: Video, label: 'Vídeo', defaultContent: '' },
  { type: 'icon', icon: Star, label: 'Ícone', defaultContent: '★' },
  { type: 'divider', icon: Minus, label: 'Divisor', defaultContent: '' },
  { type: 'card', icon: Square, label: 'Card', defaultContent: 'Título' },
  { type: 'container', icon: Box, label: 'Container', defaultContent: '' },
  { type: 'columns', icon: Columns, label: 'Colunas', defaultContent: '' },
  { type: 'spacer', icon: ArrowUp, label: 'Espaçador', defaultContent: '' },
  { type: 'grid', icon: Grid, label: 'Grid', defaultContent: '' },
  { type: 'hero', icon: LayoutTemplate, label: 'Hero Section', defaultContent: '' },
  { type: 'features', icon: Layout, label: 'Features', defaultContent: '' },
  { type: 'cta', icon: Sparkles, label: 'Call to Action', defaultContent: '' },
  { type: 'section-hero', icon: Rocket, label: '🚀 Hero Pronto', defaultContent: '', isTemplate: true },
  { type: 'section-about', icon: User2, label: '👤 Sobre Mim', defaultContent: '', isTemplate: true },
  { type: 'section-skills', icon: Award, label: '💡 Habilidades', defaultContent: '', isTemplate: true },
  { type: 'section-projects', icon: Briefcase, label: '💼 Projetos', defaultContent: '', isTemplate: true },
  { type: 'section-contact', icon: Mail, label: '📧 Contato', defaultContent: '', isTemplate: true },
];

const PRESET_STYLES = {
  text: { fontSize: 16, color: '#ffffff' },
  heading1: { fontSize: 36, fontWeight: 'bold', color: '#ffffff' },
  heading2: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  heading3: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
  button: { fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#ffffff', backgroundColor: '#3b82f6', borderRadius: 8, padding: '12px 24px' },
  card: { fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  spacer: { height: 50 },
};

const Studio = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const { getThemeColors } = useTheme();
  
  const [portfolio, setPortfolio] = useState({
    nome: '', bio: '', skills: [], projetos: [], tema: 'azul', template: 'moderno', avatar: ''
  });
  
  const temaCores = { azul: '#3b82f6', roxo: '#a855f7', vermelho: '#ef4444', verde: '#22c55e', laranja: '#f97316' };
  const inputStyle = { '--placeholder-color': temaCores[portfolio.tema] || '#3b82f6' };
  
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarSuccess, setAvatarSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({ titulo: '', descricao: '', link: '' });
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activeSection, setActiveSection] = useState('info');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAiModal, setShowAiModal] = useState(false);
  
  const [editorElements, setEditorElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [guidelines, setGuidelines] = useState({ horizontal: null, vertical: null });
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [zoom, setZoom] = useState(100);
  
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const canvasRef = useRef(null);

  const saveToHistory = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(JSON.stringify(newElements));
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const prevState = JSON.parse(history[historyStep - 1]);
      setEditorElements(prevState);
      setHistoryStep(historyStep - 1);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const nextState = JSON.parse(history[historyStep + 1]);
      setEditorElements(nextState);
      setHistoryStep(historyStep + 1);
    }
  };

  const handleDuplicate = () => {
    const toDuplicate = selectedIds.length > 0 
      ? editorElements.filter(el => selectedIds.includes(el.id))
      : selectedElement ? [editorElements.find(e => e.id === selectedElement)] : [];
    if (toDuplicate.length === 0) return;
    const newElements = toDuplicate.map(el => ({ ...el, id: Date.now() + Math.random(), x: el.x + 30, y: el.y + 30 }));
    const updated = [...editorElements, ...newElements];
    setEditorElements(updated);
    setSelectedIds(newElements.map(el => el.id));
    saveToHistory(updated);
  };

  const handleAlign = (direction) => {
    const selected = selectedIds.length > 0 
      ? editorElements.filter(el => selectedIds.includes(el.id))
      : selectedElement ? [editorElements.find(el => el.id === selectedElement)] : [];
    if (selected.length < 2) return;
    let newElements = [...editorElements];
    const ids = selected.map(el => el.id);
    switch(direction) {
      case 'left':
        const minX = Math.min(...selected.map(el => el.x));
        newElements = newElements.map(el => ids.includes(el.id) ? { ...el, x: minX } : el);
        break;
      case 'center':
        const centerX = selected.reduce((sum, el) => sum + el.x + (el.width || 100)/2, 0) / selected.length;
        newElements = newElements.map(el => ids.includes(el.id) ? { ...el, x: centerX - (el.width || 100)/2 } : el);
        break;
      case 'right':
        const maxX = Math.max(...selected.map(el => el.x + (el.width || 100)));
        newElements = newElements.map(el => ids.includes(el.id) ? { ...el, x: maxX - (el.width || 100) } : el);
        break;
      case 'top':
        const minY = Math.min(...selected.map(el => el.y));
        newElements = newElements.map(el => ids.includes(el.id) ? { ...el, y: minY } : el);
        break;
      case 'middle':
        const centerY = selected.reduce((sum, el) => sum + el.y + (el.height || 50)/2, 0) / selected.length;
        newElements = newElements.map(el => ids.includes(el.id) ? { ...el, y: centerY - (el.height || 50)/2 } : el);
        break;
      case 'bottom':
        const maxY = Math.max(...selected.map(el => el.y + (el.height || 50)));
        newElements = newElements.map(el => ids.includes(el.id) ? { ...el, y: maxY - (el.height || 50) } : el);
        break;
    }
    setEditorElements(newElements);
    saveToHistory(newElements);
  };

  const addElement = (type, x = 100, y = 100) => {
    const elementDef = ELEMENT_TYPES.find(e => e.type === type);
    const preset = PRESET_STYLES[type] || {};
    const temaColor = temaCores[portfolio.tema] || '#3b82f6';
    const newElement = {
      id: Date.now() + Math.random(), type, x, y,
      width: type === 'image' ? 300 : type === 'spacer' ? 800 : 200,
      height: type === 'spacer' ? 50 : type === 'image' ? 200 : 80,
      content: elementDef?.defaultContent || '',
      styles: { ...preset, borderColor: preset.borderColor || 'rgba(255,255,255,0.1)', color: preset.color || '#ffffff' },
      locked: false, visible: true, name: elementDef?.label || type
    };
    if (type === 'button') newElement.styles.backgroundColor = temaColor;
    const updated = [...editorElements, newElement];
    setEditorElements(updated);
    setSelectedElement(newElement.id);
    saveToHistory(updated);
  };

  const generateShareLink = () => {
    const username = user?.email?.split('@')[0] || 'user';
    const link = `${window.location.origin}/portfolio/${username}`;
    navigator.clipboard.writeText(link);
    alert('Link copiado!');
  };

  const exportHTML = () => {
    const cor = temaCores[portfolio.tema] || '#3b82f6';
    const elementsHTML = editorElements.filter(el => el.visible !== false).map(el => {
      const style = Object.entries(el.styles || {}).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`).join('; ');
      switch(el.type) {
        case 'heading1': return `<h1 style="${style}">${el.content}</h1>`;
        case 'heading2': return `<h2 style="${style}">${el.content}</h2>`;
        case 'heading3': return `<h3 style="${style}">${el.content}</h3>`;
        case 'text': return `<p style="${style}">${el.content}</p>`;
        case 'button': return `<button style="${style}; border: none; cursor: pointer;">${el.content}</button>`;
        case 'link': return `<a href="#" style="${style}">${el.content}</a>`;
        case 'image': return el.content ? `<img src="${el.content}" alt="" style="max-width: 100%; ${style}" />` : `<div style="${style}; background: #333; min-height: 200px;"></div>`;
        case 'divider': return `<hr style="${style}; border: none; border-top: 1px solid rgba(255,255,255,0.1);" />`;
        case 'spacer': return `<div style="height: ${el.height}px;"></div>`;
        default: return `<div style="${style}">${el.content}</div>`;
      }
    }).join('\n');
    const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${portfolio.nome} - Portfolio</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0a0a0f,#12121a);color:#fff;min-height:100vh;padding:40px 20px}.container{max-width:900px;margin:0 auto}.header{text-align:center;margin-bottom:60px}.avatar{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,${cor},${cor}88);margin:0 auto 24px}h1{font-size:36px;margin-bottom:12px}.bio{color:#a0a0b0;font-size:18px;max-width:600px;margin:0 auto}.section{margin-bottom:48px}.section-title{font-size:20px;margin-bottom:20px;color:${cor}.skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}.skill{padding:8px 20px;background:rgba(255,255,255,0.1);border-radius:20px;font-size:14px}.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}.project{background:rgba(255,255,255,0.05);border-radius:12px;padding:24px;border:1px solid rgba(255,255,255,0.1)}.project h3{margin-bottom:8px}.project p{color:#a0a0b0;font-size:14px;margin-bottom:12px}.project a{color:${cor};font-size:14px}</style></head><body><div class="container"><div class="header"><div class="avatar"></div><h1>${portfolio.nome}</h1><p class="bio">${portfolio.bio}</p></div><div class="section"><h2 class="section-title">Skills</h2><div class="skills">${portfolio.skills.map(s => `<span class="skill">${s}</span>`).join('')}</div></div><div class="section"><h2 class="section-title">Projetos</h2><div class="projects">${portfolio.projetos.map(p => `<div class="project"><h3>${p.titulo}</h3><p>${p.descricao}</p>${p.link ? `<a href="${p.link}">Ver projeto →</a>` : ''}</div>`).join('')}</div></div><div class="editor-elements">${elementsHTML}</div></div></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolio.nome || 'portfolio'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const portfolioData = { ...portfolio, editorElements };
      await apiFetch('/api/portfolios', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(portfolioData) });
      setAutoSaveStatus('Salvo');
      setTimeout(() => setAutoSaveStatus(''), 2000);
    } catch (err) { console.error('Erro ao salvar:', err); }
    finally { setSaving(false); }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    setAvatarSuccess(false);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const avatarUrl = URL.createObjectURL(file);
    setPortfolio(prev => ({ ...prev, avatar: avatarUrl }));
    setUploadingAvatar(false);
    setAvatarSuccess(true);
    setTimeout(() => setAvatarSuccess(false), 3000);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setPortfolio({ ...portfolio, skills: [...portfolio.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (index) => setPortfolio({ ...portfolio, skills: portfolio.skills.filter((_, i) => i !== index) });
  const addProject = () => {
    if (newProject.titulo.trim()) {
      setPortfolio({ ...portfolio, projetos: [...portfolio.projetos, { ...newProject }] });
      setNewProject({ titulo: '', descricao: '', link: '' });
    }
  };
  const removeProject = (index) => setPortfolio({ ...portfolio, projetos: portfolio.projetos.filter((_, i) => i !== index) });
  const handleAutoBuild = () => setPortfolio({ ...portfolio, nome: 'Desenvolvedor Full Stack', bio: 'Apaixonado por criar soluções inovadoras', skills: ['JavaScript', 'React', 'Node.js', 'Python'] });
  const handleAiGenerate = async () => { setShowAiModal(false); };
  const handleGithubImport = async () => { alert('Funcionalidade em desenvolvimento'); };

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && key === 's') { e.preventDefault(); handleSave(); }
      else if (ctrl && key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
      else if (ctrl && (key === 'y' || (key === 'z' && e.shiftKey))) { e.preventDefault(); handleRedo(); }
      else if (ctrl && key === 'd') { e.preventDefault(); handleDuplicate(); }
      else if (key === 'delete' || key === 'backspace') {
        if (selectedIds.length > 0) {
          e.preventDefault();
          const updated = editorElements.filter(el => !selectedIds.includes(el.id));
          setEditorElements(updated);
          setSelectedIds([]);
          saveToHistory(updated);
        } else if (selectedElement) {
          e.preventDefault();
          const updated = editorElements.filter(el => el.id !== selectedElement);
          setEditorElements(updated);
          setSelectedElement(null);
          saveToHistory(updated);
        }
      } else if (key === 'escape') { setSelectedElement(null); setSelectedIds([]); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, selectedIds, editorElements]);

  const handleEditorDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; };
  const handleEditorDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('elementType');
    if (!type || activeSection !== 'editor') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    addElement(type, snap(e.clientX - rect.left), snap(e.clientY - rect.top));
  };

  const handleElementMouseDown = (e, element) => {
    e.stopPropagation();
    setSelectedElement(element.id);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(element.id);
  };

  const deleteEditorElement = (id) => {
    setEditorElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  const duplicateEditorElement = (element) => {
    const newElement = { ...element, id: Date.now(), x: element.x + GRID_SIZE, y: element.y + GRID_SIZE };
    setEditorElements([...editorElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const sections = [
    { id: 'info', label: 'Info' },
    { id: 'projects', label: 'Projetos' },
    { id: 'design', label: 'Design' },
    { id: 'editor', label: 'Editor' }
  ];

  return (
    <div className="studio">
      <div className="studio-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Palette size={20} />}
          </button>
          <h2>Studio</h2>
        </div>
        <div className="toolbar-center">
          {sections.map((section) => (
            <button key={section.id} className={`toolbar-tab ${activeSection === section.id ? 'active' : ''}`} onClick={() => setActiveSection(section.id)}>
              {section.label}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <div className="preview-toggle">
            <button className={previewMode === 'desktop' ? 'active' : ''} onClick={() => setPreviewMode('desktop')}><Monitor size={18} /></button>
            <button className={previewMode === 'mobile' ? 'active' : ''} onClick={() => setPreviewMode('mobile')}><Smartphone size={18} /></button>
          </div>
          <button className="btn btn-secondary" onClick={generateShareLink}><Share2 size={18} />Compartilhar</button>
          <button className="btn btn-secondary" onClick={exportHTML}><Download size={18} />Exportar</button>
          <button className="btn btn-secondary" onClick={() => setShowAiModal(true)}><Sparkles size={18} />Gerar IA</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}><Save size={18} />{saving ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </div>
      {autoSaveStatus && <div className="autosave-status"><Check size={14} />{autoSaveStatus}</div>}
      <div className="studio-content">
        {sidebarOpen && (
          <div className="studio-sidebar">
            {activeSection === 'info' && (
              <div className="sidebar-section">
                <h3>Info</h3>
                <div className="avatar-upload-section">
                  <div className="avatar-preview-container">
                    <div className={`avatar-preview ${uploadingAvatar ? 'uploading' : ''} ${avatarSuccess ? 'success' : ''}`} style={{ background: portfolio.avatar ? `url(${portfolio.avatar}) center/cover` : `linear-gradient(135deg, ${temaCores[portfolio.tema]} 0%, ${temaCores[portfolio.tema]}99 100%)` }}>
                      {!portfolio.avatar && <span className="avatar-initial">{portfolio.nome ? portfolio.nome.charAt(0).toUpperCase() : '?'}</span>}
                      {uploadingAvatar && <div className="avatar-loading-overlay"><div className="loading-bubbles">{[...Array(12)].map((_, i) => <div key={i} className="bubble" style={{ '--delay': `${i * 0.1}s`, '--theme-color': temaCores[portfolio.tema] }} />)}</div></div>}
                      {avatarSuccess && <div className="avatar-success-overlay"><Sparkles size={24} /></div>}
                    </div>
                    <label className="avatar-upload-btn"><input type="file" accept="image/*" onChange={handleAvatarUpload} hidden /><Camera size={16} />Selecionar foto</label>
                  </div>
                </div>
                <div className="input-group"><label>Nome</label><input type="text" value={portfolio.nome} onChange={(e) => setPortfolio({...portfolio, nome: e.target.value})} placeholder="Nome" style={inputStyle} /></div>
                <div className="input-group"><label>Bio</label><textarea value={portfolio.bio} onChange={(e) => setPortfolio({...portfolio, bio: e.target.value})} placeholder="Bio" rows={3} style={inputStyle} /></div>
                <button className="btn btn-secondary" onClick={handleAutoBuild}><Zap size={16} />Auto-preencher</button>
              </div>
            )}
            {activeSection === 'projects' && (
              <div className="sidebar-section">
                <h3>Projetos</h3>
                <div className="input-group"><label>Título</label><input type="text" value={newProject.titulo} onChange={(e) => setNewProject({...newProject, titulo: e.target.value})} placeholder="Projeto" style={inputStyle} /></div>
                <div className="input-group"><label>Descrição</label><textarea value={newProject.descricao} onChange={(e) => setNewProject({...newProject, descricao: e.target.value})} placeholder="Descrição" rows={2} style={inputStyle} /></div>
                <div className="input-group"><label>Link</label><input type="text" value={newProject.link} onChange={(e) => setNewProject({...newProject, link: e.target.value})} placeholder="Link" style={inputStyle} /></div>
                <button className="btn btn-primary" onClick={addProject}><Plus size={16} />Adicionar Projeto</button>
                <div className="items-list">{portfolio.projetos.map((p, i) => <div key={i} className="item"><span>{p.titulo}</span><button onClick={() => removeProject(i)}><X size={14} /></button></div>)}</div>
              </div>
            )}
            {activeSection === 'design' && (
              <div className="sidebar-section">
                <h3>Design</h3>
                <div className="input-group">
                  <label>Tema</label>
                  <div className="theme-options">
                    {Object.entries(temaCores).map(([key, color]) => (
                      <button key={key} className={`theme-option ${portfolio.tema === key ? 'active' : ''}`} onClick={() => setPortfolio({...portfolio, tema: key})}>
                        <span className="color-preview" style={{ background: color }} />
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label>Template</label>
                  <div className="template-options">
                    {['moderno', 'futurista', 'minimalista'].map((t) => (
                      <button key={t} className={`template-option ${portfolio.template === t ? 'active' : ''}`} onClick={() => setPortfolio({...portfolio, template: t})}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'editor' && (
              <div className="sidebar-section editor-section">
                <div className="editor-toolbar-section"><h3><Layers size={18} />Editor Visual</h3><div className="editor-actions"><button className="editor-action-btn" onClick={handleUndo} title="Desfazer"><RotateCcw size={16} /></button><button className="editor-action-btn" onClick={handleRedo} title="Refazer"><RotateCw size={16} /></button><button className="editor-action-btn" onClick={handleDuplicate} title="Duplicar"><Copy size={16} /></button></div></div>
                {selectedIds.length > 1 && <div className="align-controls"><span className="align-label">Alinhar:</span><div className="align-buttons"><button onClick={() => handleAlign('left')}>←</button><button onClick={() => handleAlign('center')}>↔</button><button onClick={() => handleAlign('right')}>→</button><button onClick={() => handleAlign('top')}>↑</button><button onClick={() => handleAlign('middle')}>↕</button><button onClick={() => handleAlign('bottom')}>↓</button></div></div>}
                <div className="editor-elements-list">{ELEMENT_TYPES.map((el) => <div key={el.type} className="editor-element-item" draggable onDragStart={(e) => e.dataTransfer.setData('elementType', el.type)}><el.icon size={20} /><span>{el.label}</span></div>)}</div>
                <div className="editor-canvas-section">
                  <div className="canvas-header"><h4>Canvas</h4><button className={`btn btn-ghost btn-sm ${showGrid ? 'active' : ''}`} onClick={() => setShowGrid(!showGrid)}><Grid3X3 size={16} /></button></div>
                  <div ref={canvasRef} className={`editor-canvas ${showGrid ? 'show-grid' : ''}`} onDragOver={handleEditorDragOver} onDrop={handleEditorDrop} onClick={(e) => { if (e.target === e.currentTarget) { setSelectedElement(null); setSelectedIds([]); } }}>
                    {guidelines.horizontal !== null && <div className="guideline horizontal" style={{ top: guidelines.horizontal }} />}
                    {guidelines.vertical !== null && <div className="guideline vertical" style={{ left: guidelines.vertical }} />}
                    {editorElements.map((element) => {
                      const isSelected = selectedElement === element.id || selectedIds.includes(element.id);
                      return (
                        <div key={element.id} className={`canvas-element ${isSelected ? 'selected' : ''}`} style={{ position: 'absolute', left: element.x, top: element.y }} onMouseDown={(e) => { if (e.shiftKey) { e.stopPropagation(); setSelectedIds(selectedIds.includes(element.id) ? selectedIds.filter(id => id !== element.id) : [...selectedIds, element.id]); } else handleElementMouseDown(e, element); }} onClick={(e) => { e.stopPropagation(); setSelectedElement(element.id); setSelectedIds([element.id]); }}>
                          {element.type === 'text' && <p style={{ margin: 0, ...element.styles }}>{element.content}</p>}
                          {element.type === 'heading1' && <h1 style={{ margin: 0, ...element.styles }}>{element.content}</h1>}
                          {element.type === 'heading2' && <h2 style={{ margin: 0, ...element.styles }}>{element.content}</h2>}
                          {element.type === 'heading3' && <h3 style={{ margin: 0, ...element.styles }}>{element.content}</h3>}
                          {element.type === 'button' && <button className="canvas-button" style={element.styles}>{element.content}</button>}
                          {element.type === 'image' && (element.content ? <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} /> : <div className="canvas-image-placeholder"><ImageIcon size={32} /></div>)}
                          {element.type === 'divider' && <hr className="canvas-divider" />}
                          {element.type === 'spacer' && <div style={{ height: element.height }} />}
                          {isSelected && <div className="element-controls"><button className="control-btn" onClick={(e) => { e.stopPropagation(); duplicateEditorElement(element); }}><Copy size={14} /></button><button className="control-btn" onClick={(e) => { e.stopPropagation(); deleteEditorElement(element.id); }}><Trash2 size={14} /></button></div>}
                        </div>
                      );
                    })}
                    {editorElements.length === 0 && <div className="canvas-empty"><Plus size={32} /><p>Arraste elementos aqui</p></div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="studio-preview">
          <div className={`preview-container ${previewMode}`}>
            <div className="preview-wrapper" data-theme={portfolio.tema}>
              <div className="preview-portfolio">
                <div className="preview-header">
                  <div className="preview-avatar" style={portfolio.avatar ? { backgroundImage: `url(${portfolio.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>{!portfolio.avatar && (portfolio.nome || '').charAt(0).toUpperCase()}</div>
                  <h1>{portfolio.nome || 'Nome'}</h1>
                  <p>{portfolio.bio || 'Bio'}</p>
                </div>
                <div className="preview-section">
                  <h2>Skills</h2>
                  <div className="preview-skills">{portfolio.skills.length > 0 ? portfolio.skills.map((skill, i) => <span key={i} className="preview-skill">{skill}</span>) : <span className="preview-empty">Skills</span>}</div>
                </div>
                <div className="preview-section">
                  <h2>Projetos</h2>
                  <div className="preview-projects">{portfolio.projetos.length > 0 ? portfolio.projetos.map((project, i) => <div key={i} className="preview-project"><h3>{project.titulo}</h3><p>{project.descricao}</p>{project.link && <a href={project.link}>Ver →</a>}</div>) : <span className="preview-empty">Projetos</span>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAiModal && (
        <div className="modal-overlay" onClick={() => setShowAiModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3><Sparkles size={20} />Gerar Portfólio com IA</h3>
            <button className="modal-close" onClick={() => setShowAiModal(false)}><X size={20} /></button>
            <p>Descreva como quer seu portfólio:</p>
            <textarea placeholder="Ex: Desenvolvedor Python..." rows={4} />
            <button className="btn btn-primary"><Zap size={20} />Gerar Portfólio</button>
          </div>
        </div>
      )}
      <AIAssistant 
        portfolio={portfolio}
        editorElements={editorElements}
        onApplyFix={(fixType, data) => {
          if (fixType === 'full' && data) {
            setPortfolio(data);
          } else if (fixType === 'nome') {
            setPortfolio({ ...portfolio, nome: 'Seu Nome' });
          } else if (fixType === 'bio') {
            setPortfolio({ ...portfolio, bio: 'Profissional passionate por tecnologia e inovação. Transformando ideias em realidade.' });
          } else if (fixType === 'skills') {
            setPortfolio({ ...portfolio, skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript'] });
          } else if (fixType === 'projetos') {
            setPortfolio({ ...portfolio, projetos: [
              { titulo: 'Projeto Principal', descricao: 'Projeto destaque do portfólio', link: '#' },
              { titulo: 'Projeto Secundário', descricao: 'Outro trabalho relevante', link: '#' }
            ]});
          } else if (fixType === 'block') {
            const blocks = {
              hero: [{ type: 'heading1', x: 50, y: 50, content: portfolio.nome || 'Seu Nome', width: 400 }],
              about: [{ type: 'heading2', x: 50, y: 30, content: 'Sobre Mim', width: 300 }, { type: 'paragraph', x: 50, y: 70, content: portfolio.bio || 'Descrição sobre você...', width: 500 }],
              skills: [{ type: 'heading2', x: 50, y: 30, content: 'Habilidades', width: 300 }, { type: 'text', x: 50, y: 70, content: portfolio.skills.join(' • ') || 'Suas skills', width: 400 }],
              projects: [{ type: 'heading2', x: 50, y: 30, content: 'Projetos', width: 300 }],
              services: [{ type: 'heading2', x: 50, y: 30, content: 'Serviços', width: 300 }],
              contact: [{ type: 'heading2', x: 50, y: 30, content: 'Contato', width: 300 }],
              cta: [{ type: 'heading2', x: 50, y: 30, content: 'Vamos Trabalhar Juntos?', width: 400 }, { type: 'button', x: 50, y: 100, content: 'Entre em Contato', width: 180 }],
              testimonial: [{ type: 'heading2', x: 50, y: 30, content: 'Depoimentos', width: 300 }]
            };
            const newElements = (blocks[data] || []).map(el => ({ ...el, id: Date.now() + Math.random(), width: el.width || 200, height: el.type === 'button' ? 50 : 60, styles: { color: '#ffffff', fontSize: el.type === 'heading1' ? 36 : el.type === 'heading2' ? 28 : 16 } }));
            setEditorElements([...editorElements, ...newElements]);
          } else if (fixType === 'modeCliente') {
            const ctaElements = [
              { id: Date.now(), type: 'heading2', x: 50, y: editorElements.length * 80 + 50, content: 'Vamos Trabalhar Juntos?', width: 350, height: 40, styles: { color: '#ffffff', fontSize: 28, fontWeight: 'bold' } },
              { id: Date.now() + 1, type: 'button', x: 50, y: editorElements.length * 80 + 100, content: 'Entre em Contato', width: 180, height: 50, styles: { backgroundColor: temaCores[portfolio.tema], color: '#ffffff', borderRadius: 8 } }
            ];
            setEditorElements([...editorElements, ...ctaElements]);
          }
        }}
        onGenerateContent={(content) => {
          if (content.bio) setPortfolio({ ...portfolio, bio: content.bio });
        }}
        onOptimize={() => {
          const optimized = {
            ...portfolio,
            tema: portfolio.tema || 'azul'
          };
          setPortfolio(optimized);
          const optimizedElements = editorElements.map(el => ({
            ...el,
            styles: {
              ...el.styles,
              borderRadius: '12px',
              padding: '16px'
            }
          }));
          setEditorElements(optimizedElements);
        }}
        onModeChange={(mode) => {
          console.log('Modo alterado:', mode);
        }}
      />
    </div>
  );
};

export default Studio;
