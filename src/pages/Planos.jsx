import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { normalizePlanId, PLAN_IDS, PLAN_CONFIG } from '../lib/plans';
import { useTheme } from '../context/ThemeContext';
import { 
  Check, 
  Crown, 
  Zap,
  TrendingUp,
  DollarSign,
  Building2,
  Rocket,
  ArrowRight,
  Shield,
  Users,
  Target,
  Sparkles,
  Crown as CrownIcon
} from 'lucide-react';
import './Planos.css';

const goalColors = {
  'Entrada e Aquisição': '#6b7280',
  'Profissionalização': '#8b5cf6',
  'Otimização': '#10b981',
  'Geração de Receita': '#f59e0b',
  'Escala e Autoridade': '#ef4444'
};

const Planos = () => {
  const { user } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const currentPlan = normalizePlanId(user?.plano);

  const plans = [
    {
      id: PLAN_IDS.FREE,
      ...PLAN_CONFIG[PLAN_IDS.FREE],
      icon: Sparkles,
      cta: 'Começar Grátis',
      highlighted: false,
      goalTag: 'Entrada e Aquisição'
    },
    {
      id: PLAN_IDS.STARTER,
      ...PLAN_CONFIG[PLAN_IDS.STARTER],
      icon: CrownIcon,
      cta: 'Começar Starter',
      highlighted: false,
      goalTag: 'Profissionalização'
    },
    {
      id: PLAN_IDS.GROWTH,
      ...PLAN_CONFIG[PLAN_IDS.GROWTH],
      icon: TrendingUp,
      cta: 'Plano Mais Popular',
      highlighted: true,
      goalTag: 'Otimização'
    },
    {
      id: PLAN_IDS.REVENUE,
      ...PLAN_CONFIG[PLAN_IDS.REVENUE],
      icon: DollarSign,
      cta: 'Começar Revenue',
      highlighted: false,
      goalTag: 'Geração de Receita'
    },
    {
      id: PLAN_IDS.EMPIRE,
      ...PLAN_CONFIG[PLAN_IDS.EMPIRE],
      icon: Building2,
      cta: 'Escalar com Empire',
      highlighted: false,
      goalTag: 'Escala e Autoridade'
    }
  ];

  const currentPlanIndex = plans.findIndex(p => p.id === currentPlan);

  return (
    <div className="planos-page">
      <div className="container">
        <div className="page-header">
          <div className="header-badge">
            <Rocket size={18} />
            <span>Transforme seu portfólio em resultados</span>
          </div>
          <h1>Escolha seu plano</h1>
          <p>Cada plano é desenhado para te levar ao próximo nível</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrentOrHigher = currentPlanIndex >= index;
            const goalColor = goalColors[plan.goal] || themeColors.primary;
            
            return (
              <div 
                key={plan.id}
                className={`plan-card ${plan.highlighted ? 'highlighted' : ''} ${isCurrentOrHigher ? 'current-or-higher' : ''}`}
              >
                {plan.highlighted && (
                  <div className="plan-badge">
                    <Zap size={14} />
                    Mais Popular
                  </div>
                )}
                
                {isCurrentOrHigher && plan.id !== PLAN_IDS.FREE && (
                  <div className="current-badge" style={{ background: goalColor }}>
                    <Check size={14} />
                    Ativo
                  </div>
                )}
                
                <div className="plan-header">
                  <div className="plan-goal-tag" style={{ color: goalColor, borderColor: goalColor }}>
                    <Target size={14} />
                    {plan.goal}
                  </div>
                  <div className="plan-icon" style={{ color: plan.highlighted ? themeColors.primary : goalColor }}>
                    <Icon size={32} />
                  </div>
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.priceLabel}</span>
                    {plan.period && <span className="period">{plan.period}</span>}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="included">
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-cta">
                  {plan.id === PLAN_IDS.FREE ? (
                    <Link to="/register" className="btn btn-secondary btn-lg btn-full">
                      {plan.cta}
                    </Link>
                  ) : isCurrentOrHigher ? (
                    <button className="btn btn-lg btn-full" style={{ background: goalColor, opacity: 0.7, cursor: 'default' }} disabled>
                      <Check size={18} />
                      Plano Ativo
                    </button>
                  ) : (
                    <Link to={`/checkout?plan=${plan.id}`} className="btn btn-primary btn-lg btn-full" style={{ background: goalColor }}>
                      <ArrowRight size={18} />
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="guarantee">
          <div className="guarantee-icon">
            <Shield size={32} />
          </div>
          <div className="guarantee-content">
            <h3>Garantia de Satisfação</h3>
            <p>
              Se dentro de 7 dias você não estiver satisfeito, devolvemos 100% do seu dinheiro. 
              Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>O que nossos usuários dizem</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Com o plano Starter, meu portfólio mudou completamente. Agora pareço muito mais profissional e minhas propostas têm mais valor."</p>
              <div className="testimonial-author">
                <Users size={20} />
                <span>Desenvolvedor Freelancer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"O Growth me ajudou a otimizar meu portfólio. O tráfego aumentou 40% e as pessoas passam mais tempo nas minhas páginas."</p>
              <div className="testimonial-author">
                <Users size={20} />
                <span>Designer UX</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Com o Revenue, consegui meus primeiros clientes via portfólio. As ferramentas de captura de leads funcionam muito bem."</p>
              <div className="testimonial-author">
                <Users size={20} />
                <span>Desenvolvedor Fullstack</span>
              </div>
            </div>
          </div>
        </div>

        <div className="faq">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Qual a diferença entre os planos?</h4>
              <p>
                Cada plano foca em um objetivo específico: do básico (FREE) até escala máxima (EMPIRE).
                O Starter é ideal para profissionalização, Growth para otimização, Revenue para conseguir clientes,
                e EMPIRE para escala com múltiplos portfólios.
              </p>
            </div>
            <div className="faq-item">
              <h4>Posso fazer upgrade a qualquer momento?</h4>
              <p>
                Sim! Você pode fazer upgrade quando quiser. O valor é ajustado proporcionalmente
                ao tempo restante do seu plano atual.
              </p>
            </div>
            <div className="faq-item">
              <h4>Como funciona o plano FREE?</h4>
              <p>
                O plano FREE é vitalício e inclui o básico para você começar: 1 portfólio,
                templates essenciais e 50 ferramentas do MegaToolkit. Perfeito para testar a plataforma.
              </p>
            </div>
            <div className="faq-item">
              <h4>O que são as ferramentas de conversão?</h4>
              <p>
                As ferramentas de conversão (disponíveis a partir do Growth) incluem:
                landing pages de captura, funis, email automation e测算 de conversão -
                tudo desenhado para transformar visitantes em clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;