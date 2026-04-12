import React, { useMemo, useState } from 'react';
import { Copy, Search, Sparkles } from 'lucide-react';
import './MegaToolkit50.css';

const pick = (arr, idx, fallback) => (arr && arr[idx] ? arr[idx] : fallback);

const makeContext = (portfolio) => {
  const nome = (portfolio?.nome || 'Seu Nome').trim() || 'Seu Nome';
  const bio = (portfolio?.bio || 'Profissional focado em resultados.').trim();
  const skills = portfolio?.skills || [];
  const projetos = portfolio?.projetos || [];
  const principal = projetos[0] || { titulo: 'Projeto Principal', descricao: 'Descricao do projeto', link: '#' };
  return { nome, bio, skills, projetos, principal };
};

const tools = [
  { id: 1, cat: 'IA', title: 'Headline forte', run: (c) => `${c.nome} | ${pick(c.skills, 0, 'Especialista')} com foco em resultado real` },
  { id: 2, cat: 'IA', title: 'Bio curta (1 linha)', run: (c) => `${c.nome} trabalha com ${pick(c.skills, 0, 'projetos digitais')} e entrega com qualidade e prazo.` },
  { id: 3, cat: 'IA', title: 'Bio media (3 linhas)', run: (c) => `${c.nome} atua com ${pick(c.skills, 0, 'tecnologia')} e ${pick(c.skills, 1, 'produto')}. Experiencia em ${c.projetos.length} projetos com foco em clareza, execucao e impacto.` },
  { id: 4, cat: 'IA', title: 'Pitch 30s', run: (c) => `Sou ${c.nome}, foco em ${pick(c.skills, 0, 'entregas digitais')}. Nos ultimos projetos, priorizei resultado de negocio, velocidade e qualidade.` },
  { id: 5, cat: 'IA', title: 'Proposta de valor', run: (c) => `Ajudo times a transformar ideia em entrega com ${pick(c.skills, 0, 'execucao tecnica')} e comunicacao objetiva.` },
  { id: 6, cat: 'IA', title: 'Resumo para recrutador', run: (c) => `${c.nome} com portfolio de ${c.projetos.length} projetos e stack em ${c.skills.slice(0, 3).join(', ') || 'tecnologia'}.` },
  { id: 7, cat: 'IA', title: 'Mensagem para vaga', run: (c) => `Oi! Sou ${c.nome} e vi a vaga. Tenho experiencia com ${c.skills.slice(0, 3).join(', ') || 'projetos digitais'} e posso contribuir rapido.` },
  { id: 8, cat: 'IA', title: 'Follow-up pos candidatura', run: (c) => `Oi! Passando para reforcar meu interesse. Meu portfolio destaca ${c.principal.titulo}. Se fizer sentido, fico disponivel para uma conversa curta.` },
  { id: 9, cat: 'IA', title: 'CTA principal', run: () => `Quer acelerar seu projeto com qualidade? Vamos conversar hoje.` },
  { id: 10, cat: 'IA', title: 'CTA secundario', run: () => `Se quiser, envio um mini plano de acao em 24h.` },

  { id: 11, cat: 'Projetos', title: 'Resumo do projeto principal', run: (c) => `${c.principal.titulo}: ${c.principal.descricao}` },
  { id: 12, cat: 'Projetos', title: 'Problema do case', run: () => `Contexto: havia baixa eficiencia no fluxo atual e impacto direto em resultado.` },
  { id: 13, cat: 'Projetos', title: 'Solucao do case', run: () => `Solucao: redesenho do fluxo, simplificacao das etapas e foco em clareza de uso.` },
  { id: 14, cat: 'Projetos', title: 'Resultado do case', run: () => `Resultado: processo mais rapido, menos erros e melhor experiencia para usuario final.` },
  { id: 15, cat: 'Projetos', title: 'Stack do projeto', run: (c) => `Stack: ${c.skills.slice(0, 5).join(', ') || 'definir stack principal'}.` },
  { id: 16, cat: 'Projetos', title: 'Descricao para GitHub', run: (c) => `${c.principal.titulo} - ${c.principal.descricao}. Projeto com foco em arquitetura limpa e performance.` },
  { id: 17, cat: 'Projetos', title: 'Bullets de impacto', run: () => `- reduziu friccao\n- melhorou usabilidade\n- facilitou manutencao` },
  { id: 18, cat: 'Projetos', title: 'Escopo resumido', run: () => `Escopo: descoberta, planejamento, execucao, validacao e melhoria continua.` },
  { id: 19, cat: 'Projetos', title: 'Licao aprendida', run: () => `Licao: pequenos ajustes de UX + boa comunicacao tecnica geram grande impacto.` },
  { id: 20, cat: 'Projetos', title: 'Proximo passo do projeto', run: () => `Proximo passo: instrumentar analytics e evoluir com base no comportamento real.` },

  { id: 21, cat: 'Carreira', title: 'Objetivo de curriculo', run: (c) => `Atuar com ${pick(c.skills, 0, 'tecnologia')} para gerar impacto de negocio e evolucao continua.` },
  { id: 22, cat: 'Carreira', title: 'Resumo LinkedIn', run: (c) => `${c.nome} | ${pick(c.skills, 0, 'Profissional')} | ${pick(c.skills, 1, 'Entrega')} | Portfolio com ${c.projetos.length} projetos` },
  { id: 23, cat: 'Carreira', title: 'Sobre no GitHub', run: (c) => `Construindo projetos com ${c.skills.slice(0, 3).join(', ') || 'codigo limpo'} e foco em resultado.` },
  { id: 24, cat: 'Carreira', title: 'Resposta: fale sobre voce', run: (c) => `Sou ${c.nome}, trabalho com ${pick(c.skills, 0, 'projetos digitais')} e gosto de transformar problema em entrega clara.` },
  { id: 25, cat: 'Carreira', title: 'Pontos fortes', run: () => `Comunicacao, consistencia de entrega, ownership e foco em melhoria continua.` },
  { id: 26, cat: 'Carreira', title: 'Ponto a melhorar (seguro)', run: () => `No inicio eu centralizava decisoes; hoje distribuo melhor e documento mais cedo.` },
  { id: 27, cat: 'Carreira', title: 'Resposta de pretensao', run: () => `Estou aberto(a) a pacote compativel com escopo, impacto e nivel de responsabilidade.` },
  { id: 28, cat: 'Carreira', title: 'Resumo para email de candidatura', run: (c) => `Segue meu portfolio. Destaque para ${c.principal.titulo} e stack em ${c.skills.slice(0, 3).join(', ') || 'tecnologia'}.` },
  { id: 29, cat: 'Carreira', title: 'Perguntas para entrevista', run: () => `1) Qual o principal desafio do time hoje?\n2) Como medem sucesso?\n3) Quais prioridades dos proximos 90 dias?` },
  { id: 30, cat: 'Carreira', title: 'Plano 30-60-90', run: () => `30d: entendimento e quick wins | 60d: entregas consistentes | 90d: ganho de escala.` },

  { id: 31, cat: 'Comercial', title: 'Abertura de proposta', run: () => `Obrigado pelo contato. Abaixo esta uma proposta objetiva para atingirmos o resultado esperado.` },
  { id: 32, cat: 'Comercial', title: 'Escopo padrao', run: () => `Escopo: planejamento, execucao, testes, entrega e suporte inicial.` },
  { id: 33, cat: 'Comercial', title: 'Cronograma padrao', run: () => `Semana 1: alinhamento | Semana 2-3: execucao | Semana 4: refinamento e entrega.` },
  { id: 34, cat: 'Comercial', title: 'Pacote Basico', run: () => `Basico: entrega essencial + ajustes finais + documentacao curta.` },
  { id: 35, cat: 'Comercial', title: 'Pacote Pro', run: () => `Pro: escopo completo + analytics + suporte estendido.` },
  { id: 36, cat: 'Comercial', title: 'Pacote Premium', run: () => `Premium: estrategia, implementacao, testes A/B e acompanhamento de performance.` },
  { id: 37, cat: 'Comercial', title: 'Resposta objeção preco', run: () => `Entendo o ponto. Posso ajustar escopo em fases sem perder qualidade de entrega.` },
  { id: 38, cat: 'Comercial', title: 'Resposta objeção prazo', run: () => `Posso dividir em milestones para liberar valor mais cedo sem comprometer qualidade.` },
  { id: 39, cat: 'Comercial', title: 'Upsell elegante', run: () => `Opcional recomendado: analytics e dashboard para acompanhar resultado apos entrega.` },
  { id: 40, cat: 'Comercial', title: 'Fechamento de proposta', run: () => `Se estiver de acordo, inicio imediatamente apos validacao do escopo e kickoff.` },

  { id: 41, cat: 'Produtividade', title: 'Checklist diario', run: () => `1 tarefa critica\n1 melhoria no portfolio\n1 contato novo\n1 follow-up\n1 aprendizado` },
  { id: 42, cat: 'Produtividade', title: 'Checklist semanal', run: () => `Atualizar 1 projeto, revisar headline, medir cliques, enviar 5 candidaturas, revisar resultados.` },
  { id: 43, cat: 'Produtividade', title: 'Meta 30 dias', run: () => `Meta: aumentar conversao do portfolio e gerar 10 conversas qualificadas.` },
  { id: 44, cat: 'Produtividade', title: 'Pipeline de oportunidades', run: () => `Prospecao -> Contato -> Reuniao -> Proposta -> Fechamento` },
  { id: 45, cat: 'Produtividade', title: 'Template de follow-up 1', run: () => `Oi! So reforcando meu interesse. Posso te mandar 2 cases alinhados com sua necessidade?` },
  { id: 46, cat: 'Produtividade', title: 'Template de follow-up 2', run: () => `Passando para confirmar recebimento da proposta. Posso adaptar escopo se preciso.` },
  { id: 47, cat: 'Produtividade', title: 'Rotina de melhoria', run: () => `Seg: bio | Ter: projetos | Qua: CTA | Qui: outreach | Sex: analise de resultado` },
  { id: 48, cat: 'Produtividade', title: 'Script de networking', run: () => `Oi! Curti seu trabalho em [tema]. Tambem atuo nessa area e queria trocar experiencias.` },
  { id: 49, cat: 'Produtividade', title: 'Script de pedido de indicacao', run: () => `Se surgir vaga/projeto no meu perfil, fico feliz com uma indicacao. Obrigado!` },
  { id: 50, cat: 'Produtividade', title: 'Resumo executivo (1 paragrafo)', run: (c) => `${c.nome} atua com ${c.skills.slice(0, 3).join(', ') || 'execucao digital'}, com portfolio orientado a resultado e comunicacao objetiva.` }
];

const MegaToolkit50 = ({ portfolio }) => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Todas');

  const ctx = useMemo(() => makeContext(portfolio), [portfolio]);
  const categories = ['Todas', ...Array.from(new Set(tools.map((t) => t.cat)))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      const catOk = cat === 'Todas' || t.cat === cat;
      const searchOk = !q || t.title.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
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
    <div className="mega50">
      <div className="mega50-header">
        <h3><Sparkles size={18} /> Mega Toolkit (50 funcoes)</h3>
        <span>{filtered.length}/{tools.length}</span>
      </div>

      <div className="mega50-filters">
        <div className="mega50-search">
          <Search size={14} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar funcao..." />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mega50-list">
        {filtered.map((tool) => {
          const output = tool.run(ctx);
          return (
            <div key={tool.id} className="mega50-item">
              <div className="mega50-title">
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

export default MegaToolkit50;
