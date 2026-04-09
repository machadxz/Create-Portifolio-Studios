import React, { useState } from 'react';
import { FileText, Plus, Trash2, ChevronDown, Target, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';
import './CaseStudyBuilder.css';

const CaseStudyBuilder = ({ onSave }) => {
  const [project, setProject] = useState({
    titulo: '',
    overview: '',
    problema: '',
    solucao: '',
    processo: '',
    resultado: '',
    metricas: [],
    ferramentas: [],
    link: ''
  });

  const [metrica, setMetrica] = useState({ label: '', valor: '' });
  const [ferramenta, setFerramenta] = useState('');

  const addMetrica = () => {
    if (metrica.label && metrica.valor) {
      setProject({ ...project, metricas: [...project.metricas, metrica] });
      setMetrica({ label: '', valor: '' });
    }
  };

  const addFerramenta = () => {
    if (ferramenta) {
      setProject({ ...project, ferramentas: [...project.ferramentas, ferramenta] });
      setFerramenta('');
    }
  };

  const removeItem = (array, index, field) => {
    const updated = [...project[field]];
    updated.splice(index, 1);
    setProject({ ...project, [field]: updated });
  };

  const handleSave = () => {
    if (!project.titulo) {
      alert('Título é obrigatório');
      return;
    }
    onSave(project);
    alert('Case Study salvo!');
  };

  return (
    <div className="case-study-builder">
      <h3><FileText size={18} /> Construtor de Case Study</h3>
      
      <div className="cs-section">
        <label>Título do Projeto *</label>
        <input 
          type="text" 
          placeholder="Ex: Redesign do App Banking"
          value={project.titulo}
          onChange={(e) => setProject({...project, titulo: e.target.value})}
        />
      </div>

      <div className="cs-section">
        <label><Target size={14} /> Visão Geral</label>
        <textarea 
          placeholder="Breve descrição do projeto..."
          value={project.overview}
          onChange={(e) => setProject({...project, overview: e.target.value})}
          rows={3}
        />
      </div>

      <div className="cs-section">
        <label><Lightbulb size={14} /> O Problema</label>
        <textarea 
          placeholder="Qual problema você resolveu?"
          value={project.problema}
          onChange={(e) => setProject({...project, problema: e.target.value})}
          rows={3}
        />
      </div>

      <div className="cs-section">
        <label><Lightbulb size={14} /> A Solução</label>
        <textarea 
          placeholder="Como você resolveu?"
          value={project.solucao}
          onChange={(e) => setProject({...project, solucao: e.target.value})}
          rows={3}
        />
      </div>

      <div className="cs-section">
        <label><TrendingUp size={14} /> Métricas de Sucesso</label>
        <div className="input-row">
          <input 
            type="text" 
            placeholder="Ex: Aumento de conversão"
            value={metrica.label}
            onChange={(e) => setMetrica({...metrica, label: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Ex: +45%"
            value={metrica.valor}
            onChange={(e) => setMetrica({...metrica, valor: e.target.value})}
            style={{ width: '100px' }}
          />
          <button onClick={addMetrica}><Plus size={14} /></button>
        </div>
        {project.metricas.map((m, i) => (
          <div key={i} className="tag-item">
            <span>{m.label}: <strong>{m.valor}</strong></span>
            <button onClick={() => removeItem(project.metricas, i, 'metricas')}><Trash2 size={12} /></button>
          </div>
        ))}
      </div>

      <div className="cs-section">
        <label>Link do Projeto</label>
        <input 
          type="text" 
          placeholder="https://..."
          value={project.link}
          onChange={(e) => setProject({...project, link: e.target.value})}
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        <CheckCircle size={16} />
        Salvar Case Study
      </button>
    </div>
  );
};

export default CaseStudyBuilder;