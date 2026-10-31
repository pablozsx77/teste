// State Management for Barbearia DUB Galaxy Visualizer
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

  particles: []
};

// Initialize Lookup Tables
GRAPH_DATA.nodes.forEach(n => {
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

// Ambient Particles
for (let i = 0; i < 180; i++) {
  AppState.particles.push({
    x: (Math.random() - 0.5) * 4500,
    y: (Math.random() - 0.5) * 4500,
    size: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.4 + 0.1
  });
}
