# CPS - Create Portfolio Studio
# Se você está usando este processo de nosso WebSite Você pode ocorrer riscos de DMCA (Digital Millennium Copyright Act) Sem autorização pelo Propietário do Site
**"Crie seu portfólio em minutos. Impressione por anos."**

## Quick Start

```bash
# Terminal 1 - Backend (API)
npm run server

# Terminal 2 - Frontend
npm run dev
```

Ou ambos juntos:
```bash
npm start
```

## Estrutura

```
CPS/
├── server.js          # Backend API (Express + JWT)
├── src/
│   ├── components/    # SplashScreen, Navbar, Mascot
│   ├── context/      # ThemeContext, AuthContext
│   ├── pages/        # Home, Studio, Templates, Planos, Admin, Login, Register
│   └── styles/       # CSS global
├── public/           # Static files
└── package.json
```

## Funcionalidades

- **3 Temas**: Azul (Dev), Roxo (Criativo), Vermelho (Hacker)
- **Splash Animada**: Logo CPS com estrela brilhante
- **Mascote Interativo**: Reage a hover e cliques
- **Portfolio Builder**: Editor com preview em tempo real
- **6 Templates**: Moderno, Futurista, Minimalista, Hacker, Gradient, Glass
- **Auto Build IA**: Geração automática
- **Sistema de Planos**: Free Trial 10 dias + PRO R$30
- **Exportação**: Download HTML/CSS
- **Painel Admin**: Gerenciamento de usuários

## API Endpoints

- `POST /api/users/register` - Cadastro
- `POST /api/users/login` - Login
- `POST /api/users/upgrade` - Upgrade para PRO
- `GET/POST/PUT/DELETE /api/portfolios` - CRUD portfólios
- `GET /api/admin/users` - Lista usuários (PRO)
- `GET /api/admin/stats` - Estatísticas (PRO)

## Tecnologias

- React 18 + Vite
- Express.js
- JWT + bcrypt
- Lucide Icons
