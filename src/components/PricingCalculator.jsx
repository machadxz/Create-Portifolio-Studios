import React, { useState } from 'react';
import { DollarSign, Clock, Briefcase, Calculator } from 'lucide-react';
import './PricingCalculator.css';

const PricingCalculator = () => {
  const [inputs, setInputs] = useState({
    horas: 40,
    valorHora: 100,
    complexidade: 1,
    urgencia: 1,
    experiencia: 'pleno'
  });

  const experienciaMultiplicador = {
    junior: 0.8,
    pleno: 1.0,
    senior: 1.5,
    expert: 2.0
  };

  const calcular = () => {
    const base = inputs.horas * inputs.valorHora;
    const complexidade = inputs.complexidade;
    const urgencia = inputs.urgencia;
    const exp = experienciaMultiplicador[inputs.experiencia];
    
    const total = base * complexidade * urgencia * exp;
    return Math.round(total);
  };

  const mercado = () => {
    const base = inputs.horas * inputs.valorHora;
    const ranges = {
      junior: { min: base * 0.7, max: base * 0.9 },
      pleno: { min: base * 0.9, max: base * 1.1 },
      senior: { min: base * 1.2, max: base * 1.5 },
      expert: { min: base * 1.6, max: base * 2.2 }
    };
    return ranges[inputs.experiencia];
  };

  const total = calcular();
  const range = mercado();

  return (
    <div className="pricing-calculator">
      <h3><Calculator size={18} /> Calculadora de Preços</h3>
      
      <div className="calc-inputs">
        <div className="input-group">
          <label><Clock size={14} /> Horas estimadas</label>
          <input type="number" value={inputs.horas} 
            onChange={(e) => setInputs({...inputs, horas: parseInt(e.target.value) || 0})} />
        </div>
        
        <div className="input-group">
          <label><DollarSign size={14} /> Valor por hora (R$)</label>
          <input type="number" value={inputs.valorHora} 
            onChange={(e) => setInputs({...inputs, valorHora: parseInt(e.target.value) || 0})} />
        </div>
        
        <div className="input-group">
          <label>Complexidade</label>
          <select value={inputs.complexidade} 
            onChange={(e) => setInputs({...inputs, complexidade: parseFloat(e.target.value)})}>
            <option value={0.8}>Baixa (0.8x)</option>
            <option value={1}>Média (1x)</option>
          <option value={1.3}>Alta (1.3x)</option>
          <option value={1.6}>Muito Alta (1.6x)</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Urgência</label>
          <select value={inputs.urgencia} 
            onChange={(e) => setInputs({...inputs, urgencia: parseFloat(e.target.value)})}>
            <option value={1}>Normal (1x)</option>
            <option value={1.25}>Urgente (1.25x)</option>
            <option value={1.5}>Muito Urgente (1.5x)</option>
          </select>
        </div>
        
        <div className="input-group full">
          <label><Briefcase size={14} /> Nível de Experiência</label>
          <select value={inputs.experiencia} 
            onChange={(e) => setInputs({...inputs, experiencia: e.target.value})}>
            <option value="junior">Júnior</option>
            <option value="pleno">Pleno</option>
            <option value="senior">Sênior</option>
            <option value="expert">Especialista</option>
          </select>
        </div>
      </div>

      <div className="calc-results">
        <div className="result-main">
          <span className="result-label">Preço Sugerido</span>
          <span className="result-value">R$ {total.toLocaleString('pt-BR')}</span>
        </div>
        
        <div className="result-range">
          <span>Range de mercado: </span>
          <strong>R$ {range.min.toLocaleString('pt-BR')} - R$ {range.max.toLocaleString('pt-BR')}</strong>
        </div>
        
        <div className="result-breakdown">
          <div>Base: R$ {(inputs.horas * inputs.valorHora).toLocaleString('pt-BR')}</div>
          <div>Complexidade: {inputs.complexidade}x</div>
          <div>Urgência: {inputs.urgencia}x</div>
          <div>Experiência: {inputs.experiencia}</div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;