---

# 📱 Challenge React Native – Sprint 4

**Autor:** João Pedro Motta

Aplicativo desenvolvido em **React Native (Expo)** como parte do desafio da **Sprint 4 da FIAP**.
O projeto consolida o aprendizado em **navegação, integração com API .NET, autenticação, tema dinâmico, internacionalização (i18n)** e **notificações locais**, além de boas práticas de arquitetura e documentação profissional.

---

## 📌 Índice

* [Tecnologias](#-tecnologias)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Instalação e Execução](#-instalação-e-execução)
* [Funcionalidades](#-funcionalidades)
* [Notificações Locais](#-notificações-locais)
* [Internacionalização (i18n)](#-internacionalização-i18n)
* [Publicação (Firebase App Distribution)](#-publicação-firebase-app-distribution)
* [Tela "Sobre o App"](#-tela-sobre-o-app)
* [Próximos Passos](#-próximos-passos)
* [Licença](#-licença)

---

## 🛠 Tecnologias

* ⚛️ **React Native (Expo)**
* 🎨 **Tema dinâmico (claro/escuro)** via `useAppTheme`
* 🧭 **React Navigation (Native Stack)**
* 🌐 **Integração com API .NET (Axios)**
* 🗂 **AsyncStorage** para persistência local
* 🌎 **i18next + react-i18next** (PT / EN / ES)
* 🔔 **expo-notifications** (notificações locais e push-ready)
* 🧱 **TypeScript**
* ☁️ **Firebase App Distribution** (build e distribuição)

---

## 📂 Estrutura do Projeto

```bash
challenge-3-joaooo07
├── assets/                     # Imagens e ícones
├── src/
│   ├── components/             # Componentes reutilizáveis
│   ├── screens/                # Telas principais
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Units.tsx
│   │   ├── Users.tsx
│   │   ├── FormEntry.tsx
│   │   ├── PatioMap.tsx
│   │   └── About.tsx           # Tela "Sobre o App"
│   ├── services/               # Integrações (API, Auth, etc.)
│   ├── hooks/                  # Hooks personalizados (ex: usePushNotifications)
│   ├── navigation/             # Configuração de rotas e tema
│   └── i18n/                   # Locales e inicialização do i18next
│       ├── locales/
│       │   ├── pt.json
│       │   ├── en.json
│       │   └── es.json
│       └── index.ts
├── App.tsx                     # Ponto de entrada
├── app.json                    # Configuração Expo
└── README.md                   # Documentação
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos

* Node.js >= 18.x
* Expo CLI instalado globalmente (`npm install -g expo-cli`)
* Backend .NET rodando localmente (`https://localhost:5263` ou IP LAN)

### Passos

```bash
# Clone o repositório
git clone https://github.com/joaooo07/challange-react-native-sprint3.git

# Acesse a pasta
cd challange-react-native-sprint3/challenge-3-joaooo07

# Instale as dependências
npm install

# Execute o app (modo desenvolvimento)
npx expo start
```

Para rodar no **emulador Android**:

```bash
npx expo run:android
```

Para rodar **na web**:

```bash
npx expo start --web
```

---

## ✨ Funcionalidades

✅ Login e autenticação de usuários
✅ Integração completa com API .NET
✅ CRUD de **Usuários** e **Unidades (Pátios)**
✅ Suporte a **tema claro/escuro**
✅ **Internacionalização (PT / EN / ES)** em todas as telas
✅ **Tela "Sobre o App"** com versão e commit atual
✅ **Notificações locais** funcionais no mobile
✅ Simulação de notificação na web via `Alert.alert()`
✅ Estrutura modular com hooks e services reutilizáveis

---

## 🔔 Notificações Locais

* O app utiliza o hook `usePushNotifications()` para:

  * Solicitar permissão ao usuário
  * Enviar **notificações locais**
  * Preparar o código para futuras **notificações via Firebase (push)**

### Testar:

Na **Home**, há um botão **"Últimas Notícias"** que dispara:

```tsx
Mottu Informa: Pátio de BMW na Unidade 1 está lotado.
```

> Na web, a notificação aparece via `Alert`.
> No Android/iOS físico, via sistema nativo (`expo-notifications`).

---

## 🌎 Internacionalização (i18n)

Arquivos de idioma:

* `pt.json` 🇧🇷
* `en.json` 🇺🇸
* `es.json` 🇪🇸

O idioma é detectado automaticamente e pode ser alternado manualmente.

Exemplo de chave:

```json
"login": "Entrar",
"password": "Senha",
"invalid_credentials": "Credenciais inválidas"
```

## 🧾 Licença

Projeto desenvolvido para fins educacionais no curso **FIAP - Engenharia de Software**.
Uso livre mediante créditos ao autor.

---

