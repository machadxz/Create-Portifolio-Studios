require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'cps-secret-key-2024';

app.use(cors());
app.use(express.json());

const db = { users: [], portfolios: [], templates: [], reviews: [], settings: {
  siteName: 'CPS - Create Portfolio Studio',
  siteDescription: 'Crie seu portfólio profissional',
  contatoEmail: 'contato@cps.com.br',
  manutencao: false,
  registroAtivo: true,
  templateMarketplace: true,
  defaultPlan: 'FREE'
} };

(async () => {
  const existingAdmin = db.users.find(u => u.email === 'andremmachad@gmail.com');
  if (existingAdmin) {
    db.users = db.users.filter(u => u.email !== 'andremmachad@gmail.com');
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  db.users.push({
    uid: 'admin-001',
    nome: 'André Machado',
    email: 'andremmachad@gmail.com',
    senha: hashedPassword,
    plano: 'SUB',
    trialExpiration: null,
    createdAt: new Date().toISOString(),
    isAdmin: true
  });
  console.log('Admin criado: andremmachad@gmail.com / admin123');
})();

db.templates = [
  {
    id: 't1',
    nome: 'Minimal Pro',
    descricao: 'Template clean e profissional com design minimalista. Perfeito para desenvolvedores e designers.',
    categoria: 'Dev',
    tags: ['minimal', 'clean', 'profissional'],
    preco: 0,
    gratuito: true,
    downloads: 1250,
    createdAt: new Date('2024-01-15').toISOString(),
    creatorId: 'system',
    creatorNome: 'CPS Team',
    featured: true,
    rating: 4.8,
    reviews: []
  },
  {
    id: 't2',
    nome: 'Cyberpunk Neon',
    descricao: 'Template estilo cyberpunk com efeitos neon. Ideal para gamers e devs que amam tecnologia.',
    categoria: 'Gamer',
    tags: ['cyberpunk', 'neon', 'gamer', 'dark'],
    preco: 15,
    gratuito: false,
    downloads: 890,
    createdAt: new Date('2024-02-01').toISOString(),
    creatorId: 'system',
    creatorNome: 'CPS Team',
    featured: true,
    rating: 4.9,
    reviews: []
  },
  {
    id: 't3',
    nome: 'Creative Studio',
    descricao: 'Template vibrante e criativo para designers, artistas e criativos em geral.',
    categoria: 'Designer',
    tags: ['criativo', 'cores', 'arte', 'portfolio'],
    preco: 0,
    gratuito: true,
    downloads: 2100,
    createdAt: new Date('2024-01-20').toISOString(),
    creatorId: 'system',
    creatorNome: 'CPS Team',
    featured: false,
    rating: 4.7,
    reviews: []
  },
  {
    id: 't4',
    nome: 'Influencer Pro',
    descricao: 'Template moderno para influenciadores digitais. Foco em redes sociais e conteúdo.',
    categoria: 'Influencer',
    tags: ['influencer', 'social media', 'moderno', 'instagram'],
    preco: 25,
    gratuito: false,
    downloads: 560,
    createdAt: new Date('2024-02-10').toISOString(),
    creatorId: 'system',
    creatorNome: 'CPS Team',
    featured: true,
    rating: 4.6,
    reviews: []
  },
  {
    id: 't5',
    nome: 'Glass Morphism',
    descricao: 'Template com efeito glassmorphism moderno e elegante.',
    categoria: 'Dev',
    tags: ['glass', 'moderno', 'elegante', 'ui'],
    preco: 10,
    gratuito: false,
    downloads: 780,
    createdAt: new Date('2024-02-15').toISOString(),
    creatorId: 'system',
    creatorNome: 'CPS Team',
    featured: false,
    rating: 4.5,
    reviews: []
  },
  {
    id: 't6',
    nome: 'Dark Portfolio',
    descricao: 'Template dark mode completo com visual profissional.',
    categoria: 'Dev',
    tags: ['dark', 'profissional', 'tech', 'portfolio'],
    preco: 0,
    gratuito: true,
    downloads: 3200,
    createdAt: new Date('2024-01-05').toISOString(),
    creatorId: 'system',
    creatorNome: 'CPS Team',
    featured: true,
    rating: 4.9,
    reviews: []
  }
];

app.post('/api/users/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    if (db.users.find(u => u.email === email)) return res.status(400).json({ error: 'Email já cadastrado' });
    const hashedPassword = await bcrypt.hash(senha, 10);
    const now = new Date();
    const user = {
      uid: uuidv4(), nome, email, senha: hashedPassword, plano: 'FREE',
      trialExpiration: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: now.toISOString()
    };
    db.users.push(user);
    const token = jwt.sign({ uid: user.uid, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: { uid: user.uid, nome: user.nome, email: user.email, plano: user.plano, trialExpiration: user.trialExpiration },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = db.users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(401).json({ error: 'Credenciais inválidas' });
    const token = jwt.sign({ uid: user.uid, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Login realizado com sucesso',
      user: { 
        uid: user.uid, 
        nome: user.nome, 
        email: user.email, 
        plano: user.plano, 
        trialExpiration: user.trialExpiration,
        isAdmin: user.isAdmin || false
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.get('/api/users/profile', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const user = db.users.find(u => u.uid === decoded.uid);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ user: { uid: user.uid, nome: user.nome, email: user.email, plano: user.plano, trialExpiration: user.trialExpiration } });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/users/upgrade', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const user = db.users.find(u => u.uid === decoded.uid);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    user.plano = 'SUB';
    res.json({ message: 'Upgrade realizado!', user: { uid: user.uid, nome: user.nome, email: user.email, plano: user.plano, trialExpiration: user.trialExpiration } });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/portfolios', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const portfolio = { id: uuidv4(), userId: decoded.uid, ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.portfolios.push(portfolio);
    res.status(201).json({ message: 'Portfólio criado', portfolio });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/portfolios', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const portfolios = db.portfolios.filter(p => p.userId === decoded.uid);
    res.json({ portfolios });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.put('/api/portfolios/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const index = db.portfolios.findIndex(p => p.id === req.params.id && p.userId === decoded.uid);
    if (index === -1) return res.status(404).json({ error: 'Portfólio não encontrado' });
    db.portfolios[index] = { ...db.portfolios[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ message: 'Portfólio atualizado', portfolio: db.portfolios[index] });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.delete('/api/portfolios/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const index = db.portfolios.findIndex(p => p.id === req.params.id && p.userId === decoded.uid);
    if (index === -1) return res.status(404).json({ error: 'Portfólio não encontrado' });
    db.portfolios.splice(index, 1);
    res.json({ message: 'Portfólio deletado' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

const verifyAdmin = (authHeader) => {
  if (!authHeader) return { error: 'Token não fornecido', status: 401 };
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const user = db.users.find(u => u.uid === decoded.uid);
    if (!user || !user.isAdmin) return { error: 'Acesso negado - Apenas administradores', status: 403 };
    return { user, error: null };
  } catch (e) {
    return { error: 'Token inválido', status: 401 };
  }
};

app.get('/api/admin/users', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  res.json({ users: db.users.map(u => ({ uid: u.uid, nome: u.nome, email: u.email, plano: u.plano, isAdmin: u.isAdmin, trialExpiration: u.trialExpiration })) });
});

app.get('/api/admin/stats', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  res.json({ stats: { users: { total: db.users.length, free: db.users.filter(u => u.plano === 'FREE').length, sub: db.users.filter(u => u.plano === 'SUB').length, expired: 0 }, portfolios: { total: db.portfolios.length } } });
});

app.put('/api/admin/users/:uid/plan', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
    
    const { plano } = req.body;
    const targetUser = db.users.find(u => u.uid === req.params.uid);
    if (!targetUser) return res.status(404).json({ error: 'Usuário não encontrado' });
    
    targetUser.plano = plano;
    if (plano === 'SUB') {
      targetUser.trialExpiration = null;
    } else {
      const now = new Date();
      targetUser.trialExpiration = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();
    }
    
    res.json({ message: 'Plano atualizado', user: { uid: targetUser.uid, nome: targetUser.nome, email: targetUser.email, plano: targetUser.plano, trialExpiration: targetUser.trialExpiration } });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.delete('/api/admin/users/:uid', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    if (req.params.uid === adminUser.uid) {
      return res.status(400).json({ error: 'Não é possível deletar sua própria conta' });
    }
    
    const index = db.users.findIndex(u => u.uid === req.params.uid);
    if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
    
    db.users.splice(index, 1);
    db.portfolios = db.portfolios.filter(p => p.userId !== req.params.uid);
    
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/admin/portfolios', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const portfolios = db.portfolios.map(p => {
    const user = db.users.find(u => u.uid === p.userId);
    return { ...p, userNome: user?.nome, userEmail: user?.email };
  });
  res.json({ portfolios });
});

app.get('/api/admin/portfolios/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const portfolio = db.portfolios.find(p => p.id === req.params.id);
    if (!portfolio) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    const user = db.users.find(u => u.uid === portfolio.userId);
    res.json({ portfolio: { ...portfolio, userNome: user?.nome, userEmail: user?.email } });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.put('/api/admin/portfolios/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const index = db.portfolios.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    db.portfolios[index] = { ...db.portfolios[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ message: 'Portfólio atualizado', portfolio: db.portfolios[index] });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.delete('/api/admin/portfolios/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const index = db.portfolios.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    db.portfolios.splice(index, 1);
    res.json({ message: 'Portfólio deletado' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/admin/templates', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const templates = db.templates.map(t => {
      const creator = db.users.find(u => u.uid === t.creatorId);
      return { ...t, creatorNome: creator?.nome || t.creatorNome };
    });
    
    res.json({ templates });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.put('/api/admin/templates/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const index = db.templates.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Template não encontrado' });
    
    db.templates[index] = { ...db.templates[index], ...req.body };
    res.json({ message: 'Template atualizado', template: db.templates[index] });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.put('/api/admin/templates/:id/approve', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const template = db.templates.find(t => t.id === req.params.id);
    if (!template) return res.status(404).json({ error: 'Template não encontrado' });
    
    template.status = 'aprovado';
    template.featured = req.body.featured || false;
    res.json({ message: 'Template aprovado', template });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.put('/api/admin/templates/:id/reject', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const template = db.templates.find(t => t.id === req.params.id);
    if (!template) return res.status(404).json({ error: 'Template não encontrado' });
    
    template.status = 'rejeitado';
    template.rejectionReason = req.body.reason || 'Não atender aos padrões de qualidade';
    res.json({ message: 'Template rejeitado', template });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.delete('/api/admin/templates/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const index = db.templates.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Template não encontrado' });
    
    db.templates.splice(index, 1);
    res.json({ message: 'Template deletado' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/admin/analytics', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  
  const totalVisualizacoes = db.portfolios.reduce((acc, p) => acc + (p.analytics?.visualizacoes || 0), 0);
  const totalVisitantes = db.portfolios.reduce((acc, p) => acc + (p.analytics?.visitantes?.size || 0), 0);
  
  const topPortfolios = db.portfolios
    .map(p => ({ ...p, visualizacoes: p.analytics?.visualizacoes || 0 }))
    .sort((a, b) => b.visualizacoes - a.visualizacoes)
    .slice(0, 10);
  
  const topTemplates = [...db.templates]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 10);
    
    res.json({
      analytics: {
        totalVisualizacoes,
        totalVisitantes,
        totalPortfolios: db.portfolios.length,
        totalTemplates: db.templates.length,
        totalUsers: db.users.length,
        topPortfolios,
        topTemplates
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/admin/messages', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    res.json({ messages: db.messages || [] });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/admin/messages/:id/respond', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const message = (db.messages || []).find(m => m.id === req.params.id);
    if (!message) return res.status(404).json({ error: 'Mensagem não encontrada' });
    
    message.resposta = req.body.resposta;
    message.respondidoPor = adminUser.nome;
    message.dataResposta = new Date().toISOString();
    message.status = 'respondido';
    
    res.json({ message });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.delete('/api/admin/messages/:id', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const adminUser = db.users.find(u => u.uid === decoded.uid);
    if (!adminUser || !adminUser.isAdmin) return res.status(403).json({ error: 'Acesso negado - Apenas administradores' });
    
    const index = (db.messages || []).findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Mensagem não encontrada' });
    
    db.messages.splice(index, 1);
    res.json({ message: 'Mensagem deletada' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/maintenance', (req, res) => {
  res.json({ manutencao: db.settings?.manutencao || false });
});

app.get('/api/admin/settings', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  
  res.json({ settings: db.settings });
});

app.put('/api/admin/settings', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  
  console.log('Salvando settings:', req.body);
  db.settings = { ...db.settings, ...req.body };
  console.log('Settings após salvar:', db.settings);
  res.json({ message: 'Configurações salvas', settings: db.settings });
});

app.get('/api/admin/logs', (req, res) => {
  const auth = verifyAdmin(req.headers.authorization);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  
  res.json({ logs: db.adminLogs || [] });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/ai/generate', (req, res) => {
  try {
    const { descricao, tipo } = req.body;
    
    const templates = {
      desenvolvedor: {
        nome: 'Desenvolvedor',
        bio: 'Desenvolvedor passionate por criar soluções inovadoras. Especializado em JavaScript, React e Node.js.',
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'Git'],
        projetos: [
          { titulo: 'E-commerce Platform', descricao: 'Plataforma completa de e-commerce com React e Node.js', link: 'https://github.com' },
          { titulo: 'Task Manager App', descricao: 'Gerenciador de tarefas com React Native', link: 'https://github.com' },
          { titulo: 'Weather Dashboard', descricao: 'Dashboard de clima em tempo real', link: 'https://github.com' }
        ]
      },
      designer: {
        nome: 'Designer',
        bio: 'Designer criativo especializado em UI/UX. Apaixonado por criar experiências visuais memoráveis.',
        skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI Design', 'UX Research'],
        projetos: [
          { titulo: 'Mobile Banking App', descricao: 'App de banco mobile com design moderno', link: 'https://dribbble.com' },
          { titulo: 'E-commerce Redesign', descricao: 'Redesign completo de e-commerce', link: 'https://behance.net' },
          { titulo: 'Brand Identity', descricao: 'Identidade visual completa para startup', link: 'https://behance.net' }
        ]
      },
      editor: {
        nome: 'Editor de Vídeo',
        bio: 'Editor de vídeo profissional com 5+ anos de experiência. Especializado em conteúdo para redes sociais.',
        skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Color Grading', 'Motion Graphics'],
        projetos: [
          { titulo: 'Commercial Campaign', descricao: 'Campanha publicitária para marca nacional', link: 'https://youtube.com' },
          { titulo: 'YouTube Series', descricao: 'Edição de série para YouTube com 1M+ visualizações', link: 'https://youtube.com' },
          { titulo: 'Music Video', descricao: 'Clipe musical com efeitos visuais', link: 'https://youtube.com' }
        ]
      },
      default: {
        nome: 'Profissional',
        bio: descricao || 'Profissional dedicado a criar soluções inovadoras eimpactantes.',
        skills: ['Comunicação', 'Trabalho em Equipe', 'Proatividade', 'Resolução de Problemas'],
        projetos: [
          { titulo: 'Projeto Inovador', descricao: 'Projeto inovador desenvolvido com tecnologias modernas', link: '' },
          { titulo: 'Solução Criativa', descricao: 'Solução criativa para problemas complexos', link: '' }
        ]
      }
    };

    const perfil = descricao.toLowerCase();
    let gerado;

    if (perfil.includes('dev') || perfil.includes('programador') || perfil.includes('desenvolvedor')) {
      gerado = templates.desenvolvedor;
    } else if (perfil.includes('design') || perfil.includes('designer')) {
      gerado = templates.designer;
    } else if (perfil.includes('vídeo') || perfil.includes('video') || perfil.includes('editor')) {
      gerado = templates.editor;
    } else {
      gerado = templates.default;
      gerado.bio = descricao || gerado.bio;
    }

    res.json({ 
      message: 'Portfólio gerado com sucesso!',
      portfolio: {
        ...gerado,
        tema: 'azul',
        template: 'moderno'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar portfólio' });
  }
});

app.get('/api/portfolio/:username', (req, res) => {
  try {
    const { username } = req.params;
    const user = db.users.find(u => u.email.startsWith(username + '@'));
    if (!user) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    const portfolio = db.portfolios.find(p => p.userId === user.uid);
    if (!portfolio) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    res.json({ 
      portfolio: { ...portfolio, username },
      user: { nome: user.nome, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar portfólio' });
  }
});

app.get('/api/analytics', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    
    const portfolio = db.portfolios.find(p => p.userId === decoded.uid);
    if (!portfolio) return res.json({ analytics: { visualizacoes: 0, visitantes: 0, tempoMedio: 0, origem: [] } });
    
    const analytics = portfolio.analytics || { visualizacoes: 0, visitantes: 0, tempoMedio: 0, origem: [], historico: [] };
    res.json({ analytics });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/analytics/track', (req, res) => {
  try {
    const { username } = req.body;
    const user = db.users.find(u => u.email.startsWith(username + '@'));
    if (!user) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    const portfolio = db.portfolios.find(p => p.userId === user.uid);
    if (!portfolio) return res.status(404).json({ error: 'Portfólio não encontrado' });
    
    if (!portfolio.analytics) {
      portfolio.analytics = { visualizacoes: 0, visitantes: new Set(), tempoMedio: 0, origem: [], historico: [] };
    }
    
    portfolio.analytics.visualizacoes += 1;
    portfolio.analytics.visitantes.add(req.ip);
    portfolio.analytics.historico.push({ data: new Date().toISOString(), ip: req.ip });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar visualização' });
  }
});

app.get('/api/achievements', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    
    const allAchievements = [
      { id: 'first_portfolio', name: 'Primeiro Portfólio', description: 'Crie seu primeiro portfólio', icon: '🏆', requerimento: 'portfolio_count' },
      { id: 'profile_complete', name: 'Perfil Completo', description: 'Preencha todas as informações do perfil', icon: '⭐', requerimento: 'profile_complete' },
      { id: 'views_100', name: '100 Visualizações', description: 'Alcance 100 visualizações no seu portfólio', icon: '👀', requerimento: 'views_100' },
      { id: 'views_1000', name: 'Mil Visualizações', description: 'Alcance 1000 visualizações', icon: '🔥', requerimento: 'views_1000' },
      { id: 'pro_user', name: 'Usuário PRO', description: 'Atualize para o plano PRO', icon: '💎', requerimento: 'pro' },
      { id: 'github_connected', name: 'GitHub Conectado', description: 'Conecte sua conta GitHub', icon: '🐙', requerimento: 'github' }
    ];
    
    const user = db.users.find(u => u.uid === decoded.uid);
    const portfolio = db.portfolios.find(p => p.userId === decoded.uid);
    
    const userAchievements = [];
    
    if (portfolio) {
      userAchievements.push(allAchievements[0]);
    }
    
    if (portfolio && portfolio.nome && portfolio.bio && portfolio.skills?.length > 0) {
      userAchievements.push(allAchievements[1]);
    }
    
    if (portfolio?.analytics?.visualizacoes >= 100) {
      userAchievements.push(allAchievements[2]);
    }
    
    if (portfolio?.analytics?.visualizacoes >= 1000) {
      userAchievements.push(allAchievements[3]);
    }
    
    if (user?.plano === 'SUB') {
      userAchievements.push(allAchievements[4]);
    }
    
    res.json({ achievements: allAchievements, unlocked: userAchievements });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conquistas' });
  }
});

app.post('/api/github/import', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    
    const { username } = req.body;
    
    const mockProjects = [
      { name: 'portfolio-generator', description: 'Gerador de portfólio automático', language: 'JavaScript', stars: 45 },
      { name: 'task-manager', description: 'Gerenciador de tarefas em React', language: 'React', stars: 32 },
      { name: 'weather-app', description: 'App de clima em tempo real', language: 'TypeScript', stars: 28 },
      { name: 'ecommerce-api', description: 'API REST para e-commerce', language: 'Node.js', stars: 67 },
      { name: 'dashboard-admin', description: 'Dashboard administrativo', language: 'React', stars: 23 }
    ];
    
    res.json({ 
      message: 'Projetos importados do GitHub',
      projetos: mockProjects.map(p => ({
        titulo: p.name,
        descricao: p.description,
        link: `https://github.com/${username}/${p.name}`,
        tech: p.language,
        stars: p.stars
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao importar projetos' });
  }
});

app.post('/api/ai/improve', (req, res) => {
  try {
    const { portfolio } = req.body;
    
    const sugestoes = [];
    
    if (!portfolio.bio || portfolio.bio.length < 50) {
      sugestoes.push({ tipo: 'bio', mensagem: 'Sua bio está muito curta. Adicione mais detalhes sobre sua experiência e objetivos profissionais.' });
    }
    
    if (!portfolio.skills || portfolio.skills.length < 3) {
      sugestoes.push({ tipo: 'skills', mensagem: 'Adicione mais skills relevantes para seu perfil. Considere adicionar tecnologias específicas.' });
    }
    
    if (!portfolio.projetos || portfolio.projetos.length < 2) {
      sugestoes.push({ tipo: 'projetos', mensagem: 'Adicione pelo menos 2 projetos para mostrar seu trabalho. Inclua links quando possível.' });
    }
    
    if (!portfolio.linkedin) {
      sugestoes.push({ tipo: 'contato', mensagem: 'Adicione seu LinkedIn para facilitar conexões profissionais.' });
    }
    
    if (!portfolio.github) {
      sugestoes.push({ tipo: 'contato', mensagem: 'Adicione seu GitHub para展示 suas habilidades técnicas.' });
    }
    
    const melhorado = { ...portfolio };
    
    if (portfolio.skills && portfolio.skills.length > 0) {
      const techSkills = portfolio.skills.filter(s => 
        ['javascript', 'react', 'node', 'python', 'typescript', 'java', 'css', 'html'].some(t => s.toLowerCase().includes(t))
      );
      if (techSkills.length > 0) {
        melhorado.tema = 'azul';
      }
    }
    
    res.json({ 
      message: 'Análise concluída',
      sugestoes,
      melhorado
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao analisar portfólio' });
  }
});

app.get('/api/marketplace/templates', (req, res) => {
  try {
    const { categoria, gratuito, busca, ordenar } = req.query;
    
    let templates = db.templates.filter(t => !t.status || t.status === 'aprovado');
    
    if (categoria && categoria !== 'all') {
      templates = templates.filter(t => t.categoria && t.categoria.toLowerCase() === categoria.toLowerCase());
    }
    
    if (gratuito !== undefined && gratuito !== '') {
      templates = templates.filter(t => t.gratuito === (gratuito === 'true'));
    }
    
    if (busca) {
      const search = busca.toLowerCase();
      templates = templates.filter(t => 
        t.nome?.toLowerCase().includes(search) || 
        t.descricao?.toLowerCase().includes(search) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(search)))
      );
    }
    
    if (ordenar === 'populares') {
      templates.sort((a, b) => b.downloads - a.downloads);
    } else if (ordenar === 'recentes') {
      templates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (ordenar === 'rating') {
      templates.sort((a, b) => b.rating - a.rating);
    } else {
      templates.sort((a, b) => b.featured - a.featured);
    }
    
    res.json({ templates, total: templates.length });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar templates' });
  }
});

app.get('/api/marketplace/templates/:id', (req, res) => {
  try {
    const template = db.templates.find(t => t.id === req.params.id);
    if (!template) return res.status(404).json({ error: 'Template não encontrado' });
    
    const reviews = db.reviews.filter(r => r.templateId === req.params.id);
    
    res.json({ template, reviews });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar template' });
  }
});

app.post('/api/marketplace/templates', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const user = db.users.find(u => u.uid === decoded.uid);
    
    const { nome, descricao, categoria, tags, preco, gratuito, preview } = req.body;
    
    if (!nome || !descricao || !categoria) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    
    const template = {
      id: 't' + uuidv4(),
      nome,
      descricao,
      categoria,
      tags: tags || [],
      preco: preco || 0,
      gratuito: gratuito !== false,
      downloads: 0,
      createdAt: new Date().toISOString(),
      creatorId: user.uid,
      creatorNome: user.nome,
      featured: false,
      rating: 0,
      reviews: [],
      preview: preview || null,
      status: 'pendente'
    };
    
    db.templates.push(template);
    res.status(201).json({ message: 'Template enviado para moderação', template });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar template' });
  }
});

app.post('/api/marketplace/templates/:id/download', (req, res) => {
  try {
    const template = db.templates.find(t => t.id === req.params.id);
    if (!template) return res.status(404).json({ error: 'Template não encontrado' });
    
    template.downloads += 1;
    
    res.json({ message: 'Download registrado', downloadUrl: `/templates/${template.id}/download` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar download' });
  }
});

app.post('/api/marketplace/templates/:id/review', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    const user = db.users.find(u => u.uid === decoded.uid);
    
    const { rating, comentario } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating inválido' });
    }
    
    const template = db.templates.find(t => t.id === req.params.id);
    if (!template) return res.status(404).json({ error: 'Template não encontrado' });
    
    const review = {
      id: 'r' + uuidv4(),
      templateId: template.id,
      userId: user.uid,
      userNome: user.nome,
      rating,
      comentario,
      createdAt: new Date().toISOString()
    };
    
    db.reviews.push(review);
    
    const templateReviews = db.reviews.filter(r => r.templateId === template.id);
    template.rating = templateReviews.reduce((acc, r) => acc + r.rating, 0) / templateReviews.length;
    template.reviews = templateReviews.length;
    
    res.json({ message: 'Avaliação enviada', review });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar avaliação' });
  }
});

app.get('/api/marketplace/creator/:id', (req, res) => {
  try {
    const creator = db.users.find(u => u.uid === req.params.id);
    if (!creator) return res.status(404).json({ error: 'Criador não encontrado' });
    
    const templates = db.templates.filter(t => t.creatorId === req.params.id);
    const totalDownloads = templates.reduce((acc, t) => acc + t.downloads, 0);
    const totalVendas = templates.filter(t => !t.gratuito).reduce((acc, t) => acc + (t.downloads * t.preco), 0);
    
    res.json({
      creator: {
        uid: creator.uid,
        nome: creator.nome,
        email: creator.email,
        createdAt: creator.createdAt,
        plano: creator.plano
      },
      templates,
      stats: {
        totalTemplates: templates.length,
        totalDownloads,
        totalVendas,
        mediaRating: templates.length > 0 ? templates.reduce((acc, t) => acc + t.rating, 0) / templates.length : 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar criador' });
  }
});

app.get('/api/marketplace/categorias', (req, res) => {
  try {
    const categorias = [...new Set(db.templates.map(t => t.categoria))];
    res.json({ categorias });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

app.listen(PORT, () => console.log(`CPS Backend running on port ${PORT}`));
