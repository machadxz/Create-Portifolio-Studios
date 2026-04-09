import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiFetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const text = await response.text();
      if (!text) {
        throw new Error('Servidor não está respondendo. Inicie o backend.');
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      login(data.user, data.token);
      navigate('/studio');
    } catch (err) {
      if (err.message.includes('JSON')) {
        setError('Backend não está rodando. Execute: cd backend && npm run dev');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-gradient" style={{ background: `radial-gradient(circle at 30% 50%, ${themeColors.glow} 0%, transparent 50%)` }} />
      </div>
      
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Bem-vindo de volta</h1>
            <p>Entre para continuar criando seu portfólio</p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Email</label>
              <div className="input-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Senha</label>
              <div className="input-icon">
                <Lock size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="input-field"
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
