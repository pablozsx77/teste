// Barbearia DUB - Dataset de Topologia & Arquitetura
// Contém 218 nós e 573 conexões ativas mapeadas do ecossistema
const GRAPH_DATA = {
  "clusters": {
    "core": {
      "name": "Núcleo do Sistema",
      "color": "#f8fafc",
      "glow": "#c53018",
      "border": "#c53018"
    },
    "landing": {
      "name": "Público & Onboarding",
      "color": "#94a3b8",
      "glow": "#64748b",
      "border": "#475569"
    },
    "admin": {
      "name": "Gestão & Dono",
      "color": "#d4af37",
      "glow": "#b8972e",
      "border": "#997b20"
    },
    "barber": {
      "name": "Operação Barbeiro",
      "color": "#10b981",
      "glow": "#059669",
      "border": "#047857"
    },
    "client": {
      "name": "Experiência Cliente",
      "color": "#38bdf8",
      "glow": "#0284c7",
      "border": "#0369a1"
    },
    "financial": {
      "name": "Motor Pix & Financeiro",
      "color": "#34d399",
      "glow": "#059669",
      "border": "#047857"
    },
    "whatsapp": {
      "name": "Automação WhatsApp",
      "color": "#22c55e",
      "glow": "#16a34a",
      "border": "#15803d"
    },
    "ai": {
      "name": "Inteligência Artificial",
      "color": "#818cf8",
      "glow": "#6366f1",
      "border": "#4f46e5"
    },
    "subscriptions": {
      "name": "Assinaturas & Planos",
      "color": "#fbbf24",
      "glow": "#d97706",
      "border": "#b45309"
    },
    "store": {
      "name": "Loja & Produtos",
      "color": "#fb923c",
      "glow": "#ea580c",
      "border": "#c2410c"
    },
    "edge_fn": {
      "name": "Supabase Edge Functions",
      "color": "#60a5fa",
      "glow": "#2563eb",
      "border": "#1d4ed8"
    },
    "database": {
      "name": "Banco de Dados (Tabelas)",
      "color": "#f43f5e",
      "glow": "#e11d48",
      "border": "#be123c"
    },
    "external": {
      "name": "APIs & Gateways Externos",
      "color": "#f97316",
      "glow": "#ea580c",
      "border": "#c2410c"
    },
    "hooks": {
      "name": "Hooks & Estado Reativo",
      "color": "#14b8a6",
      "glow": "#0d9488",
      "border": "#0f766e"
    }
  },
  "nodes": [
    {
      "id": "hub_core",
      "name": "BARBEIRO DUB ECOSYSTEM",
      "cluster": "core",
      "category": "Núcleo Central",
      "desc": "Cérebro central da plataforma SaaS BarbeiroDub. Coordena autenticação multi-tenant, roteamento resiliente, persistência local e conexões com Supabase.",
      "val": 42,
      "details": {
        "stack": "React 18 + Vite + TailwindCSS + Supabase + TanStack Query Persist",
        "modelo": "Multi-Tenant White-label com isolamento por barbearia",
        "proposito": "Automatizar 100% da rotina de barbearias: agendamentos, pagamentos Pix com split, marketing WhatsApp e inteligência artificial."
      }
    },
    {
      "id": "hub_landing",
      "name": "Público & Onboarding",
      "cluster": "landing",
      "category": "Páginas de Entrada",
      "desc": "Portal público, landing page estilo Luma, fluxo de auth em 2 etapas e onboarding do dono.",
      "val": 28,
      "details": {}
    },
    {
      "id": "hub_client",
      "name": "Experiência do Cliente",
      "cluster": "client",
      "category": "Agendamento & Fidelidade",
      "desc": "Web app para agendamento rápido, escolha de barbeiro/serviço, pagamento Pix e fidelidade.",
      "val": 30,
      "details": {}
    },
    {
      "id": "hub_barber",
      "name": "Painel do Barbeiro",
      "cluster": "barber",
      "category": "Operação do Profissional",
      "desc": "App mobile-first para barbeiros: agenda em tempo real, confirmação de corte, carteira digital Pix e saques.",
      "val": 30,
      "details": {}
    },
    {
      "id": "hub_admin",
      "name": "Painel do Dono (Admin)",
      "cluster": "admin",
      "category": "Gestão & Inteligência",
      "desc": "Comando executivo: controle de faturamento, rateio de comissões, equipe, horários e relatórios DRE.",
      "val": 32,
      "details": {}
    },
    {
      "id": "hub_financial",
      "name": "Motor Financeiro & Pix",
      "cluster": "financial",
      "category": "Carteira Digital & Pix",
      "desc": "Infraestrutura Pix instantânea via Woovi e EFI. Criação de subcontas, split automático e taxas anti-no-show.",
      "val": 32,
      "details": {}
    },
    {
      "id": "hub_whatsapp",
      "name": "Marketing & WhatsApp",
      "cluster": "whatsapp",
      "category": "Automação de Mensagens",
      "desc": "Motor de disparos em massa, lembretes pré-corte 24h/2h, recuperação de inativos e cupons.",
      "val": 28,
      "details": {}
    },
    {
      "id": "hub_ai",
      "name": "Inteligência Artificial (IA)",
      "cluster": "ai",
      "category": "Assistentes & Geradores",
      "desc": "Assistente BIA 24/7, gerador de promoções inteligentes e legendas com OpenAI e Google Gemini.",
      "val": 28,
      "details": {}
    },
    {
      "id": "hub_subscriptions",
      "name": "Assinaturas & Planos VIP",
      "cluster": "subscriptions",
      "category": "Receita Recorrente",
      "desc": "Planos mensais e cortes ilimitados com cobrança automatizada via Pix recorrente.",
      "val": 26,
      "details": {}
    },
    {
      "id": "hub_store",
      "name": "Loja & Produtos",
      "cluster": "store",
      "category": "E-commerce de Barbearia",
      "desc": "Catálogo integrado de produtos (pomadas, shampoos, óleos) com controle de estoque e pedidos.",
      "val": 24,
      "details": {}
    },
    {
      "id": "hub_edge_functions",
      "name": "Supabase Edge Functions",
      "cluster": "edge_fn",
      "category": "Backend Serverless",
      "desc": "50 funções serverless Deno rodando na borda com segurança RLS, gateways de pagamento e webhooks.",
      "val": 34,
      "details": {}
    },
    {
      "id": "hub_database",
      "name": "Banco de Dados PostgreSQL",
      "cluster": "database",
      "category": "Camada de Dados",
      "desc": "92 tabelas relacionais com RLS, mais de 100 RPCs transacionais e logs de auditoria imutáveis.",
      "val": 36,
      "details": {}
    },
    {
      "id": "hub_external",
      "name": "APIs & Gateways Externos",
      "cluster": "external",
      "category": "Serviços Terceiros",
      "desc": "Integrações com Woovi (OpenPix), EFI Bank, WhatsApp Evolution, OpenAI, Gemini, Instagram e Firebase.",
      "val": 28,
      "details": {}
    },
    {
      "id": "hub_hooks",
      "name": "Hooks & Estado Reativo",
      "cluster": "hooks",
      "category": "Reatividade Frontend",
      "desc": "54 custom hooks para cache otimista, sincronização com Supabase e controle de estado.",
      "val": 26,
      "details": {}
    },
    {
      "id": "page_index",
      "name": "Index (Landing Page)",
      "cluster": "landing",
      "category": "Página",
      "desc": "Landing page de alta conversão estilo Luma com micro-animações, apresentação de features e planos.",
      "val": 16,
      "details": {}
    },
    {
      "id": "page_auth",
      "name": "Auth (Login / Cadastro)",
      "cluster": "landing",
      "category": "Página",
      "desc": "Autenticação em tela cheia estilo Mr. Caseiro: validação de telefone, email e senha.",
      "val": 17,
      "details": {}
    },
    {
      "id": "page_auth_callback",
      "name": "Auth Callback",
      "cluster": "landing",
      "category": "Página",
      "desc": "Tratamento de callbacks de autenticação, verificação de sessão e redirecionamento de permissão.",
      "val": 13,
      "details": {}
    },
    {
      "id": "page_onboarding",
      "name": "Onboarding do Dono",
      "cluster": "landing",
      "category": "Página",
      "desc": "Wizard interativo de 8 etapas para configuração de nova barbearia, unidades, horários e equipe.",
      "val": 19,
      "details": {}
    },
    {
      "id": "page_tenant_public",
      "name": "Tenant Public Page (/b/:slug)",
      "cluster": "landing",
      "category": "Página",
      "desc": "Vitrine pública da barbearia acessada pelos clientes via link na bio ou QR Code.",
      "val": 19,
      "details": {}
    },
    {
      "id": "page_forgot_password",
      "name": "Esqueci a Senha",
      "cluster": "landing",
      "category": "Página",
      "desc": "Solicitação de recuperação de senha com envio seguro de link transacional.",
      "val": 13,
      "details": {}
    },
    {
      "id": "page_reset_password",
      "name": "Resetar Senha",
      "cluster": "landing",
      "category": "Página",
      "desc": "Definição de nova senha com validação de força e criptografia segura.",
      "val": 13,
      "details": {}
    },
    {
      "id": "page_agenda_fullscreen",
      "name": "Agenda Fullscreen",
      "cluster": "admin",
      "category": "Página",
      "desc": "Modo tela cheia para tablets e monitores na bancada da barbearia.",
      "val": 16,
      "details": {}
    },
    {
      "id": "page_admin_relatorios",
      "name": "Admin Relatórios Mensais",
      "cluster": "admin",
      "category": "Página",
      "desc": "Visão detalhada de DRE mensal, comparativo de trimestres e ticket médio.",
      "val": 17,
      "details": {}
    },
    {
      "id": "page_admin_main",
      "name": "Admin Dashboard (/admin)",
      "cluster": "admin",
      "category": "Página",
      "desc": "Painel executivo master com navegação por abas para todas as áreas de gestão.",
      "val": 22,
      "details": {}
    },
    {
      "id": "page_barbeiro_main",
      "name": "Barbeiro App (/barbeiro)",
      "cluster": "barber",
      "category": "Página",
      "desc": "Aplicativo mobile do profissional com agenda do dia, carteira e atendimentos.",
      "val": 22,
      "details": {}
    },
    {
      "id": "page_cliente_main",
      "name": "Cliente App (/cliente)",
      "cluster": "client",
      "category": "Página",
      "desc": "Área autenticada do cliente com agendamentos futuros, histórico e saldo.",
      "val": 18,
      "details": {}
    },
    {
      "id": "page_cliente_agendar",
      "name": "Cliente Agendar (/cliente/agendar)",
      "cluster": "client",
      "category": "Página",
      "desc": "Fluxo completo de reserva com seleção de barbeiro, horário e pagamento.",
      "val": 21,
      "details": {}
    },
    {
      "id": "page_cliente_assinar",
      "name": "Cliente Assinar (/cliente/assinar)",
      "cluster": "subscriptions",
      "category": "Página",
      "desc": "Catálogo e checkout de assinaturas de cortes mensais.",
      "val": 17,
      "details": {}
    },
    {
      "id": "page_support_chat",
      "name": "Suporte com IA - BIA (/suporte)",
      "cluster": "ai",
      "category": "Página",
      "desc": "Chat conversacional com inteligência artificial para clientes e profissionais.",
      "val": 18,
      "details": {}
    },
    {
      "id": "page_unit_admin_auth",
      "name": "Unit Admin Auth",
      "cluster": "admin",
      "category": "Página",
      "desc": "Login isolado para gerentes de unidades locais e filiais.",
      "val": 14,
      "details": {}
    },
    {
      "id": "page_unit_admin_dash",
      "name": "Unit Admin Dashboard",
      "cluster": "admin",
      "category": "Página",
      "desc": "Gestão operacional exclusiva da filial sem acesso ao financeiro geral da rede.",
      "val": 16,
      "details": {}
    },
    {
      "id": "page_test_login",
      "name": "Test Auto Login",
      "cluster": "landing",
      "category": "Página",
      "desc": "Ambiente de desenvolvimento para simulação rápida de personas (dono, barbeiro, cliente).",
      "val": 12,
      "details": {}
    },
    {
      "id": "page_not_found",
      "name": "Página 404",
      "cluster": "landing",
      "category": "Página",
      "desc": "Tratamento amigável de links quebrados com redirecionamento inteligente.",
      "val": 11,
      "details": {}
    },
    {
      "id": "adm_dashboard_kpis",
      "name": "Dashboard & Métricas em Tempo Real",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Cards de faturamento bruto, líquido, ticket médio, taxa de ocupação e novos clientes.",
      "val": 17,
      "details": {}
    },
    {
      "id": "adm_agenda_grid",
      "name": "Agenda Multi-Profissional (Semanal/Diária)",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Grade visual completa de todos os barbeiros com bloqueios, encaixes e cores de status.",
      "val": 18,
      "details": {}
    },
    {
      "id": "adm_financeiro_flow",
      "name": "Gestão Financeira & Comissões",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Relatório de comissões pagas, repasses pendentes e despesas operacionais.",
      "val": 18,
      "details": {}
    },
    {
      "id": "adm_equipe_barbeiros",
      "name": "Gestão de Equipe & Permissões",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Cadastro de barbeiros, definição de comissão percentual por serviço e regras de trabalho.",
      "val": 17,
      "details": {}
    },
    {
      "id": "adm_servicos_catalog",
      "name": "Catálogo de Serviços & Duração",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Cadastro de cortes, barba, químicas, tempos de execução e categorização.",
      "val": 16,
      "details": {}
    },
    {
      "id": "adm_horarios_config",
      "name": "Horários da Casa & Exceções",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Configuração de expediente padrão da barbearia, feriados e folgas coletivas.",
      "val": 16,
      "details": {}
    },
    {
      "id": "adm_unidades_rede",
      "name": "Rede Multi-Unidade (Franquias)",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Gestão de filiais, atribuição de equipe por unidade e controle de endereço.",
      "val": 17,
      "details": {}
    },
    {
      "id": "adm_crm_clientes",
      "name": "CRM de Clientes & Histórico",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Base completa com frequência, valor vitalício (LTV), débitos de no-show e bloqueios.",
      "val": 16,
      "details": {}
    },
    {
      "id": "adm_campanhas_mkt",
      "name": "Campanhas de Marketing & Automação",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Automação de mensagens para inativos, aniversariantes e promoções relâmpago.",
      "val": 17,
      "details": {}
    },
    {
      "id": "adm_disparos_painel",
      "name": "Disparador em Massa WhatsApp",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Envio em lotes via WhatsApp com delay anti-ban e agendamento prévio.",
      "val": 17,
      "details": {}
    },
    {
      "id": "adm_cupons_promocoes",
      "name": "Cupons & Descontos",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Criação de cupons promocionais com regras de uso e validade.",
      "val": 15,
      "details": {}
    },
    {
      "id": "adm_planos_gestao",
      "name": "Gestão de Planos & Assinaturas VIP",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Configuração de mensalidades com limites de cortes e renovação automática.",
      "val": 16,
      "details": {}
    },
    {
      "id": "adm_loja_estoque",
      "name": "Loja de Produtos & Estoque",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Controle de estoque de cosméticos, pedidos de balcão e margem de lucro.",
      "val": 16,
      "details": {}
    },
    {
      "id": "adm_suporte_tickets",
      "name": "Painel de Atendimento & Tickets",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Visualização de conversas da IA BIA e intervenção humana quando solicitada.",
      "val": 15,
      "details": {}
    },
    {
      "id": "adm_dados_empresa",
      "name": "Dados Cadastrais & Hub Visual",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "Identificação empresarial, CNPJ, WhatsApp institucional, logo e cores do app.",
      "val": 15,
      "details": {}
    },
    {
      "id": "adm_seguranca_pin",
      "name": "Segurança do Painel & PIN",
      "cluster": "admin",
      "category": "Módulo Admin",
      "desc": "PIN financeiro para aprovação de saques e alterações críticas no sistema.",
      "val": 15,
      "details": {}
    },
    {
      "id": "barb_dashboard_view",
      "name": "Dashboard Pessoal do Barbeiro",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Faturamento do dia, total de cortes realizados, comissão acumulada e próximos horários.",
      "val": 17,
      "details": {}
    },
    {
      "id": "barb_agenda_timeline",
      "name": "Agenda em Linha do Tempo",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Timeline dinâmica com identificação de slots livres, clientes agendados e intervalo de almoço.",
      "val": 18,
      "details": {}
    },
    {
      "id": "barb_carteira_pix",
      "name": "Carteira Digital Pix",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Visualização do saldo real via subconta Woovi, extrato detalhado e solicitações de saque.",
      "val": 19,
      "details": {}
    },
    {
      "id": "barb_saque_instantaneo",
      "name": "Saque Pix com PIN de Segurança",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Transferência direta de saldo para a chave Pix do barbeiro com proteção de PIN.",
      "val": 18,
      "details": {}
    },
    {
      "id": "barb_confirmacao_cortes",
      "name": "Confirmação & Finalização de Cortes",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Marcação de atendimento concluído, cobrança em dinheiro/Pix e lançamento no extrato.",
      "val": 17,
      "details": {}
    },
    {
      "id": "barb_horarios_individuais",
      "name": "Escala de Trabalho & Modo Férias",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Customização da jornada do profissional e bloqueio temporário por férias ou atestado.",
      "val": 16,
      "details": {}
    },
    {
      "id": "barb_portfolio_insta",
      "name": "Portfólio de Cortes via Instagram",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Exibição de cortes postados no Instagram profissional para valorizar o perfil.",
      "val": 15,
      "details": {}
    },
    {
      "id": "barb_avaliacoes_feed",
      "name": "Avaliações & Reputação do Barbeiro",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Feed de notas e comentários deixados pelos clientes após o corte.",
      "val": 15,
      "details": {}
    },
    {
      "id": "barb_meu_plano",
      "name": "Meu Plano SaaS Barbeiro",
      "cluster": "barber",
      "category": "Módulo Barbeiro",
      "desc": "Acompanhamento da assinatura de uso da plataforma pelo profissional autônomo.",
      "val": 14,
      "details": {}
    },
    {
      "id": "ef_admin_cancel_appointments",
      "name": "admin-cancel-appointments",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de motor de agendamentos e horários: admin-cancel-appointments.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "creditos",
          "notificacoes",
          "pagamentos",
          "user_roles"
        ]
      }
    },
    {
      "id": "ef_ai_support_chat",
      "name": "ai-support-chat",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de Inteligência Artificial: ai-support-chat.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "ai_actions_log",
          "assinaturas",
          "configuracoes_horario",
          "creditos",
          "horarios_excepcionais",
          "logs_agendamentos",
          "pagamentos",
          "pending_bookings",
          "pending_tickets",
          "pontos",
          "profiles",
          "resgates",
          "support_conversations",
          "support_messages",
          "support_tickets",
          "system_logs",
          "webhook_logs"
        ]
      }
    },
    {
      "id": "ef_cancel_subscription",
      "name": "cancel-subscription",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'cancel-subscription'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "assinaturas"
        ]
      }
    },
    {
      "id": "ef_check_availability",
      "name": "check-availability",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de Inteligência Artificial: check-availability.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "barbeiros",
          "pending_bookings"
        ]
      }
    },
    {
      "id": "ef_confirm_plan_payment",
      "name": "confirm-plan-payment",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'confirm-plan-payment'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "assinaturas",
          "barbeiros",
          "pagamentos",
          "pagamentos_plano_barbearia",
          "profiles",
          "user_roles"
        ]
      }
    },
    {
      "id": "ef_create_barber",
      "name": "create-barber",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* CREATE-BARBER — Cria um barbeiro DUB (admin global)  REFATORADO: Usa _shared/response.ts e _shared/auth.ts  Fluxo: Verifica admin → cria auth user → cria barbeiro →        armazena dados privados → atribui role",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "barbeiros_private",
          "user_roles"
        ]
      }
    },
    {
      "id": "ef_create_payment",
      "name": "create-payment",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* Valida CPF usando o algoritmo oficial",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "barbeiro_servico_duracao",
          "barbeiros",
          "configuracoes_horario",
          "configuracoes_horario_barbeiro",
          "horarios_excepcionais",
          "horarios_excepcionais_barbeiro",
          "notificacoes",
          "pagamentos",
          "pending_bookings",
          "profiles",
          "servicos"
        ]
      }
    },
    {
      "id": "ef_create_subscription",
      "name": "create-subscription",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'create-subscription'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "assinaturas",
          "barbeiros",
          "planos",
          "profiles"
        ]
      }
    },
    {
      "id": "ef_create_tenant_barber",
      "name": "create-tenant-barber",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'create-tenant-barber'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "barbeiros_private",
          "tenants",
          "user_roles"
        ]
      }
    },
    {
      "id": "ef_create_tenant_plan_subscription",
      "name": "create-tenant-plan-subscription",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* create-tenant-plan-subscription Assinatura SaaS da barbearia via Pix Automático Woovi (PIX_RECURRING, jornada 3: o primeiro pagamento já autoriza a recorrência mensal). O valor é direcionado à subconta \"DUB\". A barbearia só é liberada depois que o banco confirma o pagamento.  Ações:  - { action: \"",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "informacoes_empresa",
          "profiles",
          "system_config",
          "tenant_assinaturas",
          "tenant_members",
          "tenant_planos",
          "tenant_unidades",
          "tenants",
          "woovi_charges"
        ]
      }
    },
    {
      "id": "ef_delete_barber",
      "name": "delete-barber",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* DELETE-BARBER — Exclui completamente um barbeiro do sistema  REFATORADO: Usa _shared/response.ts e _shared/auth.ts  Remove: agendamentos, pagamentos, comissões, avaliações, horários, portfólio, financeiro, WhatsApp, dados privados, perfil, roles e usuário do auth.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "account_deletion_feedback",
          "admin_google_tokens",
          "agendamento_lembretes_log",
          "agendamentos",
          "ai_actions_log",
          "ai_feedback",
          "assinaturas",
          "audit_logs",
          "barbeiro_avaliacoes",
          "barbeiro_google_tokens",
          "barbeiro_portfolio",
          "barbeiro_servico_duracao",
          "barbeiro_unidades",
          "barbeiros",
          "barbeiros_private",
          "chaves_pix",
          "comissoes",
          "configuracoes_horario_barbeiro",
          "contas_bancarias",
          "creditos",
          "depositos",
          "dispositivos_conectados",
          "email_confirmation_tokens",
          "financeiro_auth_attempts",
          "financeiro_auth_sessions",
          "horarios_excepcionais_barbeiro",
          "logs_agendamentos",
          "notificacoes",
          "pagamentos",
          "pending_bookings",
          "pending_tickets",
          "pin_financeiro",
          "plano_agendamentos_usos",
          "pontos",
          "profiles",
          "resgates",
          "saques",
          "support_conversations",
          "support_tickets",
          "tenants",
          "user_roles",
          "wallet_balances",
          "wallet_deposits",
          "wallet_transactions",
          "whatsapp_instances",
          "whatsapp_verification_codes"
        ]
      }
    },
    {
      "id": "ef_delete_tenant_account",
      "name": "delete-tenant-account",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* Edge Function: delete-tenant-account  Remove completamente uma barbearia (tenant) do sistema: 2. Remove instâncias WhatsApp da Evolution API 3. Apaga todos os dados do banco vinculados ao tenant 4. Remove o registro do tenant e o user_role do owner",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "account_deletion_feedback",
          "admin_google_tokens",
          "agendamento_lembretes_log",
          "agendamentos",
          "ai_actions_log",
          "ai_feedback",
          "audit_logs",
          "barbeiro_avaliacoes",
          "barbeiro_google_tokens",
          "barbeiro_servico_duracao",
          "barbeiros",
          "barbeiros_private",
          "chaves_pix",
          "comissoes",
          "configuracoes_horario_barbeiro",
          "contas_bancarias",
          "creditos",
          "depositos",
          "discount_coupons",
          "disparos_programados",
          "dispositivos_conectados",
          "email_confirmation_tokens",
          "financeiro_auth_attempts",
          "financeiro_auth_sessions",
          "horarios_excepcionais_barbeiro",
          "notificacoes",
          "pagamentos",
          "pending_bookings",
          "pending_tickets",
          "pin_financeiro",
          "plano_agendamentos_usos",
          "planos",
          "pontos",
          "profiles",
          "promocoes",
          "resgates",
          "saques",
          "servicos",
          "support_conversations",
          "support_tickets",
          "tenant_members",
          "tenant_mensagem_templates",
          "tenant_webhook_config",
          "tenants",
          "user_roles",
          "wallet_balances",
          "wallet_deposits",
          "wallet_transactions",
          "whatsapp_instances",
          "whatsapp_verification_codes"
        ]
      }
    },
    {
      "id": "ef_delete_unit",
      "name": "delete-unit",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* DELETE-UNIT EDGE FUNCTION  Exclusão atômica de uma unidade com cascade correto: 1. Deleta vínculos em barbeiro_unidades 2. Nullifica unidade_id em agendamentos 3. Nullifica unidade_id em barbeiros 4. Deleta o registro em tenant_unidades  Ordem respeita FK constraints (filhas antes do pai).",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "barbeiro_unidades",
          "barbeiros",
          "barber_unit_roles",
          "client_booking_blocks",
          "configuracoes_horario_unidade",
          "horarios_excepcionais",
          "tenant_unidades"
        ]
      }
    },
    {
      "id": "ef_efi_create_pix_charge",
      "name": "efi-create-pix-charge",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira EFI Bank: efi-create-pix-charge.",
      "val": 15,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "chaves_pix",
          "efi_pix_charges"
        ]
      }
    },
    {
      "id": "ef_efi_send_pix",
      "name": "efi-send-pix",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira EFI Bank: efi-send-pix.",
      "val": 15,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "carteiras",
          "chaves_pix",
          "transacoes_financeiras"
        ]
      }
    },
    {
      "id": "ef_efi_validate_pix_key",
      "name": "efi-validate-pix-key",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira EFI Bank: efi-validate-pix-key.",
      "val": 15,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros"
        ]
      }
    },
    {
      "id": "ef_efi_webhook",
      "name": "efi-webhook",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira EFI Bank: efi-webhook.",
      "val": 15,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "carteiras",
          "efi_pix_charges",
          "efi_webhook_events"
        ]
      }
    },
    {
      "id": "ef_encrypt_pix_key",
      "name": "encrypt-pix-key",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* encrypt-pix-key Recebe a chave PIX em texto plano e a salva criptografada (AES-256-GCM) usando PIX_ENCRYPTION_KEY (32 bytes em base64 ou hex) configurada no servidor.  Body: {   tipo,   chave,   apelido?,   nome_titular?,   instituicao?,   barbeiro_id?,   is_default? }",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "chaves_pix"
        ]
      }
    },
    {
      "id": "ef_execute_scheduled_dispatches",
      "name": "execute-scheduled-dispatches",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de mensageria e automação WhatsApp: execute-scheduled-dispatches.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "disparos_programados",
          "profiles",
          "system_logs",
          "tenants",
          "webhook_config",
          "whatsapp_instances"
        ]
      }
    },
    {
      "id": "ef_generate_caption",
      "name": "generate-caption",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de Inteligência Artificial: generate-caption.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": []
      }
    },
    {
      "id": "ef_generate_dispatch_message",
      "name": "generate-dispatch-message",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de mensageria e automação WhatsApp: generate-dispatch-message.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": []
      }
    },
    {
      "id": "ef_generate_promotion_ai",
      "name": "generate-promotion-ai",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de Inteligência Artificial: generate-promotion-ai.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "system_logs"
        ]
      }
    },
    {
      "id": "ef_generate_subscription_charges",
      "name": "generate-subscription-charges",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'generate-subscription-charges'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "assinaturas"
        ]
      }
    },
    {
      "id": "ef_google_calendar_sync",
      "name": "google-calendar-sync",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'google-calendar-sync'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos"
        ]
      }
    },
    {
      "id": "ef_health_check",
      "name": "health-check",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* HEALTH-CHECK — Verifica a saúde dos serviços integrados  Migrado para padrão ok/fail de _shared/response.ts",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "profiles",
          "system_health_checks"
        ]
      }
    },
    {
      "id": "ef_instagram_auth",
      "name": "instagram-auth",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* Edge function para gerenciar autenticação OAuth do Instagram.  Endpoints: - POST { action: \"get_auth_url\", barbeiro_id } → retorna URL de autorização - POST { action: \"exchange_code\", code, barbeiro_id } → troca code por token - POST { action: \"disconnect\", barbeiro_id } → remove conexão - POST {",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "instagram_connections",
          "instagram_posts_cache"
        ]
      }
    },
    {
      "id": "ef_manage_clients",
      "name": "manage-clients",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'manage-clients'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "audit_logs",
          "barbeiros",
          "profiles",
          "servicos",
          "system_config",
          "tenant_clientes",
          "tenants",
          "user_roles",
          "wallet_balances"
        ]
      }
    },
    {
      "id": "ef_process_withdrawal",
      "name": "process-withdrawal",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'process-withdrawal'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": []
      }
    },
    {
      "id": "ef_renew_subscription",
      "name": "renew-subscription",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* ═══════════════════════════════════════════════════════════ RENEW-SUBSCRIPTION — Renovação antecipada de plano ═══════════════════════════════════════════════════════════  Fluxo:   1. Autenticação via JWT   2. Chama RPC renovar_plano_cliente (valida usos restantes)   3. Dinheiro → RPC já renovou,",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "assinaturas",
          "notificacoes",
          "planos"
        ]
      }
    },
    {
      "id": "ef_reset_client_password",
      "name": "reset-client-password",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'reset-client-password'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "audit_logs",
          "user_roles"
        ]
      }
    },
    {
      "id": "ef_save_efi_credentials",
      "name": "save-efi-credentials",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira EFI Bank: save-efi-credentials.",
      "val": 15,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "efi_credenciais",
          "user_roles"
        ]
      }
    },
    {
      "id": "ef_send_appointment_reminders",
      "name": "send-appointment-reminders",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de mensageria e automação WhatsApp: send-appointment-reminders.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamento_lembretes_log",
          "agendamentos",
          "agente_config",
          "agente_webhook_global",
          "barbeiros",
          "mensagem_templates",
          "profiles",
          "servicos",
          "tenants",
          "webhook_config",
          "whatsapp_instances"
        ]
      }
    },
    {
      "id": "ef_send_confirmation_email",
      "name": "send-confirmation-email",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de Inteligência Artificial: send-confirmation-email.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "email_confirmation_tokens",
          "system_logs"
        ]
      }
    },
    {
      "id": "ef_send_push_notification",
      "name": "send-push-notification",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Edge Function serverless responsável pela operação 'send-push-notification'.",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "barbeiros_private",
          "barber_fcm_tokens",
          "decrypted_secrets",
          "whatsapp_instances"
        ]
      }
    },
    {
      "id": "ef_send_webhook_event",
      "name": "send-webhook-event",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* Formata o número de telefone no padrão WhatsApp: NUMERO@s.whatsapp.net",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "barbeiros",
          "mensagem_templates",
          "profiles",
          "system_logs",
          "tenants",
          "webhook_config",
          "whatsapp_instances"
        ]
      }
    },
    {
      "id": "ef_speech_to_text",
      "name": "speech-to-text",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de Inteligência Artificial: speech-to-text.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": []
      }
    },
    {
      "id": "ef_store_api",
      "name": "store-api",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* ═══════════════════════════════════════════════════════════ STORE-API — API unificada do módulo de Loja ═══════════════════════════════════════════════════════════  Consolida todas as operações de loja em uma única Edge Function para economizar slots. Roteamento via campo \"action\" no body.  Action",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "financeiro_auth_sessions",
          "notificacoes",
          "pedido_itens",
          "pedidos",
          "produtos",
          "reservas_estoque",
          "saques",
          "tenants",
          "woovi_charges"
        ]
      }
    },
    {
      "id": "ef_update_unit_barbers",
      "name": "update-unit-barbers",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "* UPDATE-UNIT-BARBERS EDGE FUNCTION  Atualiza atomicamente os vínculos entre barbeiros e uma unidade. 1. Deleta todos os vínculos existentes para a unidade 2. Insere os novos vínculos (se houver)  Se o insert falhar após o delete, a unidade ficará sem vínculos — preferível a um estado inconsistente",
      "val": 14,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiro_unidades"
        ]
      }
    },
    {
      "id": "ef_validate_appointment",
      "name": "validate-appointment",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de motor de agendamentos e horários: validate-appointment.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos",
          "barbeiros",
          "pending_bookings"
        ]
      }
    },
    {
      "id": "ef_whatsapp_proxy",
      "name": "whatsapp-proxy",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de mensageria e automação WhatsApp: whatsapp-proxy.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agente_webhook_global",
          "ai_agents",
          "barbeiros",
          "barbeiros_private",
          "tenants",
          "whatsapp_instances"
        ]
      }
    },
    {
      "id": "ef_whatsapp_verification",
      "name": "whatsapp-verification",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de mensageria e automação WhatsApp: whatsapp-verification.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "system_logs",
          "tenant_clientes",
          "tenants",
          "webhook_config",
          "whatsapp_instances",
          "whatsapp_verification_codes"
        ]
      }
    },
    {
      "id": "ef_woovi_auto_withdraw_cron",
      "name": "woovi-auto-withdraw-cron",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-auto-withdraw-cron.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "saques"
        ]
      }
    },
    {
      "id": "ef_woovi_create_charge",
      "name": "woovi-create-charge",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-create-charge.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "agendamentos"
        ]
      }
    },
    {
      "id": "ef_woovi_create_subaccount",
      "name": "woovi-create-subaccount",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-create-subaccount.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros"
        ]
      }
    },
    {
      "id": "ef_woovi_get_balance",
      "name": "woovi-get-balance",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-get-balance.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros"
        ]
      }
    },
    {
      "id": "ef_woovi_history",
      "name": "woovi-history",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-history.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "saques",
          "woovi_charges"
        ]
      }
    },
    {
      "id": "ef_woovi_update_settings",
      "name": "woovi-update-settings",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-update-settings.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros"
        ]
      }
    },
    {
      "id": "ef_woovi_wallet",
      "name": "woovi-wallet",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-wallet.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "financeiro_auth_sessions",
          "saques",
          "system_config",
          "woovi_charges"
        ]
      }
    },
    {
      "id": "ef_woovi_webhook",
      "name": "woovi-webhook",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-webhook.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "webhook_logs",
          "woovi_charges"
        ]
      }
    },
    {
      "id": "ef_woovi_withdraw",
      "name": "woovi-withdraw",
      "cluster": "edge_fn",
      "category": "Supabase Edge Function",
      "desc": "Função de integração financeira Woovi/OpenPix: woovi-withdraw.",
      "val": 16,
      "details": {
        "runtime": "Deno / TypeScript",
        "tabelas_acessadas": [
          "barbeiros",
          "financeiro_auth_sessions",
          "saques"
        ]
      }
    },
    {
      "id": "tbl_agendamentos",
      "name": "agendamentos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tabela mestre de agendamentos: data, hora, cliente, barbeiro, status, total e notas.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "barbeiro_id",
          "servico_id",
          "data",
          "hora",
          "duracao",
          "status",
          "preco",
          "is_free",
          "usado_redemption_id",
          "observacoes",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "auth",
          "servicos",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ai_actions_log",
      "name": "ai_actions_log",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Registro de ações tomadas autonomamente pelo agente de IA.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "created_at",
          "session_id",
          "conversation_id",
          "user_id",
          "action_type",
          "action_name",
          "parameters",
          "result",
          "success",
          "error_message",
          "before_state",
          "after_state",
          "auto_approved",
          "approved_by"
        ],
        "referencias": [
          "support_conversations"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ai_feedback",
      "name": "ai_feedback",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Avaliações de usuários sobre as respostas fornecidas pela IA BIA.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "created_at",
          "conversation_id",
          "message_id",
          "user_id",
          "rating",
          "helpful",
          "comment",
          "resolved_issue"
        ],
        "referencias": [
          "support_messages",
          "support_conversations"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_assinaturas",
      "name": "assinaturas",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Contratos ativos de assinaturas de clientes com contagem de cortes.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "plano_id",
          "status",
          "next_billing_date",
          "payment_method",
          "gateway_subscription_id",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "auth",
          "planos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_audit_logs",
      "name": "audit_logs",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Rastreabilidade de ações críticas (quem alterou o que e quando).",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "action",
          "entity_type",
          "entity_id",
          "old_values",
          "new_values",
          "ip_address",
          "user_agent",
          "created_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barbeiro_formas_pagamento",
      "name": "barbeiro_formas_pagamento",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Métodos de pagamento aceitos pelo barbeiro (Pix, Dinheiro, Cartão).",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "user_id",
          "pix_habilitado",
          "pagamento_barbearia_habilitado",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barbeiro_servico_duracao",
      "name": "barbeiro_servico_duracao",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tempo de execução e preço customizado por barbeiro para cada serviço.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "servico_id",
          "duracao_personalizada",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "servicos",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barbeiro_taxa_cancelamento",
      "name": "barbeiro_taxa_cancelamento",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Configurações individuais de tolerância e valor de taxa por no-show.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "tenant_id",
          "habilitado",
          "tipo",
          "valor",
          "horas_antecedencia",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barbeiro_unidades",
      "name": "barbeiro_unidades",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Vínculo de unidades onde o profissional presta atendimento.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "unidade_id",
          "is_primary",
          "created_at"
        ],
        "referencias": [
          "tenant_unidades",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barbeiros",
      "name": "barbeiros",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Perfil do profissional: foto, biografia, chave Pix, comissão e configurações operacionais.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "apelido",
          "comissao_pct",
          "ativo",
          "created_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barber_fcm_tokens",
      "name": "barber_fcm_tokens",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tokens de push notification de dispositivos móveis dos barbeiros.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "token",
          "platform",
          "user_agent",
          "last_seen_at",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_barber_home_snapshot",
      "name": "barber_home_snapshot",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Snapshot serializado da tela inicial do barbeiro para carregamento instantâneo offline.",
      "val": 12,
      "details": {
        "colunas": [
          "barbeiro_id",
          "computed_for_date",
          "today_count",
          "yesterday_count",
          "pending_cash_count",
          "month_cuts",
          "last_month_cuts",
          "apt_month_revenue",
          "apt_last_month_revenue",
          "plan_cash_month",
          "plan_cash_last_month",
          "plan_pix_month",
          "plan_pix_last_month",
          "next_appointment",
          "recent_appointments"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_campanhas_config",
      "name": "campanhas_config",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Definições de campanhas de reativação de clientes e marketing.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "tipo",
          "ativo",
          "indicacoes_necessarias",
          "premio_descricao",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_carteiras",
      "name": "carteiras",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Controle de saldo disponível, saldo bloqueado e rendimentos por barbeiro.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "saldo_disponivel",
          "pix_automatico_ativo",
          "chave_pix",
          "tipo_chave_pix",
          "chave_pix_validada",
          "chave_pix_titular",
          "chave_pix_validada_em",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_chaves_pix",
      "name": "chaves_pix",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Chaves Pix de barbeiros e barbearias validadas para transações.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "barbeiro_id",
          "tipo",
          "chave",
          "apelido",
          "is_default",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_client_booking_blocks",
      "name": "client_booking_blocks",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Registro de bloqueios de clientes por faltas recorrentes ou comportamento indevido.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "client_user_id",
          "scope",
          "barbeiro_id",
          "blocked_by_user_id",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenants",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_client_home_snapshot",
      "name": "client_home_snapshot",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Snapshot em cache da tela do cliente para renderização rápida sem rede.",
      "val": 12,
      "details": {
        "colunas": [
          "user_id",
          "profile",
          "appointments",
          "pending_bookings",
          "has_active_plan",
          "available_credits",
          "paid_completed_count",
          "total_completed_count",
          "redemptions_total",
          "redemptions_available",
          "required_points",
          "points",
          "loyalty_active",
          "is_stale",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_cliente_debitos_cancelamento",
      "name": "cliente_debitos_cancelamento",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Débitos pendentes gerados contra clientes que cancelaram fora do prazo.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "cliente_id",
          "barbeiro_id",
          "tenant_id",
          "agendamento_id",
          "valor_taxa",
          "tipo_taxa",
          "porcentagem_aplicada",
          "valor_servico_original",
          "motivo",
          "status",
          "pix_charge_id",
          "pix_payload",
          "pix_qrcode",
          "pago_em"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_comissoes",
      "name": "comissoes",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Detalhamento de comissões calculadas por cada atendimento concluído.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "appointment_id",
          "valor",
          "percentual",
          "pago",
          "created_at"
        ],
        "referencias": [
          "agendamentos",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_configuracoes_horario",
      "name": "configuracoes_horario",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Grade semanal padrão de horários de abertura e fechamento da barbearia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "dia_semana",
          "aberto",
          "hora_abertura",
          "hora_fechamento",
          "hora_almoco_inicio",
          "hora_almoco_fim",
          "delay_entre_servicos",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_configuracoes_horario_unidade",
      "name": "configuracoes_horario_unidade",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Horários específicos por unidade filial da rede.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "unidade_id",
          "dia_semana",
          "aberto",
          "hora_abertura",
          "hora_fechamento",
          "hora_almoco_inicio",
          "hora_almoco_fim",
          "delay_entre_servicos",
          "slot_interval_minutes",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenant_unidades",
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_contas_bancarias",
      "name": "contas_bancarias",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Dados bancários cadastrados para repasse e transferências.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "barbeiro_id",
          "banco_codigo",
          "banco_nome",
          "titular_nome",
          "titular_cpf_cnpj",
          "agencia",
          "conta",
          "conta_digito",
          "tipo_conta",
          "is_default",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_contas_financeiras",
      "name": "contas_financeiras",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Contas contábeis para controle de fluxo de caixa e centros de custo.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "responsavel_nome",
          "responsavel_barbeiro_id",
          "tipo_conta",
          "asaas_account_id",
          "asaas_wallet_id",
          "efi_account_id",
          "observacoes",
          "ativo",
          "created_at",
          "updated_at",
          "created_by"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_creditos",
      "name": "creditos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Saldo de créditos concedidos aos clientes para uso em novos cortes.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "valor",
          "origem",
          "usado",
          "agendamento_origem_id",
          "agendamento_usado_id",
          "created_at",
          "expires_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_depositos",
      "name": "depositos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Créditos inseridos na plataforma via gateway ou estorno.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "barbeiro_id",
          "valor",
          "status",
          "pix_qr_code",
          "pix_payload",
          "gateway_payment_id",
          "expires_at",
          "confirmado_em",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_discount_coupons",
      "name": "discount_coupons",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Cupons de desconto com código alfanumérico e percentual.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "code",
          "nome",
          "percent",
          "active",
          "starts_at",
          "expires_at",
          "created_at"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_disparos_programados",
      "name": "disparos_programados",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Fila de mensagens programadas para envio via WhatsApp com horário fixado.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "mensagem",
          "contatos_ids",
          "data_programada",
          "executado",
          "executado_em",
          "resultado",
          "created_at",
          "created_by"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_dispositivos_autorizados",
      "name": "dispositivos_autorizados",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Dispositivos confiáveis habilitados para login sem OTP.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "device_fingerprint",
          "device_name",
          "device_type",
          "descricao",
          "autorizado_por",
          "created_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_dispositivos_conectados",
      "name": "dispositivos_conectados",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Sessões ativas com IP, user-agent e última atividade.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "device_fingerprint",
          "device_name",
          "device_type",
          "browser",
          "os",
          "ip_address",
          "last_activity",
          "is_active",
          "created_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_efi_pix_charges",
      "name": "efi_pix_charges",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Cobranças geradas pelo gateway de contingência EFI Bank.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "txid",
          "loc_id",
          "br_code",
          "qr_code_image",
          "valor",
          "barbeiro_id",
          "user_id",
          "chave_pix_destino",
          "descricao",
          "status",
          "expires_at",
          "paid_at",
          "e2e_id",
          "raw_charge"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_efi_pix_payouts",
      "name": "efi_pix_payouts",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Transferências Pix efetuadas pelo EFI Bank.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "charge_id",
          "barbeiro_id",
          "idempotency_key",
          "efi_id_envio",
          "e2e_id",
          "chave_pix_destino",
          "valor",
          "status",
          "error_message",
          "raw_response",
          "created_at",
          "updated_at",
          "completed_at"
        ],
        "referencias": [
          "barbeiros",
          "efi_pix_charges"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_efi_saldo_alertas",
      "name": "efi_saldo_alertas",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Alertas de saldo mínimo na conta bancária corporativa.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "ambiente",
          "saldo_atual",
          "limite_minimo",
          "resolvido",
          "resolvido_em",
          "detalhes",
          "created_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_efi_webhook_events",
      "name": "efi_webhook_events",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Log de webhooks recebidos do banco EFI Bank.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "event_signature",
          "txid",
          "e2e_id",
          "payload",
          "processed_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_email_confirmation_tokens",
      "name": "email_confirmation_tokens",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tokens de validação de email no cadastro.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "token",
          "expires_at",
          "created_at",
          "used_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_financeiro_marco_zero",
      "name": "financeiro_marco_zero",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Ponto de referência contábil para auditorias e reconciliação de saldo.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "data_corte",
          "criado_por",
          "created_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_financial_entries",
      "name": "financial_entries",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Lançamentos financeiros de receitas e despesas gerais da barbearia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tipo",
          "categoria",
          "descricao",
          "valor",
          "data",
          "nota_anexo",
          "related_appointment_id",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "agendamentos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_horarios_excepcionais",
      "name": "horarios_excepcionais",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Horários especiais, feriados ou bloqueios extraordinários na agenda.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "data",
          "aberto",
          "hora_abertura",
          "hora_fechamento",
          "hora_almoco_inicio",
          "hora_almoco_fim",
          "motivo",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_informacoes_aplicativo",
      "name": "informacoes_aplicativo",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Versão do app, changelog e notas de atualização.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "categoria",
          "chave",
          "titulo",
          "conteudo",
          "ordem",
          "ativo",
          "atualizado_em",
          "atualizado_por"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_informacoes_empresa",
      "name": "informacoes_empresa",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Cadastro empresarial, termos de uso e política de privacidade.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "categoria",
          "chave",
          "valor",
          "ativo",
          "atualizado_em"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_instagram_connections",
      "name": "instagram_connections",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tokens de acesso e dados da conta do Instagram conectada.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "ig_user_id",
          "ig_username",
          "access_token",
          "token_expires_at",
          "profile_picture_url",
          "show_posts_on_landing",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_instagram_posts_cache",
      "name": "instagram_posts_cache",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Cache de imagens recentes do Instagram para rápida exibição no perfil.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "connection_id",
          "ig_post_id",
          "media_type",
          "media_url",
          "thumbnail_url",
          "caption",
          "permalink",
          "post_timestamp",
          "cached_at"
        ],
        "referencias": [
          "instagram_connections"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_logs_agendamentos",
      "name": "logs_agendamentos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Histórico imutável de alterações de status dos agendamentos.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "agendamento_id",
          "usuario_id",
          "acao",
          "timestamp",
          "detalhes"
        ],
        "referencias": [
          "agendamentos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_loja_cupons",
      "name": "loja_cupons",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Cupons de desconto válidos exclusivamente para itens da loja física.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "produto_id",
          "codigo",
          "descricao",
          "tipo_desconto",
          "valor_desconto",
          "valor_minimo",
          "max_usos_total",
          "max_usos_por_cliente",
          "usos_count",
          "valido_de",
          "valido_ate",
          "ativo",
          "created_by"
        ],
        "referencias": [
          "produtos",
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_manutencao_emails_permitidos",
      "name": "manutencao_emails_permitidos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Lista de emails com acesso permitido durante o Modo Manutenção.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "email",
          "descricao",
          "created_at",
          "created_by"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_mensagem_templates",
      "name": "mensagem_templates",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Templates de texto com tags dinâmicas como {nome}, {horario} e {barbeiro}.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "slug",
          "nome",
          "descricao",
          "conteudo",
          "variaveis_disponiveis",
          "categoria",
          "ativo",
          "updated_by",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_notificacoes",
      "name": "notificacoes",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Notificações internas in-app entregues no painel do usuário.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "tipo",
          "titulo",
          "mensagem",
          "agendamento_id",
          "lida",
          "created_at"
        ],
        "referencias": [
          "auth",
          "agendamentos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pagamentos",
      "name": "pagamentos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tabela PostgreSQL do ecossistema: pagamentos.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "assinatura_id",
          "agendamento_id",
          "metodo",
          "valor",
          "status",
          "gateway_payment_id",
          "data_pagamento",
          "created_at"
        ],
        "referencias": [
          "assinaturas",
          "auth",
          "agendamentos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pagamentos_plano_barbearia",
      "name": "pagamentos_plano_barbearia",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Faturamento das assinaturas do próprio SaaS da plataforma.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "assinatura_id",
          "user_id",
          "barbeiro_id",
          "confirmado_por",
          "valor",
          "competencia",
          "observacoes",
          "created_at"
        ],
        "referencias": [
          "assinaturas",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pending_bookings",
      "name": "pending_bookings",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Reservas em processo de pagamento ou aguardando aprovação.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "servico_id",
          "barbeiro_id",
          "data",
          "hora",
          "duracao",
          "preco",
          "observacoes",
          "payment_intent_id",
          "payment_method",
          "created_at",
          "expires_at"
        ],
        "referencias": [
          "servicos",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pending_tickets",
      "name": "pending_tickets",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Chamados que necessitam de intervenção de um atendente humano.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "pending_ticket_id",
          "created_at",
          "session_id",
          "conversation_id",
          "user_id",
          "user_name",
          "user_phone",
          "user_email",
          "summary",
          "description",
          "priority",
          "category",
          "retry_count",
          "status"
        ],
        "referencias": [
          "support_tickets",
          "support_conversations"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pin_financeiro",
      "name": "pin_financeiro",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Hash criptográfico de PINs de segurança para movimentações na carteira.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "pin_hash",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pix_charge_audit",
      "name": "pix_charge_audit",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Log de auditoria e validação de pagamentos Pix recebidos.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "charge_id",
          "txid",
          "previous_status",
          "new_status",
          "decision_reason",
          "heuristic_signals",
          "decided_by",
          "created_at"
        ],
        "referencias": [
          "pix_charges"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_plano_servicos",
      "name": "plano_servicos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Serviços incluídos em cada plano de assinatura.",
      "val": 12,
      "details": {
        "colunas": [
          "plano_id",
          "servico_id",
          "created_at"
        ],
        "referencias": [
          "servicos",
          "planos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_planos",
      "name": "planos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Planos de fidelidade e assinaturas mensais de cortes para clientes.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "nome",
          "descricao",
          "preco_mensal",
          "limite_agendamentos_mes",
          "prioridade_agendamento",
          "beneficios_json",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_pontos",
      "name": "pontos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Controle de pontuação do programa de fidelidade por cliente.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "promocao_id",
          "pontos",
          "last_awarded_at",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "auth",
          "promocoes"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_portfolio_images",
      "name": "portfolio_images",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Galeria de fotos de cortes enviadas diretamente pelo barbeiro.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "tenant_id",
          "image_url",
          "caption",
          "ordem",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenants",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_profiles",
      "name": "profiles",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Perfis de usuários do Supabase Auth com nome, telefone, email e avatar.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "nome",
          "cpf",
          "blocked",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_promocoes",
      "name": "promocoes",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Promoções vigentes com regras de desconto automático na finalização.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "nome",
          "descricao",
          "pontos_necessarios",
          "weekly_required",
          "ativo",
          "created_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_push_subscriptions",
      "name": "push_subscriptions",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Inscrições de Web Push Notification para alertas no navegador.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "barbeiro_id",
          "endpoint",
          "p256dh",
          "auth",
          "subscription_json",
          "device_type",
          "user_agent",
          "last_seen_at",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "auth",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_relatorios_mensais",
      "name": "relatorios_mensais",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Dados consolidados de fechamento mensal para relatórios DRE.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "mes",
          "ano",
          "receita_total",
          "receita_app",
          "receita_barbearia",
          "receita_credito",
          "receita_plano",
          "taxas_asaas",
          "lucro_liquido",
          "total_agendamentos",
          "agendamentos_completados",
          "agendamentos_cancelados",
          "agendamentos_no_show",
          "variacao_receita_percentual"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_resgates",
      "name": "resgates",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Histórico de benefícios e cortes resgatados com pontos de fidelidade.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "promocao_id",
          "status",
          "appointment_id",
          "created_at",
          "used_at",
          "expired_at"
        ],
        "referencias": [
          "agendamentos",
          "auth",
          "promocoes"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_saques",
      "name": "saques",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Solicitações de transferência Pix realizadas pelos profissionais.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "barbeiro_id",
          "valor",
          "chave_pix_id",
          "chave_pix_valor",
          "chave_pix_tipo",
          "status",
          "motivo_cancelamento",
          "processado_em",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "chaves_pix",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_servicos",
      "name": "servicos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Catálogo de serviços oferecidos com preço base, duração em minutos e categoria.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "nome",
          "descricao",
          "duracao_minutos",
          "preco",
          "custo_produtos",
          "custo_mao_obra",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_support_conversations",
      "name": "support_conversations",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Sessões de conversa mantidas com a IA no chat de suporte.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "status",
          "created_at",
          "updated_at",
          "last_message_at",
          "rating",
          "resolved_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_support_messages",
      "name": "support_messages",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Histórico de mensagens trocadas nos chamados de suporte.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "conversation_id",
          "role",
          "content",
          "metadata",
          "created_at"
        ],
        "referencias": [
          "support_conversations"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_support_tickets",
      "name": "support_tickets",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Chamados de suporte abertos por clientes ou barbeiros.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "conversation_id",
          "user_id",
          "title",
          "description",
          "status",
          "priority",
          "category",
          "location",
          "error_message",
          "metadata",
          "created_at",
          "updated_at",
          "resolved_at"
        ],
        "referencias": [
          "auth",
          "support_conversations"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_system_config",
      "name": "system_config",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Variáveis de configuração do sistema em runtime.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "chave",
          "valor",
          "descricao",
          "updated_at",
          "updated_by"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_system_health_checks",
      "name": "system_health_checks",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Métricas de saúde e disponibilidade dos serviços.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "service_name",
          "status",
          "last_check_at",
          "error_message",
          "response_time_ms",
          "metadata"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_system_logs",
      "name": "system_logs",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Log central de erros e exceções não tratadas.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "level",
          "category",
          "message",
          "details",
          "user_id",
          "created_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_taxas_gateway",
      "name": "taxas_gateway",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Configuração de tarifas operacionais de cartão e Pix dos gateways.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "metodo_pagamento",
          "tipo_taxa",
          "valor_taxa",
          "descricao",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_assinaturas",
      "name": "tenant_assinaturas",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Assinatura do SaaS da barbearia com a plataforma DUB.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "plano_id",
          "status",
          "trial_start",
          "trial_end",
          "subscription_start",
          "next_billing_date",
          "cancelled_at",
          "payment_method",
          "payment_reference",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenant_planos",
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_cakto_events",
      "name": "tenant_cakto_events",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Webhooks de pagamento da plataforma de checkout Cakto.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "event_type",
          "cakto_order_id",
          "payload",
          "processed",
          "created_at"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_clientes",
      "name": "tenant_clientes",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Visão isolada de clientes vinculados ao tenant.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "user_id",
          "created_at",
          "added_by"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_members",
      "name": "tenant_members",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Membros e administradores com acesso à barbearia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "user_id",
          "role",
          "created_at"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_mensagem_templates",
      "name": "tenant_mensagem_templates",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Templates customizados no nível da barbearia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "slug",
          "conteudo",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_plano_faixas",
      "name": "tenant_plano_faixas",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Faixas de preço e limites de barbeiros por plano SaaS.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "plano_id",
          "min_barbeiros",
          "max_barbeiros",
          "preco_cheio",
          "preco_promocional",
          "created_at"
        ],
        "referencias": [
          "tenant_planos"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_planos",
      "name": "tenant_planos",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Tabela de planos da plataforma DUB para as barbearias.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "nome",
          "descricao",
          "preco_mensal",
          "preco_anual",
          "destaque",
          "funcionalidades",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_unidades",
      "name": "tenant_unidades",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Unidades associadas ao tenant.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "nome",
          "slug",
          "cnpj",
          "cpf",
          "email",
          "telefone",
          "whatsapp",
          "site",
          "logo_url",
          "cep",
          "rua",
          "numero",
          "complemento"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenant_webhook_config",
      "name": "tenant_webhook_config",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Configurações de webhooks específicas da barbearia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "tenant_id",
          "webhook_url",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "tenants"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_tenants",
      "name": "tenants",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Registro do tenant proprietário da barbearia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "owner_user_id",
          "nome",
          "slogan",
          "cnpj",
          "cpf",
          "email",
          "telefone",
          "whatsapp",
          "site",
          "logo_url",
          "rua",
          "numero",
          "bairro",
          "cidade"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ti_impersonation_logs",
      "name": "ti_impersonation_logs",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Auditoria de acessos administrativos de suporte técnico.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "operador_id",
          "operador_email",
          "cliente_id",
          "cliente_nome",
          "cliente_email",
          "token",
          "expires_at",
          "usado_em",
          "ip_address",
          "created_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ti_mudancas_agendadas",
      "name": "ti_mudancas_agendadas",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Agendamento de migrações e manutenções programadas.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "operador_id",
          "operador_email",
          "titulo",
          "descricao",
          "tipo",
          "payload",
          "payload_antes",
          "payload_depois",
          "status",
          "aplicar_em",
          "aplicada_em",
          "cancelada_em",
          "erro_msg",
          "created_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ti_permissoes",
      "name": "ti_permissoes",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Permissões de desenvolvedores e time de engenharia.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "perm_clientes",
          "perm_usuarios",
          "perm_barbearias",
          "perm_tenants",
          "perm_agendamentos",
          "perm_financeiro",
          "perm_notificacoes",
          "perm_webhooks",
          "perm_dispositivos",
          "perm_manutencao",
          "perm_logs",
          "perm_agendadas",
          "perm_monitoramento"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ti_security_config",
      "name": "ti_security_config",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Políticas de segurança, rate limit e bloqueios de IP.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "password_hash",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_ti_usuarios",
      "name": "ti_usuarios",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Usuários com credenciais de acesso ao suporte avançado TI.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "email",
          "nome",
          "ativo",
          "criado_por",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_transacoes_financeiras",
      "name": "transacoes_financeiras",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Livro-razão financeiro com todas as movimentações de entrada e saída.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "carteira_id",
          "barbeiro_id",
          "tipo",
          "valor",
          "status",
          "saldo_anterior",
          "saldo_posterior",
          "efi_e2e_id",
          "efi_charge_id",
          "chave_pix_destino",
          "descricao",
          "erro_mensagem",
          "metadata",
          "created_at"
        ],
        "referencias": [
          "efi_pix_charges",
          "barbeiros",
          "carteiras"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_user_roles",
      "name": "user_roles",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Definição de papéis de controle de acesso (admin, barber, client, unit_admin).",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "role",
          "created_at"
        ],
        "referencias": [
          "auth"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_webhook_config",
      "name": "webhook_config",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Configuração de endpoints para envio de eventos externos.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "webhook_url",
          "ativo",
          "created_at",
          "updated_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_webhook_logs",
      "name": "webhook_logs",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Histórico de disparos de webhooks com payload e código de resposta.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "provider",
          "event_type",
          "payload",
          "processed_at",
          "created_at"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_whatsapp_instances",
      "name": "whatsapp_instances",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Instâncias da Evolution API/Z-API conectadas via QR Code ou Pairing Code.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "barbeiro_id",
          "instance_name",
          "api_key",
          "status",
          "qrcode_base64",
          "connected_at",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_whatsapp_verification_codes",
      "name": "whatsapp_verification_codes",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Códigos de validação de número de WhatsApp.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "user_id",
          "phone",
          "code",
          "expires_at",
          "verified_at",
          "attempts",
          "created_at",
          "user_name",
          "user_email",
          "user_cpf"
        ],
        "referencias": [],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "tbl_woovi_charges",
      "name": "woovi_charges",
      "cluster": "database",
      "category": "Tabela PostgreSQL",
      "desc": "Cobranças Pix criadas na Woovi com CorrelationID, QR Code e status.",
      "val": 12,
      "details": {
        "colunas": [
          "id",
          "agendamento_id",
          "barbeiro_id",
          "correlation_id",
          "charge_id",
          "br_code",
          "qr_code_image",
          "value_centavos",
          "status",
          "paid_at",
          "raw_response",
          "created_at",
          "updated_at"
        ],
        "referencias": [
          "agendamentos",
          "barbeiros"
        ],
        "seguranca": "RLS (Row Level Security) Ativo"
      }
    },
    {
      "id": "api_woovi",
      "name": "Woovi / OpenPix API",
      "cluster": "external",
      "category": "API Pix",
      "desc": "API bancária de Pix instantâneo, subcontas e liquidação automatizada em segundos.",
      "val": 22,
      "details": {}
    },
    {
      "id": "api_efi",
      "name": "EFI Bank API (Gerencianet)",
      "cluster": "external",
      "category": "Banco Digital",
      "desc": "Gateway financeiro com certificado digital mTLS para emissão de Pix e verificação DICT.",
      "val": 19,
      "details": {}
    },
    {
      "id": "api_evolution",
      "name": "Evolution API (WhatsApp)",
      "cluster": "external",
      "category": "Conector WhatsApp",
      "desc": "Servidor WebSocket/HTTP que gerencia instâncias do WhatsApp e entrega de mensagens.",
      "val": 21,
      "details": {}
    },
    {
      "id": "api_openai",
      "name": "OpenAI API (GPT-4o)",
      "cluster": "external",
      "category": "Inteligência Artificial",
      "desc": "Modelos de linguagem para atendimento inteligente com RAG e assistente virtual BIA.",
      "val": 20,
      "details": {}
    },
    {
      "id": "api_gemini",
      "name": "Google Gemini API",
      "cluster": "external",
      "category": "Inteligência Artificial",
      "desc": "Modelo de linguagem para geração multimodal e criação de cópias publicitárias.",
      "val": 18,
      "details": {}
    },
    {
      "id": "api_instagram",
      "name": "Instagram Graph API",
      "cluster": "external",
      "category": "Rede Social",
      "desc": "API da Meta para sincronização automática de fotos recentes e carrosséis no app.",
      "val": 17,
      "details": {}
    },
    {
      "id": "api_google_cal",
      "name": "Google Calendar API",
      "cluster": "external",
      "category": "Calendário",
      "desc": "Sincronização com o calendário Google pessoal do barbeiro para evitar overbooking.",
      "val": 16,
      "details": {}
    },
    {
      "id": "api_firebase",
      "name": "Firebase Cloud Messaging (FCM)",
      "cluster": "external",
      "category": "Web Push",
      "desc": "Infraestrutura do Google para entrega instantânea de notificações Push em celulares.",
      "val": 18,
      "details": {}
    },
    {
      "id": "hk_appointments",
      "name": "useAppointments",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Consome e sincroniza a lista de agendamentos em tempo real via Supabase Realtime.",
      "val": 16,
      "details": {}
    },
    {
      "id": "hk_agenda_mutations",
      "name": "useAgendaMutations",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Mutações otimistas para criação, reagendamento e cancelamento de horários sem travar a UI.",
      "val": 16,
      "details": {}
    },
    {
      "id": "hk_barber_agenda",
      "name": "useBarberAgenda",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Carrega horários, pausas e compromissos específicos do barbeiro selecionado.",
      "val": 15,
      "details": {}
    },
    {
      "id": "hk_barber_dashboard",
      "name": "useBarberDashboard",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Calcula métricas diárias, faturamento e resumo financeiro do profissional.",
      "val": 16,
      "details": {}
    },
    {
      "id": "hk_woovi_wallet",
      "name": "useWooviWallet",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Consulta saldo, status da subconta e histórico de transações da carteira.",
      "val": 17,
      "details": {}
    },
    {
      "id": "hk_auth_ready",
      "name": "useAuthReady",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Garante que o estado de autenticação está consolidado antes de liberar navegação restrita.",
      "val": 15,
      "details": {}
    },
    {
      "id": "hk_tenant",
      "name": "useTenant",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Recupera os dados da barbearia ativa com base no slug ou domínio acessado.",
      "val": 17,
      "details": {}
    },
    {
      "id": "hk_push",
      "name": "usePushNotifications",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Controla autorização do navegador e envia o token de inscrição para a tabela push_subscriptions.",
      "val": 14,
      "details": {}
    },
    {
      "id": "hk_maintenance",
      "name": "useMaintenanceMode",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Intercepta rotas e renderiza tela de bloqueio quando a barbearia entra em manutenção.",
      "val": 14,
      "details": {}
    },
    {
      "id": "hk_status_bar",
      "name": "useStatusBarColor",
      "cluster": "hooks",
      "category": "Custom Hook",
      "desc": "Ajusta a barra de status do celular conforme o tema (escuro/claro/carteira) no PWA.",
      "val": 13,
      "details": {}
    }
  ],
  "links": [
    {
      "source": "hub_core",
      "target": "hub_landing",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_client",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_barber",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_admin",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_financial",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_whatsapp",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_ai",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_subscriptions",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_store",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_edge_functions",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_database",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_external",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_core",
      "target": "hub_hooks",
      "type": "powers",
      "label": "coordena"
    },
    {
      "source": "hub_landing",
      "target": "page_index",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_auth",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_auth_callback",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_onboarding",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_tenant_public",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_forgot_password",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_reset_password",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_admin",
      "target": "page_agenda_fullscreen",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_admin",
      "target": "page_admin_relatorios",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_admin",
      "target": "page_admin_main",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_barber",
      "target": "page_barbeiro_main",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_client",
      "target": "page_cliente_main",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_client",
      "target": "page_cliente_agendar",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_subscriptions",
      "target": "page_cliente_assinar",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_ai",
      "target": "page_support_chat",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_admin",
      "target": "page_unit_admin_auth",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_admin",
      "target": "page_unit_admin_dash",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_test_login",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "hub_landing",
      "target": "page_not_found",
      "type": "route",
      "label": "rota"
    },
    {
      "source": "page_admin_main",
      "target": "adm_dashboard_kpis",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_agenda_grid",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_financeiro_flow",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_equipe_barbeiros",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_servicos_catalog",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_horarios_config",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_unidades_rede",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_crm_clientes",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_campanhas_mkt",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_disparos_painel",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_cupons_promocoes",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_planos_gestao",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_loja_estoque",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_suporte_tickets",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_dados_empresa",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_admin_main",
      "target": "adm_seguranca_pin",
      "type": "contains",
      "label": "aba do painel"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_dashboard_view",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_agenda_timeline",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_carteira_pix",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_saque_instantaneo",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_confirmacao_cortes",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_horarios_individuais",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_portfolio_insta",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_avaliacoes_feed",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "page_barbeiro_main",
      "target": "barb_meu_plano",
      "type": "contains",
      "label": "aba do barbeiro"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_admin_cancel_appointments",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_ai_support_chat",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_cancel_subscription",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_check_availability",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_confirm_plan_payment",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_create_barber",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_create_payment",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_create_subscription",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_create_tenant_barber",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_create_tenant_plan_subscription",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_delete_barber",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_delete_tenant_account",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_delete_unit",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_efi_create_pix_charge",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_efi_send_pix",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_efi_validate_pix_key",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_efi_webhook",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_encrypt_pix_key",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_execute_scheduled_dispatches",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_generate_caption",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_generate_dispatch_message",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_generate_promotion_ai",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_generate_subscription_charges",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_google_calendar_sync",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_health_check",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_instagram_auth",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_manage_clients",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_process_withdrawal",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_renew_subscription",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_reset_client_password",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_save_efi_credentials",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_send_appointment_reminders",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_send_confirmation_email",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_send_push_notification",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_send_webhook_event",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_speech_to_text",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_store_api",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_update_unit_barbers",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_validate_appointment",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_whatsapp_proxy",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_whatsapp_verification",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_auto_withdraw_cron",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_create_charge",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_create_subaccount",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_get_balance",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_history",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_update_settings",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_wallet",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_webhook",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_edge_functions",
      "target": "ef_woovi_withdraw",
      "type": "executes",
      "label": "executa"
    },
    {
      "source": "hub_database",
      "target": "tbl_agendamentos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ai_actions_log",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ai_feedback",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_assinaturas",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_audit_logs",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barbeiro_formas_pagamento",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barbeiro_servico_duracao",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barbeiro_taxa_cancelamento",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barbeiro_unidades",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barbeiros",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barber_fcm_tokens",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_barber_home_snapshot",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_campanhas_config",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_carteiras",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_chaves_pix",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_client_booking_blocks",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_client_home_snapshot",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_cliente_debitos_cancelamento",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_comissoes",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_configuracoes_horario",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_configuracoes_horario_unidade",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_contas_bancarias",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_contas_financeiras",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_creditos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_depositos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_discount_coupons",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_disparos_programados",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_dispositivos_autorizados",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_dispositivos_conectados",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_efi_pix_charges",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_efi_pix_payouts",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_efi_saldo_alertas",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_efi_webhook_events",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_email_confirmation_tokens",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_financeiro_marco_zero",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_financial_entries",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_horarios_excepcionais",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_informacoes_aplicativo",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_informacoes_empresa",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_instagram_connections",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_instagram_posts_cache",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_logs_agendamentos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_loja_cupons",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_manutencao_emails_permitidos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_mensagem_templates",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_notificacoes",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pagamentos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pagamentos_plano_barbearia",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pending_bookings",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pending_tickets",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pin_financeiro",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pix_charge_audit",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_plano_servicos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_planos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_pontos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_portfolio_images",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_profiles",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_promocoes",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_push_subscriptions",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_relatorios_mensais",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_resgates",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_saques",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_servicos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_support_conversations",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_support_messages",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_support_tickets",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_system_config",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_system_health_checks",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_system_logs",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_taxas_gateway",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_assinaturas",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_cakto_events",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_clientes",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_members",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_mensagem_templates",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_plano_faixas",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_planos",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_unidades",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenant_webhook_config",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_tenants",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ti_impersonation_logs",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ti_mudancas_agendadas",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ti_permissoes",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ti_security_config",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_ti_usuarios",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_transacoes_financeiras",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_user_roles",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_webhook_config",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_webhook_logs",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_whatsapp_instances",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_whatsapp_verification_codes",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "hub_database",
      "target": "tbl_woovi_charges",
      "type": "schema",
      "label": "tabela"
    },
    {
      "source": "tbl_assinaturas",
      "target": "tbl_planos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_agendamentos",
      "target": "tbl_servicos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_agendamentos",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pontos",
      "target": "tbl_promocoes",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_resgates",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_resgates",
      "target": "tbl_promocoes",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pagamentos",
      "target": "tbl_assinaturas",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pagamentos",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_financial_entries",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_comissoes",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_comissoes",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_logs_agendamentos",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pending_bookings",
      "target": "tbl_servicos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pending_bookings",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_notificacoes",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_support_messages",
      "target": "tbl_support_conversations",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_support_tickets",
      "target": "tbl_support_conversations",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pending_tickets",
      "target": "tbl_support_tickets",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pending_tickets",
      "target": "tbl_support_conversations",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_ai_actions_log",
      "target": "tbl_support_conversations",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_ai_feedback",
      "target": "tbl_support_messages",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_ai_feedback",
      "target": "tbl_support_conversations",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_chaves_pix",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_saques",
      "target": "tbl_chaves_pix",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_saques",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_depositos",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_contas_bancarias",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barbeiro_servico_duracao",
      "target": "tbl_servicos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barbeiro_servico_duracao",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_members",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_webhook_config",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_mensagem_templates",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_whatsapp_instances",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_clientes",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pagamentos_plano_barbearia",
      "target": "tbl_assinaturas",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_pagamentos_plano_barbearia",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_assinaturas",
      "target": "tbl_tenant_planos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_assinaturas",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_plano_faixas",
      "target": "tbl_tenant_planos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_cakto_events",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_instagram_connections",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_instagram_posts_cache",
      "target": "tbl_instagram_connections",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_portfolio_images",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_portfolio_images",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_tenant_unidades",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barbeiro_unidades",
      "target": "tbl_tenant_unidades",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barbeiro_unidades",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_client_booking_blocks",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_client_booking_blocks",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_efi_pix_charges",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_efi_pix_payouts",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_efi_pix_payouts",
      "target": "tbl_efi_pix_charges",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_contas_financeiras",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_carteiras",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_transacoes_financeiras",
      "target": "tbl_efi_pix_charges",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_transacoes_financeiras",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_transacoes_financeiras",
      "target": "tbl_carteiras",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_plano_servicos",
      "target": "tbl_servicos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_plano_servicos",
      "target": "tbl_planos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barber_fcm_tokens",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_woovi_charges",
      "target": "tbl_agendamentos",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_woovi_charges",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barber_home_snapshot",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_campanhas_config",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_loja_cupons",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barbeiro_formas_pagamento",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_barbeiro_taxa_cancelamento",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_cliente_debitos_cancelamento",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_configuracoes_horario_unidade",
      "target": "tbl_tenant_unidades",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_configuracoes_horario_unidade",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_push_subscriptions",
      "target": "tbl_barbeiros",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "tbl_discount_coupons",
      "target": "tbl_tenants",
      "type": "fk",
      "label": "referencia"
    },
    {
      "source": "hub_external",
      "target": "api_woovi",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_efi",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_evolution",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_openai",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_gemini",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_instagram",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_google_cal",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_external",
      "target": "api_firebase",
      "type": "integrates",
      "label": "integração"
    },
    {
      "source": "hub_hooks",
      "target": "hk_appointments",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_agenda_mutations",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_barber_agenda",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_barber_dashboard",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_woovi_wallet",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_auth_ready",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_tenant",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_push",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_maintenance",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "hub_hooks",
      "target": "hk_status_bar",
      "type": "reactivity",
      "label": "hook"
    },
    {
      "source": "ef_admin_cancel_appointments",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_admin_cancel_appointments",
      "target": "tbl_creditos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_admin_cancel_appointments",
      "target": "tbl_notificacoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_admin_cancel_appointments",
      "target": "tbl_pagamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_admin_cancel_appointments",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_ai_actions_log",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_configuracoes_horario",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_creditos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_horarios_excepcionais",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_logs_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_pagamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_pending_bookings",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_pending_tickets",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_pontos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_resgates",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_support_conversations",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_support_messages",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_support_tickets",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_system_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "tbl_webhook_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_ai_support_chat",
      "target": "api_openai",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_cancel_subscription",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_check_availability",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_check_availability",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_check_availability",
      "target": "tbl_pending_bookings",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_check_availability",
      "target": "api_openai",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_pagamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_pagamentos_plano_barbearia",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_confirm_plan_payment",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_barber",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_barber",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_barbeiro_servico_duracao",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_configuracoes_horario",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_horarios_excepcionais",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_notificacoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_pagamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_pending_bookings",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_payment",
      "target": "tbl_servicos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_subscription",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_subscription",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_subscription",
      "target": "tbl_planos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_subscription",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_barber",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_barber",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_barber",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_informacoes_empresa",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_system_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_tenant_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_tenant_members",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_tenant_planos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_tenant_unidades",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_create_tenant_plan_subscription",
      "target": "tbl_woovi_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_ai_actions_log",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_ai_feedback",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_audit_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_barbeiro_servico_duracao",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_barbeiro_unidades",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_chaves_pix",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_comissoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_contas_bancarias",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_creditos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_depositos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_dispositivos_conectados",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_email_confirmation_tokens",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_logs_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_notificacoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_pagamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_pending_bookings",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_pending_tickets",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_pin_financeiro",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_pontos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_resgates",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_support_conversations",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_support_tickets",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_barber",
      "target": "tbl_whatsapp_verification_codes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_ai_actions_log",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_ai_feedback",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_audit_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_barbeiro_servico_duracao",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_chaves_pix",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_comissoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_contas_bancarias",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_creditos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_depositos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_discount_coupons",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_disparos_programados",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_dispositivos_conectados",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_email_confirmation_tokens",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_notificacoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_pagamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_pending_bookings",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_pending_tickets",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_pin_financeiro",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_planos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_pontos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_promocoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_resgates",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_servicos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_support_conversations",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_support_tickets",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_tenant_members",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_tenant_mensagem_templates",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_tenant_webhook_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_tenant_account",
      "target": "tbl_whatsapp_verification_codes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_barbeiro_unidades",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_client_booking_blocks",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_configuracoes_horario_unidade",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_horarios_excepcionais",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_delete_unit",
      "target": "tbl_tenant_unidades",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_create_pix_charge",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_create_pix_charge",
      "target": "tbl_chaves_pix",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_create_pix_charge",
      "target": "tbl_efi_pix_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_create_pix_charge",
      "target": "api_efi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_efi_send_pix",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_send_pix",
      "target": "tbl_carteiras",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_send_pix",
      "target": "tbl_chaves_pix",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_send_pix",
      "target": "tbl_transacoes_financeiras",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_send_pix",
      "target": "api_efi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_efi_validate_pix_key",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_validate_pix_key",
      "target": "api_efi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_efi_webhook",
      "target": "tbl_carteiras",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_webhook",
      "target": "tbl_efi_pix_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_webhook",
      "target": "tbl_efi_webhook_events",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_efi_webhook",
      "target": "api_efi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_encrypt_pix_key",
      "target": "tbl_chaves_pix",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_disparos_programados",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_system_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_webhook_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_execute_scheduled_dispatches",
      "target": "api_evolution",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_generate_caption",
      "target": "api_openai",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_generate_dispatch_message",
      "target": "api_evolution",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_generate_promotion_ai",
      "target": "tbl_system_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_generate_promotion_ai",
      "target": "api_openai",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_generate_promotion_ai",
      "target": "api_gemini",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_generate_subscription_charges",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_google_calendar_sync",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_health_check",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_health_check",
      "target": "tbl_system_health_checks",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_instagram_auth",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_instagram_auth",
      "target": "tbl_instagram_connections",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_instagram_auth",
      "target": "tbl_instagram_posts_cache",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_instagram_auth",
      "target": "api_instagram",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_audit_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_servicos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_system_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_tenant_clientes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_manage_clients",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_renew_subscription",
      "target": "tbl_assinaturas",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_renew_subscription",
      "target": "tbl_notificacoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_renew_subscription",
      "target": "tbl_planos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_reset_client_password",
      "target": "tbl_audit_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_reset_client_password",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_save_efi_credentials",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_save_efi_credentials",
      "target": "tbl_user_roles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_save_efi_credentials",
      "target": "api_efi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_mensagem_templates",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_servicos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_webhook_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_appointment_reminders",
      "target": "api_evolution",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_send_confirmation_email",
      "target": "tbl_email_confirmation_tokens",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_confirmation_email",
      "target": "tbl_system_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_confirmation_email",
      "target": "api_openai",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_send_push_notification",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_push_notification",
      "target": "tbl_barber_fcm_tokens",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_push_notification",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_push_notification",
      "target": "api_firebase",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_mensagem_templates",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_profiles",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_system_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_webhook_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_send_webhook_event",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_store_api",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_store_api",
      "target": "tbl_notificacoes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_store_api",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_store_api",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_store_api",
      "target": "tbl_woovi_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_update_unit_barbers",
      "target": "tbl_barbeiro_unidades",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_validate_appointment",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_validate_appointment",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_validate_appointment",
      "target": "tbl_pending_bookings",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_proxy",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_proxy",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_proxy",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_proxy",
      "target": "api_evolution",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_system_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_tenant_clientes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_tenants",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_webhook_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_whatsapp_instances",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "tbl_whatsapp_verification_codes",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_whatsapp_verification",
      "target": "api_evolution",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_auto_withdraw_cron",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_auto_withdraw_cron",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_auto_withdraw_cron",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_create_charge",
      "target": "tbl_agendamentos",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_create_charge",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_create_subaccount",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_create_subaccount",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_get_balance",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_get_balance",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_history",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_history",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_history",
      "target": "tbl_woovi_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_history",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_update_settings",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_update_settings",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_wallet",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_wallet",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_wallet",
      "target": "tbl_system_config",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_wallet",
      "target": "tbl_woovi_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_wallet",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_webhook",
      "target": "tbl_webhook_logs",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_webhook",
      "target": "tbl_woovi_charges",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_webhook",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "ef_woovi_withdraw",
      "target": "tbl_barbeiros",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_withdraw",
      "target": "tbl_saques",
      "type": "db_access",
      "label": "lê/escreve"
    },
    {
      "source": "ef_woovi_withdraw",
      "target": "api_woovi",
      "type": "calls",
      "label": "requisição"
    },
    {
      "source": "barb_saque_instantaneo",
      "target": "ef_woovi_withdraw",
      "type": "triggers",
      "label": "dispara saque"
    },
    {
      "source": "barb_carteira_pix",
      "target": "ef_woovi_get_balance",
      "type": "queries",
      "label": "consulta saldo"
    },
    {
      "source": "page_cliente_agendar",
      "target": "ef_check_availability",
      "type": "queries",
      "label": "calcula horários"
    },
    {
      "source": "page_cliente_agendar",
      "target": "ef_validate_appointment",
      "type": "validates",
      "label": "valida reserva"
    },
    {
      "source": "page_cliente_agendar",
      "target": "ef_woovi_create_charge",
      "type": "generates",
      "label": "cria pix"
    },
    {
      "source": "page_suporte_chat",
      "target": "ef_ai_support_chat",
      "type": "chats",
      "label": "conversa com BIA"
    },
    {
      "source": "adm_campanhas_mkt",
      "target": "ef_generate_promotion_ai",
      "type": "generates",
      "label": "gera texto IA"
    },
    {
      "source": "adm_disparos_painel",
      "target": "ef_execute_scheduled_dispatches",
      "type": "dispatches",
      "label": "agenda disparos"
    },
    {
      "source": "adm_equipe_barbeiros",
      "target": "ef_create_tenant_barber",
      "type": "creates",
      "label": "cria profissional"
    },
    {
      "source": "adm_equipe_barbeiros",
      "target": "ef_woovi_create_subaccount",
      "type": "provisions",
      "label": "cria subconta Pix"
    },
    {
      "source": "page_cliente_assinar",
      "target": "ef_create_subscription",
      "type": "subscribes",
      "label": "assina plano"
    },
    {
      "source": "adm_planos_gestao",
      "target": "ef_generate_subscription_charges",
      "type": "recurs",
      "label": "gera cobranças"
    },
    {
      "source": "barb_portfolio_insta",
      "target": "ef_instagram_auth",
      "type": "authenticates",
      "label": "conecta Instagram"
    },
    {
      "source": "page_cliente_agendar",
      "target": "hk_appointments",
      "type": "uses",
      "label": "usa hook"
    },
    {
      "source": "page_cliente_agendar",
      "target": "hk_agenda_mutations",
      "type": "uses",
      "label": "usa hook"
    },
    {
      "source": "page_barbeiro_main",
      "target": "hk_barber_agenda",
      "type": "uses",
      "label": "usa hook"
    },
    {
      "source": "page_barbeiro_main",
      "target": "hk_barber_dashboard",
      "type": "uses",
      "label": "usa hook"
    },
    {
      "source": "page_barbeiro_main",
      "target": "hk_woovi_wallet",
      "type": "uses",
      "label": "usa hook"
    },
    {
      "source": "page_admin_main",
      "target": "hk_tenant",
      "type": "uses",
      "label": "usa hook"
    },
    {
      "source": "page_auth",
      "target": "hk_auth_ready",
      "type": "uses",
      "label": "usa hook"
    }
  ]
};
const BRAND_LOGO_SRC = "assets/logo.png";
