import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Star,
  Sparkles,
  Clock
} from 'lucide-react';
import './Planos.css';

const Planos = () => {
  const { user, isAuthenticated, getDaysLeft, token } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/users/upgrade', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error('Erro ao fazer upgrade:', err);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Teste',
      price: 'R$0',
      period: '',
      description: 'Perfeito para começar',
      icon: <Star size={24} />,
      features: [
        { text: '10 dias de teste', included: true },
        { text: '1 portfólio', included: true },
        { text: '3 templates básicos', included: true },
        { text: 'Preview desktop/mobile', included: true },
        { text: 'Templates premium', included: false },
        { text: 'Exportação HTML completa', included: false },
        { text: 'Auto Build com IA', included: false },
        { text: 'Link compartilhável', included: false }
      ],
      cta: 'Começar Grátis',
      highlighted: false
    },
    {
      id: 'sub',
      name: 'PRO',
      price: 'R$40',
      period: '2 meses',
      description: 'Para profissionais sérios',
      icon: <Crown size={24} />,
      features: [
        { text: 'Acesso por 2 meses', included: true },
        { text: 'Portfólios ilimitados', included: true },
        { text: 'Todos os templates', included: true },
        { text: 'Preview desktop/mobile', included: true },
        { text: 'Templates premium', included: true },
        { text: 'Exportação HTML completa', included: true },
        { text: 'Auto Build com IA', included: true },
        { text: 'Link compartilhável', included: true }
      ],
      cta: 'Fazer Upgrade',
      highlighted: true
    }
  ];

  return (
    <div className="planos-page">
      <div className="container">
        <div className="page-header">
          <div className="header-badge">
            <Zap size={18} />
            <span>Oferta Especial</span>
          </div>
          <h1>Escolha seu plano</h1>
          <p>Invista no seu futuro profissional com um portfólio de destaque</p>
          
          {isAuthenticated && user?.plano === 'FREE' && (
            <div className="trial-banner">
              <Clock size={20} />
              <span>Você tem <strong>{getDaysLeft()} dias</strong> restantes no período de teste</span>
            </div>
          )}
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`plan-card ${plan.highlighted ? 'highlighted' : ''}`}
            >
              {plan.highlighted && (
                <div className="plan-badge">
                  <Sparkles size={14} />
                  Mais Popular
                </div>
              )}
              
              <div className="plan-header">
                <div className="plan-icon" style={{ color: plan.highlighted ? themeColors.primary : undefined }}>
                  {plan.icon}
                </div>
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  {plan.period && <span className="period">{plan.period}</span>}
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className={feature.included ? 'included' : 'excluded'}>
                    {feature.included ? (
                      <Check size={18} />
                    ) : (
                      <X size={18} />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="plan-cta">
                {plan.id === 'free' ? (
                  <Link 
                    to="/register" 
                    className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <Link 
                    to="/checkout" 
                    className="btn btn-primary btn-lg"
                    disabled={user?.plano === 'SUB'}
                  >
                    {user?.plano === 'SUB' ? (
                      <>
                        <Crown size={18} />
                        Plano Ativo
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        {plan.cta}
                      </>
                    )}
                  </Link>
                )}
              </div>
            </div>
          ))}
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

        <div className="faq">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Como funciona o teste grátis?</h4>
              <p>
                Ao criar sua conta, você tem 10 dias para testar todos os recursos premium. 
                Depois, você pode escolher fazer upgrade por R$ 40 ou continuar com acesso limitado.
              </p>
            </div>
            <div className="faq-item">
              <h4>O que está incluído no plano PRO?</h4>
              <p>
                Acesso por 2 meses a todos os templates premium, exportação HTML completa, 
                Auto Build com IA, portfólios ilimitados e link compartilhável.
              </p>
            </div>
            <div className="faq-item">
              <h4>Posso cancelar a qualquer momento?</h4>
              <p>
                Sim! O acesso é por 2 meses. 
                Não há mensalidades ou cobranças recorrentes.
              </p>
            </div>
            <div className="faq-item">
              <h4>Como funciona a exportação?</h4>
              <p>
                Você pode baixar seu portfólio como um arquivo HTML completo com CSS integrado. 
                Funciona em qualquer hospedagem, sem dependências.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shield = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default Planos;
