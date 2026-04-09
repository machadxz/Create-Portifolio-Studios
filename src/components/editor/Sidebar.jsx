import React, { useState, useRef, useEffect } from 'react';
import { 
  Type, 
  MousePointer2, 
  Image as ImageIcon, 
  Square,
  Move,
  Trash2,
  Copy,
  Layers,
  Grid3X3,
  Plus
} from 'lucide-react';
import './Sidebar.css';

const ELEMENT_TYPES = [
  { type: 'text', icon: Type, label: 'Texto', defaultContent: 'Novo texto' },
  { type: 'button', icon: MousePointer2, label: 'Botão', defaultContent: 'Clique aqui' },
  { type: 'image', icon: ImageIcon, label: 'Imagem', defaultContent: 'https://via.placeholder.com/150' },
  { type: 'card', icon: Square, label: 'Card', defaultContent: 'Card título' },
];

const Sidebar = ({ onDragStart }) => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('elementType', type);
    e.dataTransfer.effectAllowed = 'copy';
    if (onDragStart) onDragStart(type);
  };

  return (
    <div className="editor-sidebar">
      <div className="sidebar-header">
        <h3><Layers size={18} /> Elementos</h3>
      </div>
      
      <div className="elements-list">
        {ELEMENT_TYPES.map((el) => (
          <div
            key={el.type}
            className="element-item"
            draggable
            onDragStart={(e) => handleDragStart(e, el.type)}
          >
            <el.icon size={20} />
            <span>{el.label}</span>
            <Plus size={14} className="drag-indicator" />
          </div>
        ))}
      </div>

      <div className="sidebar-help">
        <Grid3X3 size={16} />
        <span>Arraste para o canvas</span>
      </div>
    </div>
  );
};

export const ELEMENT_TYPES_LIST = ELEMENT_TYPES;
export default Sidebar;