// Physics Engine & Multi-Tier Layout Calculator
const PhysicsEngine = {
  // Update node velocity and apply anti-collision
  step: function() {
    if (!AppState.physicsRunning) return;

    const kSpring = 0.04;
    const damping = 0.85;
    const nodes = GRAPH_DATA.nodes;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const fx = (n.targetX - n.x) * kSpring;
      const fy = (n.targetY - n.y) * kSpring;

      n.vx += fx;
      n.vy += fy;

      // Anti-collision repulsion
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - n.x;
        const dy = b.y - n.y;
        const distSq = dx * dx + dy * dy || 1;
        const minDist = n.radius + b.radius + 38;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          const push = (minDist - dist) * 0.16;
          const px = (dx / dist) * push;
          const py = (dy / dist) * push;
          n.vx -= px;
          n.vy -= py;
          b.vx += px;
          b.vy += py;
        }
      }

      n.vx *= damping;
      n.vy *= damping;

      n.x += n.vx;
      n.y += n.vy;
    }
  },

  // Layout 1: Global View (Overview - "Todos")
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

    // 1. Core Center
    const coreNode = AppState.nodeMap.get("hub_core");
    if (coreNode) {
      coreNode.targetX = cx;
      coreNode.targetY = cy;
    }

    // 2. Hubs & Major Pages (Inner Ring: r = 330px)
    const hubsAndPages = nodes.filter(n => n.id.startsWith("hub_") && n.id !== "hub_core");
    hubsAndPages.forEach((n, i) => {
      const angle = (i / hubsAndPages.length) * Math.PI * 2 - Math.PI / 2;
      n.targetX = cx + Math.cos(angle) * 330;
      n.targetY = cy + Math.sin(angle) * 330;
    });

    // 3. Business Modules & Hooks (r = 580px - 760px)
    const modules = nodes.filter(n =>
      ["admin", "barber", "client", "financial", "whatsapp", "ai", "subscriptions", "store", "hooks", "landing"].includes(n.cluster) &&
      !n.id.startsWith("hub_")
    );
    modules.forEach((n, i) => {
      const ring = i % 2;
      const r = ring === 0 ? 580 : 760;
      const angle = (i / modules.length) * Math.PI * 2;
      n.targetX = cx + Math.cos(angle) * r;
      n.targetY = cy + Math.sin(angle) * r;
    });

    // 4. External APIs (r = 920px)
    const externals = nodes.filter(n => n.cluster === "external" && !n.id.startsWith("hub_"));
    externals.forEach((n, i) => {
      const angle = (i / externals.length) * Math.PI * 2 + 0.3;
      n.targetX = cx + Math.cos(angle) * 920;
      n.targetY = cy + Math.sin(angle) * 920;
    });

    // 5. Supabase Edge Functions (r = 1040px - 1240px)
    const edgeFns = nodes.filter(n => n.cluster === "edge_fn" && !n.id.startsWith("hub_"));
    edgeFns.forEach((n, i) => {
      const ring = i % 2;
      const r = ring === 0 ? 1040 : 1240;
      const angle = (i / Math.ceil(edgeFns.length / 2)) * Math.PI * 2;
      n.targetX = cx + Math.cos(angle) * r;
      n.targetY = cy + Math.sin(angle) * r;
    });

    // 6. Database Tables (r = 1440px - 1760px)
    const dbTables = nodes.filter(n => n.cluster === "database" && !n.id.startsWith("hub_"));
    dbTables.forEach((n, i) => {
      const ring = i % 3;
      const r = 1440 + ring * 160;
      const angle = (i / Math.ceil(dbTables.length / 3)) * Math.PI * 2 + (ring * 0.15);
      n.targetX = cx + Math.cos(angle) * r;
      n.targetY = cy + Math.sin(angle) * r;
    });

    const optimalZoom = Math.max(0.42, Math.min(0.85, Math.min(AppState.width, AppState.height) / 2200));
    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = optimalZoom;
  },

  // Layout 2: Node Focus (Multi-Ring Rosette)
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
      { r: 240, max: 8 },
      { r: 420, max: 14 },
      { r: 620, max: 20 },
      { r: 840, max: 28 },
      { r: 1060, max: 36 }
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
        const dist = 1450 + (idx % 5) * 80;
        n.targetX = cx + Math.cos(angle) * dist;
        n.targetY = cy + Math.sin(angle) * dist;
      }
    });

    const fitZoom = neighborIds.length > 20 ? 0.72 : 0.95;
    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = fitZoom;
  },

  // Layout 3: Cluster Focus
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
      { r: 240, max: 8 },
      { r: 440, max: 14 },
      { r: 660, max: 22 },
      { r: 880, max: 32 }
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
      const r = 1120 + (i % 2) * 140;
      extNode.targetX = cx + Math.cos(angle) * r;
      extNode.targetY = cy + Math.sin(angle) * r;
    });

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!clusterNodeIds.has(n.id) && !connectedExtIds.has(n.id)) {
        const angle = (idx / GRAPH_DATA.nodes.length) * Math.PI * 2;
        const dist = 1650 + (idx % 4) * 80;
        n.targetX = cx + Math.cos(angle) * dist;
        n.targetY = cy + Math.sin(angle) * dist;
      }
    });

    const fitZoom = clusterNodes.length > 25 ? 0.65 : 0.85;
    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = fitZoom;
  },

  // Layout 4: Tour Sequence Layout
  setTourLayout: function(tour, stepIdx) {
    AppState.focusMode = "tour";
    AppState.activeTour = tour;
    AppState.tourStepIdx = stepIdx;

    const cx = AppState.width / 2;
    const cy = AppState.height / 2;
    const stepCount = tour.steps.length;
    const tourNodeIds = new Set(tour.steps.map(s => s.id));

    const tourRadius = 380;
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
        const dist = 1350 + (idx % 4) * 80;
        n.targetX = cx + Math.cos(angle) * dist;
        n.targetY = cy + Math.sin(angle) * dist;
      }
    });

    AppState.targetCamX = cx;
    AppState.targetCamY = cy;
    AppState.targetZoom = 0.88;
  }
};
