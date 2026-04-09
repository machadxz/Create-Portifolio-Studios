import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Download, 
  Star, 
  ArrowLeft, 
  Clock,
  Eye,
  MessageSquare,
  User,
  Check,
  AlertCircle,
  Sparkles,
  Heart
} from 'lucide-react';
import './TemplateDetail.css';

const TemplateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getThemeColors } = useTheme();
  const { user, isAuthenticated, token } = useAuth();
  const themeColors = getThemeColors();

  const [template, setTemplate] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comentario: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/marketplace/templates/${id}`);
      if (!response.ok) {
        throw new Error('Template não encontrado');
      }
      const data = await response.json();
      setTemplate(data.template);
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Erro ao carregar template:', err);
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!template.gratuito && user?.plano !== 'SUB') {
      navigate('/planos');
      return;
    }

    setDownloading(true);
    try {
      await fetch(`/api/marketplace/templates/${id}/download`, { method: 'POST' });
      alert('Download iniciado! Em produção, o arquivo seria baixado.');
    } catch (err) {
      console.error('Erro ao baixar:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await fetch(`/api/marketplace/templates/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewForm)
      });

      if (response.ok) {
        const data = await response.json();
        setReviews([...reviews, data.review]);
        setReviewForm({ rating: 5, comentario: '' });
      }
    } catch (err) {
      console.error('Erro ao enviar avaliação:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="template-detail-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!template) return null;

  return (
    <div className="template-detail-page">
      <div className="container">
        <Link to="/marketplace" className="back-link">
          <ArrowLeft size={20} />
          Voltar ao Marketplace
        </Link>

        <div className="template-detail">
          <div className="template-preview-section">
            <div 
              className="template-preview-large"
              style={{ 
                background: template.categoria === 'Dev' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                           template.categoria === 'Designer' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                           template.categoria === 'Gamer' ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' :
                           'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <div className="preview-content-large">
                <div className="preview-avatar-large"></div>
                <div className="preview-name">{template.nome}</div>
                <div className="preview-bio">Seu portfólio profissional</div>
                <div className="preview-skills">
                  <span>Skill 1</span>
                  <span>Skill 2</span>
                  <span>Skill 3</span>
                </div>
              </div>
            </div>

            <div className="template-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <>Baixando...</>
                ) : template.gratuito ? (
                  <>
                    <Download size={20} />
                    Baixar Grátis
                  </>
                ) : user?.plano === 'SUB' ? (
                  <>
                    <Download size={20} />
                    Baixar Grátis (PRO)
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Comprar por R$ {template.preco}
                  </>
                )}
              </button>

              {!template.gratuito && user?.plano !== 'SUB' && (
                <Link to="/planos" className="btn btn-secondary btn-lg">
                  <Star size={20} />
                  Ver Planos PRO
                </Link>
              )}
            </div>
          </div>

          <div className="template-info-section">
            <div className="template-header">
              <div className="template-badges">
                <span className="categoria">{template.categoria}</span>
                {template.featured && <span className="featured">Destaque</span>}
              </div>
              <h1>{template.nome}</h1>
              <p className="descricao">{template.descricao}</p>
            </div>

            <div className="template-stats-grid">
              <div className="stat-card">
                <Star size={24} />
                <div className="stat-value">{template.rating.toFixed(1)}</div>
                <div className="stat-label">Avaliação</div>
              </div>
              <div className="stat-card">
                <Download size={24} />
                <div className="stat-value">{template.downloads}</div>
                <div className="stat-label">Downloads</div>
              </div>
              <div className="stat-card">
                <Eye size={24} />
                <div className="stat-value">{template.downloads * 2}</div>
                <div className="stat-label">Visualizações</div>
              </div>
              <div className="stat-card">
                <MessageSquare size={24} />
                <div className="stat-value">{reviews.length}</div>
                <div className="stat-label">Avaliações</div>
              </div>
            </div>

            <div className="template-creator-card">
              <User size={24} />
              <div className="creator-info">
                <span className="label">Criado por</span>
                <span className="nome">{template.creatorNome}</span>
              </div>
              <Link to={`/criador/${template.creatorId}`} className="btn btn-ghost">
                Ver Perfil
              </Link>
            </div>

            <div className="template-tags">
              <h3>Tags</h3>
              <div className="tags-list">
                {template.tags.map((tag, i) => (
                  <span key={i} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="reviews-section">
              <h3>Avaliações</h3>
              
              {isAuthenticated && (
                <form className="review-form" onSubmit={handleSubmitReview}>
                  <div className="rating-select">
                    <label>Sua avaliação:</label>
                    <div className="stars-input">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className={star <= reviewForm.rating ? 'star active' : 'star'}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        >
                          <Star size={24} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="input-field"
                    placeholder="Escreva sua avaliação..."
                    value={reviewForm.comentario}
                    onChange={(e) => setReviewForm({ ...reviewForm, comentario: e.target.value })}
                    rows={3}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submittingReview}
                  >
                    {submittingReview ? 'Enviando...' : 'Enviar Avaliação'}
                  </button>
                </form>
              )}

              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-user">
                          <div className="user-avatar">{review.userNome?.charAt(0)}</div>
                          <span className="user-name">{review.userNome}</span>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < review.rating ? '#f59e0b' : 'none'}
                              color="#f59e0b"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="review-comentario">{review.comentario}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-reviews">Nenhuma avaliação ainda. Seja o primeiro!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
