import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Type, MousePointer2, Image as ImageIcon, Square, GripVertical, Trash2, Copy, X, Plus } from 'lucide-react';
import './Canvas.css';

const GRID_SIZE = 50;

const snap = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

const Canvas = ({ elements, setElements, selectedElement, setSelectedElement }) => {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('elementType');
    if (!type) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = snap(e.clientX - rect.left);
    const y = snap(e.clientY - rect.top);

    const newElement = {
      id: Date.now(),
      type,
      x,
      y,
      content: getDefaultContent(type),
      width: type === 'image' ? 150 : type === 'card' ? 200 : 'auto',
      height: type === 'image' ? 150 : type === 'card' ? 120 : 'auto',
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'text': return 'Novo texto';
      case 'button': return 'Clique aqui';
      case 'image': return 'https://via.placeholder.com/150';
      case 'card': return 'Card título';
      default: return 'Elemento';
    }
  };

  const handleMouseDown = (e, element) => {
    e.stopPropagation();
    setSelectedElement(element.id);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDragging(element.id);
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragging || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left - dragOffset.x;
    const rawY = e.clientY - rect.top - dragOffset.y;

    const x = Math.max(0, snap(rawX));
    const y = Math.max(0, snap(rawY));

    setElements(prev => 
      prev.map(el => 
        el.id === dragging ? { ...el, x, y } : el
      )
    );
  }, [dragging, dragOffset, setElements]);

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove]);

  const deleteElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  const duplicateElement = (element) => {
    const newElement = {
      ...element,
      id: Date.now(),
      x: element.x + GRID_SIZE,
      y: element.y + GRID_SIZE,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const renderElement = (element) => {
    const isSelected = selectedElement === element.id;
    const isDragging = dragging === element.id;

    const baseStyle = {
      position: 'absolute',
      left: element.x,
      top: element.y,
      cursor: isDragging ? 'grabbing' : 'grab',
      transition: isDragging ? 'none' : 'all 0.15s ease',
    };

    const elementContent = () => {
      switch (element.type) {
        case 'text':
          return <p style={{ margin: 0, fontSize: '16px' }}>{element.content}</p>;
        case 'button':
          return (
            <button className="canvas-button">
              {element.content}
            </button>
          );
        case 'image':
          return (
            <img 
              src={element.content} 
              alt="Canvas element" 
              style={{ width: element.width, height: element.height, objectFit: 'cover', borderRadius: '8px' }}
            />
          );
        case 'card':
          return (
            <div className="canvas-card">
              <h4>{element.content}</h4>
              <p>Descrição do card</p>
            </div>
          );
        default:
          return <div>{element.content}</div>;
      }
    };

    return (
      <div
        key={element.id}
        className={`canvas-element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{ ...baseStyle, width: element.width }}
        onMouseDown={(e) => handleMouseDown(e, element)}
        onClick={(e) => { e.stopPropagation(); setSelectedElement(element.id); }}
      >
        {elementContent()}
        
        {isSelected && (
          <div className="element-controls">
            <button 
              className="control-btn" 
              onClick={(e) => { e.stopPropagation(); duplicateElement(element); }}
              title="Duplicar"
            >
              <Copy size={14} />
            </button>
            <button 
              className="control-btn delete" 
              onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
              title="Excluir"
            >
              <Trash2 size={14} />
            </button>
            <div className="drag-handle">
              <GripVertical size={14} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={canvasRef}
      className="editor-canvas"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => setSelectedElement(null)}
    >
      <div className="canvas-grid" />
      
      {elements.map(renderElement)}
      
      {elements.length === 0 && (
        <div className="canvas-empty">
          <Plus size={48} />
          <h3>Comece a construir</h3>
          <p>Arraste elementos da sidebar para cá</p>
        </div>
      )}
    </div>
  );
};

export default Canvas;