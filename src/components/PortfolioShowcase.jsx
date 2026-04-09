import React, { useState, useEffect } from 'react';
import { Star, Eye, ThumbsUp, User, ArrowRight, Sparkles } from 'lucide-react';
import './PortfolioShowcase.css';

const PortfolioShowcase = () => {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockShowcases = [
      { id: 1, nome: 'Ana Designer', cargo: 'UX Designer', tema: 'roxo', projetos: 8, likes: 156, views: 2340 },
      { id: 2, nome: 'Carlos Dev', cargo: 'Full Stack Developer', tema: 'azul', projetos: 12, likes: 289, views: 4521 },
      { id: 3, nome: 'Marina Creative', cargo: 'Motion Designer', tema: 'verde', projetos: 6, likes: 98, views: 1567 },
      { id: 4, nome: 'João Frontend', cargo: 'React Developer', tema: 'laranja', projetos: 15, likes: 342, views: 5678 },
      { id: 5, nome: 'Sofia UX', cargo: 'Product Designer', tema: 'vermelho', projetos: 9, likes: 201, views: 3210 },
    ];
    
    setTimeout(() => {
      setShowcases(mockShowcases);
      setLoading(false);
    }, 500);
  }, []);

  const temaCores = { azul: '#3b82f6', roxo: '#a855f7', vermelho: '#ef4444', verde: '#22c55e', laranja: '#f97316' };

  const getInitials = (nome) => nome.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="portfolio-showcase">
      <div className="showcase-header">
        <h2><Sparkles size={20} /> Portfólios em Destaque</h2>
        <p>Inspire-se com os melhores trabalhos da comunidade</p>
      </div>

      {loading ? (
        <div className="showcase-loading">Carregando...</div>
      ) : (
        <div className="showcase-grid">
          {showcases.map((item) => (
            <div key={item.id} className="showcase-card" style={{ '--card-accent': temaCores[item.tema] }}>
              <div className="card-avatar" style={{ background: temaCores[item.tema] }}>
                {getInitials(item.nome)}
              </div>
              <h3>{item.nome}</h3>
              <span className="card-cargo">{item.cargo}</span>
              
              <div className="card-stats">
                <span><Eye size={14} /> {item.views}</span>
                <span><ThumbsUp size={14} /> {item.likes}</span>
                <span><Star size={14} /> {item.projetos}</span>
              </div>
              
              <button className="card-btn">
                Ver Portfólio <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="showcase-cta">
        <p>Quer ter seu portfólio aqui?</p>
        <button>Submeter meu portfólio</button>
      </div>
    </div>
  );
};

export default PortfolioShowcase;