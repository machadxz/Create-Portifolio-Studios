import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { Eye, Check, Sparkles } from 'lucide-react';
import './Templates.css';

const Templates = () => {
  const navigate = useNavigate();
  const { getThemeColors } = useTheme();
  const { isAuthenticated } = useAuth();
  const themeColors = getThemeColors();
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleApplyTemplate = async () => {
    if (!selectedTemplate) return;
    
    const token = localStorage.getItem('cps-token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    setApplying(true);
    setMessage(null);
    
    try {
      const response = await apiFetch('/api/portfolios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar portfólio');
      }
      
      const data = await response.json();
      const existingPortfolio = data.portfolios?.[0];
      
      if (existingPortfolio) {
        const updateResponse = await fetch(`/api/portfolios/${existingPortfolio.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ...existingPortfolio, template: selectedTemplate })
        });
        
        if (!updateResponse.ok) {
          throw new Error('Erro ao atualizar template');
        }
      } else {
        const createResponse = await apiFetch('/api/portfolios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ template: selectedTemplate, nome: '', bio: '', skills: [], projetos: [] })
        });
        
        if (!createResponse.ok) {
          throw new Error('Erro ao criar portfólio');
        }
      }
      
      setMessage({ type: 'success', text: 'Template aplicado com sucesso!' });
      setTimeout(() => navigate('/studio'), 1000);
      
    } catch (err) {
      console.error('Erro ao aplicar template:', err);
      setMessage({ type: 'error', text: 'Erro ao aplicar template. Tente novamente.' });
    } finally {
      setApplying(false);
    }
  };

  const templates = [
    {
      id: 'moderno',
      name: 'Moderno',
      description: 'Design limpo e profissional com gradientes suaves',
      preview: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        layout: 'card'
      }
    },
    {
      id: 'futurista',
      name: 'Futurista',
      description: 'Visual cyberpunk com neons e efeitos de luz',
      preview: {
        bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        layout: 'grid'
      }
    },
    {
      id: 'minimalista',
      name: 'Minimalista',
      description: 'Simples e elegante com foco no conteúdo',
      preview: {
        bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        layout: 'list'
      }
    },
    {
      id: 'hacker',
      name: 'Hacker',
      description: 'Estilo terminal dark com elementos tech',
      preview: {
        bg: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #1a1a1a 100%)',
        layout: 'terminal'
      }
    },
    {
      id: 'gradient',
      name: 'Gradient Pro',
      description: 'Transições de cores vibrantes e dynamic',
      preview: {
        bg: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
        layout: 'showcase'
      }
    },
    {
      id: 'glass',
      name: 'Glass Morphism',
      description: 'Efeito de vidro fosco com transparência',
      preview: {
        bg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        layout: 'glass'
      }
    }
  ];

  return (
    <div className="templates-page">
      <div className="container">
        <div className="page-header">
          <h1>Templates</h1>
          <p>Escolha o template perfeito para o seu portfólio</p>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="template-preview">
                <div 
                  className="template-bg"
                  style={{ background: template.preview.bg }}
                >
                  <div className="template-content">
                    {template.preview.layout === 'card' && (
                      <>
                        <div className="preview-circle"></div>
                        <div className="preview-line long"></div>
                        <div className="preview-line medium"></div>
                        <div className="preview-tags">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </>
                    )}
                    {template.preview.layout === 'grid' && (
                      <>
                        <div className="preview-grid">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </>
                    )}
                    {template.preview.layout === 'list' && (
                      <>
                        <div className="preview-list">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </>
                    )}
                    {template.preview.layout === 'terminal' && (
                      <>
                        <div className="preview-terminal">
                          <div className="terminal-header">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="terminal-content">
                            <div className="terminal-line">$ ./portfolio.sh</div>
                            <div className="terminal-line blink">_</div>
                          </div>
                        </div>
                      </>
                    )}
                    {template.preview.layout === 'showcase' && (
                      <>
                        <div className="preview-showcase">
                          <div className="showcase-main"></div>
                          <div className="showcase-side">
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      </>
                    )}
                    {template.preview.layout === 'glass' && (
                      <>
                        <div className="preview-glass">
                          <div className="glass-card">
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>

              {selectedTemplate === template.id && (
                <div className="template-selected">
                  <Check size={20} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="templates-cta">
          {message && (
            <p className={message.type === 'success' ? 'text-success' : 'text-error'}>
              {message.text}
            </p>
          )}
          {!message && <p>Template selecionado: <strong>{selectedTemplate || 'Nenhum'}</strong></p>}
          <button 
            className="btn btn-primary btn-lg"
            disabled={!selectedTemplate || applying}
            onClick={handleApplyTemplate}
          >
            <Sparkles size={20} />
            {applying ? 'Aplicando...' : 'Aplicar Template'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
