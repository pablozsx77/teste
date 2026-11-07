// Physics Engine & Quantum Atomic Layout Calculator (3D Atomic Model)
// ZERO WOBBLE: Uses direct critically damped monotonic asymptotic interpolation
const PhysicsEngine = {
  // Configuration constants (design tokens mirrored for JS)
  CONFIG: {
    // Smoothing factors
    CAMERA_SMOOTH: 0.14,
    NODE_SMOOTH: 0.18,
    ZOOM_SMOOTH: 0.14,

    // Atomic orbital radii (3D shells)
    NUCLEUS_RADIUS: 160,
    ORBIT_1_RADIUS: 400,
    ORBIT_2_RADIUS: 660,
    ORBIT_3_RADIUS: 920,
    ORBIT_4_RADIUS: 1140,
    VALENCE_K_RADIUS: 1380,
    VALENCE_L1_RADIUS: 1660,
    VALENCE_L2_RADIUS: 1940,

    // Node focus rings (3D spheres)
    FOCUS_RINGS: [
      { r: 260, max: 8 },
      { r: 460, max: 14 },
      { r: 680, max: 20 },
      { r: 920, max: 28 },
      { r: 1160, max: 36 }
    ],

    // Cluster focus rings (3D spheres)
    CLUSTER_RINGS: [
      { r: 260, max: 8 },
      { r: 460, max: 14 },
      { r: 680, max: 22 },
      { r: 920, max: 32 }
    ],

    // Tour
    TOUR_RADIUS: 420,

    // Zoom bounds
    ZOOM_MIN: 0.2,
    ZOOM_MAX: 3.0,
    ZOOM_FIT_FACTOR: 2250,

    // Quantum quanta counts
    QUANTA_RING_COUNT: 70,
    QUANTA_ELLIPSE_COUNT: 30,

    // Elliptical tracks (Rutherford orbits, tilted in 3D)
    ELLIPTICAL_TRACKS: [
      { a: 780, b: 340, rot: 0, tilt: 0 },
      { a: 860, b: 380, rot: Math.PI / 3.2, tilt: Math.PI / 6 },
      { a: 940, b: 420, rot: -Math.PI / 3.2, tilt: -Math.PI / 6 }
    ],

    // Bohr shells for rendering (3D spheres)
    BOHR_SHELLS: [
      { r: 160, label: "NÚCLEO CENTRAL", color: "rgba(224, 49, 21, 0.35)", lw: 1.5, dash: [4, 4] },
      { r: 400, label: "ÓRBITA 1: GESTÃO", color: "rgba(212, 175, 55, 0.16)", lw: 1.0, dash: [6, 6] },
      { r: 660, label: "ÓRBITA 2: OPERAÇÃO E CLIENTES", color: "rgba(0, 210, 255, 0.14)", lw: 1.0, dash: [6, 6] },
      { r: 920, label: "ÓRBITA 3: IA E AUTOMAÇÃO", color: "rgba(129, 140, 248, 0.14)", lw: 1.0, dash: [6, 6] },
      { r: 1140, label: "ÓRBITA 4: GATEWAYS E APIS", color: "rgba(249, 115, 22, 0.14)", lw: 1.0, dash: [6, 6] },
      { r: 1380, label: "CAMADA K: SUPABASE EDGE FUNCTIONS", color: "rgba(56, 189, 248, 0.18)", lw: 1.2, dash: [8, 8] },
      { r: 1660, label: "CAMADA L1: BANCO POSTGRESQL", color: "rgba(244, 63, 94, 0.14)", lw: 1.0, dash: [8, 8] },
      { r: 1940, label: "CAMADA L2: TRANSAÇÕES E AUDITORIA", color: "rgba(244, 63, 94, 0.10)", lw: 1.0, dash: [8, 8] }
    ]
  },

  // Distribute points on the surface of a 3D sphere (Fibonacci spiral)
  spherePoints: function(count, radius, offset = 0) {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y)) * radius;
      const theta = phi * i + offset;
      points.push({
        x: Math.cos(theta) * radiusAtY,
        y: y * radius,
        z: Math.sin(theta) * radiusAtY
      });
    }
    return points;
  },

  // Update node positions smoothly with zero oscillation / bouncing (3D)
  step: function() {
    if (!AppState.physicsRunning) return;

    const nodes = GRAPH_DATA.nodes;
    const factor = this.CONFIG.NODE_SMOOTH;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dx = n.targetX - n.x;
      const dy = n.targetY - n.y;
      const dz = n.targetZ - n.z;

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15 && Math.abs(dz) < 0.15) {
        n.x = n.targetX;
        n.y = n.targetY;
        n.z = n.targetZ;
      } else {
        n.x += dx * factor;
        n.y += dy * factor;
        n.z += dz * factor;
      }
    }
  },

  // Layout 1: Atomic Global View (3D Bohr-Rutherford Quantum Model)
  setGlobalLayout: function() {
    AppState.focusMode = "global";
    AppState.activeCluster = "all";
    AppState.focusedClusterKey = null;
    AppState.focusedNodeObj = null;
    AppState.selectedNode = null;
    AppState.activeTour = null;

    const nodes = GRAPH_DATA.nodes;
    const placedSet = new Set();
    const C = this.CONFIG;

    // Initialize targetZ for all nodes
    nodes.forEach(n => { if (n.targetZ === undefined) n.targetZ = 0; if (n.z === undefined) n.z = 0; });

    // 1. Núcleo Central Atômico (Center: Core Engine) — na origem do espaço 3D
    const coreNode = AppState.nodeMap.get("hub_core");
    if (coreNode) {
      coreNode.targetX = 0;
      coreNode.targetY = 0;
      coreNode.targetZ = 0;
      placedSet.add("hub_core");
    }

    // 2. Núcleo Interno (Prótons & Nêutrons Centrais) — small 3D cluster around core
    const primaryHubs = [
      AppState.nodeMap.get("tbl_barbeiros"),
      AppState.nodeMap.get("hub_database"),
      AppState.nodeMap.get("hub_edge_functions"),
      AppState.nodeMap.get("hub_external"),
      AppState.nodeMap.get("hub_auth")
    ].filter(Boolean);

    const corePoints = this.spherePoints(primaryHubs.length, C.NUCLEUS_RADIUS * 0.6);
    primaryHubs.forEach((n, i) => {
      const p = corePoints[i];
      n.targetX = p.x;
      n.targetY = p.y;
      n.targetZ = p.z;
      placedSet.add(n.id);
    });

    // 3-8. Orbitas as 3D concentric spherical shells
    const shellDefs = [
      { key: "admin", r: C.ORBIT_1_RADIUS, clusters: ["admin"] },
      { key: "orb2", r: C.ORBIT_2_RADIUS, clusters: ["barber", "client", "financial", "landing"] },
      { key: "orb3", r: C.ORBIT_3_RADIUS, clusters: ["whatsapp", "ai", "subscriptions", "store", "hooks"] },
      { key: "orb4", r: C.ORBIT_4_RADIUS, clusters: ["external"] },
      { key: "valenceK", r: C.VALENCE_K_RADIUS, clusters: ["edge_fn"] },
      { key: "valenceL1", r: C.VALENCE_L1_RADIUS, clusters: ["database"] },
      { key: "valenceL2", r: C.VALENCE_L2_RADIUS, clusters: ["database"] }
    ];

    shellDefs.forEach(shell => {
      const shellNodes = nodes.filter(n =>
        shell.clusters.includes(n.cluster) && !placedSet.has(n.id)
      );

      if (shellNodes.length === 0) return;

      // For database split across L1 and L2
      const nodesToPlace = shell.key.startsWith("valenceL") && shell.clusters.includes("database")
        ? shellNodes.filter((n, idx) =>
            shell.key === "valenceL1" ? idx < Math.ceil(shellNodes.length / 2) : idx >= Math.ceil(shellNodes.length / 2)
          )
        : shellNodes;

      const points = this.spherePoints(nodesToPlace.length, shell.r, shell.r * 0.001);
      nodesToPlace.forEach((n, i) => {
        const p = points[i];
        n.targetX = p.x;
        n.targetY = p.y;
        n.targetZ = p.z;
        placedSet.add(n.id);
      });
    });

    // Any remaining unplaced nodes on outer shell
    const remaining = nodes.filter(n => !placedSet.has(n.id));
    if (remaining.length > 0) {
      const points = this.spherePoints(remaining.length, C.VALENCE_L2_RADIUS * 1.15, 1);
      remaining.forEach((n, i) => {
        const p = points[i];
        n.targetX = p.x;
        n.targetY = p.y;
        n.targetZ = p.z;
        placedSet.add(n.id);
      });
    }

    // Set camera to frame the full 3D atom
    AppState.targetCamX = 0;
    AppState.targetCamY = 0;
    AppState.targetCamZ = C.VALENCE_L2_RADIUS * 1.8;
    AppState.targetZoom = 1.0;
  },

  // Layout 2: Node Focus (3D Excited Quantum State)
  setNodeLayout: function(targetNode) {
    AppState.focusMode = "node";
    AppState.focusedNodeObj = targetNode;
    AppState.selectedNode = targetNode;

    const C = this.CONFIG;

    targetNode.targetX = 0;
    targetNode.targetY = 0;
    targetNode.targetZ = 0;

    const neighborIds = Array.from(AppState.neighborsMap.get(targetNode.id) || []);

    let allocated = 0;
    C.FOCUS_RINGS.forEach((ringDef, rIdx) => {
      const countInRing = Math.min(neighborIds.length - allocated, ringDef.max);
      if (countInRing <= 0) return;

      const points = this.spherePoints(countInRing, ringDef.r, rIdx * 0.7);
      for (let i = 0; i < countInRing; i++) {
        const nId = neighborIds[allocated + i];
        const nNode = AppState.nodeMap.get(nId);
        if (!nNode) continue;

        const p = points[i];
        nNode.targetX = p.x;
        nNode.targetY = p.y;
        nNode.targetZ = p.z;
      }
      allocated += countInRing;
    });

    const connectedSet = new Set(neighborIds);
    connectedSet.add(targetNode.id);

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!connectedSet.has(n.id)) {
        const dist = 1550 + (idx % 5) * 80;
        const points = this.spherePoints(1, dist, idx * 0.3);
        const p = points[0];
        n.targetX = p.x;
        n.targetY = p.y;
        n.targetZ = p.z;
      }
    });

    const fitZoom = neighborIds.length > 20 ? 0.70 : 0.95;
    AppState.targetCamX = 0;
    AppState.targetCamY = 0;
    AppState.targetCamZ = C.FOCUS_RINGS[C.FOCUS_RINGS.length - 1].r * 1.6;
    AppState.targetZoom = fitZoom;
  },

  // Layout 3: Atomic Shell Focus (3D Cluster Focus)
  setClusterLayout: function(cKey) {
    AppState.focusMode = "cluster";
    AppState.activeCluster = cKey;
    AppState.focusedClusterKey = cKey;
    AppState.focusedNodeObj = null;

    const C = this.CONFIG;

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

    let allocated = 0;
    C.CLUSTER_RINGS.forEach((rDef, rIdx) => {
      const countInRing = Math.min(clusterNodes.length - allocated, rDef.max);
      if (countInRing <= 0) return;

      const points = this.spherePoints(countInRing, rDef.r, rIdx * 0.7);
      for (let i = 0; i < countInRing; i++) {
        const cn = clusterNodes[allocated + i];
        const p = points[i];
        cn.targetX = p.x;
        cn.targetY = p.y;
        cn.targetZ = p.z;
      }
      allocated += countInRing;
    });

    const extArr = Array.from(connectedExtIds);
    extArr.forEach((extId, i) => {
      const extNode = AppState.nodeMap.get(extId);
      if (!extNode) return;
      const dist = 1180 + (i % 2) * 140;
      const points = this.spherePoints(1, dist, i * 0.5);
      const p = points[0];
      extNode.targetX = p.x;
      extNode.targetY = p.y;
      extNode.targetZ = p.z;
    });

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!clusterNodeIds.has(n.id) && !connectedExtIds.has(n.id)) {
        const dist = 1680 + (idx % 4) * 80;
        const points = this.spherePoints(1, dist, idx * 0.3);
        const p = points[0];
        n.targetX = p.x;
        n.targetY = p.y;
        n.targetZ = p.z;
      }
    });

    const fitZoom = clusterNodes.length > 25 ? 0.65 : 0.85;
    AppState.targetCamX = 0;
    AppState.targetCamY = 0;
    AppState.targetCamZ = C.CLUSTER_RINGS[C.CLUSTER_RINGS.length - 1].r * 1.6;
    AppState.targetZoom = fitZoom;
  },

  // Layout 4: Quantum Transition Tour (3D)
  setTourLayout: function(tour, stepIdx) {
    AppState.focusMode = "tour";
    AppState.activeTour = tour;
    AppState.tourStepIdx = stepIdx;

    const stepCount = tour.steps.length;
    const tourNodeIds = new Set(tour.steps.map(s => s.id));

    const tourRadius = this.CONFIG.TOUR_RADIUS;
    const points = this.spherePoints(stepCount, tourRadius, 0);
    tour.steps.forEach((s, idx) => {
      const sNode = AppState.nodeMap.get(s.id);
      if (!sNode) return;
      const p = points[idx];
      sNode.targetX = p.x;
      sNode.targetY = p.y;
      sNode.targetZ = p.z;
    });

    GRAPH_DATA.nodes.forEach((n, idx) => {
      if (!tourNodeIds.has(n.id)) {
        const dist = 1450 + (idx % 4) * 80;
        const points = this.spherePoints(1, dist, idx * 0.3);
        const p = points[0];
        n.targetX = p.x;
        n.targetY = p.y;
        n.targetZ = p.z;
      }
    });

    AppState.targetCamX = 0;
    AppState.targetCamY = 0;
    AppState.targetCamZ = tourRadius * 1.8;
    AppState.targetZoom = 0.88;
  }
};
