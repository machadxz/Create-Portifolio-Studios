import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Upload, 
  Image, 
  DollarSign, 
  Tag,
  FileText,
  Folder,
  Eye,
  Send,
  AlertCircle,
  Check
} from 'lucide-react';
import './PublishTemplate.css';

const PublishTemplate = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    tags: '',
    gratuito: true,
    preco: 0,
    preview: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!formData.nome || !formData.descricao || !formData.categoria) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    setEnviando(true);
    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        categoria: formData.categoria,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        gratuito: formData.gratuito,
        preco: formData.gratuito ? 0 : parseFloat(formData.preco) || 0,
        preview: formData.preview
      };

      const response = await fetch('/api/marketplace/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSucesso(true);
        setTimeout(() => navigate('/marketplace'), 2000);
      } else {
        setErro(data.error || 'Erro ao enviar template');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor');
    } finally {
      setEnviando(false);
    }
  };

  const categorias = [
    { id: 'Dev', label: 'Desenvolvedor' },
    { id: 'Designer', label: 'Designer' },
    { id: 'Gamer', label: 'Gamer' },
    { id: 'Influencer', label: 'Influencer' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Fotografo', label: 'Fotógrafo' },
    { id: 'Musico', label: 'Músico' },
    { id: 'Escritor', label: 'Escritor' }
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="publish-template-page">
      <div className="container">
        <div className="publish-header">
          <h1>
            <Upload size={32} style={{ color: themeColors.primary }} />
            Enviar Template
          </h1>
          <p>Compartilhe seu template com a comunidade</p>
        </div>

        {sucesso ? (
          <div className="success-message">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h2>Template Enviado!</h2>
            <p>Seu template está em análise e em breve estará no marketplace.</p>
            <Link to="/marketplace" className="btn btn-primary">
              Voltar ao Marketplace
            </Link>
          </div>
        ) : (
          <form className="publish-form" onSubmit={handleSubmit}>
            {erro && (
              <div className="error-message">
                <AlertCircle size={18} />
                {erro}
              </div>
            )}

            <div className="form-section">
              <h3><FileText size={20} /> Informações do Template</h3>
              
              <div className="input-group">
                <label>Nome do Template *</label>
                <input
                  type="text"
                  name="nome"
                  className="input-field"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Minimal Pro Portfolio"
                  required
                />
              </div>

              <div className="input-group">
                <label>Descrição *</label>
                <textarea
                  name="descricao"
                  className="input-field"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descreva seu template..."
                  rows={4}
                  required
                />
              </div>

              <div className="input-group">
                <label>Categoria *</label>
                <select
                  name="categoria"
                  className="input-field"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Tags</label>
                <input
                  type="text"
                  name="tags"
                  className="input-field"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Ex: dark, neon, cyberpunk (separadas por vírgula)"
                />
                <span className="help-text">Separe as tags por vírgula</span>
              </div>
            </div>

            <div className="form-section">
              <h3><Image size={20} /> Preview</h3>
              
              <div className="input-group">
                <label>URL da Imagem de Preview</label>
                <input
                  type="url"
                  name="preview"
                  className="input-field"
                  value={formData.preview}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/preview.png"
                />
                <span className="help-text">Cole o link de uma imagem que represente seu template</span>
              </div>

              <div className="preview-preview">
                <div className="preview-placeholder">
                  {formData.preview ? (
                    <img src={formData.preview} alt="Preview" />
                  ) : (
                    <>
                      <Image size={48} />
                      <span>Preview aparecerá aqui</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><DollarSign size={20} /> Preço</h3>
              
              <div className="price-options">
                <label className={`price-option ${formData.gratuito ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="gratuito"
                    checked={formData.gratuito === true}
                    onChange={() => setFormData({ ...formData, gratuito: true, preco: 0 })}
                  />
                  <div className="option-content">
                    <Tag size={24} />
                    <span className="option-title">Grátis</span>
                    <span className="option-desc">Disponível para todos</span>
                  </div>
                </label>

                <label className={`price-option ${!formData.gratuito ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="gratuito"
                    checked={formData.gratuito === false}
                    onChange={() => setFormData({ ...formData, gratuito: false })}
                  />
                  <div className="option-content">
                    <DollarSign size={24} />
                    <span className="option-title">Pago</span>
                    <span className="option-desc">Monetize seu trabalho</span>
                  </div>
                </label>
              </div>

              {!formData.gratuito && (
                <div className="input-group">
                  <label>Preço (R$)</label>
                  <input
                    type="number"
                    name="preco"
                    className="input-field"
                    value={formData.preco}
                    onChange={handleChange}
                    placeholder="Ex: 15"
                    min="1"
                    max="100"
                  />
                </div>
              )}
            </div>

            <div className="form-actions">
              <Link to="/marketplace" className="btn btn-secondary">
                Cancelar
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={enviando}
              >
                {enviando ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar para Análise
                  </>
                )}
              </button>
            </div>

            <div className="moderation-notice">
              <AlertCircle size={16} />
              <span>Seu template será revisado pela moderação antes de publicado.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PublishTemplate;
