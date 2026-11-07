// Application Bootstrapper & Atomic Orbitals
document.addEventListener("DOMContentLoaded", () => {
  // Tour definitions (Transições Quânticas & Fluxos Atômicos)
  AppState.TOURS = {
    booking: {
      key: "booking",
      name: "Agendamento & Pix",
      steps: [
        { id: "page_tenant_public", title: "1. Vitrine da Barbearia", desc: "Cliente acessa a barbearia pelo link público ou QR Code." },
        { id: "page_cliente_agendar", title: "2. Seleção de Serviços & Barbeiro", desc: "Fluxo de reserva em etapas otimizadas." },
        { id: "ef_check_availability", title: "3. Validação de Conflitos", desc: "Edge function verifica agenda e escala em tempo real." },
        { id: "tbl_agendamentos", title: "4. Registro do Agendamento", desc: "Persistência no banco com RLS por barbearia." },
        { id: "ef_woovi_create_charge", title: "5. Emissão Pix Dinâmico", desc: "QR Code gerado na subconta do profissional." },
        { id: "ef_woovi_webhook", title: "6. Liquidação Pix em Tempo Real", desc: "Confirmação do pagamento e crédito imediato na carteira." },
        { id: "ef_send_appointment_reminders", title: "7. Notificação WhatsApp", desc: "Envio de comprovante e lembrete automático 2h antes." }
      ]
    },
    payout: {
      key: "payout",
      name: "Ciclo de Saque Barbeiro",
      steps: [
        { id: "barb_confirmacao_cortes", title: "1. Confirmação de Corte", desc: "Barbeiro valida a realização do atendimento no app." },
        { id: "mod_split_comissoes", title: "2. Split de Comissões", desc: "Divisão instantânea da receita entre barbeiro e barbearia." },
        { id: "barb_carteira_pix", title: "3. Saldo em Carteira", desc: "Disponibilização do saldo na carteira digital do profissional." },
        { id: "barb_saque_instantaneo", title: "4. Solicitação de Saque", desc: "Barbeiro solicita transferência para sua chave Pix." },
        { id: "adm_seguranca_pin", title: "5. Autenticação via PIN", desc: "PIN de segurança de 4 dígitos autoriza a transferência." },
        { id: "ef_woovi_withdraw", title: "6. Efetivação do Saque", desc: "Pix out realizado diretamente para a conta bancária." }
      ]
    },
    ai: {
      key: "ai",
      name: "Suporte com IA BIA",
      steps: [
        { id: "page_suporte_chat", title: "1. Chat de Suporte", desc: "Abertura de canal de atendimento pelo cliente ou equipe." },
        { id: "mod_ai_bia_agent", title: "2. Agente Conversacional BIA", desc: "IA interpreta intenção e recupera dados operacionais." },
        { id: "ef_ai_support_chat", title: "3. RAG & Lógica Serverless", desc: "Consulta políticas, serviços e horários da unidade." },
        { id: "api_openai", title: "4. Inferência de Linguagem", desc: "Processamento de resposta clara e contextualizada." },
        { id: "tbl_ai_support_logs", title: "5. Registro de Interação", desc: "Auditoria de perguntas, respostas e tempo de resposta." }
      ]
    },
    marketing: {
      key: "marketing",
      name: "Automação WhatsApp",
      steps: [
        { id: "adm_campanhas_mkt", title: "1. Segmentação da Base", desc: "Seleção de clientes inativos ou aniversariantes." },
        { id: "mod_ai_promo_gen", title: "2. Redação Promocional IA", desc: "Geração de textos persuasivos e ofertas direcionadas." },
        { id: "adm_cupons_promocoes", title: "3. Aplicação de Cupom", desc: "Criação de cupom com regras de desconto temporárias." },
        { id: "ef_execute_scheduled_dispatches", title: "4. Fila de Disparos", desc: "Processamento em background com intervalo seguro anti-ban." },
        { id: "api_evolution", title: "5. Entrega no WhatsApp", desc: "Mensagem entregue diretamente no WhatsApp do cliente." }
      ]
    },
    backend: {
      key: "backend",
      name: "Infraestrutura Backend",
      steps: [
        { id: "hub_core", title: "1. Frontend Reativo", desc: "React com cache persistente e tratamento offline." },
        { id: "hub_edge_functions", title: "2. 50 Edge Functions", desc: "Lógica serverless distribuída com isolamento de regras." },
        { id: "hub_database", title: "3. 92 Tabelas PostgreSQL", desc: "Isolamento estrito multi-tenant via Row Level Security (RLS)." },
        { id: "hub_external", title: "4. Gateways & Conectores", desc: "APIs financeiras, mensageria e notificações push." }
      ]
    }
  };

  // Render Filter Tabs by Atomic Orbital
  const filterBar = document.getElementById("filter-bar");
  filterBar.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "filter-tab active";
  allBtn.dataset.cluster = "all";
  allBtn.setAttribute("role", "tab");
  allBtn.setAttribute("aria-selected", "true");
  allBtn.setAttribute("aria-controls", "atomic-view");
  allBtn.innerHTML = '<span class="tab-dot" style="background:#00d2ff"></span> Átomo Completo <span class="tab-count">(' + GRAPH_DATA.nodes.length + ')</span>';
  allBtn.onclick = () => {
    if (AppState.focusMode === "global") return;
    EventManager.resetToGlobal();
  };
  filterBar.appendChild(allBtn);

  Object.keys(GRAPH_DATA.clusters).forEach(k => {
    const c = GRAPH_DATA.clusters[k];
    const count = GRAPH_DATA.nodes.filter(n => n.cluster === k).length;
    if (count === 0) return;

    const btn = document.createElement("button");
    btn.className = "filter-tab";
    btn.dataset.cluster = k;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("aria-controls", "atomic-view");
    btn.innerHTML = '<span class="tab-dot" style="background:' + c.color + '"></span> ' + c.name + ' <span class="tab-count">(' + count + ')</span>';
    btn.onclick = () => {
      if (AppState.focusMode === "cluster" && AppState.focusedClusterKey === k) {
        EventManager.resetToGlobal();
      } else {
        document.querySelectorAll(".filter-tab").forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        PhysicsEngine.setClusterLayout(k);
      }
    };
    filterBar.appendChild(btn);
  });

  // Init Renderer & Events
  GraphRenderer.init();
  EventManager.init();

  // Initial Atomic Global Layout
  PhysicsEngine.setGlobalLayout();

  // Instantly position nodes on initial boot
  GRAPH_DATA.nodes.forEach(n => {
    n.x = n.targetX;
    n.y = n.targetY;
  });
  AppState.camX = AppState.targetCamX;
  AppState.camY = AppState.targetCamY;
  AppState.zoom = AppState.targetZoom;

  // Start Animation Loop
  GraphRenderer.render();
});