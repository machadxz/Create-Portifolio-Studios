import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Wand2, Zap, Lightbulb, Target, TrendingUp, 
  User, Briefcase, Mail, MessageCircle, ChevronRight, 
  CheckCircle, AlertCircle, ArrowRight, RefreshCw, Building2,
  Code, Linkedin, Github, Layout, Eye, MousePointer, Star,
  BarChart3, Smile, ThumbsUp, Copy, Palette
} from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = ({ portfolio, editorElements, onApplyFix, onGenerateContent, onOptimize, onModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnostic');
  const [userMode, setUserMode] = useState('iniciante');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnostic, setDiagnostic] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [quickActions, setQuickActions] = useState([]);
  const [mascotMessage, setMascotMessage] = useState('');

  const temaCores = { azul: '#3b82f6', roxo: '#a855f7', vermelho: '#ef4444', verde: '#22c55e', laranja: '#f97316' };
  const temaCor = temaCores[portfolio.tema] || '#3b82f6';

  const runDiagnostic = async () => {
    setIsAnalyzing(true);
    setMascotMessage('Analisando seu portfólio... 🔍');
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const issues = [];
    const improvements = [];

    if (!portfolio.nome || portfolio.nome.length < 2) {
      issues.push({ type: 'error', text: 'Nome muito curto ou vazio', fix: 'nome' });
    }

    if (!portfolio.bio || portfolio.bio.length < 20) {
      issues.push({ type: 'warning', text: 'Bio muito curta ou ausente', fix: 'bio' });
    }

    if (portfolio.skills.length < 3) {
      issues.push({ type: 'warning', text: 'Poucas habilidades listadas', fix: 'skills' });
    }

    if (portfolio.projetos.length < 2) {
      issues.push({ type: 'warning', text: 'Poucos projetos no portfólio', fix: 'projetos' });
    }

    if (editorElements.length < 3) {
      improvements.push({ type: 'tip', text: 'Adicione mais elementos visuais' });
    }

    const score = Math.min(100, 30 + (portfolio.nome ? 15 : 0) + (portfolio.bio ? 15 : 0) + 
      (portfolio.skills.length * 8) + (portfolio.projetos.length * 10) + (editorElements.length * 3));

    const newDiagnostic = {
      score,
      issues,
      improvements,
      layout: score > 60 ? 'good' : score > 40 ? 'needsWork' : 'poor',
      colors: score > 70 ? 'good' : 'needsWork',
      text: portfolio.bio && portfolio.bio.length > 50 ? 'good' : 'needsWork',
      structure: portfolio.skills.length > 0 && portfolio.projetos.length > 0 ? 'good' : 'needsWork'
    };

    setDiagnostic(newDiagnostic);
    setIsAnalyzing(false);
    setMascotMessage('Análise concluída! ✅');

    const newProgress = Math.round((score / 100) * 100);
    setProgress(newProgress);
  };

  const generateBio = async () => {
    setMascotMessage('Gerando bio profissional... ✨');
    const bios = [
      `Profissional passionado por tecnologia e inovação. ${portfolio.skills.slice(0, 3).join(', ')} são minhas principais áreas de expertise.`,
      `Especialista em ${portfolio.skills[0] || 'desenvolvimento'} com foco em resultados. Sempre buscando desafios que me façam crescer profissionalmente.`,
      `${portfolio.skills[0] || 'Desenvolvedor'} com experiência em ${portfolio.skills.slice(0, 2).join(', ')}. Apaixonado por criar soluções que impactam positivamente.`
    ];
    const randomBio = bios[Math.floor(Math.random() * bios.length)];
    onGenerateContent({ bio: randomBio });
    setMascotMessage('Bio gerada! 🎉');
  };

  const generateProjectDesc = (index) => {
    const descs = [
      'Projeto inovador desenvolvido com foco em qualidade e performance.',
      'Solução criativa que resolve problemas reais dos usuários.',
      'Trabalho detalhado demonstrando habilidades técnicas e criatividade.'
    ];
    return descs[index % descs.length];
  };

  const optimizePortfolio = () => {
    setMascotMessage('Otimizando seu portfólio... 🎨');
    onOptimize();
    setTimeout(() => setMascotMessage('Portfólio otimizado! ✨'), 1000);
  };

  const applyQuickFix = (fixType) => {
    setMascotMessage(`Aplicando correção... ${fixType === 'nome' ? '👤' : fixType === 'bio' ? '📝' : '🎯'}`);
    onApplyFix(fixType);
    setTimeout(() => runDiagnostic(), 500);
  };

  const createFromDescription = async (description) => {
    setMascotMessage('Criando portfólio... 🚀');
    
    const isDev = description.toLowerCase().includes('desenvolvedor') || description.toLowerCase().includes('dev');
    const isDesigner = description.toLowerCase().includes('design');
    const isFreelancer = description.toLowerCase().includes('freelancer');
    
    const newPortfolio = {
      ...portfolio,
      nome: isDev ? 'Desenvolvedor Full Stack' : isDesigner ? 'Designer UX/UI' : isFreelancer ? 'Profissional Digital' : 'Profissional',
      bio: isDev ? 'Passionado por código e soluções inovadoras. Transformando ideias em realidade.' : 
           isDesigner ? 'Criando experiências digitais memoráveis e intuitivas.' :
           isFreelancer ? 'Especialista em Deliver resultados para clientes.' : 'Profissional comprometido com a excelência.',
      skills: isDev ? ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript'] : 
              isDesigner ? ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping', 'Design System'] :
              isFreelancer ? ['Desenvolvimento Web', 'Marketing Digital', 'SEO'] : ['Comunicação', 'Proatividade', 'Trabalho em Equipe'],
      projetos: [
        { titulo: 'Projeto Principal', descricao: 'Projeto destaque do portfólio', link: '#' },
        { titulo: 'Projeto Secundário', descricao: 'Outro trabalho relevante', link: '#' },
        { titulo: 'Projeto Extra', descricao: 'Trabalho complementar', link: '#' }
      ]
    };

    onApplyFix('full', newPortfolio);
    setMascotMessage('Portfólio criado! 🎉');
    setTimeout(() => runDiagnostic(), 500);
  };

  const toggleMode = () => {
    const newMode = userMode === 'iniciante' ? 'avancado' : 'iniciante';
    setUserMode(newMode);
    onModeChange?.(newMode);
  };

  const insertBlock = (blockType) => {
    setMascotMessage(`Inserindo seção ${blockType}... 📦`);
    onApplyFix('block', blockType);
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  const quickActionsList = [
    { icon: Sparkles, label: 'Gerar Bio', action: generateBio, color: '#a855f7' },
    { icon: Zap, label: 'Deixar Mais Bonito', action: optimizePortfolio, color: '#f97316' },
    { icon: Target, label: 'Modo Cliente', action: () => onApplyFix('modeCliente'), color: '#22c55e' },
    { icon: Layout, label: 'Blocos Prontos', action: () => setActiveTab('blocks'), color: '#3b82f6' }
  ];

  const tips = [
    { icon: Lightbulb, text: 'Adicione uma foto profissional' },
    { icon: TrendingUp, text: 'Liste suas principais skills primeiro' },
    { icon: Star, text: 'Coloque seus melhores projetos em destaque' },
    { icon: MessageCircle, text: 'Adicione formas de contato' }
  ];

  const importFromGithub = async (username) => {
    setMascotMessage('Importando do GitHub... 🐙');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockProjects = [
      { titulo: 'E-commerce Platform', descricao: 'Plataforma completa com React e Node.js', link: 'https://github.com' },
      { titulo: 'AI Chatbot', descricao: 'Chatbot inteligente com Machine Learning', link: 'https://github.com' },
      { titulo: 'Dashboard Analytics', descricao: 'Painel de análise de dados em tempo real', link: 'https://github.com' }
    ];
    
    onApplyFix('full', { ...portfolio, projetos: mockProjects, skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Git'] });
    setMascotMessage('Projetos importados! ✅');
  };

  const importFromLinkedIn = async (username) => {
    setMascotMessage('Importando do LinkedIn... 💼');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = {
      bio: 'Profissional com experiência em desenvolvimento web e gestão de projetos. Apaixonado por criar soluções inovadoras.',
      skills: ['Liderança', 'Gestão de Projetos', 'Comunicação', 'Trabalho em Equipe', 'Planejamento Estratégico']
    };
    
    onApplyFix('full', { ...portfolio, bio: mockData.bio, skills: [...portfolio.skills, ...mockData.skills] });
    setMascotMessage('Dados importados! ✅');
  };

  if (!isOpen) {
    return (
      <div className="ai-assistant-collapsed" onClick={() => setIsOpen(true)}>
        <div className="ai-trigger" style={{ '--theme-color': temaCor }}>
          <Sparkles size={20} />
          <span>AI Assistant</span>
        </div>
        {progress < 100 && (
          <div className="ai-progress-mini">
            <div className="ai-progress-bar" style={{ width: `${progress}%`, background: temaCor }} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ai-assistant" style={{ '--theme-color': temaCor }}>
      <div className="ai-header">
        <div className="ai-header-left">
          <Sparkles size={18} />
          <span>AI Assistant</span>
        </div>
        <div className="ai-header-right">
          <button className={`mode-toggle ${userMode}`} onClick={toggleMode}>
            {userMode === 'iniciante' ? 'Iniciante' : 'Avançado'}
          </button>
          <button className="ai-close" onClick={() => setIsOpen(false)}>×</button>
        </div>
      </div>

      {mascotMessage && (
        <div className="mascot-message">
          <span>{mascotMessage}</span>
        </div>
      )}

      <div className="ai-tabs">
        <button className={activeTab === 'diagnostic' ? 'active' : ''} onClick={() => setActiveTab('diagnostic')}>
          <Target size={14} /> Diagnóstico
        </button>
        <button className={activeTab === 'generate' ? 'active' : ''} onClick={() => setActiveTab('generate')}>
          <Wand2 size={14} /> Gerar
        </button>
        <button className={activeTab === 'import' ? 'active' : ''} onClick={() => setActiveTab('import')}>
          <Code size={14} /> Importar
        </button>
        <button className={activeTab === 'tips' ? 'active' : ''} onClick={() => setActiveTab('tips')}>
          <Lightbulb size={14} /> Dicas
        </button>
        <button className={activeTab === 'blocks' ? 'active' : ''} onClick={() => setActiveTab('blocks')}>
          <Layout size={14} /> Blocos
        </button>
      </div>

      <div className="ai-content">
        {activeTab === 'diagnostic' && (
          <div className="diagnostic-tab">
            {isAnalyzing ? (
              <div className="analyzing">
                <div className="analyzing-spinner" />
                <span>Analisando...</span>
              </div>
            ) : diagnostic ? (
              <>
                <div className="score-display">
                  <div className="score-circle" style={{ '--score': diagnostic.score }}>
                    <span className="score-number">{diagnostic.score}</span>
                    <span className="score-label">Score</span>
                  </div>
                </div>

                <div className="progress-bar-container">
                  <div className="progress-label">
                    <span>Completude</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="issues-list">
                  <h4>Problemas Encontrados</h4>
                  {diagnostic.issues.length === 0 ? (
                    <div className="no-issues"><CheckCircle size={16} /> Tudo OK!</div>
                  ) : (
                    diagnostic.issues.map((issue, i) => (
                      <div key={i} className={`issue-item ${issue.type}`}>
                        <AlertCircle size={14} />
                        <span>{issue.text}</span>
                        <button onClick={() => applyQuickFix(issue.fix)}>Corrigir</button>
                      </div>
                    ))
                  )}
                </div>

                {diagnostic.improvements.length > 0 && (
                  <div className="improvements-list">
                    <h4>Sugestões</h4>
                    {diagnostic.improvements.map((imp, i) => (
                      <div key={i} className="improvement-item">
                        <Lightbulb size={14} />
                        <span>{imp.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button className="run-diagnostic" onClick={runDiagnostic}>
                <Sparkles size={16} />
                Analisar Portfólio
              </button>
            )}
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="generate-tab">
            <div className="quick-actions">
              {quickActionsList.map((action, i) => (
                <button key={i} className="quick-action-btn" onClick={action.action} style={{ '--action-color': action.color }}>
                  <action.icon size={18} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            <div className="create-from-desc">
              <h4>Criar a partir de descrição</h4>
              <textarea 
                placeholder="Ex: Sou desenvolvedor React, quero um portfólio moderno e profesional..."
                id="ai-description-input"
              />
              <button className="create-btn" onClick={() => {
                const desc = document.getElementById('ai-description-input')?.value;
                if (desc) createFromDescription(desc);
              }}>
                <Wand2 size={16} />
                Criar Portfólio
              </button>
            </div>
          </div>
        )}

        {activeTab === 'import' && (
          <div className="import-tab">
            <div className="import-options">
              <button className="import-btn" onClick={() => importFromGithub('demo')}>
                <Github size={20} />
                <div className="import-info">
                  <span className="import-title">GitHub</span>
                  <span className="import-desc">Importar repositórios</span>
                </div>
              </button>
              <button className="import-btn" onClick={() => importFromLinkedIn('demo')}>
                <Linkedin size={20} />
                <div className="import-info">
                  <span className="import-title">LinkedIn</span>
                  <span className="import-desc">Importar experiência</span>
                </div>
              </button>
            </div>
            <p className="import-note">Conecte sua conta para importar automaticamente</p>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="tips-tab">
            {tips.map((tip, i) => (
              <div key={i} className="tip-item">
                <tip.icon size={16} />
                <span>{tip.text}</span>
              </div>
            ))}
            {userMode === 'iniciante' && (
              <div className="beginner-tip">
                <Smile size={16} />
                <span>Dica: Ative o modo avançado para mais opções!</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blocks' && (
          <div className="blocks-tab">
            <div className="blocks-grid">
              <button className="block-btn" onClick={() => insertBlock('hero')}>
                <User size={18} />
                <span>Hero</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('about')}>
                <User size={18} />
                <span>Sobre</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('skills')}>
                <Star size={18} />
                <span>Skills</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('projects')}>
                <Briefcase size={18} />
                <span>Projetos</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('services')}>
                <Building2 size={18} />
                <span>Serviços</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('contact')}>
                <Mail size={18} />
                <span>Contato</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('cta')}>
                <MousePointer size={18} />
                <span>CTA</span>
              </button>
              <button className="block-btn" onClick={() => insertBlock('testimonial')}>
                <ThumbsUp size={18} />
                <span>Depoimento</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;