// Canvas 2D Engine with High-DPI & Fluid Camera Smoothing
const GraphRenderer = {
  canvas: null,
  ctx: null,
  radarCanvas: null,
  radarCtx: null,
  logoImg: new Image(),
  pulseCounter: 0,

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
      return { alpha: inTour ? 0.9 : 0.04, isDirect: inTour };
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
        if (nbrs.has(n.id)) return { alpha: 0.8, isDirect: true };
      }
      return { alpha: 0.04, isDirect: false };
    }

    if (AppState.hoveredNode) {
      if (n.id === AppState.hoveredNode.id) return { alpha: 1.0, isDirect: true };
      const nbrs = AppState.neighborsMap.get(AppState.hoveredNode.id) || new Set();
      if (nbrs.has(n.id)) return { alpha: 0.95, isDirect: true };
      return { alpha: 0.15, isDirect: false };
    }

    return { alpha: 1.0, isDirect: true };
  },

  render: function() {
    this.pulseCounter += 0.02;

    // Smooth Camera Follow
    AppState.camX += (AppState.targetCamX - AppState.camX) * 0.055;
    AppState.camY += (AppState.targetCamY - AppState.camY) * 0.055;
    AppState.zoom += (AppState.targetZoom - AppState.zoom) * 0.055;

    PhysicsEngine.step();

    const ctx = this.ctx;
    const width = AppState.width;
    const height = AppState.height;

    // Background Clear
    ctx.fillStyle = "#0c0d12";
    ctx.fillRect(0, 0, width, height);

    // Vignette
    const grad = ctx.createRadialGradient(width/2, height/2, 120, width/2, height/2, width * 0.85);
    grad.addColorStop(0, "rgba(24, 27, 38, 0.45)");
    grad.addColorStop(1, "rgba(12, 13, 18, 0.98)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Star Dust
    ctx.save();
    AppState.particles.forEach(p => {
      const px = (p.x - AppState.camX) * AppState.zoom * 0.15 + width / 2;
      const py = (p.y - AppState.camY) * AppState.zoom * 0.15 + height / 2;
      ctx.fillStyle = "rgba(255, 255, 255, " + p.alpha + ")";
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // World Transform
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(AppState.zoom, AppState.zoom);
    ctx.translate(-AppState.camX, -AppState.camY);

    // 1. Draw Links
    const links = GRAPH_DATA.links;
    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      const a = AppState.nodeMap.get(typeof l.source === "object" ? l.source.id : l.source);
      const b = AppState.nodeMap.get(typeof l.target === "object" ? l.target.id : l.target);
      if (!a || !b) continue;

      let isLit = false;
      let linkAlpha = 0.07;
      let linkWidth = 0.7;

      if (AppState.hoveredNode && (AppState.hoveredNode.id === a.id || AppState.hoveredNode.id === b.id)) {
        isLit = true;
        linkAlpha = 0.95;
        linkWidth = 2.2;
      } else if (AppState.focusMode === "tour" && AppState.activeTour) {
        const tourIds = AppState.activeTour.steps.map(s => s.id);
        const aIdx = tourIds.indexOf(a.id);
        const bIdx = tourIds.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1 && Math.abs(aIdx - bIdx) === 1) {
          isLit = true;
          linkAlpha = 0.95;
          linkWidth = 2.5;
        } else {
          linkAlpha = 0.015;
        }
      } else if (AppState.focusMode === "node" && AppState.focusedNodeObj) {
        if (AppState.focusedNodeObj.id === a.id || AppState.focusedNodeObj.id === b.id) {
          isLit = true;
          linkAlpha = 0.95;
          linkWidth = 2.2;
        } else {
          linkAlpha = 0.015;
        }
      } else if (AppState.focusMode === "cluster" && AppState.focusedClusterKey) {
        if (a.cluster === AppState.focusedClusterKey || b.cluster === AppState.focusedClusterKey) {
          linkAlpha = 0.35;
          linkWidth = 1.2;
        } else {
          linkAlpha = 0.015;
        }
      }

      ctx.strokeStyle = isLit ? "#ff5e42" : a.color;
      ctx.globalAlpha = linkAlpha;
      ctx.lineWidth = linkWidth;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      if (isLit) {
        const p = (this.pulseCounter * 1.6) % 1;
        const px = a.x + (b.x - a.x) * p;
        const py = a.y + (b.y - a.y) * p;
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Draw Nodes
    const nodes = GRAPH_DATA.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const vis = this.getNodeVisibility(n);
      const isHovered = AppState.hoveredNode && AppState.hoveredNode.id === n.id;
      const isFocused = (AppState.focusMode === "node" && AppState.focusedNodeObj && AppState.focusedNodeObj.id === n.id) ||
                        (AppState.focusMode === "tour" && AppState.activeTour && AppState.activeTour.steps[AppState.tourStepIdx].id === n.id);

      let r = n.radius;
      if (isHovered || isFocused) r += 3;

      ctx.globalAlpha = vis.alpha;

      // Glow Halo
      if (vis.isDirect || isHovered || isFocused) {
        const halo = ctx.createRadialGradient(n.x, n.y, r * 0.2, n.x, n.y, r * 2.5);
        halo.addColorStop(0, n.color);
        halo.addColorStop(0.35, n.glow);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central Core with Logo
      if (n.id === "hub_core") {
        ctx.fillStyle = "#181b26";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#c53018";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (this.logoImg.complete && this.logoImg.naturalWidth > 0) {
          const imgSize = r * 1.5;
          ctx.drawImage(this.logoImg, n.x - imgSize/2, n.y - imgSize/2, imgSize, imgSize);
        }
      } else {
        ctx.fillStyle = isHovered || isFocused ? "#ffffff" : n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isFocused) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 6 + Math.sin(this.pulseCounter * 4) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Tour Step Number Badge
      if (AppState.focusMode === "tour" && AppState.activeTour) {
        const stepIdxInTour = AppState.activeTour.steps.findIndex(s => s.id === n.id);
        if (stepIdxInTour !== -1) {
          ctx.fillStyle = "#c53018";
          ctx.beginPath();
          ctx.arc(n.x, n.y - r - 8, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(stepIdxInTour + 1), n.x, n.y - r - 8);
        }
      }

      // Labels with Clean Dark Pill
      const shouldShowLabel =
        isFocused ||
        isHovered ||
        (AppState.focusMode === "tour" && vis.isDirect) ||
        (AppState.focusMode === "node" && vis.isDirect) ||
        (AppState.focusMode === "cluster" && n.cluster === AppState.focusedClusterKey) ||
        (AppState.focusMode === "global" && (n.val >= 25 || AppState.zoom > 0.85));

      if (vis.isDirect && shouldShowLabel) {
        const fontSize = isFocused ? 13 : (isHovered ? 12 : 11);
        ctx.font = (isFocused || isHovered ? "600 " : "500 ") + fontSize + "px " + "-apple-system, BlinkMacSystemFont, sans-serif";

        const textMetrics = ctx.measureText(n.name);
        const textWidth = textMetrics.width;
        const textHeight = fontSize + 4;
        const labelY = n.y + r + 6;

        ctx.fillStyle = "rgba(12, 13, 18, 0.85)";
        ctx.fillRect(n.x - textWidth/2 - 5, labelY - 2, textWidth + 10, textHeight);

        ctx.fillStyle = isHovered || isFocused ? "#ffffff" : "rgba(248, 250, 252, 0.92)";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(n.name, n.x, labelY);
      }
    }

    ctx.restore();

    this.renderMinimap();
    requestAnimationFrame(() => this.render());
  },

  renderMinimap: function() {
    const radarCtx = this.radarCtx;
    radarCtx.fillStyle = "rgba(16, 18, 26, 0.95)";
    radarCtx.fillRect(0, 0, 140, 95);

    const scale = 0.038;
    const cx = 70;
    const cy = 47;

    GRAPH_DATA.nodes.forEach(n => {
      const mx = cx + (n.x - AppState.width / 2) * scale;
      const my = cy + (n.y - AppState.height / 2) * scale;
      radarCtx.fillStyle = n.color;
      radarCtx.beginPath();
      radarCtx.arc(mx, my, 1.2, 0, Math.PI * 2);
      radarCtx.fill();
    });

    const vpW = (AppState.width / AppState.zoom) * scale;
    const vpH = (AppState.height / AppState.zoom) * scale;
    const vpX = cx + (AppState.camX - AppState.width / 2) * scale - vpW / 2;
    const vpY = cy + (AppState.camY - AppState.height / 2) * scale - vpH / 2;

    radarCtx.strokeStyle = "rgba(197, 48, 24, 0.8)";
    radarCtx.lineWidth = 1;
    radarCtx.strokeRect(vpX, vpY, vpW, vpH);
  }
};
