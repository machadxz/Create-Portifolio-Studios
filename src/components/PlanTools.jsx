import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { normalizePlanId, TOOL_CATEGORIES, PLAN_IDS } from '../lib/plans';
import { 
  Search, Sparkles, Palette, Globe, Target, CreditCard, 
  Calendar, Mail, BarChart2, Bot, Zap, DollarSign, Rocket, 
  Lock, CheckCircle, Shield, Users
} from 'lucide-react';
import './PlanTools.css';

const getCategoryIcon = (catName) => {
  const icons = {
    'Portfólio': Palette,
    'SEO': Search,
    'Redes Sociais': Globe,
    'Domínio': Globe,
    'Leads & Conversão': Target,
    'Pagamento': CreditCard,
    'Agendamento': Calendar,
    'Email Marketing': Mail,
    'Analytics': BarChart2,
    'Inteligência Artificial': Bot,
    'Automação': Zap,
    'Afiliados': DollarSign,
    'Hospedagem': Rocket,
    'One Click Portfolio': Zap,
    'IA Avançada': Bot,
    'Conexões & Integrações': Globe,
    'Conversão & Vendas': DollarSign,
    'Mobile First': Globe,
    'Editor Avançado': Palette,
    'Gestão & Multi-Usuário': Users,
    'Segurança & Pro': Shield,
    'Internacional': Globe,
    'Funções Virais': Sparkles
  };
  return icons[catName] || Sparkles;
};

const PLAN_ORDER = [PLAN_IDS.FREE, PLAN_IDS.STARTER, PLAN_IDS.GROWTH, PLAN_IDS.REVENUE, PLAN_IDS.EMPIRE];

const getPlanLevel = (planId) => PLAN_ORDER.indexOf(planId);

