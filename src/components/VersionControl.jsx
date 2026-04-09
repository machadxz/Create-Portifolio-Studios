import React, { useState, useEffect } from 'react';
import { History, RotateCcw, RotateCw, Eye, Trash2, Clock } from 'lucide-react';
import './VersionControl.css';

const VersionControl = ({ portfolioData, onRestore, currentVersion }) => {
  const [versions, setVersions] = useState([]);
  const [showVersions, setShowVersions] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cps-versions') || '[]');
    setVersions(saved.slice(0, 10));
  }, []);

  const saveVersion = () => {
    const newVersion = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(portfolioData)),
      label: `Versão ${versions.length + 1}`
    };
    
    const updated = [newVersion, ...versions].slice(0, 10);
    localStorage.setItem('cps-versions', JSON.stringify(updated));
    setVersions(updated);
    alert('Versão salva!');
  };

  const restoreVersion = (version) => {
    if (window.confirm(`Restaurar "${version.label}"?`)) {
      onRestore(version.data);
      alert('Versão restaurada!');
    }
  };

  const deleteVersion = (id) => {
    const updated = versions.filter(v => v.id !== id);
    localStorage.setItem('cps-versions', JSON.stringify(updated));
    setVersions(updated);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="version-control">
      <div className="version-header">
        <button className="version-btn" onClick={saveVersion} title="Salvar versão atual">
          <History size={16} />
          <span>Salvar Versão</span>
        </button>
        
        {versions.length > 0 && (
          <button className="version-btn outline" onClick={() => setShowVersions(!showVersions)}>
            <Clock size={16} />
            <span>Histórico ({versions.length})</span>
          </button>
        )}
      </div>

      {showVersions && versions.length > 0 && (
        <div className="versions-list">
          {versions.map((v) => (
            <div key={v.id} className="version-item">
              <div className="version-info">
                <span className="version-label">{v.label}</span>
                <span className="version-date">{formatDate(v.timestamp)}</span>
              </div>
              <div className="version-actions">
                <button onClick={() => restoreVersion(v)} title="Restaurar">
                  <RotateCcw size={14} />
                </button>
                <button onClick={() => deleteVersion(v.id)} title="Excluir" className="delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {versions.length === 0 && (
        <div className="versions-empty">
          <History size={24} />
          <span>Nenhuma versão salva</span>
        </div>
      )}
    </div>
  );
};

export default VersionControl;