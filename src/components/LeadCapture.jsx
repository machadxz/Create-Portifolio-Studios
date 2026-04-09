import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import './LeadCapture.css';

const LeadCapture = ({ portfolio, username }) => {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email) {
      setError('Nome e email são obrigatórios');
      return;
    }

    setError('');
    
    const leads = JSON.parse(localStorage.getItem('cps-leads') || '[]');
    leads.push({
      ...formData,
      portfolioOwner: username,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('cps-leads', JSON.stringify(leads));
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  if (submitted) {
    return (
      <div className="lead-capture success">
        <CheckCircle size={32} />
        <h4>Mensagem Enviada!</h4>
        <p>O proprietário do portfólio recebeu sua mensagem.</p>
      </div>
    );
  }

  return (
    <div className="lead-capture">
      <h3><Mail size={18} /> Entre em Contato</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <User size={16} />
          <input 
            type="text" 
            placeholder="Seu nome"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
          />
        </div>
        
        <div className="form-field">
          <Mail size={16} />
          <input 
            type="email" 
            placeholder="Seu email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        
        <div className="form-field">
          <MessageSquare size={16} />
          <textarea 
            placeholder="Sua mensagem..."
            value={formData.mensagem}
            onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
            rows={3}
          />
        </div>

        {error && (
          <div className="form-error">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <button type="submit" className="submit-btn">
          <Send size={16} />
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
};

export default LeadCapture;