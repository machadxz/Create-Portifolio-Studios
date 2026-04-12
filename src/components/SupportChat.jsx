import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MessageCircle, Send, X, Minimize2, Maximize2, User, Clock } from 'lucide-react';
import { io } from 'socket.io-client';
import './SupportChat.css';

let socket = null;

const SupportChat = () => {
  const { user, isAuthenticated } = useAuth();
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState('disconnected');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isAdminView, setIsAdminView] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    if (!socket) {
      socket = io('http://localhost:3001');
      
      socket.on('connect', () => console.log('Conectado ao WebSocket'));
      socket.on('supportJoined', (data) => setStatus(data.status));
      socket.on('chatAccepted', () => setStatus('active'));
      socket.on('chatClosed', () => { setStatus('closed'); });
      socket.on('newMessage', (data) => setMessages(prev => [...prev, data.message]));
      socket.on('adminJoined', () => setIsAdminView(true));
    }
    
    socket.emit('joinSupport', { userId: user.uid, nome: user.nome, email: user.email, plano: user.plano });
    
    return () => { if (socket) { socket.emit('leaveSupport', user.uid); socket.disconnect(); socket = null; } };
  }, [isAuthenticated, user]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || status !== 'active') return;
    socket.emit('sendMessage', { userId: user.uid, mensagem: newMessage });
    setMessages(prev => [...prev, { tipo: 'user', texto: newMessage, timestamp: new Date().toISOString() }]);
    setNewMessage('');
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`support-chat ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
      {!isOpen ? (
        <button className="chat-trigger" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} /><span>Suporte</span>
        </button>
      ) : (
        <>
          <div className="chat-header">
            <MessageCircle size={20} />
            <span>{status === 'waiting' ? 'Aguardando...' : status === 'active' ? 'Suporte ativo' : 'Suporte'}</span>
            <div className="header-actions">
              <button onClick={() => setIsMinimized(!isMinimized)}>{isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}</button>
              <button onClick={() => setIsOpen(false)}><X size={16} /></button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="chat-content">
              {status === 'waiting' && (
                <div className="waiting-message">
                  <MessageCircle size={40} />
                  <p>Aguarde, um atendente vai retornar em breve...</p>
                </div>
              )}
              
              {status === 'active' && (
                <>
                  <div className="messages-container">
                    {messages.map((msg, i) => (
                      <div key={i} className={`message ${msg.tipo}`}>
                        <span>{msg.texto}</span>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="message-input">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Digite sua mensagem..." onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
                    <button onClick={sendMessage} disabled={!newMessage.trim()}><Send size={18} /></button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SupportChat;