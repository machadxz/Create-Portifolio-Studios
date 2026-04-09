import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Download, 
  Shield, 
  Clock,
  ArrowRight,
  Star,
  Rocket,
  Users
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const { getThemeColors } = useTheme();
  const { isAuthenticated, user, getDaysLeft } = useAuth();
  const themeColors = getThemeColors();

  const features = [
    {
      icon: <Sparkles size={32} />,
      title: 'Criação Inteligente',
      description: 'Deixe a IA criar seu portfólio automaticamente baseado nas suas informações.'
    },
    {
      icon: <Palette size={32} />,
      title: 'Temas Dinâmicos',
      description: 'Escolha entre azul, roxo ou vermelho. Cada tema tem sua própria personalidade.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Preview em Tempo Real',
      description: 'Veja as mudanças instantaneamente enquanto edita seu portfólio.'
    },
    {
      icon: <Download size={32} />,
      title: 'Exportação Fácil',
      description: 'Baixe seu portfólio em HTML/CSS ou compartilhe via link público.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Seguro & Privado',
      description: 'Seus dados estão protegidos. Você controla quem vê seu trabalho.'
    },
    {
      icon: <Clock size={32} />,
      title: '10 Dias Grátis',
      description: 'Teste todos os recursos premium durante 10 dias sem compromisso.'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Portfólios Criados' },
    { value: '4.9', label: 'Avaliação Média' },
    { value: '99%', label: 'Satisfação' },
    { value: '24/7', label: 'Suporte' }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" style={{ background: `radial-gradient(circle at 50% 0%, ${themeColors.glow} 0%, transparent 50%)` }} />
          <div className="hero-grid" />
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={16} />
              <span>Novo: Auto Build com IA</span>
            </div>
            
            <h1 className="hero-title">
              Crie seu portfólio<br />
              <span className="gradient-text">em minutos.</span><br />
              Impressione por <span className="gradient-text">anos.</span>
            </h1>
            
            <p className="hero-description">
              A plataforma mais moderna para criar portfólios profissionais. 
              Sem código, sem complicação. Apenas resultado.
            </p>

            <div className="hero-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/studio" className="btn btn-primary btn-lg">
                    <Rocket size={20} />
                    Ir para Studio
                    <ArrowRight size={20} />
                  </Link>
                  {user?.plano === 'FREE' && (
                    <div className="trial-notice">
                      <Clock size={16} />
                      <span>{getDaysLeft()} dias restantes no teste</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Começar Grátis
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/templates" className="btn btn-secondary btn-lg">
                    Ver Templates
                  </Link>
                </>
              )}
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-url">seuportfolio.cps.studio</div>
              </div>
              <div className="preview-content">
                <div className="preview-sidebar">
                  <div className="preview-avatar"></div>
                  <div className="preview-name"></div>
                  <div className="preview-bio"></div>
                  <div className="preview-skills">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="preview-projects">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="preview-project"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Tudo que você precisa para <span className="gradient-text">destacar</span></h2>
            <p>Ferramentas poderosas, interface intuitiva, resultados impressionantes.</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon" style={{ color: themeColors.primary }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Pronto para criar algo incrível?</h2>
              <p>Junte-se a milhares de profissionais que já estão destacando seus trabalhos.</p>
              <Link to="/register" className="btn btn-primary btn-lg">
                <Users size={20} />
                Começar Agora
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="cta-glow" style={{ background: themeColors.glow }} />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">CPS</span>
              <p>Create Portfolio Studio</p>
            </div>
            <div className="footer-links">
              <Link to="/templates">Templates</Link>
              <Link to="/planos">Planos</Link>
              <Link to="/login">Entrar</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 CPS Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
