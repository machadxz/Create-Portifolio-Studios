import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Studio from './pages/Studio';
import Templates from './pages/Templates';
import Planos from './pages/Planos';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
import Checkout from './pages/Checkout';
import Marketplace from './pages/Marketplace';
import TemplateDetail from './pages/TemplateDetail';
import PublishTemplate from './pages/PublishTemplate';
import Creator from './pages/Creator';
import StudioEditor from './components/editor/StudioEditor';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import MaintenanceScreen from './components/MaintenanceScreen';
import { apiFetch } from './lib/api';
import './styles/App.css';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const res = await apiFetch('/api/maintenance');
        const data = await res.json();
        setMaintenanceMode(data.manutencao || false);
      } catch (err) {
        console.error('Erro ao verificar manutenção:', err);
        setMaintenanceMode(false);
      }
    };
    checkMaintenance();
    
    const interval = setInterval(checkMaintenance, 10000);
    return () => clearInterval(interval);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (authLoading) {
    return <SplashScreen />;
  }

  const isAdmin = user?.isAdmin;
  const isAdminRoute = location.pathname === '/admin';

  if (maintenanceMode && !isAdmin && !isAdminRoute) {
    return <MaintenanceScreen />;
  }

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? '' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio/:username" element={<Portfolio />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/template/:id" element={<TemplateDetail />} />
          <Route path="/publicar-template" element={<PublishTemplate />} />
          <Route path="/criador/:id" element={<Creator />} />
          <Route path="/editor-visual" element={<StudioEditor />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
