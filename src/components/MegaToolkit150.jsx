import React, { useMemo, useState } from 'react';
import { Copy, Search, Sparkles } from 'lucide-react';
import './MegaToolkit150.css';

const categories = [
  'IA Avançada',
  'Projetos Premium',
  'Carreira Starter',
  'Comercial Starter',
  'Produtividade Elite',
  'Networking Starter'
];

const objectives = [
  'aumentar conversao',
  'melhorar clareza',
  'acelerar entregas',
  'reduzir friccao',
  'fortalecer posicionamento',
  'fechar mais oportunidades'
];

const actions = [
  'headline orientada a resultado',
  'CTA com prova social',
  'case com problema/solucao/impacto',
  'copy curta para recrutador',
  'mensagem de outreach personalizada',
  'roteiro de follow-up de 3 toques'
];

const outcomes = [
  'mais respostas de recrutadores',
  'mais cliques em contato',
  'portfolio mais objetivo',
  'propostas com maior taxa de aceite',
  'pipeline comercial previsivel',
  'rotina de crescimento consistente'
];

const buildContext = (portfolio) => {
  const nome = (portfolio?.nome || 'Seu Nome').trim() || 'Seu Nome';
  const skills = portfolio?.skills || [];
  const projetos = portfolio?.projetos || [];
  const main = projetos[0] || { titulo: 'Projeto Principal', descricao: 'Descricao do projeto' };
  return { nome, skills, projetos, main };
};

const buildTool = (id) => {
  const cat = categories[(id - 1) % categories.length];
  const objective = objectives[(id - 1) % objectives.length];
  const action = actions[(id - 1) % actions.length];
  const outcome = outcomes[(id - 1) % outcomes.length];
  const idx = Math.floor((id - 1) / categories.length) + 1;

  return {
    id,
    cat,
    title: `${cat} #${idx}`,
    run: (ctx) => {
      const s1 = ctx.skills[0] || 'execucao';
      const s2 = ctx.skills[1] || 'comunicacao';
      return `Plano ${id}: Para ${objective}, aplique ${action} focando em ${s1} + ${s2}. Use ${ctx.main.titulo} como case principal e destaque ${outcome}.`;
    }
  };
};

const allTools = Array.from({ length: 150 }, (_, i) => buildTool(i + 1));

const MegaToolkit150 = ({ portfolio }) => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Todas');

  const ctx = useMemo(() => buildContext(portfolio), [portfolio]);
  const categoryOptions = ['Todas', ...categories];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTools.filter((t) => {
      const catOk = cat === 'Todas' || t.cat === cat;
      const searchOk = !q || t.title.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q) || String(t.id).includes(q);
      return catOk && searchOk;
    });
  }, [cat, query]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copiado!');
    } catch {
      alert('Falha ao copiar.');
    }
  };

  return (
    <div className="mega150">
      <div className="mega150-header">
        <h3><Sparkles size={18} /> Mega Toolkit 150 (Starter+)</h3>
        <span>{filtered.length}/150</span>
      </div>

      <div className="mega150-filters">
        <div className="mega150-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por numero/categoria..." />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mega150-list">
        {filtered.map((tool) => {
          const output = tool.run(ctx);
          return (
            <div key={tool.id} className="mega150-item">
              <div className="mega150-title">
                <strong>#{tool.id} {tool.title}</strong>
                <span>{tool.cat}</span>
              </div>
              <p>{output}</p>
              <button onClick={() => copy(output)}><Copy size={14} />Copiar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MegaToolkit150;