const getToolMinPlan = (toolId) => {
  const toolPlans = {
    // PORTFÓLIO
    'pf-criador': PLAN_IDS.FREE,
    'pf-templates': PLAN_IDS.FREE,
    'pf-editor': PLAN_IDS.FREE,
    'pf-publicar': PLAN_IDS.FREE,
    'pf-upload': PLAN_IDS.FREE,
    'pf-preview': PLAN_IDS.FREE,
    'pf-exportar': PLAN_IDS.FREE,
    // STARTER - Coisas simples e profissionais
    'pf-animacoes': PLAN_IDS.STARTER,
    'pf-customizar': PLAN_IDS.STARTER,
    'pf-depoimentos': PLAN_IDS.STARTER,
    'pf-galeria': PLAN_IDS.STARTER,
    // GROWTH - Coisas simples e profissionais+
    'pf-avancado': PLAN_IDS.GROWTH,
    'pf-portfolio-ilimitado': PLAN_IDS.GROWTH,
    // REVENUE - Para gerar dinheiro
    'pf-multiple': PLAN_IDS.REVENUE,
    // EMPIRE - Para empresas grandes
    'pf-white-label': PLAN_IDS.EMPIRE,
    'pf-multi-clientes': PLAN_IDS.EMPIRE,
    'pf-api-portfolio': PLAN_IDS.EMPIRE,
    
    // SEO
    'seo-basico': PLAN_IDS.FREE,
    'seo-avancado': PLAN_IDS.STARTER,
    'seo-analytics': PLAN_IDS.GROWTH,
    'seo-sitemap': PLAN_IDS.GROWTH,
    'seo-auto': PLAN_IDS.EMPIRE,
    
    // REDES SOCIAIS
    'rs-integracao': PLAN_IDS.FREE,
    'rs-compartilhar': PLAN_IDS.STARTER,
    'rs-linkedin': PLAN_IDS.STARTER,
    'rs-github': PLAN_IDS.STARTER,
    
    // DOMÍNIO
    'dom-subdominio': PLAN_IDS.FREE,
    'dom-proprio': PLAN_IDS.STARTER,
    'dom-ssl': PLAN_IDS.STARTER,
    'dom-ilimitados': PLAN_IDS.EMPIRE,
    
    // LEADS & CONVERSÃO
    'lead-form': PLAN_IDS.STARTER,
    'lead-captura': PLAN_IDS.STARTER,
    'lead-whatsapp': PLAN_IDS.STARTER,
    // GROWTH - Coisas simples profissionais
    'lead-popup': PLAN_IDS.GROWTH,
    'lead-chat': PLAN_IDS.GROWTH,
    'lead-integracoes': PLAN_IDS.GROWTH,
    'lead-botao-flutuante': PLAN_IDS.GROWTH,
    // REVENUE - Foco em grana
    'lead-landing': PLAN_IDS.REVENUE,
    'lead-funil': PLAN_IDS.REVENUE,
    'lead-protecao': PLAN_IDS.REVENUE,
    'lead-heatmap': PLAN_IDS.REVENUE,
    'lead-crm': PLAN_IDS.REVENUE,
    'lead-score': PLAN_IDS.REVENUE,
    // EMPIRE
    'lead-automacao': PLAN_IDS.EMPIRE,
    'lead-multi-funis': PLAN_IDS.EMPIRE,
    
    // PAGAMENTO
    'pg-stripe': PLAN_IDS.GROWTH,
    'pg-pix': PLAN_IDS.GROWTH,
    'pg-paypal': PLAN_IDS.GROWTH,
    // REVENUE
    'pg-fatura': PLAN_IDS.REVENUE,
    'pg-assinatura': PLAN_IDS.REVENUE,
    'pg-recorrente': PLAN_IDS.REVENUE,
    'pg-boleto': PLAN_IDS.REVENUE,
    // EMPIRE
    'pg-multi-moedas': PLAN_IDS.EMPIRE,
    
    // AGENDAMENTO
    'age-basico': PLAN_IDS.GROWTH,
    'age-calendly': PLAN_IDS.REVENUE,
    'age-calendar': PLAN_IDS.REVENUE,
    'age-notificacoes': PLAN_IDS.REVENUE,
    'age-video': PLAN_IDS.REVENUE,
    
    // EMAIL MARKETING
    'email-captura': PLAN_IDS.GROWTH,
    'email-basico': PLAN_IDS.GROWTH,
    'email-automacao': PLAN_IDS.REVENUE,
    'email-sequencias': PLAN_IDS.REVENUE,
    'email-modelos': PLAN_IDS.REVENUE,
    'email-integracao': PLAN_IDS.REVENUE,
    
    // ANALYTICS
    'an-simples': PLAN_IDS.FREE,
    'an-google': PLAN_IDS.STARTER,
    'an-dashboard': PLAN_IDS.GROWTH,
    'an-ab-test': PLAN_IDS.GROWTH,
    'an-relatorio': PLAN_IDS.REVENUE,
    'an-avancado': PLAN_IDS.REVENUE,
    
    // IA
    'ia-bio': PLAN_IDS.FREE,
    'ia-chat': PLAN_IDS.FREE,
    // GROWTH - IA simples
    'ia-texto': PLAN_IDS.GROWTH,
    'ia-projetos': PLAN_IDS.GROWTH,
    // REVENUE - IA para ajudar a vender
    'ia-propostas': PLAN_IDS.REVENUE,
    'ia-seo': PLAN_IDS.REVENUE,
    // EMPIRE - IA completa
    'ia-portfolio': PLAN_IDS.EMPIRE,
    'ia-completa': PLAN_IDS.EMPIRE,
    
    // AUTOMACAO
    'auto-leads': PLAN_IDS.GROWTH,
    'auto-funis': PLAN_IDS.REVENUE,
    'auto-crm': PLAN_IDS.REVENUE,
    'auto-api': PLAN_IDS.EMPIRE,
    'auto-webhooks': PLAN_IDS.EMPIRE,
    
    // AFILIADOS
    'af-sistema': PLAN_IDS.REVENUE,
    'af-comissao': PLAN_IDS.REVENUE,
    'af-link': PLAN_IDS.REVENUE,
    'af-dashboard': PLAN_IDS.REVENUE,
    
    // HOSPEDAGEM
    'hp-basica': PLAN_IDS.FREE,
    'hp-premium': PLAN_IDS.REVENUE,
    'hp-backup': PLAN_IDS.REVENUE,
    'hp-seguranca': PLAN_IDS.REVENUE,
    'hp-cdn': PLAN_IDS.EMPIRE,
    
    // PROPOSTAS (REVENUE)
    'prop-builder': PLAN_IDS.REVENUE,
    'prop-modelos': PLAN_IDS.REVENUE,
    'prop-assinatura': PLAN_IDS.REVENUE,
    'prop-pdf': PLAN_IDS.REVENUE,
    'prop-tracking': PLAN_IDS.REVENUE,
    
    // CALCULADORA (GROWTH)
    'calc-basica': PLAN_IDS.GROWTH,
    'calc-avancada': PLAN_IDS.REVENUE,
    
    // ONE CLICK (REVENUE)
    'one-click': PLAN_IDS.REVENUE,
    'one-click-linkedin': PLAN_IDS.REVENUE,
    'one-click-profissao': PLAN_IDS.REVENUE,
    
    // IA AVANCADA (EMPIRE)
    'ia-analise': PLAN_IDS.EMPIRE,
    'ia-clone': PLAN_IDS.EMPIRE,
    'ia-icons': PLAN_IDS.EMPIRE,
    'ia-video': PLAN_IDS.EMPIRE,
    
    // CONEXOES (STARTER/REVENUE)
    'import-behance': PLAN_IDS.STARTER,
    'import-dribbble': PLAN_IDS.STARTER,
    'import-notion': PLAN_IDS.STARTER,
    'import-instagram': PLAN_IDS.STARTER,
    'whatsapp-business': PLAN_IDS.REVENUE,
    'embed-calendly': PLAN_IDS.STARTER,
    'embed-youtube': PLAN_IDS.FREE,
    'embed-loom': PLAN_IDS.STARTER,
    'embed-figma': PLAN_IDS.STARTER,
    'embed-github': PLAN_IDS.STARTER,
    'embed-typeform': PLAN_IDS.STARTER,
    'embed-google-forms': PLAN_IDS.STARTER,
    
    // CONVERSAO (STARTER/REVENUE)
    'popup-cv': PLAN_IDS.REVENUE,
    'depoimento-video': PLAN_IDS.REVENUE,
    'contador-projetos': PLAN_IDS.STARTER,
    'contador-clientes': PLAN_IDS.STARTER,
    'modo-freelancer': PLAN_IDS.REVENUE,
    'link-bio': PLAN_IDS.REVENUE,
    
    // MOBILE (FREE/REVENUE)
    'mobile-editor': PLAN_IDS.FREE,
    'pwa-app': PLAN_IDS.REVENUE,
    'modo-story': PLAN_IDS.REVENUE,
    
    // EDITOR AVANCADO (STARTER/REVENUE/EMPIRE)
    'timeline-carreira': PLAN_IDS.REVENUE,
    'tema-dark-light': PLAN_IDS.STARTER,
    'bloco-codigo': PLAN_IDS.STARTER,
    'secao-servicos': PLAN_IDS.STARTER,
    'antes-depois': PLAN_IDS.REVENUE,
    'metodologia': PLAN_IDS.REVENUE,
    'projetos-destaque': PLAN_IDS.STARTER,
    'resultados': PLAN_IDS.STARTER,
    
    // GESTAO (EMPIRE)
    'modo-agencia': PLAN_IDS.EMPIRE,
    'permissoes-equipe': PLAN_IDS.EMPIRE,
    'templates-privados': PLAN_IDS.EMPIRE,
    'historico-alteracoes': PLAN_IDS.EMPIRE,
    
    // SEGURANCA (STARTER/EMPIRE)
    'proteger-senha': PLAN_IDS.STARTER,
    'proteger-login': PLAN_IDS.REVENUE,
    'watermark': PLAN_IDS.REVENUE,
    'backup-json': PLAN_IDS.FREE,
    'exportar-zip': PLAN_IDS.REVENUE,
    
    // INTERNACIONAL (REVENUE/EMPIRE)
    'traducao-auto': PLAN_IDS.REVENUE,
    'moeda-auto': PLAN_IDS.REVENUE,
    'suporte-rtl': PLAN_IDS.REVENUE,
    'multi-idiomas': PLAN_IDS.EMPIRE,
    
    // VIRAL (REVENUE/EMPIRE)
    'modo-carreira': PLAN_IDS.REVENUE,
    'certificados': PLAN_IDS.REVENUE,
    'valores-filosofia': PLAN_IDS.REVENUE,
    'mini-jogo': PLAN_IDS.EMPIRE,
    'video-cv': PLAN_IDS.EMPIRE,
  };
  return toolPlans[toolId] || PLAN_IDS.FREE;
};

const getPlanLabel = (planId) => {
  const labels = {
    [PLAN_IDS.FREE]: 'Apenas conteúdo FREE',
    [PLAN_IDS.STARTER]: 'Apenas conteúdo Starter',
    [PLAN_IDS.GROWTH]: 'Apenas conteúdo Growth',
    [PLAN_IDS.REVENUE]: 'Apenas conteúdo Revenue',
    [PLAN_IDS.EMPIRE]: 'Apenas conteúdo Empire'
  };
  return labels[planId];
};

const getPlanColor = (planId) => {
  const colors = {
    [PLAN_IDS.FREE]: '#6b7280',
    [PLAN_IDS.STARTER]: '#8b5cf6',
    [PLAN_IDS.GROWTH]: '#10b981',
    [PLAN_IDS.REVENUE]: '#f59e0b',
    [PLAN_IDS.EMPIRE]: '#ef4444'
  };
  return colors[planId];
};

const PlanTools = ({ portfolio }) => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTool, setExpandedTool] = useState(null);

  const userPlan = user?.plano || 'FREE';
  const normalizedPlan = normalizePlanId(userPlan);
  const userPlanLevel = getPlanLevel(normalizedPlan);
  
  const categories = Object.keys(TOOL_CATEGORIES);

  const allTools = useMemo(() => {
    const tools = [];
    Object.entries(TOOL_CATEGORIES).forEach(([catName, cat]) => {
      cat.tools.forEach(tool => {
        const minPlan = getToolMinPlan(tool.id);
        const toolLevel = getPlanLevel(minPlan);
        tools.push({
          ...tool,
          category: catName,
          minPlan,
          toolLevel,
          isUnlocked: userPlanLevel >= toolLevel
        });
      });
    });
    return tools;
  }, [userPlanLevel]);

  const filteredTools = useMemo(() => {
    let tools = allTools;
    
    if (activeCategory !== 'Todas') {
      tools = tools.filter(t => t.category === activeCategory);
    }
    
    if (searchQuery) {
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return tools;
  }, [allTools, activeCategory, searchQuery]);

  const unlockInfo = (tool) => {
    if (tool.isUnlocked) return null;
    return {
      label: getPlanLabel(tool.minPlan),
      color: getPlanColor(tool.minPlan)
    };
  };

  return (
    <div className="plan-tools">
      <div className="plan-tools-header">
        <div className="plan-tools-title">
          <Sparkles size={20} />
          <h3>Ferramentas por Plano</h3>
          <span className={`plan-badge ${normalizedPlan.toLowerCase()}`}>{normalizedPlan}</span>
        </div>
        <p className="plan-tools-desc">
          Você tem acesso a <strong>{allTools.filter(t => t.isUnlocked).length} de {allTools.length} ferramentas</strong>
        </p>
      </div>

      <div className="plan-tools-filters">
        <div className="search-box">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Buscar ferramenta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-tabs">
          <button 
            className={`cat-tab ${activeCategory === 'Todas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Todas')}
          >
            <Sparkles size={14} />
            Todas
          </button>
          {categories.map(cat => {
            const Icon = getCategoryIcon(cat);
            return (
              <button 
                key={cat}
                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <Icon size={14} />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tools-grid">
        {filteredTools.map(tool => {
          const unlock = unlockInfo(tool);
          
          return (
            <div 
              key={tool.id} 
              className={`tool-card ${!tool.isUnlocked ? 'locked' : ''} ${expandedTool === tool.id ? 'expanded' : ''}`}
              onClick={() => tool.isUnlocked && setExpandedTool(expandedTool === tool.id ? null : tool.id)}
            >
              <div className="tool-header">
                <span className="tool-name">{tool.name}</span>
                {tool.isUnlocked ? (
                  <span className="tool-status unlocked">
                    <CheckCircle size={12} />
                  </span>
                ) : (
                  <span className="tool-status locked" style={{ color: unlock?.color }}>
                    <Lock size={12} />
                  </span>
                )}
              </div>
              
              {!tool.isUnlocked && unlock && (
                <div className="tool-lock-info" style={{ background: `${unlock.color}20`, color: unlock.color, borderColor: unlock.color }}>
                  <Lock size={12} />
                  {unlock.label}
                </div>
              )}
              
              {tool.isUnlocked && (
                <div className="tool-desc">
                  Ferramenta disponível no seu plano!
                </div>
              )}
              
              {tool.isUnlocked && expandedTool === tool.id && (
                <div className="tool-expanded">
                  <button className="tool-use-btn">
                    <Zap size={14} />
                    Usar ferramenta
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="no-tools">
          <p>Nenhuma ferramenta encontrada.</p>
        </div>
      )}
    </div>
  );
};

export default PlanTools;