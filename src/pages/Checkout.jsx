import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { useTheme } from '../context/ThemeContext';
import { 
  Check, 
  Crown, 
  Zap, 
  CreditCard,
  Lock,
  ArrowLeft,
  Shield
} from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, token, updateUser } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const [processando, setProcessando] = useState(false);
  const [etapa, setEtapa] = useState(1);

  const handlePurchase = async () => {
    setProcessando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await apiFetch('/api/users/upgrade', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
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

  if (user.plano === 'SUB') {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="already-pro">
            <Crown size={64} style={{ color: themeColors.primary }} />
            <h1>Você já é PRO!</h1>
            <p>Você tem acesso por 2 meses a todos os recursos premium.</p>
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
                <Zap size={16} />
                Checkout Seguro
              </div>
              <h1>Finalizar Compra</h1>
              <p>Você está adquirindo o plano PRO por 2 meses</p>
            </div>

            <div className="checkout-summary">
              <div className="summary-product">
                <div className="product-icon" style={{ background: themeColors.primary }}>
                  <Crown size={24} />
                </div>
                <div className="product-info">
                  <h3>Plano PRO</h3>
                  <p>Acesso por 2 meses</p>
                </div>
                <div className="product-price">
                  <span className="price">R$ 40</span>
                  <span className="one-time">pagamento único</span>
                </div>
              </div>

              <div className="summary-details">
                <div className="detail-row">
                  <span>Subtotal</span>
                  <span>R$ 40</span>
                </div>
                <div className="detail-row total">
                  <span>Total</span>
                  <span>R$ 40</span>
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
                  <span>Pagar em 4x de R$ 10 (sem juros)</span>
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
                    Pagar R$ 40
                  </>
                )}
              </button>

              <div className="security-note">
                <Shield size={16} />
                <span>Pagamento 100% seguro. Seus dados estão criptografados.</span>
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
            <p>Você agora é <strong>PRO</strong>!</p>
            <div className="success-benefits">
              <div className="benefit">
                <Check size={18} />
                <span>Acesso por 2 meses confirmado</span>
              </div>
              <div className="benefit">
                <Check size={18} />
                <span>Todos os templates liberados</span>
              </div>
              <div className="benefit">
                <Check size={18} />
                <span>IA e GitHub integrados</span>
              </div>
            </div>
            <Link to="/studio" className="btn btn-primary btn-lg">
              Criar meu Portfólio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
