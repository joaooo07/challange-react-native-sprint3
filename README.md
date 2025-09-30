# challange-fiap-react-native
   **Autores:**
    - João Pedro Motta

   # 🚀 Challenge React Native Sprint 3

Aplicativo desenvolvido em **React Native (Expo)** como parte do desafio da Sprint 3.  
O projeto tem como objetivo praticar conceitos de **navegação, autenticação, integração com API externa (.NET)**, **tema claro/escuro**, gerenciamento de estado e internacionalização, além de boas práticas com React Native.

---

## 📌 Índice
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Funcionalidades](#-funcionalidades)
- [Próximos Passos](#-próximos-passos)
- [Licença](#-licença)

---

## 🛠 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)  
- [Axios](https://axios-http.com/) (consumo da API .NET)  
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)  
- [i18next](https://www.i18next.com/) e [react-i18next](https://react.i18next.com/)  
- [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js) (Azure AD)  
- [TypeScript](https://www.typescriptlang.org/)  

---

## 📂 Estrutura do Projeto
challenge-3-joaooo07
├── .expo/               # Configurações locais do Expo
├── assets/              # Imagens, ícones e outros assets
├── src/                 # Código fonte principal
│   ├── components/      # Componentes reutilizáveis
│   ├── screens/         # Telas do app (Login, Home, etc.)
│   ├── services/        # Serviços (API .NET, Auth, etc.)
│   └── navigation/      # Configuração das rotas
├── App.tsx              # Arquivo principal da aplicação
├── app.json             # Configuração do Expo
├── tsconfig.json        # Configuração TypeScript
├── package.json         # Dependências e scripts
└── README.md            # Documentação do projeto

---

## ⚙️ Instalação

### Pré-requisitos
- Node.js >= 18.x  
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  
- Backend .NET rodando (para integração com API)  

### Passos
```bash
# Clone este repositório
git clone https://github.com/joaooo07/challange-react-native-sprint3.git

# Acesse a pasta
cd challange-react-native-sprint3/challenge-3-joaooo07

# Instale as dependências
npm install
# ou
yarn install
