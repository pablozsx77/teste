// Physics Engine & Quantum Atomic Layout Calculator
// ZERO WOBBLE: Uses direct critically damped monotonic asymptotic interpolation
const PhysicsEngine = {
  // Update node positions smoothly with zero oscillation / bouncing
  step: function() {
    if (!AppState.physicsRunning) return;

    const nodes = GRAPH_DATA.nodes;
    const factor = 0.18; // smooth, crisp, responsive glide with zero overshoot

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dx = n.targetX - n.x;
      const dy = n.targetY - n.y;

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        n.x = n.targetX;
        n.y = n.targetY;
      } else {
        n.x += dx * factor;
        n.y += dy * factor;
      }
    }
  },

  // Layout 1: Atomic Global View (Bohr-Rutherford Quantum Model)
  setGlobalLayout: function() {
    AppState.focusMode = "global";
    AppState.activeCluster = "all";
    AppState.focusedClusterKey = null;
    AppState.focusedNodeObj = null;
    AppState.selectedNode = null;
    AppState.activeTour = null;

    const cx = AppState.width / 2;
    const cy = AppState.height / 2;
    const nodes = GRAPH_DATA.nodes;
    const placedSet = new Set();

    // 1. Núcleo Central Atômico (Center: Core Engine)
    const coreNode = AppState.nodeMap.get("hub_core");
    if (coreNode) {
      coreNode.targetX = cx;
      coreNode.targetY = cy;
      placedSet.add("hub_core");
    }

    // 2. Núcleo Interno (Prótons & Nêutrons Centrais: R = 160px)
    const primaryHubs = [
      AppState.nodeMap.get("tbl_barbeiros"),
      AppState.nodeMap.get("hub_database"),
      AppState.nodeMap.get("hub_edge_functions"),
      AppState.nodeMap.get("hub_external"),
      AppState.nodeMap.get("hub_auth")
    ].filter(Boolean);

    primaryHubs.forEach((n, i) => {
      const ang = (i / primaryHubs.length) * Math.PI * 2 - Math.PI / 2;
      n.targetX = cx + Math.cos(ang) * 160;
      n.targetY = cy + Math.sin(ang) * 160;
      placedSet.add(n.id);
    });

    // 3. Órbita 1: Gestão & Dono (R = 400px - 22 nós)
    const adminNodes = nodes.filter(n => n.cluster === "admin" && !placedSet.has(n.id));
    adminNodes.forEach((n, i) => {
      const t = (i / adminNodes.length) * Math.PI * 2;
      n.targetX = cx + Math.cos(t) * 400;
      n.targetY = cy + Math.sin(t) * 400;
      placedSet.add(n.id);
    });

    // 4. Órbita 2: Operação Barbeiro, Clientes & Checkout (R = 660px - 25 nós)
    const orb2Nodes = nodes.filter(n =>
      ["barber", "client", "financial", "landing"].includes(n.cluster) && !placedSet.has(n.id)
    );
    orb2Nodes.forEach((n, i) => {
      const t = (i / orb2Nodes.length) * Math.PI * 2 + 0.12;
      n.targetX = cx + Math.cos(t) * 660;
      n.targetY = cy + Math.sin(t) * 660;
      placedSet.add(n.id);
    });

    // 5. Órbita 3: Automação WhatsApp, IA BIA, Assinaturas, Loja & Hooks (R = 920px - 17 nós)
    const orb3Nodes = nodes.filter(n =>
      ["whatsapp", "ai", "subscriptions", "store", "hooks"].includes(n.cluster) && !placedSet.has(n.id)
    );
    orb3Nodes.forEach((n, i) => {
      const t = (i / orb3Nodes.length) * Math.PI * 2 + 0.25;
      n.targetX = cx + Math.cos(t) * 920;
      n.targetY = cy + Math.sin(t) * 920;
      placedSet.add(n.id);
    });

    // 6. Órbita 4: Polos de Gateways & APIs Externas (R = 1140px - 9 nós)
    const extNodes = nodes.filter(n => n.cluster === "external" && !placedSet.has(n.id));
    extNodes.forEach((n, i) => {
      const t = (i / Math.max(1, extNodes.length)) * Math.PI * 2 + 0.35;
      n.targetX = cx + Math.cos(t) * 1140;
      n.targetY = cy + Math.sin(t) * 1140;
      placedSet.add(n.id);
    });

    // 7. Camada de Valência K: Supabase Edge Functions (R = 1380px - 50 nós)
    const edgeFns = nodes.filter(n => n.cluster === "edge_fn" && !placedSet.has(n.id));
    edgeFns.forEach((n, i) => {
      const t = (i / edgeFns.length) * Math.PI * 2;
      n.targetX = cx + Math.cos(t) * 1380;
      n.targetY = cy + Math.sin(t) * 1380;
      placedSet.add(n.id);
    });

    // 8. Camada de Valência L: Banco de Dados PostgreSQL (R1 = 1660px, R2 = 1940px - 92 nós)
    const dbTables = nodes.filter(n => n.cluster === "database" && !placedSet.has(n.id));
    const half = Math.ceil(dbTables.length / 2);
    dbTables.forEach((n, i) => {
      if (i < half) {
        const t = (i / half) * Math.PI * 2;
        n.targetX = cx + Math.cos(t) * 1660;
        n.targetY = cy + Math.sin(t) * 1660;
      } else {
        const t = ((i - half) / (dbTables.length - half)) * Math.PI * 2 + (Math.PI / half);
        n.targetX = cx + Math.cos(t) * 1940;
        n.targetY = cy + Math.sin(t) * 1940;
      }
      placedSet.add(n.id);
    });

    // Set camera to frame the full atom majestically
    const optimalZoom = Math.max(0.40, Math.min(0.82, Math.min(AppState.width, AppState.height) / 2250));
    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = optimalZoom;
  },

  // Layout 2: Node Focus (Excited Quantum State)
  setNodeLayout: function(targetNode) {
    AppState.focusMode = "node";
    AppState.focusedNodeObj = targetNode;
    AppState.selectedNode = targetNode;

    const cx = AppState.width / 2;
    const cy = AppState.height / 2;

    targetNode.targetX = cx;
    targetNode.targetY = cy;

    const neighborIds = Array.from(AppState.neighborsMap.get(targetNode.id) || []);
    const ringDefs = [
      { r: 260, max: 8 },
      { r: 460, max: 14 },
      { r: 680, max: 20 },
      { r: 920, max: 28 },
      { r: 1160, max: 36 }
    ];

    let allocated = 0;
    ringDefs.forEach((ringDef, rIdx) => {
      const countInRing = Math.min(neighborIds.length - allocated, ringDef.max);
      if (countInRing <= 0) return;

      for (let i = 0; i < countInRing; i++) {
        const nId = neighborIds[allocated + i];
        const nNode = AppState.nodeMap.get(nId);
        if (!nNode) continue;

        const angle = (i / countInRing) * Math.PI * 2 + (rIdx * 0.4);
        nNode.targetX = cx + Math.cos(angle) * ringDef.r;
        nNode.targetY = cy + Math.sin(angle) * ringDef.r;
      }
      allocated += countInRing;
    });

    const connectedSet = new Set(neighborIds);
    connectedSet.add(targetNode.id);

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!connectedSet.has(n.id)) {
        const angle = (idx / GRAPH_DATA.nodes.length) * Math.PI * 2;
        const dist = 1550 + (idx % 5) * 80;
        n.targetX = cx + Math.cos(angle) * dist;
        n.targetY = cy + Math.sin(angle) * dist;
      }
    });

    const fitZoom = neighborIds.length > 20 ? 0.70 : 0.95;
    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = fitZoom;
  },

  // Layout 3: Atomic Shell Focus (Cluster Focus)
  setClusterLayout: function(cKey) {
    AppState.focusMode = "cluster";
    AppState.activeCluster = cKey;
    AppState.focusedClusterKey = cKey;
    AppState.focusedNodeObj = null;

    const cx = AppState.width / 2;
    const cy = AppState.height / 2;

    const clusterNodes = GRAPH_DATA.nodes.filter(n => n.cluster === cKey);
    const clusterNodeIds = new Set(clusterNodes.map(n => n.id));
    const connectedExtIds = new Set();

    clusterNodes.forEach(cn => {
      const nbrs = AppState.neighborsMap.get(cn.id) || new Set();
      nbrs.forEach(nbrId => {
        if (!clusterNodeIds.has(nbrId)) {
          connectedExtIds.add(nbrId);
        }
      });
    });

    const cRingDefs = [
      { r: 260, max: 8 },
      { r: 460, max: 14 },
      { r: 680, max: 22 },
      { r: 920, max: 32 }
    ];

    let allocated = 0;
    cRingDefs.forEach((rDef, rIdx) => {
      const countInRing = Math.min(clusterNodes.length - allocated, rDef.max);
      if (countInRing <= 0) return;

      for (let i = 0; i < countInRing; i++) {
        const cn = clusterNodes[allocated + i];
        const angle = (i / countInRing) * Math.PI * 2 + (rIdx * 0.35);
        cn.targetX = cx + Math.cos(angle) * rDef.r;
        cn.targetY = cy + Math.sin(angle) * rDef.r;
      }
      allocated += countInRing;
    });

    const extArr = Array.from(connectedExtIds);
    extArr.forEach((extId, i) => {
      const extNode = AppState.nodeMap.get(extId);
      if (!extNode) return;
      const angle = (i / Math.max(1, extArr.length)) * Math.PI * 2;
      const r = 1180 + (i % 2) * 140;
      extNode.targetX = cx + Math.cos(angle) * r;
      extNode.targetY = cy + Math.sin(angle) * r;
    });

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!clusterNodeIds.has(n.id) && !connectedExtIds.has(n.id)) {
        const angle = (idx / GRAPH_DATA.nodes.length) * Math.PI * 2;
        const dist = 1680 + (idx % 4) * 80;
        n.targetX = cx + Math.cos(angle) * dist;
        n.targetY = cy + Math.sin(angle) * dist;
      }
    });

    const fitZoom = clusterNodes.length > 25 ? 0.65 : 0.85;
    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = fitZoom;
  },

  // Layout 4: Quantum Transition Tour
  setTourLayout: function(tour, stepIdx) {
    AppState.focusMode = "tour";
    AppState.activeTour = tour;
    AppState.tourStepIdx = stepIdx;

    const cx = AppState.width / 2;
    const cy = AppState.height / 2;
    const stepCount = tour.steps.length;
    const tourNodeIds = new Set(tour.steps.map(s => s.id));

    const tourRadius = 420;
    tour.steps.forEach((s, idx) => {
      const sNode = AppState.nodeMap.get(s.id);
      if (!sNode) return;
      const angle = (idx / stepCount) * Math.PI * 2 - Math.PI / 2;
      sNode.targetX = cx + Math.cos(angle) * tourRadius;
      sNode.targetY = cy + Math.sin(angle) * tourRadius;
    });

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!tourNodeIds.has(n.id)) {
        const angle = (idx / GRAPH_DATA.nodes.length) * Math.PI * 2;
        const dist = 1450 + (idx % 4) * 80;
        n.targetX = cx + Math.cos(angle) * dist;
        n.targetY = cy + Math.sin(angle) * dist;
      }
    });

    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = 0.88;
  }
};
