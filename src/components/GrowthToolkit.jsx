import React, { useMemo, useState } from 'react';
import { Wand2, CheckCircle2, AlertCircle, Copy, Sparkles, Mail, Briefcase, Target } from 'lucide-react';
import './GrowthToolkit.css';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const GrowthToolkit = ({ portfolio }) => {
  const [persona, setPersona] = useState('recrutador');

  const stats = useMemo(() => {
    const nome = (portfolio?.nome || '').trim();
    const bio = (portfolio?.bio || '').trim();
    const skills = portfolio?.skills || [];
    const projetos = portfolio?.projetos || [];
    const links = projetos.filter((p) => (p?.link || '').trim()).length;

    const atsScore = clamp(
      (nome ? 15 : 0) +
      (bio.length >= 80 ? 25 : bio.length >= 30 ? 10 : 0) +
      clamp(skills.length * 8, 0, 30) +
      clamp(projetos.length * 8, 0, 24) +
      (links > 0 ? 6 : 0),
      0,
      100
    );

    return { nome, bio, skills, projetos, links, atsScore };
  }, [portfolio]);

  const topSkills = stats.skills.slice(0, 5);
  const mainProject = stats.projetos[0];

  const headlines = [
    `${portfolio.nome || 'Profissional'} | ${topSkills[0] || 'Especialista'} focado em resultados`,
    `${topSkills[0] || 'Tech'} + ${topSkills[1] || 'Produto'} para projetos de alto impacto`,
    `${portfolio.nome || 'Seu Nome'} - ${stats.projetos.length}+ projetos entregues com qualidade`
  ];

  const ctas = [
    'Vamos conversar sobre seu projeto? Me chame agora.',
    'Disponivel para freelas e vagas remotas. Fale comigo.',
    'Posso ajudar sua equipe a acelerar entregas com qualidade.'
  ];

  const outreach = `Oi! Sou ${portfolio.nome || 'profissional da area'} e vi que sua equipe trabalha com ${topSkills[0] || 'projetos digitais'}. Posso contribuir com ${topSkills.slice(0, 3).join(', ') || 'execucao e resultado'}. Posso te enviar 2 cases rapidos?`;

  const recruiterPitch = `${portfolio.nome || 'Profissional'} com ${stats.projetos.length} projetos publicados, foco em ${topSkills.slice(0, 3).join(', ') || 'entrega de valor'} e comunicacao objetiva. Resultado: portfolio claro, orientado a conversao e pronto para entrevistas.`;

  const weeklyPlan = [
    'Dia 1: revisar bio e headline principal',
    'Dia 2: atualizar 1 projeto com problema + solucao + resultado',
    'Dia 3: adicionar 3 skills estrategicas para a vaga alvo',
    'Dia 4: melhorar CTA e canais de contato',
    'Dia 5: enviar portfolio para 5 oportunidades com mensagem personalizada'
  ];

  const gaps = [
    { ok: Boolean(stats.nome), text: 'Nome profissional preenchido' },
    { ok: stats.bio.length >= 80, text: 'Bio com contexto e resultado (80+ chars)' },
    { ok: stats.skills.length >= 5, text: 'Pelo menos 5 skills relevantes' },
    { ok: stats.projetos.length >= 3, text: 'Minimo de 3 projetos' },
    { ok: stats.links >= 1, text: 'Ao menos 1 projeto com link real' }
  ];

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copiado!');
    } catch {
      alert('Nao foi possivel copiar agora.');
    }
  };

  return (
    <div className="growth-toolkit">
      <h3><Sparkles size={18} /> Growth Toolkit</h3>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>Score ATS</span>
          <strong>{stats.atsScore}/100</strong>
        </div>
        <div className="gt-progress"><div style={{ width: `${stats.atsScore}%` }} /></div>
        <div className="gt-list">
          {gaps.map((item, idx) => (
            <div key={idx} className={`gt-item ${item.ok ? 'ok' : 'warn'}`}>
              {item.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>Headlines prontas</span>
          <Wand2 size={14} />
        </div>
        {headlines.map((line, idx) => (
          <div className="gt-copy-row" key={idx}>
            <p>{line}</p>
            <button onClick={() => copyText(line)}><Copy size={14} /></button>
          </div>
        ))}
      </div>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>CTAs de conversao</span>
          <Target size={14} />
        </div>
        {ctas.map((line, idx) => (
          <div className="gt-copy-row" key={idx}>
            <p>{line}</p>
            <button onClick={() => copyText(line)}><Copy size={14} /></button>
          </div>
        ))}
      </div>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>Pitch para recrutador</span>
          <Briefcase size={14} />
        </div>
        <div className="gt-copy-row">
          <p>{recruiterPitch}</p>
          <button onClick={() => copyText(recruiterPitch)}><Copy size={14} /></button>
        </div>
      </div>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>Mensagem de abordagem</span>
          <Mail size={14} />
        </div>
        <div className="gt-copy-row">
          <p>{outreach}</p>
          <button onClick={() => copyText(outreach)}><Copy size={14} /></button>
        </div>
      </div>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>Plano semanal (5 dias)</span>
          <span className="gt-pill">acao</span>
        </div>
        <ul className="gt-plan">
          {weeklyPlan.map((step, idx) => <li key={idx}>{step}</li>)}
        </ul>
      </div>

      <div className="gt-card">
        <div className="gt-card-header">
          <span>Persona alvo</span>
        </div>
        <div className="gt-segmented">
          <button className={persona === 'recrutador' ? 'active' : ''} onClick={() => setPersona('recrutador')}>Recrutador</button>
          <button className={persona === 'cliente' ? 'active' : ''} onClick={() => setPersona('cliente')}>Cliente</button>
          <button className={persona === 'lider' ? 'active' : ''} onClick={() => setPersona('lider')}>Lider tecnico</button>
        </div>
        <p className="gt-note">
          {persona === 'recrutador' && 'Foque em clareza, stack e projetos com resultado.'}
          {persona === 'cliente' && 'Foque em beneficios, prazo e prova social.'}
          {persona === 'lider' && 'Foque em arquitetura, trade-offs e qualidade de codigo.'}
        </p>
      </div>

      {mainProject && (
        <div className="gt-card">
          <div className="gt-card-header">
            <span>Projeto principal recomendado</span>
          </div>
          <p><strong>{mainProject.titulo}</strong></p>
          <p className="gt-note">{mainProject.descricao}</p>
        </div>
      )}
    </div>
  );
};

export default GrowthToolkit;
