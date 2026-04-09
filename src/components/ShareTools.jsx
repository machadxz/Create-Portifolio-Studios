import React from 'react';
import { QrCode, Download, Mail, Link2, FileText, Copy, ExternalLink } from 'lucide-react';
import './ShareTools.css';

const ShareTools = ({ portfolio, username }) => {
  const baseUrl = window.location.origin;
  const portfolioUrl = `${baseUrl}/portfolio/${username || 'user'}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para clipboard!');
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolioUrl)}`;
    window.open(qrUrl, '_blank');
  };

  const exportPDF = () => {
    const printWindow = window.open('', '_blank');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${portfolio.nome || 'Meu Portfólio'}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #333; }
          .bio { color: #666; margin: 20px 0; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
          .skill { padding: 8px 16px; background: #f0f0f0; border-radius: 20px; }
          .projects { margin-top: 30px; }
          .project { padding: 20px; border: 1px solid #ddd; margin-bottom: 15px; border-radius: 8px; }
          a { color: #0066cc; }
        </style>
      </head>
      <body>
        <h1>${portfolio.nome || 'Meu Portfólio'}</h1>
        <p class="bio">${portfolio.bio || ''}</p>
        <div class="skills">
          ${(portfolio.skills || []).map(s => `<span class="skill">${s}</span>`).join('')}
        </div>
        <div class="projects">
          <h2>Projetos</h2>
          ${(portfolio.projetos || []).map(p => `
            <div class="project">
              <h3>${p.titulo}</h3>
              <p>${p.descricao}</p>
              ${p.link ? `<a href="${p.link}">Ver projeto</a>` : ''}
            </div>
          `).join('')}
        </div>
        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          Criado com CPS - Create Portfolio Studio
        </footer>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="share-tools">
      <h3>Compartilhar Portfólio</h3>
      
      <div className="share-option">
        <Link2 size={18} />
        <div className="share-info">
          <span className="share-label">Link do Portfólio</span>
          <input type="text" value={portfolioUrl} readOnly />
        </div>
        <button onClick={() => copyToClipboard(portfolioUrl)} title="Copiar">
          <Copy size={16} />
        </button>
      </div>

      <div className="share-option">
        <QrCode size={18} />
        <div className="share-info">
          <span className="share-label">QR Code</span>
          <span className="share-desc">Escaneie para acessar</span>
        </div>
        <button onClick={generateQRCode} title="Gerar QR Code">
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="share-option">
        <FileText size={18} />
        <div className="share-info">
          <span className="share-label">Exportar PDF</span>
          <span className="share-desc">Baixar versão offline</span>
        </div>
        <button onClick={exportPDF} title="Exportar PDF">
          <Download size={16} />
        </button>
      </div>

      <div className="share-option">
        <Mail size={18} />
        <div className="share-info">
          <span className="share-label">Assinatura de Email</span>
          <span className="share-desc">Cole no seu email</span>
        </div>
        <button onClick={() => copyToClipboard(`\n---\nVeja meu portfólio: ${portfolioUrl}\n---`)} title="Copiar">
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
};

export default ShareTools;