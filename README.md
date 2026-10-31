# Barbearia DUB — Topologia & Arquitetura Completa do Ecossistema

Visualizador interativo cósmico da arquitetura de software, fluxos operacionais, banco de dados e integrações da **Barbearia DUB**.

---

## Métricas Mapeadas

- **218 Componentes e Módulos Catalogados**
- **573 Conexões e Relações de Dependência Ativas**
- **92 Tabelas PostgreSQL** com Row Level Security (RLS)
- **50 Supabase Edge Functions** (Deno Serverless)
- **19 Telas e Rotas** (Landing, Auth, Onboarding, Admin, Barbeiro, Cliente, Suporte)
- **8 Gateways e APIs Externas** (Woovi OpenPix, EFI Bank, Evolution WhatsApp, OpenAI GPT-4o, Google Gemini, Instagram Graph API, Firebase FCM)
- **11 Hooks Customizados de Estado Reativo**

---

## Estrutura do Projeto

```
├── index.html                   # Ponto de entrada da aplicação
├── assets/
│   └── logo.png                 # Emblema oficial da Barbearia DUB
├── css/
│   ├── main.css                 # Variáveis do sistema de design e resets
│   ├── header.css               # Cabeçalho executivo, busca global e filtros
│   ├── panel.css                # Painel inspetor lateral e chips de conexões
│   └── tours.css                # Barra de jornadas críticas e controles
└── js/
    ├── data.js                  # Topologia completa dos nós e conexões
    ├── state.js                 # Gerenciamento de estado da aplicação
    ├── physics.js               # Motor de física, espaçamento e layouts
    ├── renderer.js              # Renderizador Canvas 2D em 60 FPS
    ├── events.js                # Interações de mouse, atalhos e busca
    └── app.js                   # Inicialização e orquestração do ciclo de vida
```

---

## Funcionalidades Interativas

1. **Reorganização Dinâmica ao Clicar**:
   - Clicar em qualquer bolinha posiciona o elemento no centro e reorganiza suas conexões em anéis concêntricos espaçados com física de mola suave.
   - Clicar novamente na bolinha selecionada ou no botão **X** desmarca e retorna à visão geral do projeto.
2. **Filtros por Módulo**:
   - Filtragem rápida por *Gestão & Dono, Operação Barbeiro, Experiência Cliente, Motor Pix & Financeiro, Edge Functions, Banco de Dados*, etc.
3. **Fluxos Críticos de Negócio (Jornadas Guiadas)**:
   - **Agendamento & Pix**: Do acesso do cliente ao lembrete automático 2h antes.
   - **Saque Barbeiro**: Conclusão do corte, split de comissão e Pix out protegido por PIN.
   - **Suporte IA BIA**: Canal de suporte 24/7 integrado a modelos de linguagem e RAG.
   - **Automação WhatsApp**: Disparos em massa segmentados e recuperação de inativos.
   - **Infraestrutura Backend**: 50 Edge Functions interagindo com 92 tabelas PostgreSQL.
4. **Busca Instantânea (`Ctrl + K`)**:
   - Localização em tempo real de qualquer componente, rota, tabela ou função.
5. **Radar Minimap**:
   - Visão em tempo real da posição da câmera no universo da aplicação.

---

## Como Executar

Basta abrir o arquivo `index.html` em qualquer navegador web moderno. Não requer dependências, compilação ou servidor local.
