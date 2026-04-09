import React, { useState } from 'react';
import { Globe, Copy, Check } from 'lucide-react';
import './MultiLanguage.css';

const MultiLanguage = ({ portfolio }) => {
  const [copied, setCopied] = useState(false);
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const copyAllTranslations = () => {
    const translations = languages.map(lang => {
      const translatedBio = translateText(portfolio.bio || '', lang.code);
      return `${lang.flag} ${lang.name}:\n${translatedBio}`;
    }).join('\n\n');
    
    navigator.clipboard.writeText(translations);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const translateText = (text, lang) => {
    if (!text) return '';
    const translations = {
      pt: text,
      en: translateToEnglish(text),
      es: translateToSpanish(text),
      fr: translateToFrench(text),
      de: translateToGerman(text),
      it: translateToItalian(text),
    };
    return translations[lang] || text;
  };

  const translateToEnglish = (text) => {
    const mapping = {
      'Desenvolvedor': 'Developer',
      'Designer': 'Designer',
      'Profissional': 'Professional',
      'APAIXONADO': 'PASSIONATE',
      'tecnologia': 'technology',
      'inovação': 'innovation',
      'projetos': 'projects',
      'experiência': 'experience',
      'habilidades': 'skills',
      'contato': 'contact',
    };
    let translated = text;
    Object.keys(mapping).forEach(key => {
      translated = translated.replace(new RegExp(key, 'gi'), mapping[key]);
    });
    return translated;
  };

  const translateToSpanish = (text) => {
    const mapping = {
      'Desenvolvedor': 'Desarrollador',
      'Designer': 'Diseñador',
      'Profissional': 'Profesional',
      'APAIXONADO': 'APASIONADO',
      'tecnología': 'technology',
      'proyectos': 'projects',
      'experiencia': 'experience',
    };
    let translated = text;
    Object.keys(mapping).forEach(key => {
      translated = translated.replace(new RegExp(key, 'gi'), mapping[key]);
    });
    return translated;
  };

  const translateToFrench = (text) => {
    return text.replace(/Desenvolvedor/g, 'Développeur').replace(/Designer/g, 'Designer').replace(/APAIXONADO/g, 'PASSIONNÉ');
  };

  const translateToGerman = (text) => {
    return text.replace(/Desenvolvedor/g, 'Entwickler').replace(/Designer/g, 'Designer').replace(/APAIXONADO/g, 'LEIDENSCHAFTLICH');
  };

  const translateToItalian = (text) => {
    return text.replace(/Desenvolvedor/g, 'Sviluppatore').replace(/Designer/g, 'Designer').replace(/APAIXONADO/g, 'PASSIONATO');
  };

  return (
    <div className="multi-language">
      <h3><Globe size={18} /> Multi-Idioma</h3>
      
      <div className="lang-list">
        {languages.map(lang => (
          <div key={lang.code} className="lang-item">
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-name">{lang.name}</span>
            <span className="lang-preview">{translateText(portfolio.bio || 'Sem bio', lang.code).substring(0, 30)}...</span>
          </div>
        ))}
      </div>

      <button className={`copy-all-btn ${copied ? 'copied' : ''}`} onClick={copyAllTranslations}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copiado!' : 'Copiar Todas'}
      </button>
    </div>
  );
};

export default MultiLanguage;