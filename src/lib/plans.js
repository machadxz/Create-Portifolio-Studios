export const PLAN_IDS = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  REVENUE: 'REVENUE',
  EMPIRE: 'EMPIRE'
};

export const PAID_PLANS = [PLAN_IDS.STARTER, PLAN_IDS.GROWTH, PLAN_IDS.REVENUE, PLAN_IDS.EMPIRE];

export const TOOL_CATEGORIES = {
  PORTFOLIO: {
    name: 'Portfólio',
    icon: '🎨',
    tools: [
      // FREE - Básico
      { id: 'pf-criador', name: 'Criador de portfólio (drag & drop)' },
      { id: 'pf-templates', name: 'Templates limitados (5-10)' },
      { id: 'pf-editor', name: 'Editor de textos + imagens' },
      { id: 'pf-publicar', name: 'Publicar (subdomínio CPS)' },
      { id: 'pf-upload', name: 'Upload de projetos' },
      { id: 'pf-preview', name: 'Preview mobile/desktop' },
      { id: 'pf-exportar', name: 'Exportar PDF' },
      // STARTER - Coisas simples e profissionais
      { id: 'pf-animacoes', name: 'Animações básicas' },
      { id: 'pf-customizar', name: 'Customização avançada (cores, fontes)' },
      { id: 'pf-depoimentos', name: 'Sistema de depoimentos' },
      { id: 'pf-galeria', name: 'Galeria de mídia avançada' },
      // GROWTH - Coisas simples profissionais+
      { id: 'pf-avancado', name: 'Editor avançado com componentes' },
      { id: 'pf-portfolio-ilimitado', name: 'Portfólios ilimitados' },
      // REVENUE - Para gerar dinheiro
      { id: 'pf-multiple', name: 'Múltiplos portfólios' },
      // EMPIRE - Para empresas grandes
      { id: 'pf-white-label', name: 'White label completo (remover CPS)' },
      { id: 'pf-multi-clientes', name: 'Gestão de múltiplos clientes' },
      { id: 'pf-api-portfolio', name: 'API de portfólios' }
    ]
  },
  SEO: {
    name: 'SEO',
    icon: '🔍',
    tools: [
      { id: 'seo-basico', name: 'SEO básico (título + descrição)' },
      { id: 'seo-avancado', name: 'SEO avançado (keywords)' },
      { id: 'seo-analytics', name: 'SEO Analytics integrado' },
      { id: 'seo-sitemap', name: 'Gerar sitemap.xml' },
      { id: 'seo-auto', name: 'Otimização automática de SEO' }
    ]
  },
  REDES_SOCIAIS: {
    name: 'Redes Sociais',
    icon: '📱',
    tools: [
      { id: 'rs-integracao', name: 'Integração com redes sociais' },
      { id: 'rs-compartilhar', name: 'Botões de compartilhamento' },
      { id: 'rs-linkedin', name: 'Importar LinkedIn' },
      { id: 'rs-github', name: 'Importar GitHub' }
    ]
  },
  DOMINIO: {
    name: 'Domínio',
    icon: '🌐',
    tools: [
      { id: 'dom-subdominio', name: 'Subdomínio CPS (seuNome.cps.site)' },
      { id: 'dom-proprio', name: 'Domínio próprio (seuNome.com)' },
      { id: 'dom-ssl', name: 'SSLgratuito' },
      { id: 'dom-ilimitados', name: 'Domínios ilimitados' }
    ]
  },
  LEADS: {
    name: 'Leads & Conversão',
    icon: '🎯',
    tools: [
      // STARTER
      { id: 'lead-form', name: 'Formulário de contato' },
      { id: 'lead-captura', name: 'Captura de emails' },
      { id: 'lead-whatsapp', name: 'Botão WhatsApp flutuante' },
      // GROWTH - Coisas simples profissionais
      { id: 'lead-popup', name: 'Popup de captura' },
      { id: 'lead-chat', name: 'Chat ao vivo' },
      { id: 'lead-integracoes', name: 'Integrações (Webhook, Zapier)' },
      { id: 'lead-botao-flutuante', name: 'Botões flutuantes customizáveis' },
      // REVENUE - Para gerar grana
      { id: 'lead-landing', name: 'Landing pages ilimitadas' },
      { id: 'lead-funil', name: 'Funis de conversão' },
      { id: 'lead-protecao', name: 'Proteção de conteúdo (senha)' },
      { id: 'lead-heatmap', name: 'Heatmap (onde clicam)' },
      { id: 'lead-crm', name: 'CRM básico integrado' },
      { id: 'lead-score', name: 'Lead scoring' },
      // EMPIRE
      { id: 'lead-automacao', name: 'Automação completa de leads' },
      { id: 'lead-multi-funis', name: 'Múltiplos funis' }
    ]
  },
  PAGAMENTO: {
    name: 'Pagamento',
    icon: '💳',
    tools: [
      // GROWTH
      { id: 'pg-stripe', name: 'Stripe (cartão)' },
      { id: 'pg-pix', name: 'Pix (instantâneo)' },
      { id: 'pg-paypal', name: 'PayPal' },
      // REVENUE
      { id: 'pg-fatura', name: 'Faturamento automático' },
      { id: 'pg-assinatura', name: 'Sistema de assinaturas' },
      { id: 'pg-recorrente', name: 'Pagamento recorrente' },
      { id: 'pg-boleto', name: 'Boleto bancário' },
      // EMPIRE
      { id: 'pg-multi-moedas', name: 'Múltiplas moedas' }
    ]
  },
  AGENDAMENTO: {
    name: 'Agendamento',
    icon: '📅',
    tools: [
      { id: 'age-basico', name: 'Sistema de agendamento' },
      { id: 'age-calendly', name: 'Calendly integrado' },
      { id: 'age-calendar', name: 'Google Calendar integrado' },
      { id: 'age-notificacoes', name: 'Notificações automáticas' },
      { id: 'age-video', name: 'Links de vídeo (Zoom, Meet)' }
    ]
  },
  EMAIL: {
    name: 'Email Marketing',
    icon: '📧',
    tools: [
      { id: 'email-captura', name: 'Captura de emails' },
      { id: 'email-basico', name: 'Email marketing básico' },
      { id: 'email-automacao', name: 'Automação de emails' },
      { id: 'email-sequencias', name: 'Sequências de email' },
      { id: 'email-modelos', name: 'Templates profissionais' },
      { id: 'email-integracao', name: 'Integração com Mailchimp etc' }
    ]
  },
  PROPOSTAS: {
    name: 'Propostas Comerciais',
    icon: '📄',
    tools: [
      { id: 'prop-builder', name: 'Construtor de propostas' },
      { id: 'prop-modelos', name: 'Modelos de propostas' },
      { id: 'prop-assinatura', name: 'Assinatura digital' },
      { id: 'prop-pdf', name: 'Exportar PDF profissional' },
      { id: 'prop-tracking', name: 'Acompanhamento de propostas' }
    ]
  },
  CALCULADORA: {
    name: 'Calculadora de Preços',
    icon: '🧮',
    tools: [
      { id: 'calc-basica', name: 'Calculadora básica' },
      { id: 'calc-avancada', name: 'Calculadora avançada (horas, complexidade)' }
    ]
  },
  ANALYTICS: {
    name: 'Analytics',
    icon: '📊',
    tools: [
      { id: 'an-simples', name: 'Analytics simples (visualizações)' },
      { id: 'an-google', name: 'Google Analytics integrado' },
      { id: 'an-dashboard', name: 'Dashboard de métricas' },
      { id: 'an-ab-test', name: 'A/B Testing' },
      { id: 'an-relatorio', name: 'Relatórios mensais' },
      { id: 'an-avancado', name: 'Analytics avançado' }
    ]
  },
  IA: {
    name: 'Inteligência Artificial',
    icon: '🤖',
    tools: [
      // FREE
      { id: 'ia-bio', name: 'Gerar bio com IA' },
      { id: 'ia-chat', name: 'Assistente IA no Studio' },
      // GROWTH - Coisas simples
      { id: 'ia-texto', name: 'Melhorar textos com IA' },
      { id: 'ia-projetos', name: 'Melhorar projetos com IA' },
      // REVENUE - Para ajudar a vender
      { id: 'ia-propostas', name: 'IA para criar propostas' },
      { id: 'ia-seo', name: 'Otimização automática de SEO' },
      // EMPIRE - IA completa
      { id: 'ia-portfolio', name: 'Gerar portfólio automático' },
      { id: 'ia-completa', name: 'IA completa (textos, projetos, SEO)' }
    ]
  },
  AUTOMACAO: {
    name: 'Automação',
    icon: '⚡',
    tools: [
      { id: 'auto-leads', name: 'Automação de leads' },
      { id: 'auto-funis', name: 'Automação de funis' },
      { id: 'auto-crm', name: 'Integração com CRM' },
      { id: 'auto-api', name: 'API completa' },
      { id: 'auto-webhooks', name: 'Webhooks' }
    ]
  },
  AFILIADOS: {
    name: 'Afiliados',
    icon: '💰',
    tools: [
      { id: 'af-sistema', name: 'Sistema de afiliados' },
      { id: 'af-comissao', name: 'Controle de comissões' },
      { id: 'af-link', name: 'Links de rastreamento' },
      { id: 'af-dashboard', name: 'Painel do afiliado' }
    ]
  },
  HOSPEDAGEM: {
    name: 'Hospedagem',
    icon: '🚀',
    tools: [
      { id: 'hp-basica', name: 'Hospedagem básica' },
      { id: 'hp-premium', name: 'Hospedagem premium (ultra rápida)' },
      { id: 'hp-backup', name: 'Backup automático' },
      { id: 'hp-seguranca', name: 'Segurança avançada' },
      { id: 'hp-cdn', name: 'CDN global' }
    ]
  },
  ONE_CLICK: {
    name: 'One Click Portfolio',
    icon: '⚡',
    tools: [
      { id: 'one-click', name: 'One Click Portfolio (IA cria em 30s)' },
      { id: 'one-click-linkedin', name: 'Importar LinkedIn automático' },
      { id: 'one-click-profissao', name: 'Geração por profissão' }
    ]
  },
  IA_AVANCADA: {
    name: 'IA Avançada',
    icon: '🤖',
    tools: [
      { id: 'ia-analise', name: 'IA analisa portfólio e dá nota + sugestões' },
      { id: 'ia-clone', name: 'Clone de Estilo (escolhe portfólio e adapta)' },
      { id: 'ia-icons', name: 'Geração de ícones e ilustrações' },
      { id: 'ia-video', name: 'Transcrição automática de vídeo' },
      { id: 'ia-completa', name: 'IA completa (textos, projetos, SEO)' }
    ]
  },
  CONEXOES: {
    name: 'Conexões & Integrações',
    icon: '🔗',
    tools: [
      { id: 'import-behance', name: 'Importar Behance' },
      { id: 'import-dribbble', name: 'Importar Dribbble' },
      { id: 'import-notion', name: 'Importar Notion' },
      { id: 'import-instagram', name: 'Importar Instagram' },
      { id: 'whatsapp-business', name: 'WhatsApp Business (mensagens automáticas)' },
      { id: 'embed-calendly', name: 'Embed Calendly' },
      { id: 'embed-youtube', name: 'Embed YouTube' },
      { id: 'embed-loom', name: 'Embed Loom' },
      { id: 'embed-figma', name: 'Embed Figma' },
      { id: 'embed-github', name: 'Embed GitHub' },
      { id: 'embed-typeform', name: 'Embed Typeform' },
      { id: 'embed-google-forms', name: 'Embed Google Forms' }
    ]
  },
  CONVERSAO: {
    name: 'Conversão & Vendas',
    icon: '💰',
    tools: [
      { id: 'popup-cv', name: 'Popup "Baixar CV em troca de e-mail"' },
      { id: 'depoimento-video', name: 'Depoimentos em Vídeo' },
      { id: 'contador-projetos', name: 'Contador de Projetos Entregues' },
      { id: 'contador-clientes', name: 'Contador de Clientes Atendidos' },
      { id: 'modo-freelancer', name: 'Modo Freelancer (orçamento rápido)' },
      { id: 'link-bio', name: 'Link na Bio (estilo Linktree)' }
    ]
  },
  MOBILE: {
    name: 'Mobile First',
    icon: '📱',
    tools: [
      { id: 'mobile-editor', name: 'Editor 100% otimizado para celular' },
      { id: 'pwa-app', name: 'App PWA (instalar no celular)' },
      { id: 'modo-story', name: 'Modo Story (formato vertical Instagram)' }
    ]
  },
  EDITOR_AVANCADO: {
    name: 'Editor Avançado',
    icon: '✏️',
    tools: [
      { id: 'timeline-carreira', name: 'Timeline de Carreira interativo' },
      { id: 'tema-dark-light', name: 'Modo Dark/Light/Auto' },
      { id: 'bloco-codigo', name: 'Blocos de código com highlight' },
      { id: 'secao-servicos', name: 'Seção Serviços com cards de preço' },
      { id: 'antes-depois', name: 'Antes e Depois comparativo' },
      { id: 'metodologia', name: 'Seção "Minha Metodologia"' },
      { id: 'projetos-destaque', name: 'Seção "Projetos em Destaque"' },
      { id: 'resultados', name: 'Seção "Resultados que entrego"' }
    ]
  },
  GESTAO: {
    name: 'Gestão & Multi-Usuário',
    icon: '👥',
    tools: [
      { id: 'modo-agencia', name: 'Modo Agência (vários clientes)' },
      { id: 'permissoes-equipe', name: 'Permissões por equipe (Admin, Designer, Cliente)' },
      { id: 'templates-privados', name: 'Pasta de templates privados' },
      { id: 'historico-alteracoes', name: 'Histórico de alterações (versionamento)' },
      { id: 'multi-clientes', name: 'Gestão de múltiplos clientes' }
    ]
  },
  SEGURANCA: {
    name: 'Segurança & Pro',
    icon: '🛡️',
    tools: [
      { id: 'proteger-senha', name: 'Proteção de portfólio por senha' },
      { id: 'proteger-login', name: 'Proteção por login' },
      { id: 'watermark', name: 'Watermark removível' },
      { id: 'backup-json', name: 'Backup automático em JSON' },
      { id: 'exportar-zip', name: 'Exportar portfólio como ZIP' }
    ]
  },
  INTERNACIONAL: {
    name: 'Internacional',
    icon: '🌍',
    tools: [
      { id: 'traducao-auto', name: 'Tradução automática (PT-BR → EN → ES)' },
      { id: 'moeda-auto', name: 'Moeda automática conforme país' },
      { id: 'suporte-rtl', name: 'Suporte RTL (árabe, hebraico)' },
      { id: 'multi-idiomas', name: 'Portfólio em 3 Idiomas com 1 clique' }
    ]
  },
  VIRAL: {
    name: 'Funções Virais',
    icon: '🎁',
    tools: [
      { id: 'modo-carreira', name: 'Modo Carreira (evolução profissional)' },
      { id: 'certificados', name: 'Certificados interativos' },
      { id: 'valores-filosofia', name: 'Seção Valores & Filosofia' },
      { id: 'mini-jogo', name: 'Mini-jogo/quiz "Qual serviço você precisa?"' },
      { id: 'video-cv', name: 'Template Currículo em vídeo (TikTok)' }
    ]
  }
};

