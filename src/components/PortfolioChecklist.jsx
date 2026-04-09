import React from 'react';
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react';
import './PortfolioChecklist.css';

const PortfolioChecklist = ({ portfolio }) => {
  const checks = [
    { id: 'nome', label: 'Nome profissional', done: Boolean(portfolio?.nome?.trim()) },
    { id: 'bio', label: 'Bio com 80+ caracteres', done: (portfolio?.bio || '').trim().length >= 80 },
    { id: 'skills', label: 'Pelo menos 5 skills', done: (portfolio?.skills || []).length >= 5 },
    { id: 'projects', label: 'Pelo menos 3 projetos', done: (portfolio?.projetos || []).length >= 3 },
    { id: 'links', label: 'Projetos com link', done: (portfolio?.projetos || []).some((p) => p?.link?.trim()) },
    { id: 'theme', label: 'Tema definido', done: Boolean(portfolio?.tema) },
  ];

  const completed = checks.filter((c) => c.done).length;
  const percent = Math.round((completed / checks.length) * 100);

  return (
    <div className="portfolio-checklist">
      <div className="checklist-header">
        <h4>Checklist de Portfólio</h4>
        <span>{percent}%</span>
      </div>
      <div className="checklist-progress">
        <div className="checklist-progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="checklist-items">
        {checks.map((item) => (
          <div key={item.id} className={`checklist-item ${item.done ? 'done' : 'pending'}`}>
            {item.done ? <CheckCircle2 size={14} /> : <Circle size={14} />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      {percent < 100 && (
        <div className="checklist-tip">
          <AlertTriangle size={14} />
          <span>Complete os itens para aumentar sua conversao.</span>
        </div>
      )}
    </div>
  );
};

export default PortfolioChecklist;
