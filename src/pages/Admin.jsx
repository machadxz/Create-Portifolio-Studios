import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { apiFetch } from '../lib/api';
import { 
  Users, Crown, BarChart3, FolderOpen, Settings, FileText,
  RefreshCw, Check, X, AlertCircle, Eye, Trash2, Edit,
  Package, MessageSquare, TrendingUp, Shield, Download,
  Search, Filter, MoreVertical, Clock, Star, Activity
} from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const [stats, setStats] = useState({ users: { total: 0, free: 0, sub: 0, expired: 0 }, portfolios: { total: 0 } });
  const [users, setUsers] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [isAuthenticated, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      console.log('1. Carregando stats...');
      const statsRes = await apiFetch('/api/admin/stats', { headers });
      const statsData = statsRes.ok ? await statsRes.json() : { stats: {} };
      console.log('   stats status:', statsRes.status, 'data:', statsData);
      setStats(statsData.stats || {});
      
      console.log('2. Carregando users...');
      const usersRes = await apiFetch('/api/admin/users', { headers });
      const usersData = usersRes.ok ? await usersRes.json() : { users: [] };
      console.log('   users status:', usersRes.status, 'data:', usersData);
      setUsers(usersData.users || []);
      
      console.log('3. Carregando settings...');
      const settingsRes = await apiFetch('/api/admin/settings', { headers });
      const settingsData = settingsRes.ok ? await settingsRes.json() : { settings: {} };
      console.log('   settings status:', settingsRes.status, 'data:', settingsData);
      setSettings(settingsData.settings || {});
      
      console.log('4. Carregando portfolios...');
      const portfoliosRes = await apiFetch('/api/admin/portfolios', { headers });
      const portfoliosData = portfoliosRes.ok ? await portfoliosRes.json() : { portfolios: [] };
      setPortfolios(portfoliosData.portfolios || []);
      
      console.log('5. Carregando templates...');
      const templatesRes = await apiFetch('/api/admin/templates', { headers });
      const templatesData = templatesRes.ok ? await templatesRes.json() : { templates: [] };
      setTemplates(templatesData.templates || []);
      
      console.log('6. Carregando analytics...');
      const analyticsRes = await apiFetch('/api/admin/analytics', { headers });
      const analyticsData = analyticsRes.ok ? await analyticsRes.json() : { analytics: null };
      setAnalytics(analyticsData.analytics);
      
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserPlan = async (uid, plano) => {
    try {
      await fetch(`/api/admin/users/${uid}/plan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plano })
      });
      loadData();
    } catch (err) {
      console.error('Erro ao atualizar plano:', err);
    }
  };

  const deleteUser = async (uid) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    try {
      await fetch(`/api/admin/users/${uid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadData();
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
    }
  };

  const deletePortfolio = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este portfólio?')) return;
    try {
      await fetch(`/api/admin/portfolios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadData();
    } catch (err) {
      console.error('Erro ao deletar portfólio:', err);
    }
  };

  const approveTemplate = async (id, featured) => {
    try {
      await fetch(`/api/admin/templates/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ featured })
      });
      loadData();
    } catch (err) {
      console.error('Erro ao aprobar template:', err);
    }
  };

  const rejectTemplate = async (id) => {
    try {
      await fetch(`/api/admin/templates/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason: 'Não atende aos padrões' })
      });
      loadData();
    } catch (err) {
      console.error('Erro ao rejeitar template:', err);
    }
  };

  const deleteTemplate = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este template?')) return;
    try {
      await fetch(`/api/admin/templates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadData();
    } catch (err) {
      console.error('Erro ao deletar template:', err);
    }
  };

  const saveSettings = async (newSettings) => {
    console.log('Salvando configurações:', newSettings);
    try {
      const res = await apiFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      console.log('Resposta do servidor:', res.status, data);
      if (res.ok) {
        setSettings(newSettings);
        setTimeout(() => loadData(), 100);
        alert('Configurações salvas com sucesso!');
      } else {
        alert('Erro: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (err) {
      console.error('Erro ao salvar configurações:', err);
      alert('Erro ao salvar configurações');
    }
  };

  const filteredUsers = users.filter(u => 
    u.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPortfolios = portfolios.filter(p => 
    p.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = templates.filter(t => 
    t.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.creatorNome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'portfolios', label: 'Portfólios', icon: FolderOpen },
    { id: 'templates', label: 'Templates', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        <RefreshCw className="spin" size={32} />
        <span>Carregando painel admin...</span>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-content">
            <h1>Painel Admin</h1>
            <p>Gerencie toda a plataforma CPS</p>
          </div>
          <button className="btn btn-primary" onClick={loadData}>
            <RefreshCw size={18} />
            Atualizar
          </button>
        </div>

        <div className="admin-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <div className="stats-grid">
                <div className="stat-card large">
                  <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                    <Users size={32} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.users?.total || 0}</span>
                    <span className="stat-label">Total de Usuários</span>
                    <span className="stat-trend positive">+12% este mês</span>
                  </div>
                </div>

                <div className="stat-card large">
                  <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                    <Crown size={32} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.users?.sub || 0}</span>
                    <span className="stat-label">Assinantes PRO</span>
                    <span className="stat-trend positive">+5% este mês</span>
                  </div>
                </div>

                <div className="stat-card large">
                  <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                    <FolderOpen size={32} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.portfolios?.total || 0}</span>
                    <span className="stat-label">Portfólios Criados</span>
                  </div>
                </div>

                <div className="stat-card large">
                  <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                    <Package size={32} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{templates.length}</span>
                    <span className="stat-label">Templates no Marketplace</span>
                  </div>
                </div>
              </div>

              {analytics && (
                <div className="analytics-summary">
                  <h3>Resumo Analytics</h3>
                  <div className="analytics-stats">
                    <div className="analytics-stat">
                      <Eye size={20} />
                      <span className="value">{analytics.totalVisualizacoes?.toLocaleString()}</span>
                      <span className="label">Visualizações</span>
                    </div>
                    <div className="analytics-stat">
                      <Users size={20} />
                      <span className="value">{analytics.totalVisitantes?.toLocaleString()}</span>
                      <span className="label">Visitantes</span>
                    </div>
                    <div className="analytics-stat">
                      <Activity size={20} />
                      <span className="value">{analytics.totalPortfolios}</span>
                      <span className="label">Portfólios Ativos</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-tab">
              <div className="tab-header">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar usuários..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Usuário</th>
                      <th>Email</th>
                      <th>Plano</th>
                      <th>Criado em</th>
                      <th>Trial Expira</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.uid}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{u.nome?.charAt(0).toUpperCase()}</div>
                            <span>{u.nome}</span>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`plan-badge ${u.plano?.toLowerCase()}`}>
                            {u.plano === 'SUB' ? 'PRO' : 'FREE'}
                          </span>
                        </td>
                        <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR') : '-'}</td>
                        <td>
                          {u.trialExpiration ? new Date(u.trialExpiration).toLocaleDateString('pt-BR') : 'N/A'}
                        </td>
                        <td>
                          <div className="action-buttons">
                            {u.plano === 'FREE' ? (
                              <button className="btn btn-sm btn-success" onClick={() => updateUserPlan(u.uid, 'SUB')}>
                                <Crown size={14} />
                                Upgrade
                              </button>
                            ) : (
                              <button className="btn btn-sm btn-warning" onClick={() => updateUserPlan(u.uid, 'FREE')}>
                                <X size={14} />
                                Downgrade
                              </button>
                            )}
                            {u.uid !== user?.uid && (
                              <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u.uid)}>
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'portfolios' && (
            <div className="portfolios-tab">
              <div className="tab-header">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar portfólios..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Usuário</th>
                      <th>Template</th>
                      <th>Criado em</th>
                      <th>Atualizado</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPortfolios.map(p => (
                      <tr key={p.id}>
                        <td>{p.nome || 'Sem nome'}</td>
                        <td>
                          <div className="user-cell">
                            <span>{p.userNome}</span>
                            <small>{p.userEmail}</small>
                          </div>
                        </td>
                        <td>{p.template || '-'}</td>
                        <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString('pt-BR') : '-'}</td>
                        <td>{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('pt-BR') : '-'}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-primary" onClick={() => window.open(`/portfolio/${p.userEmail?.split('@')[0]}`, '_blank')}>
                              <Eye size={14} />
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => deletePortfolio(p.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="templates-tab">
              <div className="tab-header">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar templates..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="templates-grid">
                {filteredTemplates.map(t => (
                  <div key={t.id} className="template-card-admin">
                    <div className="template-preview">
                      <div className="template-preview-placeholder">{t.nome?.charAt(0)}</div>
                    </div>
                    <div className="template-info">
                      <h4>{t.nome}</h4>
                      <p>{t.descricao?.substring(0, 80)}...</p>
                      <div className="template-meta">
                        <span><Package size={14} /> {t.categoria}</span>
                        <span><Download size={14} /> {t.downloads}</span>
                        <span><Star size={14} /> {t.rating?.toFixed(1)}</span>
                      </div>
                      <div className="template-status">
                        <span className={`status-badge ${t.status || 'aprovado'}`}>
                          {t.status || 'aprovado'}
                        </span>
                        {t.featured && <span className="featured-badge">Destaque</span>}
                      </div>
                    </div>
                    <div className="template-actions">
                      {(t.status === 'pendente' || !t.status) && (
                        <>
                          <button className="btn btn-sm btn-success" onClick={() => approveTemplate(t.id, false)}>
                            <Check size={14} /> Aprovar
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => rejectTemplate(t.id)}>
                            <X size={14} /> Rejeitar
                          </button>
                        </>
                      )}
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedItem(t);
                          setShowModal(true);
                        }}
                      >
                        <Edit size={14} />
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteTemplate(t.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && analytics && (
            <div className="analytics-tab">
              <div className="analytics-cards">
                <div className="analytics-card">
                  <h3>Total de Visualizações</h3>
                  <span className="big-number">{analytics.totalVisualizacoes?.toLocaleString()}</span>
                </div>
                <div className="analytics-card">
                  <h3>Total de Visitantes</h3>
                  <span className="big-number">{analytics.totalVisitantes?.toLocaleString()}</span>
                </div>
                <div className="analytics-card">
                  <h3>Portfólios Ativos</h3>
                  <span className="big-number">{analytics.totalPortfolios}</span>
                </div>
                <div className="analytics-card">
                  <h3>Templates</h3>
                  <span className="big-number">{analytics.totalTemplates}</span>
                </div>
              </div>

              <div className="analytics-sections">
                <div className="analytics-section">
                  <h3>Top Portfólios</h3>
                  <div className="top-list">
                    {analytics.topPortfolios?.map((p, i) => (
                      <div key={p.id} className="top-item">
                        <span className="rank">{i + 1}</span>
                        <span className="name">{p.nome || 'Sem nome'}</span>
                        <span className="value">{p.visualizacoes} visualizações</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="analytics-section">
                  <h3>Templates Mais Baixados</h3>
                  <div className="top-list">
                    {analytics.topTemplates?.map((t, i) => (
                      <div key={t.id} className="top-item">
                        <span className="rank">{i + 1}</span>
                        <span className="name">{t.nome}</span>
                        <span className="value">{t.downloads} downloads</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-section">
                <h3>Configurações Gerais</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Nome do Site</label>
                    <input 
                      type="text" 
                      value={settings.siteName || ''}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrição do Site</label>
                    <textarea 
                      value={settings.siteDescription || ''}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email de Contato</label>
                    <input 
                      type="email" 
                      value={settings.contatoEmail || ''}
                      onChange={(e) => setSettings({...settings, contatoEmail: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Funcionalidades</h3>
                <div className="settings-form">
                  <div className="form-group checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={settings.registroAtivo !== false}
                        onChange={(e) => setSettings({...settings, registroAtivo: e.target.checked})}
                      />
                      Permitir novos registros
                    </label>
                  </div>
                  <div className="form-group checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={settings.templateMarketplace !== false}
                        onChange={(e) => setSettings({...settings, templateMarketplace: e.target.checked})}
                      />
                      Ativar marketplace de templates
                    </label>
                  </div>
                  <div className="form-group checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={settings.manutencao || false}
                        onChange={(e) => setSettings({...settings, manutencao: e.target.checked})}
                      />
                      Modo manutenção
                    </label>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => saveSettings(settings)}>
                <Check size={18} />
                Salvar Configurações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
