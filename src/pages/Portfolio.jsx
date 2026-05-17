import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Linkedin, Globe, Mail, ExternalLink, ChevronLeft, Briefcase, Code, User, Sparkles } from 'lucide-react';
import './Portfolio.css';

const PortfolioPublic = () => {
  const { username } = useParams();
  
  const themeColors = {
    azul: { primary: '#3b82f6', secondary: '#60a5fa', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' },
    roxo: { primary: '#a855f7', secondary: '#c084fc', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' },
    vermelho: { primary: '#ef4444', secondary: '#f87171', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' },
    verde: { primary: '#22c55e', secondary: '#4ade80', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' },
    laranja: { primary: '#f97316', secondary: '#fb923c', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' }
  };

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [colors, setColors] = useState(themeColors.azul);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolio/${username}`);
        if (!response.ok) {
          throw new Error('Portfólio não encontrado');
        }
        const data = await response.json();
        setPortfolio(data.portfolio);
        setColors(themeColors[data.portfolio?.tema] || themeColors.azul);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPortfolio();
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      }).catch(() => {});
    }
  }, [username]);

  if (loading) {
    return (
      <div className="portfolio-loading">
        <div className="loading-spinner"></div>
        <p>Carregando portfólio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-error">
        <h1>Ops! 😢</h1>
        <p>{error}</p>
        <a href="/" className="btn btn-primary">Voltar ao início</a>
      </div>
    );
  }

  const templateClasses = {
    moderno: 'template-moderno',
    futurista: 'template-futurista',
    minimalista: 'template-minimalista',
    hacker: 'template-hacker',
    gradient: 'template-gradient',
    glass: 'template-glass'
  };

  return (
    <div className={`portfolio-public ${templateClasses[portfolio?.template || 'moderno']}`} style={{ background: colors.bg }}>
      <div className="portfolio-container">
        <header className="portfolio-header">
          <div className="profile-section">
            <div 
              className="avatar" 
              style={portfolio?.avatar ? { 
                backgroundImage: `url(${portfolio.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: `0 0 40px ${colors.primary}40`
              } : { 
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                boxShadow: `0 0 40px ${colors.primary}40`
              }}
            >
              {!portfolio?.avatar && portfolio?.nome?.charAt(0).toUpperCase()}
            </div>
            <h1 style={{ color: colors.text }}>{portfolio?.nome || 'Meu Portfólio'}</h1>
            <p className="bio" style={{ color: colors.textSecondary }}>{portfolio?.bio || 'Bem-vindo ao meu portfólio!'}</p>
            
            <div className="social-links">
              {portfolio?.github && (
                <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="social-link" style={{ '--theme-color': colors.primary }}>
                  <Github size={20} />
                </a>
              )}
              {portfolio?.linkedin && (
                <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" style={{ '--theme-color': colors.primary }}>
                  <Linkedin size={20} />
                </a>
              )}
              {portfolio?.site && (
                <a href={portfolio.site} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Globe size={20} />
                </a>
              )}
              {portfolio?.email && (
                <a href={`mailto:${portfolio.email}`} className="social-link">
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </header>

        {!recruiterMode && (
          <section className="portfolio-section">
            <h2 className="section-title" style={{ color: colors.primary }}>
              <Code size={20} />
              Skills
            </h2>
            <div className="skills-grid">
              {(portfolio?.skills || []).map((skill, index) => (
                <span key={index} className="skill-tag" style={{ borderColor: colors.primary, color: colors.text, ['--theme-color']: colors.primary }}>
                  {skill}
                </span>
              ))}
              {(!portfolio?.skills || portfolio.skills.length === 0) && (
                <p style={{ color: colors.textSecondary }}>Nenhuma skill adicionada ainda.</p>
              )}
            </div>
          </section>
        )}

        <section className="portfolio-section">
          <h2 className="section-title" style={{ color: colors.primary }}>
            <Briefcase size={20} />
            Projetos
          </h2>
          <div className="projects-grid">
            {(portfolio?.projetos || []).map((project, index) => (
              <div key={index} className="project-card" style={{ borderColor: colors.primary, ['--theme-color']: colors.primary }}>
                <h3 style={{ color: colors.text }}>{project.titulo}</h3>
                <p style={{ color: colors.textSecondary }}>{project.descricao}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: colors.primary }}>
                    Ver projeto <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
            {(!portfolio?.projetos || portfolio.projetos.length === 0) && (
              <p style={{ color: colors.textSecondary }}>Nenhum projeto adicionado ainda.</p>
            )}
          </div>
        </section>

        {recruiterMode && (
          <section className="portfolio-section">
            <h2 className="section-title" style={{ color: colors.primary }}>
              <User size={20} />
              Experiência
            </h2>
            <div className="experience-list">
              {portfolio?.experiencia?.map((exp, index) => (
                <div key={index} className="experience-item" style={{ borderColor: colors.primary, ['--theme-color']: colors.primary }}>
                  <h3 style={{ color: colors.text }}>{exp.cargo}</h3>
                  <p style={{ color: colors.textSecondary }}>{exp.empresa}</p>
                  <span style={{ color: colors.textSecondary }}>{exp.periodo}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="portfolio-footer" style={{ borderColor: colors.primary }}>
          <p style={{ color: colors.textSecondary }}>
            Criado com <span style={{ color: colors.primary }}>CPS</span> - Create Portfolio Studio
          </p>
          <button 
            className="recruiter-toggle"
            onClick={() => setRecruiterMode(!recruiterMode)}
            style={{ background: colors.primary }}
          >
            <Sparkles size={16} />
            {recruiterMode ? 'Ver versão completa' : 'Modo Recrutador'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioPublic;