export const PLAN_CONFIG = {
  [PLAN_IDS.FREE]: {
    id: PLAN_IDS.FREE,
    name: 'Free',
    price: 0,
    priceLabel: 'R$0',
    period: 'para sempre',
    description: 'Comece agora com o básico para criar seu portfólio profissional',
    features: [
      'Criador de portfólio (drag & drop)',
      '5-10 Templates limitados',
      'Editor de textos + imagens',
      'Subdomínio CPS (seuNome.cps.site)',
      'Upload básico de projetos',
      'SEO básico (título + descrição)',
      'Integração com redes sociais',
      'Preview mobile/desktop',
      'Exportar PDF',
      'Analytics simples',
      'Assistente IA no Studio'
    ],
    goal: 'Entrada e Aquisição',
    isPaid: false
  },
  [PLAN_IDS.STARTER]: {
    id: PLAN_IDS.STARTER,
    name: 'Starter',
    price: 14.90,
    priceLabel: 'R$14,90',
    period: '/mês',
    description: 'Coisas simples e profissionais para seu portfólio se destacar',
    features: [
      'Tudo do Free',
      'Templates premium',
      'Domínio próprio (seuNome.com)',
      'SSLgratuito',
      'SEO avançado (keywords)',
      'Google Analytics integrado',
      'Animações básicas',
      'Customização avançada',
      'Sistema de depoimentos',
      'Galeria de mídia avançada',
      'Botões de compartilhamento',
      'Importar LinkedIn e GitHub',
      'Formulário de contato',
      'Captura de emails',
      'Botão WhatsApp flutuante'
    ],
    goal: 'Profissionalização',
    isPaid: true
  },
  [PLAN_IDS.GROWTH]: {
    id: PLAN_IDS.GROWTH,
    name: 'Growth',
    price: 49.90,
    priceLabel: 'R$49,90',
    period: '/mês',
    description: 'Coisas simples e profissionais+ para fazer seu portfólio vender mais',
    features: [
      'Tudo do Starter',
      'Calculadora de preços',
      'SEO Analytics integrado',
      'Sitemap.xml automático',
      'Popup de captura',
      'Chat ao vivo',
      'Integrações (Webhook, Zapier)',
      'Botões flutuantes customizáveis',
      'Stripe, Pix, PayPal',
      'Sistema de agendamento',
      'Email marketing básico',
      'Automação de leads',
      'Dashboard de métricas',
      'A/B Testing',
      'IA para textos e projetos',
      'Portfólios ilimitados'
    ],
    goal: 'Crescimento',
    isPaid: true
  },
  [PLAN_IDS.REVENUE]: {
    id: PLAN_IDS.REVENUE,
    name: 'Revenue',
    price: 89.90,
    priceLabel: 'R$89,90',
    period: '/mês',
    description: 'Foco em geração de receita - faça seu portfólio trabalhar para você',
    features: [
      'Tudo do Growth',
      'Construtor de propostas comerciais',
      'Modelos de propostas',
      'Assinatura digital',
      'Exportar PDF profissional',
      'Acompanhamento de propostas',
      'Landing pages ilimitadas',
      'Funis de conversão',
      'Heatmap',
      'CRM básico integrado',
      'Lead scoring',
      'Proteção de conteúdo',
      'Faturamento automático',
      'Sistema de assinaturas',
      'Pagamento recorrente',
      'Boleto bancário',
      'Calendly e Google Calendar',
      'Email marketing avançado',
      'Sequências de email',
      'Automação de emails',
      'Relatórios mensais',
      'Analytics avançado',
      'IA para criar propostas',
      'Otimização automática SEO',
      'Integração com CRM',
      'Sistema de afiliados',
      'Hospedagem premium',
      'Backup automático',
      'Segurança avançada'
    ],
    goal: 'Geração de Receita',
    isPaid: true
  },
  [PLAN_IDS.EMPIRE]: {
    id: PLAN_IDS.EMPIRE,
    name: 'Empire',
    price: 179.90,
    priceLabel: 'R$179,90',
    period: '/mês',
    description: 'Para empresas grandes que precisam de poder máximo',
    features: [
      'Tudo do Revenue',
      'White label completo (sem marca CPS)',
      'Gestão de múltiplos clientes',
      'Múltiplos portfólios',
      'API de portfólios',
      'Domínios ilimitados',
      'Automação completa de leads',
      'Múltiplos funis',
      'Múltiplas moedas',
      'IA completa (textos, projetos, SEO)',
      'Gerar portfólio automático',
      'Otimização automática de SEO',
      'CDN global',
      'Suporte prioritário',
      'Consultoria estratégica mensal'
    ],
    goal: 'Domínio Total',
    isPaid: true
  }
};

export const normalizePlanId = (plan) => {
  if (!plan) return PLAN_IDS.FREE;
  if (PLAN_CONFIG[plan]) return plan;
  if (plan === 'SUB' || plan === 'STAR' || plan === 'PRESTIGIO' || plan === 'FREE' || plan === 'PRO') return PLAN_IDS.STARTER;
  if (plan === 'GROWTH' || plan === 'REVENUE' || plan === 'EMPIRE') return plan;
  return PLAN_IDS.FREE;
};

export const isPaidPlan = (plan) => PAID_PLANS.includes(plan);

export const getPlanFeatures = (planId) => {
  const config = PLAN_CONFIG[planId];
  return config ? config.features : [];
};

export const getPlanGoal = (planId) => {
  const config = PLAN_CONFIG[planId];
  return config ? config.goal : '';
};