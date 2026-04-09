import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import { 
  Save, 
  Eye, 
  Download, 
  Undo, 
  Redo, 
  Monitor, 
  Smartphone,
  Grid3X3,
  X,
  Palette
} from 'lucide-react';
import './StudioEditor.css';

const StudioEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showGrid, setShowGrid] = useState(true);

  const handleSave = () => {
    console.log('Salvando:', elements);
    alert('Projeto salvo!');
  };

  const handleExport = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Portfólio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0a0a0f; color: #fff; padding: 40px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .element { position: absolute; }
  </style>
</head>
<body>
  <div class="container">
    ${elements.map(el => {
      switch (el.type) {
        case 'text':
          return `<p style="position:absolute;left:${el.x}px;top:${el.y}px;">${el.content}</p>`;
        case 'button':
          return `<button style="position:absolute;left:${el.x}px;top:${el.y}px;padding:10px 20px;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;border:none;border-radius:6px;cursor:pointer;">${el.content}</button>`;
        case 'image':
          return `<img src="${el.content}" style="position:absolute;left:${el.x}px;top:${el.y}px;width:150px;height:150px;object-fit:cover;border-radius:8px;" />`;
        case 'card':
          return `<div style="position:absolute;left:${el.x}px;top:${el.y}px;width:200px;padding:16px;background:#1a1a1f;border:1px solid #333;border-radius:12px;"><h4>${el.content}</h4><p style="color:#888;font-size:13px;margin-top:8px;">Descrição do card</p></div>`;
        default:
          return '';
      }
    }).join('')}
  </div>
</body>
</html>`;
  };

  return (
    <div className="studio-editor">
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <div className="toolbar-logo">
            <span>CPS</span>
            <span className="badge">Editor</span>
          </div>
        </div>

        <div className="toolbar-center">
          <button 
            className={`toolbar-btn ${showGrid ? 'active' : ''}`}
            onClick={() => setShowGrid(!showGrid)}
            title="Mostrar/Ocultar Grid"
          >
            <Grid3X3 size={18} />
          </button>

          <div className="device-toggle">
            <button 
              className={previewMode === 'desktop' ? 'active' : ''}
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor size={18} />
            </button>
            <button 
              className={previewMode === 'mobile' ? 'active' : ''}
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone size={18} />
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          <button className="toolbar-btn" title="Desfazer">
            <Undo size={18} />
          </button>
          <button className="toolbar-btn" title="Refazer">
            <Redo size={18} />
          </button>
          <button className="toolbar-btn" title="Visualizar">
            <Eye size={18} />
          </button>
          <button className="toolbar-btn primary" onClick={handleSave}>
            <Save size={18} />
            Salvar
          </button>
          <button className="toolbar-btn" onClick={handleExport}>
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      <div className="editor-content">
        <Sidebar />
        <Canvas 
          elements={elements}
          setElements={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
      </div>

      {selectedElement && (
        <div className="properties-panel">
          <div className="panel-header">
            <h4>Propriedades</h4>
            <button onClick={() => setSelectedElement(null)}>
              <X size={16} />
            </button>
          </div>
          <div className="panel-content">
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Selecione um elemento para editar suas propriedades
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudioEditor;