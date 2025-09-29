# challange-fiap-react-native
   **Autores:**
    - João Pedro Motta

   ## Descrição
   Aplicativo mobile em **React Native + Expo** para gerenciamento de vagas de pátio de motos, voltado para o time de administração da Mottu. Funcionalidades principais:

   - **Home** (Admin Mottu) com acesso rápido às telas;
   - **Listagem de Pátios**: escolha entre Pátio Principal, Secundário e Coberto;
   - **Mapa de Vagas**: grid de vagas com status (verde = ocupada, cinza = livre);  
   - Clicar em uma vaga abre modal para ver detalhes ou cadastrar/limpar uma moto;
   - **Formulário de Entrada**: cadastrar rapidamente uma moto em vaga disponível;
   - **Perfil**: exibe nome, ID, e-mail e cargo do usuário;
   - **Persistência**: AsyncStorage mantém o estado das vagas entre sessões.

   Todas as telas usam as cores da Mottu (preto de fundo e botão verde #00A859), garantindo consistência visual.

   --

   ## Tecnologias
   - **React Native** (Expo SDK)  
   - **TypeScript**  
   - **React Navigation** (Native Stack Navigator)  
   - **AsyncStorage** para persistência local  
