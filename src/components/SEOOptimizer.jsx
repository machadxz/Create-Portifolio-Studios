import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, TrendingUp, Copy } from 'lucide-react';
import './SEOOptimizer.css';

const SEOOptimizer = ({ portfolio }) => {
  const [analyzed, setAnalyzed] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeSEO = () => {
    const keywords = portfolio.skills || [];
    const bio = portfolio.bio || '';
    const nome = portfolio.nome || '';
    
    const issues = [];
    const suggestions = [];
    let score = 50;

    if (nome.length < 3) {
      issues.push('Nome muito curto para SEO');
    } else {
      score += 10;
    }

    if (bio.length < 50) {
      issues.push('Bio muito curta');
      suggestions.push('Adicione pelo menos 100 caracteres na bio');
    } else {
      score += 15;
    }

    if (keywords.length < 3) {
      issues.push('Poucas palavras-chave');
      suggestions.push('Adicione pelo menos 5 habilidades');
    } else {
      score += 15;
    }

    if (!portfolio.projetos || portfolio.projetos.length < 2) {
      issues.push('Poucos projetos');
      suggestions.push('Adicione pelo menos 3 projetos');
    } else {
      score += 10;
    }

    const suggestedKeywords = [
      { keyword: keywords[0] || 'profissional', volume: 'alto', difficulty: 'médio' },
      { keyword: `${keywords[0] || 'desenvolvedor'} ${keywords[1] || 'web'}`, volume: 'alto', difficulty: 'baixo' },
      { keyword: keywords.slice(0, 2).join(' ') || 'portfólio profissional', volume: 'médio', difficulty: 'baixo' },
    ].filter(k => k.keyword);

    setResults({
      score: Math.min(100, score),
      issues,
      suggestions,
      keywords: suggestedKeywords
    });
    setAnalyzed(true);
  };

  const copyKeywords = () => {
    const text = results.keywords.map(k => k.keyword).join(', ');
    navigator.clipboard.writeText(text);
    alert('Palavras-chave copiadas!');
  };

  return (
    <div className="seo-optimizer">
      <h3><Search size={18} /> Otimizador SEO</h3>
      
      {!analyzed ? (
        <button className="analyze-btn" onClick={analyzeSEO}>
          <TrendingUp size={16} />
          Analisar SEO
        </button>
      ) : (
        <div className="seo-results">
          <div className="seo-score">
            <div className="score-circle" style={{ '--score': results.score }}>
              <span className="score-number">{results.score}</span>
              <span className="score-label">Score SEO</span>
            </div>
          </div>

          {results.issues.length > 0 && (
            <div className="seo-section">
              <h4><AlertCircle size={14} /> Problemas</h4>
              {results.issues.map((issue, i) => (
                <div key={i} className="seo-issue">{issue}</div>
              ))}
            </div>
          )}

          {results.suggestions.length > 0 && (
            <div className="seo-section">
              <h4>Sugestões</h4>
              {results.suggestions.map((s, i) => (
                <div key={i} className="seo-suggestion">{s}</div>
              ))}
            </div>
          )}

          <div className="seo-section">
            <h4>
              <CheckCircle size={14} /> Palavras-chave Sugeridas
              <button onClick={copyKeywords} className="copy-btn">
                <Copy size={12} />
              </button>
            </h4>
            {results.keywords.map((k, i) => (
              <div key={i} className="keyword-item">
                <span className="keyword">{k.keyword}</span>
                <span className="keyword-meta">Volume: {k.volume} | Dificuldade: {k.difficulty}</span>
              </div>
            ))}
          </div>

          <button className="reanalyze-btn" onClick={analyzeSEO}>
            Reanalisar
          </button>
        </div>
      )}
    </div>
  );
};

export default SEOOptimizer;