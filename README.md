# 🏃‍♂️ Sports Connect

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**App mobile criado para promover comunidades saudáveis através do esporte**

</div>

---

## 📋 Sobre

O Sports Connect é uma aplicação mobile (iOS & Android) desenvolvida como projeto de extensão e pesquisa do curso de Engenharia da Computação da Afya. O app conecta pessoas através de eventos esportivos, promovendo saúde e integração social.

### 🎯 Objetivo

Facilitar a criação, descoberta e participação em eventos esportivos, incentivando a prática de atividades físicas e a formação de grupos locais.

---

## ✨ Funcionalidades

- **Criação de Eventos**: Crie eventos com título, data, local e descrição
- **Exploração**: Navegue e descubra eventos próximos ou relevantes
- **Participação**: Confirme presença e integre comunidades esportivas

---

## 🛠 Tecnologias

- **React Native** - Framework mobile multiplataforma
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Tipagem estática para JavaScript
- **MongoDB** - Banco de dados NoSQL
- **Node.js** - Backend e API

### Estrutura

```
Sports-Connect/
├── app/                        # Estrutura principal do front-end (Expo Router)
│   ├── (tabs)/                 # Navegação por abas da aplicação
│   │   ├── _layout.tsx         # Layout base das tabs
│   │   ├── events.tsx          # Tela de eventos esportivos
│   │   ├── explore.tsx         # Tela de exploração de atividades e locais
│   │   ├── index.tsx           # Tela inicial (home)
│   │   └── profile.tsx         # Tela de perfil do usuário
│
├── backend/                    # Estrutura do servidor Node.js/Express
│   ├── config/                 # Configurações do servidor e banco de dados
│   │   ├── config.js
│   │   └── db.js
│   │
│   ├── middleware/             # Middlewares de autenticação e validação
│   │   ├── rateLimiter.js
│   │   └── validation.js
│   │
│   ├── models/                 # Modelos de dados (MongoDB/Mongoose)
│   │   ├── Event.js
│   │   ├── Review.js
│   │   └── User.js
│   │
│   ├── routes/                 # Rotas da API
│   │   ├── events.js
│   │   └── users.js
│   │
│   ├── scripts/                # Scripts utilitários ou de inicialização
│   │   └── setup.js
│   │
│   └── utils/                  # Funções auxiliares
│       └── helpers.js
│
├── .env                        # Variáveis de ambiente (configurações sensíveis)
├── package-lock.json           # Controle de dependências
└── package.json                # Metadados e dependências do projeto
```

## 🚀 Instalação

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- Expo CLI
- MongoDB (local ou Atlas)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/JhonatanMotaDev/Sports-Connect.git
cd Sports-Connect
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env`:
```env
MONGODB_URI=sua_connection_string
API_URL=sua_api_url
```

4. **Inicie o projeto**
```bash
npx expo start
```

### Plataformas

```bash
npx expo start --android  # Android
npx expo start --ios      # iOS
npx expo start --web      # Web
```

---

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m 'feat: Nova funcionalidade'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

### Convenções de Commit

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes

---

## 📦 Build

```bash
# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

---

## 👥 Equipe

**Jhonatan Mota** - [@JhonatanMotaDev](https://github.com/JhonatanMotaDev)

### Instituição
Afya | Montes Claros - Departamento de Engenharia  
Projeto de Extensão e Pesquisa do Curso de Engenharia da Computação

---

## 📄 Licença MIT

MIT License

Copyright (c) [2025] [Jhonatan Mota]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
---

<div align="center">

Feito com ❤️ para promover saúde através do esporte

</div>
