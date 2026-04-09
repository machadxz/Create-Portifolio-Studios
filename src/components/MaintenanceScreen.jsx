import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Lock, Wrench } from 'lucide-react';

const MaintenanceScreen = () => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  return (
    <div className="maintenance-screen">
      <div className="maintenance-content">
        <div className="maintenance-icon">
          <Wrench size={64} />
        </div>
        <h1>Site em Manutenção</h1>
        <p>Estamos trabalhando para melhorar sua experiência.</p>
        <p className="maintenance-time">Voltaremos em breve!</p>
        <div className="maintenance-lock">
          <Lock size={20} />
          <span>Acesso temporariamente bloqueado</span>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;