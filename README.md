# 🏃‍♂️ Sports Connect

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Plataforma mobile para promover comunidades saudáveis através do esporte**

</div>

---

## 📋 Sobre

Sports Connect é uma aplicação móvel desenvolvida como projeto de extensão e pesquisa do curso de Engenharia da Computação da Afya. O app conecta pessoas através de eventos esportivos, promovendo saúde e integração social.

### 🎯 Objetivo

Facilitar a criação, descoberta e participação em eventos esportivos comunitários, incentivando a prática de atividades físicas e a formação de grupos locais.

---

## ✨ Funcionalidades

- **Criação de Eventos**: Crie eventos com título, data, local e descrição
- **Exploração**: Navegue e descubra eventos próximos ou relevantes
- **Participação**: Confirme presença e integre comunidades esportivas
- **Tema Claro/Escuro**: Suporte completo aos modos do dispositivo
- **Interface Responsiva**: Design moderno e intuitivo

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
├── app/                # Estrutura principal (Expo Router)
├── src/
│   ├── screens/       # Telas da aplicação
│   ├── services/      # Serviços e API
│   ├── config/        # Configurações
│   ├── components/    # Componentes reutilizáveis
│   └── types/         # Tipos TypeScript
├── assets/            # Recursos estáticos
└── package.json
```

---

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
Afya - Engenharia da Computação  
Projeto de Extensão e Pesquisa

---

## 📄 Licença

Projeto acadêmico desenvolvido para o curso de Engenharia da Computação da Afya.

---

<div align="center">

Feito com ❤️ para promover saúde através do esporte

</div>
