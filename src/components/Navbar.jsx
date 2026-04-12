import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { normalizePlanId, PLAN_IDS } from '../lib/plans';
import Mascot from './Mascot';
import { 
  Home, 
  Palette, 
  Layout, 
  Crown, 
  Settings,
  LogOut,
  Menu,
  User,
  Store
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, changeTheme, getThemeColors } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const themeColors = getThemeColors();

  const themes = [
    { id: 'azul', name: 'Desenvolvedor', color: '#3b82f6' },
    { id: 'roxo', name: 'Criativo', color: '#a855f7' },
    { id: 'vermelho', name: 'Hacker', color: '#ef4444' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">CPS</span>
          <span className="logo-badge">Studio</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <Home size={18} />
            <span>Início</span>
          </Link>
          <Link to="/studio" className="nav-link">
            <Layout size={18} />
            <span>Studio</span>
          </Link>
          <Link to="/templates" className="nav-link">
            <Palette size={18} />
            <span>Templates</span>
          </Link>
          <Link to="/marketplace" className="nav-link">
            <Store size={18} />
            <span>Marketplace</span>
          </Link>
          <Link to="/planos" className="nav-link">
            <Crown size={18} />
            <span>Planos</span>
          </Link>
          {isAuthenticated && (user?.plano === 'SUB' || user?.isAdmin) && (
            <Link to="/admin" className="nav-link">
              <Settings size={18} />
              <span>Admin</span>
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <div className="theme-selector">
            <button 
              className="theme-btn"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            >
              <div 
                className="theme-indicator" 
                style={{ background: themeColors.primary }}
              />
              <span>{themeColors.name}</span>
            </button>
            
            {themeMenuOpen && (
              <div className="theme-menu">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    className={`theme-option ${theme === t.id ? 'active' : ''}`}
                    onClick={() => {
                      changeTheme(t.id);
                      setThemeMenuOpen(false);
                    }}
                  >
                    <div className="theme-color" style={{ background: t.color }} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <User size={18} />
                <span>{user?.nome}</span>
                <span className={`plan-badge ${normalizePlanId(user?.plano).toLowerCase()}`}>
                  {normalizePlanId(user?.plano)}
                </span>
              </div>
              <button className="btn btn-ghost" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost">Entrar</Link>
              <Link to="/register" className="btn btn-primary">Cadastrar</Link>
            </div>
          )}

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Início</Link>
          <Link to="/studio" onClick={() => setMobileMenuOpen(false)}>Studio</Link>
          <Link to="/templates" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
          <Link to="/planos" onClick={() => setMobileMenuOpen(false)}>Planos</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Entrar</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Cadastrar</Link>
            </>
          )}
        </div>
      )}

      <Mascot />
    </nav>
  );
};

export default Navbar;
