import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  Download, 
  Star, 
  Crown,
  TrendingUp,
  Clock,
  Grid,
  List,
  Eye,
  Tag,
  Sparkles
} from 'lucide-react';
import './Marketplace.css';

const Marketplace = () => {
  const { getThemeColors, theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const themeColors = getThemeColors();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('all');
  const [gratuito, setGratuito] = useState('');
  const [ordenar, setOrdenar] = useState('populares');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    loadTemplates();
  }, [categoria, gratuito, ordenar]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoria !== 'all') params.append('categoria', categoria);
      if (gratuito) params.append('gratuito', gratuito);
      if (busca) params.append('busca', busca);
      params.append('ordenar', ordenar);

      const response = await fetch(`/api/marketplace/templates?${params}`);
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (err) {
      console.error('Erro ao carregar templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadTemplates();
  };

  const categorias = ['all', 'Dev', 'Designer', 'Gamer', 'Influencer', 'Marketing', 'Fotografo'];

  const coresCategoria = {
    Dev: '#3b82f6',
    Designer: '#a855f7',
    Gamer: '#ef4444',
    Influencer: '#f59e0b',
    Marketing: '#22c55e',
    Fotografo: '#06b6d4'
  };

  return (
    <div className="marketplace-page">
      <div className="container">
        <div className="marketplace-header">
          <div className="header-content">
            <h1>
              <Sparkles size={32} style={{ color: themeColors.primary }} />
              Marketplace de Templates
            </h1>
            <p>Descubra, compartilhe e monetize templates de portfólio</p>
          </div>

          <form className="search-bar" onSubmit={handleSearch}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar templates..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </form>
        </div>

        <div className="marketplace-filters">
          <div className="filters-left">
            <div className="filter-group">
              <Filter size={18} />
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Todas as Categorias' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select value={gratuito} onChange={(e) => setGratuito(e.target.value)}>
                <option value="">Todos</option>
                <option value="true">Gratuitos</option>
                <option value="false">Pagos</option>
              </select>
            </div>

            <div className="filter-group">
              <select value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
                <option value="populares">Mais Populares</option>
                <option value="recentes">Mais Recentes</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>

          <div className="filters-right">
            <div className="view-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
                <Grid size={18} />
              </button>
              <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
                <List size={18} />
              </button>
            </div>

            {isAuthenticated && (
              <Link to="/publicar-template" className="btn btn-primary">
                <Sparkles size={18} />
                Enviar Template
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        ) : (
          <>
            <div className={`templates-${viewMode}`}>
              {templates.map(template => (
                <Link to={`/template/${template.id}`} key={template.id} className="template-card">
                  {template.featured && (
                    <div className="featured-badge">
                      <Sparkles size={12} />
                      Destaque
                    </div>
                  )}
                  
                  <div className="template-preview">
                    <div 
                      className="preview-bg"
                      style={{ 
                        background: template.categoria === 'Dev' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                                   template.categoria === 'Designer' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                                   template.categoria === 'Gamer' ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' :
                                   template.categoria === 'Influencer' ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' :
                                   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      <div className="preview-content">
                        <div className="preview-avatar"></div>
                        <div className="preview-line"></div>
                        <div className="preview-line short"></div>
                      </div>
                    </div>
                  </div>

                  <div className="template-info">
                    <div className="template-meta">
                      <span 
                        className="categoria-badge"
                        style={{ background: coresCategoria[template.categoria] + '20', color: coresCategoria[template.categoria] }}
                      >
                        {template.categoria}
                      </span>
                      {template.gratuito ? (
                        <span className="price-badge gratis">Grátis</span>
                      ) : (
                        <span className="price-badge pago">R$ {template.preco}</span>
                      )}
                    </div>

                    <h3>{template.nome}</h3>
                    <p className="descricao">{template.descricao}</p>

                    <div className="template-stats">
                      <div className="stat">
                        <Star size={14} />
                        <span>{template.rating.toFixed(1)}</span>
                      </div>
                      <div className="stat">
                        <Download size={14} />
                        <span>{template.downloads}</span>
                      </div>
                      <div className="stat">
                        <Eye size={14} />
                        <span>{template.downloads * 2}</span>
                      </div>
                    </div>

                    <div className="template-creator">
                      <div className="creator-avatar">{template.creatorNome?.charAt(0)}</div>
                      <span>por {template.creatorNome}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {templates.length === 0 && (
              <div className="no-results">
                <Search size={48} />
                <h3>Nenhum template encontrado</h3>
                <p>Tente buscar com outros termos ou filtros</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
