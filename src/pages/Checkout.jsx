import React, { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { normalizePlanId, PLAN_IDS, PLAN_CONFIG } from '../lib/plans';
import { useTheme } from '../context/ThemeContext';
import { 
  Check, 
  Crown, 
  TrendingUp,
  DollarSign,
  Building2,
  CreditCard,
  Lock,
  ArrowLeft,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import './Checkout.css';

const iconMap = {
  [PLAN_IDS.FREE]: Sparkles,
  [PLAN_IDS.STARTER]: Crown,
  [PLAN_IDS.GROWTH]: TrendingUp,
  [PLAN_IDS.REVENUE]: DollarSign,
  [PLAN_IDS.EMPIRE]: Building2
};

const Checkout = () => {
  const navigate = useNavigate();
  const { user, token, updateUser } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const [processando, setProcessando] = useState(false);
  const [etapa, setEtapa] = useState(1);

  const selectedPlan = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return normalizePlanId(params.get('plan'));
  }, []);

  const checkoutPlan = PLAN_CONFIG[selectedPlan] || PLAN_CONFIG[PLAN_IDS.STARTER];
  const Icon = iconMap[checkoutPlan.id] || Crown;

  const handlePurchase = async () => {
    setProcessando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await apiFetch('/api/users/upgrade', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ plan: checkoutPlan.id })
      });
      
      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
        setEtapa(3);
      }
    } catch (err) {
      console.error('Erro ao processar:', err);
    } finally {
      setProcessando(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const currentPlan = normalizePlanId(user?.plano);
  const currentPlanIndex = ['FREE', 'STARTER', 'GROWTH', 'REVENUE', 'EMPIRE'].indexOf(currentPlan);
  const selectedPlanIndex = ['FREE', 'STARTER', 'GROWTH', 'REVENUE', 'EMPIRE'].indexOf(checkoutPlan.id);

  if (currentPlanIndex >= selectedPlanIndex) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="already-pro">
            <Icon size={64} style={{ color: themeColors.primary }} />
            <h1>Você já possui este plano!</h1>
            <p>Você já tem acesso ao plano {checkoutPlan.name}.</p>
            <Link to="/studio" className="btn btn-primary btn-lg">
              Ir para o Studio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <Link to="/planos" className="back-link">
          <ArrowLeft size={20} />
          Voltar aos planos
        </Link>

        {etapa === 1 && (
          <div className="checkout-content">
            <div className="checkout-header">
              <div className="checkout-badge">
                <Shield size={16} />
                Checkout Seguro
              </div>
              <h1>Finalizar Assinatura</h1>
              <p>Assinatura mensal do plano {checkoutPlan.name}</p>
            </div>

            <div className="checkout-summary">
              <div className="summary-product">
                <div className="product-icon" style={{ background: themeColors.primary }}>
                  <Icon size={24} />
                </div>
                <div className="product-info">
                  <h3>Plano {checkoutPlan.name}</h3>
                  <p>{checkoutPlan.goal}</p>
                </div>
                <div className="product-price">
                  <span className="price">{checkoutPlan.priceLabel}</span>
                  <span className="one-time">{checkoutPlan.period}</span>
                </div>
              </div>

              <div className="summary-details">
                <div className="detail-row">
                  <span>Plano mensal</span>
                  <span>R$ {checkoutPlan.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="detail-row total">
                  <span>Total mensal</span>
                  <span>R$ {checkoutPlan.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            <div className="payment-section">
              <h3><CreditCard size={20} /> Pagamento</h3>
              
              <div className="payment-methods">
                <button className="method-card active">
                  <CreditCard size={20} />
                  Cartão de Crédito
                </button>
              </div>

              <div className="card-form">
                <div className="input-group">
                  <label>Número do cartão</label>
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Validade</label>
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div className="input-group">
                    <label>CVC</label>
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Nome do titular</label>
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="Nome completo"
                  />
                </div>
              </div>

              <div className="installment-option">
                <label>
                  <input type="checkbox" />
                  <span>Pagar mensalmente (renovação automática)</span>
                </label>
              </div>

              <button 
                className="btn btn-primary btn-lg btn-full"
                onClick={handlePurchase}
                disabled={processando}
              >
                {processando ? (
                  <>Processando...</>
                ) : (
                  <>
                    <Lock size={18} />
                    Assinar por {checkoutPlan.priceLabel}/mês
                  </>
                )}
              </button>

              <div className="security-note">
                <Shield size={16} />
                <span>Pagamento 100% seguro. Cancele quando quiser.</span>
              </div>
            </div>
          </div>
        )}

        {etapa === 3 && (
          <div className="success-content">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h1>Parabéns! 🎉</h1>
            <p>Você agora é <strong>{checkoutPlan.name}</strong>!</p>
            <div className="success-benefits">
              <div className="benefit">
                <Check size={18} />
                <span>Assinatura mensal ativa</span>
              </div>
              <div className="benefit">
                <Check size={18} />
                <span>{checkoutPlan.goal}</span>
              </div>
              <div className="benefit">
                <Check size={18} />
                <span>Todas as ferramentas liberadas</span>
              </div>
            </div>
            <Link to="/studio" className="btn btn-primary btn-lg">
              Começar a usar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;