import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  User, 
  Download, 
  Star, 
  FileText, 
  Calendar,
  Grid,
  Trophy,
  TrendingUp
} from 'lucide-react';
import './Creator.css';

const Creator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCreator();
  }, [id]);

  const loadCreator = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/marketplace/creator/${id}`);
      if (!response.ok) {
        throw new Error('Criador não encontrado');
      }
      const data = await response.json();
      setCreator(data);
    } catch (err) {
      console.error('Erro ao carregar criador:', err);
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="creator-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!creator) return null;

  const badges = [];
  if (creator.stats.totalDownloads >= 1000) badges.push({ icon: Trophy, label: 'Top Creator', color: '#f59e0b' });
  if (creator.stats.totalTemplates >= 5) badges.push({ icon: Grid, label: 'Prolífico', color: '#a855f7' });
  if (creator.stats.mediaRating >= 4.5) badges.push({ icon: Star, label: 'Alta Avaliação', color: '#22c55e' });

  return (
    <div className="creator-page">
      <div className="container">
        <Link to="/marketplace" className="back-link">
          ← Voltar ao Marketplace
        </Link>

        <div className="creator-profile">
          <div className="creator-header">
            <div 
              className="creator-avatar"
              style={{ background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)` }}
            >
              {creator.creator?.nome?.charAt(0).toUpperCase()}
            </div>
            
            <div className="creator-info">
              <h1>{creator.creator?.nome}</h1>
              <p className="creator-email">{creator.creator?.email}</p>
              
              <div className="creator-badges">
                {badges.map((badge, i) => (
                  <span 
                    key={i} 
                    className="badge"
                    style={{ background: badge.color + '20', color: badge.color }}
                  >
                    <badge.icon size={14} />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="creator-stats">
            <div className="stat-item">
              <FileText size={24} />
              <div className="stat-value">{creator.stats?.totalTemplates || 0}</div>
              <div className="stat-label">Templates</div>
            </div>
            <div className="stat-item">
              <Download size={24} />
              <div className="stat-value">{creator.stats?.totalDownloads || 0}</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-item">
              <Star size={24} />
              <div className="stat-value">{(creator.stats?.mediaRating || 0).toFixed(1)}</div>
              <div className="stat-label">Avaliação Média</div>
            </div>
            <div className="stat-item">
              <TrendingUp size={24} />
              <div className="stat-value">R$ {creator.stats?.totalVendas || 0}</div>
              <div className="stat-label">Vendas</div>
            </div>
          </div>

          <div className="creator-templates">
            <h2>Templates de {creator.creator?.nome}</h2>
            
            {creator.templates?.length > 0 ? (
              <div className="templates-grid">
                {creator.templates.map(template => (
                  <Link to={`/template/${template.id}`} key={template.id} className="template-card">
                    <div 
                      className="template-preview"
                      style={{ 
                        background: template.categoria === 'Dev' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                                   template.categoria === 'Designer' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                                   template.categoria === 'Gamer' ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' :
                                   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      <div className="preview-content">
                        <div className="preview-avatar"></div>
                        <div className="preview-line"></div>
                      </div>
                    </div>
                    
                    <div className="template-info">
                      <h3>{template.nome}</h3>
                      <p>{template.descricao}</p>
                      
                      <div className="template-meta">
                        <span className="categoria">{template.categoria}</span>
                        {template.gratuito ? (
                          <span className="preco gratis">Grátis</span>
                        ) : (
                          <span className="preco pago">R$ {template.preco}</span>
                        )}
                      </div>
                      
                      <div className="template-stats">
                        <span><Star size={14} /> {template.rating.toFixed(1)}</span>
                        <span><Download size={14} /> {template.downloads}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-templates">
                <p>Este criador ainda não publicou templates.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
