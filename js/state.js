// State Management for Barbearia DUB Atomic Visualizer
const AppState = {
  width: window.innerWidth,
  height: window.innerHeight,
  camX: window.innerWidth / 2,
  camY: window.innerHeight / 2,
  zoom: 0.52,
  targetCamX: window.innerWidth / 2,
  targetCamY: window.innerHeight / 2,
  targetZoom: 0.52,

  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  hoveredNode: null,
  selectedNode: null,
  activeCluster: "all",
  activeTour: null,
  tourStepIdx: 0,
  physicsRunning: true,

  focusMode: "global", // 'global' | 'cluster' | 'node' | 'tour'
  focusedClusterKey: null,
  focusedNodeObj: null,

  nodeMap: new Map(),
  outgoingMap: new Map(),
  incomingMap: new Map(),
  neighborsMap: new Map(),

  // Quantum Energy Quanta traveling on atomic orbits
  atomicQuanta: []
};

// Initialize Lookup Tables
GRAPH_DATA.nodes.forEach(n => {
  const c = GRAPH_DATA.clusters[n.cluster] || { color: '#94a3b8', glow: '#64748b' };
  n.color = c.color;
  n.glow = c.glow;
  if (n.id === 'hub_core') {
    n.radius = 24;
  } else if (n.id.startsWith('hub_')) {
    n.radius = 16;
  } else {
    n.radius = Math.max(6, Math.min(18, Math.round(Math.sqrt(n.val || 10) * 3)));
  }
  n.x = AppState.width / 2;
  n.y = AppState.height / 2;
  n.targetX = AppState.width / 2;
  n.targetY = AppState.height / 2;
  n.vx = 0;
  n.vy = 0;

  AppState.nodeMap.set(n.id, n);
  AppState.outgoingMap.set(n.id, []);
  AppState.incomingMap.set(n.id, []);
  AppState.neighborsMap.set(n.id, new Set());
});

GRAPH_DATA.links.forEach(l => {
  const s = typeof l.source === "object" ? l.source.id : l.source;
  const t = typeof l.target === "object" ? l.target.id : l.target;
  if (AppState.nodeMap.has(s) && AppState.nodeMap.has(t)) {
    AppState.outgoingMap.get(s).push({ target: t, label: l.label, type: l.type });
    AppState.incomingMap.get(t).push({ source: s, label: l.label, type: l.type });
    AppState.neighborsMap.get(s).add(t);
    AppState.neighborsMap.get(t).add(s);
  }
});

// Seed Quantum Energy Quanta along atomic orbital tracks
const orbitalRings = [400, 660, 920, 1140, 1380, 1660, 1940];
for (let i = 0; i < 70; i++) {
  const r = orbitalRings[i % orbitalRings.length];
  AppState.atomicQuanta.push({
    type: "ring",
    r: r,
    angle: Math.random() * Math.PI * 2,
    speed: (0.002 + Math.random() * 0.003) * (i % 2 === 0 ? 1 : -1),
    size: Math.random() * 2.2 + 1.2,
    color: i % 3 === 0 ? "#00d2ff" : (i % 3 === 1 ? "#d4af37" : "#ff5e42"),
    alpha: Math.random() * 0.5 + 0.35
  });
}

// Elliptical quanta for Rutherford orbital paths
const ellipticalTracks = [
  { a: 780, b: 340, rot: 0 },
  { a: 860, b: 380, rot: Math.PI / 3.2 },
  { a: 940, b: 420, rot: -Math.PI / 3.2 }
];
for (let i = 0; i < 30; i++) {
  const trk = ellipticalTracks[i % ellipticalTracks.length];
  AppState.atomicQuanta.push({
    type: "ellipse",
    a: trk.a,
    b: trk.b,
    rot: trk.rot,
    t: Math.random() * Math.PI * 2,
    speed: (0.003 + Math.random() * 0.004) * (i % 2 === 0 ? 1 : -1),
    size: Math.random() * 2.5 + 1.5,
    color: i % 2 === 0 ? "#00d2ff" : "#d4af37",
    alpha: Math.random() * 0.6 + 0.4
  });
}
