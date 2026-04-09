import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, ChevronRight, Layout, Image, FileText, Code } from 'lucide-react';
import './ProjectTemplates.css';

const ProjectTemplates = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos', icon: Layout },
    { id: 'website', label: 'Sites', icon: Code },
    { id: 'app', label: 'Apps', icon: Image },
    { id: 'branding', label: 'Branding', icon: FileText },
    { id: 'ux', label: 'UX Design', icon: Briefcase },
  ];

  const templates = [
    {
      id: 1,
      name: 'Landing Page',
      category: 'website',
      description: 'Página única de apresentação',
      sections: ['Hero', 'Features', 'CTA', 'Contato'],
    },
    {
      id: 2,
      name: 'Site Corporativo',
      category: 'website',
      description: 'Site institucional completo',
      sections: ['Hero', 'Sobre', 'Serviços', 'Portfolio', 'Contato'],
    },
    {
      id: 3,
      name: 'E-commerce',
      category: 'website',
      description: 'Loja virtual com produtos',
      sections: ['Hero', 'Produtos', 'Carrinho', 'Checkout'],
    },
    {
      id: 4,
      name: 'App Mobile',
      category: 'app',
      description: 'Aplicativo mobile',
      sections: ['Onboarding', 'Dashboard', 'Perfil', 'Configurações'],
    },
    {
      id: 5,
      name: 'Brand Identity',
      category: 'branding',
      description: 'Identidade visual completa',
      sections: ['Logo', 'Paleta', 'Tipografia', 'Aplicações'],
    },
    {
      id: 6,
      name: 'Case Study',
      category: 'ux',
      description: 'Caso de sucesso detalhado',
      sections: ['Resumo', 'Desafio', 'Solução', 'Resultado', 'Aprendizados'],
    },
    {
      id: 7,
      name: 'Portfolio Pessoal',
      category: 'website',
      description: 'Portfólio criativo',
      sections: ['Hero', 'Sobre', 'Projetos', 'Contato'],
    },
    {
      id: 8,
      name: 'Dashboard',
      category: 'app',
      description: 'Painel administrativo',
      sections: ['Sidebar', 'Header', 'Cards', 'Gráficos'],
    },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="project-templates">
      <h3><Briefcase size={18} /> Templates de Projetos</h3>
      
      <div className="category-tabs">
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={selectedCategory === cat.id ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <cat.icon size={14} />
            {cat.label}
          </button>
        ))}
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="template-card"
            onClick={() => onSelect(template)}
          >
            <div className="template-preview">
              <Layout size={24} />
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
              <span className="template-sections">{template.sections.length} seções</span>
            </div>
            <ChevronRight size={16} className="template-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTemplates;