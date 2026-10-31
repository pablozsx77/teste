// Canvas 2D Engine - Quantum Atomic Visualizer with Bold Typography & Zero-Wobble Glide
const GraphRenderer = {
  canvas: null,
  ctx: null,
  radarCanvas: null,
  radarCtx: null,
  logoImg: new Image(),
  quantumTimer: 0,

  init: function() {
    this.canvas = document.getElementById("graph-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.radarCanvas = document.getElementById("radar-canvas");
    this.radarCtx = this.radarCanvas.getContext("2d");
    this.logoImg.src = BRAND_LOGO_SRC;
    this.resize();
  },

  resize: function() {
    AppState.width = window.innerWidth;
    AppState.height = window.innerHeight;
    this.canvas.width = AppState.width * window.devicePixelRatio;
    this.canvas.height = AppState.height * window.devicePixelRatio;
    this.canvas.style.width = AppState.width + "px";
    this.canvas.style.height = AppState.height + "px";
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.radarCanvas.width = 140 * window.devicePixelRatio;
    this.radarCanvas.height = 95 * window.devicePixelRatio;
    this.radarCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  },

  getNodeVisibility: function(n) {
    if (AppState.focusMode === "tour" && AppState.activeTour) {
      const curStep = AppState.activeTour.steps[AppState.tourStepIdx];
      if (curStep && curStep.id === n.id) return { alpha: 1.0, isDirect: true };
      const inTour = AppState.activeTour.steps.some(s => s.id === n.id);
      return { alpha: inTour ? 0.92 : 0.04, isDirect: inTour };
    }

    if (AppState.focusMode === "node" && AppState.focusedNodeObj) {
      if (n.id === AppState.focusedNodeObj.id) return { alpha: 1.0, isDirect: true };
      const nbrs = AppState.neighborsMap.get(AppState.focusedNodeObj.id) || new Set();
      if (nbrs.has(n.id)) return { alpha: 0.95, isDirect: true };
      return { alpha: 0.04, isDirect: false };
    }

    if (AppState.focusMode === "cluster" && AppState.focusedClusterKey) {
      if (n.cluster === AppState.focusedClusterKey) return { alpha: 1.0, isDirect: true };
      const clusterNodes = GRAPH_DATA.nodes.filter(cn => cn.cluster === AppState.focusedClusterKey);
      for (let i = 0; i < clusterNodes.length; i++) {
        const nbrs = AppState.neighborsMap.get(clusterNodes[i].id) || new Set();
        if (nbrs.has(n.id)) return { alpha: 0.82, isDirect: true };
      }
      return { alpha: 0.04, isDirect: false };
    }

    if (AppState.hoveredNode) {
      if (n.id === AppState.hoveredNode.id) return { alpha: 1.0, isDirect: true };
      const nbrs = AppState.neighborsMap.get(AppState.hoveredNode.id) || new Set();
      if (nbrs.has(n.id)) return { alpha: 0.95, isDirect: true };
      return { alpha: 0.14, isDirect: false };
    }

    return { alpha: 1.0, isDirect: true };
  },

  render: function() {
    this.quantumTimer += 0.025;

    // Smooth direct camera follow without overshoot
    AppState.camX += (AppState.targetCamX - AppState.camX) * 0.14;
    AppState.camY += (AppState.targetCamY - AppState.camY) * 0.14;
    AppState.zoom += (AppState.targetZoom - AppState.zoom) * 0.14;

    PhysicsEngine.step();

    const ctx = this.ctx;
    const width = AppState.width;
    const height = AppState.height;
    const cx = width / 2;
    const cy = height / 2;

    // 1. Quantum Vacuum Background
    ctx.fillStyle = "#07080d";
    ctx.fillRect(0, 0, width, height);

    // Radiant Central Core Gradient
    const coreGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, width * 0.9);
    coreGrad.addColorStop(0, "rgba(224, 49, 21, 0.06)");
    coreGrad.addColorStop(0.35, "rgba(14, 16, 26, 0.65)");
    coreGrad.addColorStop(1, "rgba(7, 8, 13, 0.98)");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. World Coordinate Transform
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(AppState.zoom, AppState.zoom);
    ctx.translate(-AppState.camX, -AppState.camY);

    // 3. Draw Atomic Structure (Bohr Shells & Rutherford Elliptical Orbits)
    if (AppState.focusMode === "global") {
      this.drawAtomicOrbits(ctx, cx, cy);
    }

    // 4. Draw Subatomic Particle Links (Feixes Quânticos)
    this.drawLinks(ctx);

    // 5. Draw Electrons & Nucleus Particles with Bold Typography
    this.drawNodes(ctx);

    ctx.restore();

    // 6. Draw Radar Minimap (Sensor de Orbitais)
    this.renderMinimap();

    requestAnimationFrame(() => this.render());
  },

  // Draw the iconic Atomic Orbitals (Ellipses & Bohr Energy Levels)
  drawAtomicOrbits: function(ctx, cx, cy) {
    ctx.save();

    // Polar Grid Reference Rings
    const bohrShells = [
      { r: 160, label: "NÚCLEO CENTRAL", color: "rgba(224, 49, 21, 0.35)", lw: 1.5, dash: [4, 4] },
      { r: 400, label: "ÓRBITA 1: GESTÃO", color: "rgba(212, 175, 55, 0.16)", lw: 1.0, dash: [6, 6] },
      { r: 660, label: "ÓRBITA 2: OPERAÇÃO & CLIENTES", color: "rgba(0, 210, 255, 0.14)", lw: 1.0, dash: [6, 6] },
      { r: 920, label: "ÓRBITA 3: IA & AUTOMAÇÃO", color: "rgba(129, 140, 248, 0.14)", lw: 1.0, dash: [6, 6] },
      { r: 1140, label: "ÓRBITA 4: GATEWAYS & APIS", color: "rgba(249, 115, 22, 0.14)", lw: 1.0, dash: [6, 6] },
      { r: 1380, label: "CAMADA K: SUPABASE EDGE FUNCTIONS", color: "rgba(56, 189, 248, 0.18)", lw: 1.2, dash: [8, 8] },
      { r: 1660, label: "CAMADA L1: BANCO POSTGRESQL", color: "rgba(244, 63, 94, 0.14)", lw: 1.0, dash: [8, 8] },
      { r: 1940, label: "CAMADA L2: TRANSAÇÕES & AUDITORIA", color: "rgba(244, 63, 94, 0.10)", lw: 1.0, dash: [8, 8] }
    ];

    bohrShells.forEach(s => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.lw;
      ctx.setLineDash(s.dash);
      ctx.beginPath();
      ctx.arc(cx, cy, s.r, 0, Math.PI * 2);
      ctx.stroke();

      // Bold Orbital Shell Indicator Tag
      if (AppState.zoom > 0.45 && s.r > 160) {
        ctx.setLineDash([]);
        ctx.fillStyle = s.color.replace("0.1", "0.6").replace("0.14", "0.6").replace("0.18", "0.75");
        ctx.font = '800 10.5px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, cx + s.r + 8, cy);
      }
    });

    // 3 Iconic Rutherford Atomic Ellipses (Inclinadas em Ângulos Quânticos)
    const ellipses = [
      { a: 780, b: 340, rot: 0, color: "rgba(0, 210, 255, 0.15)" },
      { a: 860, b: 380, rot: Math.PI / 3.2, color: "rgba(212, 175, 55, 0.14)" },
      { a: 940, b: 420, rot: -Math.PI / 3.2, color: "rgba(224, 49, 21, 0.14)" }
    ];

    ellipses.forEach(el => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(el.rot);
      ctx.strokeStyle = el.color;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, el.a, el.b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });

    // Nuclear Energy Containment Boundary (Núcleo)
    const nucRadius = 160;
    const nucGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, nucRadius + 20);
    nucGlow.addColorStop(0, "rgba(224, 49, 21, 0.22)");
    nucGlow.addColorStop(0.7, "rgba(212, 175, 55, 0.08)");
    nucGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = nucGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, nucRadius + 20, 0, Math.PI * 2);
    ctx.fill();

    // Moving Quantum Energy Quanta (Partículas nos Orbitais)
    ctx.setLineDash([]);
    AppState.atomicQuanta.forEach(q => {
      let qx = cx;
      let qy = cy;

      if (q.type === "ring") {
        q.angle += q.speed;
        qx = cx + Math.cos(q.angle) * q.r;
        qy = cy + Math.sin(q.angle) * q.r;
      } else if (q.type === "ellipse") {
        q.t += q.speed;
        const ex = q.a * Math.cos(q.t);
        const ey = q.b * Math.sin(q.t);
        const cosR = Math.cos(q.rot);
        const sinR = Math.sin(q.rot);
        qx = cx + (ex * cosR - ey * sinR);
        qy = cy + (ex * sinR + ey * cosR);
      }

      ctx.fillStyle = q.color;
      ctx.globalAlpha = q.alpha;
      ctx.beginPath();
      ctx.arc(qx, qy, q.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  },

  // Draw Subatomic Links (Laser Beams)
  drawLinks: function(ctx) {
    const links = GRAPH_DATA.links;
    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      const a = AppState.nodeMap.get(typeof l.source === "object" ? l.source.id : l.source);
      const b = AppState.nodeMap.get(typeof l.target === "object" ? l.target.id : l.target);
      if (!a || !b) continue;

      let isLit = false;
      let linkAlpha = 0.07;
      let linkWidth = 0.8;

      if (AppState.hoveredNode && (AppState.hoveredNode.id === a.id || AppState.hoveredNode.id === b.id)) {
        isLit = true;
        linkAlpha = 0.95;
        linkWidth = 2.4;
      } else if (AppState.focusMode === "tour" && AppState.activeTour) {
        const tourIds = AppState.activeTour.steps.map(s => s.id);
        const aIdx = tourIds.indexOf(a.id);
        const bIdx = tourIds.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1 && Math.abs(aIdx - bIdx) === 1) {
          isLit = true;
          linkAlpha = 0.95;
          linkWidth = 2.6;
        } else {
          linkAlpha = 0.015;
        }
      } else if (AppState.focusMode === "node" && AppState.focusedNodeObj) {
        if (AppState.focusedNodeObj.id === a.id || AppState.focusedNodeObj.id === b.id) {
          isLit = true;
          linkAlpha = 0.95;
          linkWidth = 2.4;
        } else {
          linkAlpha = 0.015;
        }
      } else if (AppState.focusMode === "cluster" && AppState.focusedClusterKey) {
        if (a.cluster === AppState.focusedClusterKey || b.cluster === AppState.focusedClusterKey) {
          linkAlpha = 0.35;
          linkWidth = 1.3;
        } else {
          linkAlpha = 0.015;
        }
      }

      ctx.strokeStyle = isLit ? "#00d2ff" : a.color;
      ctx.globalAlpha = linkAlpha;
      ctx.lineWidth = linkWidth;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      if (isLit) {
        const p = (this.quantumTimer * 2.2) % 1;
        const px = a.x + (b.x - a.x) * p;
        const py = a.y + (b.y - a.y) * p;
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },

  // Draw Particles & Thick Bold Typography
  drawNodes: function(ctx) {
    const nodes = GRAPH_DATA.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const vis = this.getNodeVisibility(n);
      const isHovered = AppState.hoveredNode && AppState.hoveredNode.id === n.id;
      const isFocused = (AppState.focusMode === "node" && AppState.focusedNodeObj && AppState.focusedNodeObj.id === n.id) ||
                        (AppState.focusMode === "tour" && AppState.activeTour && AppState.activeTour.steps[AppState.tourStepIdx].id === n.id);

      let r = n.radius;
      if (isHovered || isFocused) r += 3.5;

      ctx.globalAlpha = vis.alpha;

      // Quantum Particle Glow
      if (vis.isDirect || isHovered || isFocused) {
        const halo = ctx.createRadialGradient(n.x, n.y, r * 0.2, n.x, n.y, r * 2.6);
        halo.addColorStop(0, n.color);
        halo.addColorStop(0.4, n.glow);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central Core Engine with Barbearia DUB Emblem
      if (n.id === "hub_core") {
        ctx.fillStyle = "#131622";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#e03115";
        ctx.lineWidth = 3.0;
        ctx.stroke();

        if (this.logoImg.complete && this.logoImg.naturalWidth > 0) {
          const imgSize = r * 1.55;
          ctx.drawImage(this.logoImg, n.x - imgSize/2, n.y - imgSize/2, imgSize, imgSize);
        }
      } else {
        ctx.fillStyle = isHovered || isFocused ? "#ffffff" : n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Quantum Spin Ring
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Active Electron Spin Ring
      if (isFocused) {
        ctx.strokeStyle = "#00d2ff";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 7 + Math.sin(this.quantumTimer * 5) * 2.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Tour Step Number Badge
      if (AppState.focusMode === "tour" && AppState.activeTour) {
        const stepIdxInTour = AppState.activeTour.steps.findIndex(s => s.id === n.id);
        if (stepIdxInTour !== -1) {
          ctx.fillStyle = "#e03115";
          ctx.beginPath();
          ctx.arc(n.x, n.y - r - 9, 9, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = '800 10px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(stepIdxInTour + 1), n.x, n.y - r - 9);
        }
      }

      // Bold, Crisp, High-Contrast Typography
      const shouldShowLabel =
        isFocused ||
        isHovered ||
        (AppState.focusMode === "tour" && vis.isDirect) ||
        (AppState.focusMode === "node" && vis.isDirect) ||
        (AppState.focusMode === "cluster" && n.cluster === AppState.focusedClusterKey) ||
        (AppState.focusMode === "global" && (n.val >= 24 || AppState.zoom > 0.75));

      if (vis.isDirect && shouldShowLabel) {
        const fontSize = isFocused ? 14.5 : (isHovered ? 13.5 : 12.5);
        ctx.font = (isFocused || isHovered ? "800 " : "700 ") + fontSize + 'px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif';

        const textMetrics = ctx.measureText(n.name);
        const textWidth = textMetrics.width;
        const textHeight = fontSize + 5;
        const labelY = n.y + r + 6;

        // Dark High-Contrast Pill with Clean Border
        ctx.fillStyle = "rgba(9, 10, 16, 0.94)";
        ctx.strokeStyle = isHovered || isFocused ? "rgba(0, 210, 255, 0.5)" : "rgba(255, 255, 255, 0.16)";
        ctx.lineWidth = 1;

        const pillX = n.x - textWidth/2 - 7;
        const pillY = labelY - 2;
        const pillW = textWidth + 14;
        const pillH = textHeight + 2;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pillX, pillY, pillW, pillH, 5);
        } else {
          ctx.rect(pillX, pillY, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isHovered || isFocused ? "#ffffff" : "rgba(255, 255, 255, 0.95)";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(n.name, n.x, labelY);
      }
    }
  },

  // Atomic Sensor Minimap
  renderMinimap: function() {
    const radarCtx = this.radarCtx;
    radarCtx.fillStyle = "rgba(10, 12, 18, 0.96)";
    radarCtx.fillRect(0, 0, 140, 95);

    const scale = 0.034;
    const cx = 70;
    const cy = 47;

    // Draw concentric Bohr sensor rings
    radarCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    radarCtx.lineWidth = 0.8;
    [160, 660, 1380, 1940].forEach(r => {
      radarCtx.beginPath();
      radarCtx.arc(cx, cy, r * scale, 0, Math.PI * 2);
      radarCtx.stroke();
    });

    // Draw particle dots
    GRAPH_DATA.nodes.forEach(n => {
      const mx = cx + (n.x - AppState.width / 2) * scale;
      const my = cy + (n.y - AppState.height / 2) * scale;
      radarCtx.fillStyle = n.color;
      radarCtx.beginPath();
      radarCtx.arc(mx, my, 1.2, 0, Math.PI * 2);
      radarCtx.fill();
    });

    // Viewport Camera Sensor Bounds
    const vpW = (AppState.width / AppState.zoom) * scale;
    const vpH = (AppState.height / AppState.zoom) * scale;
    const vpX = cx + (AppState.camX - AppState.width / 2) * scale - vpW / 2;
    const vpY = cy + (AppState.camY - AppState.height / 2) * scale - vpH / 2;

    radarCtx.strokeStyle = "rgba(0, 210, 255, 0.85)";
    radarCtx.lineWidth = 1.2;
    radarCtx.strokeRect(vpX, vpY, vpW, vpH);
  }
};
