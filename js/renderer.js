// Canvas 2D Engine - Quantum Atomic Visualizer with Bold Typography & Zero-Wobble Glide
const GraphRenderer = {
  canvas: null,
  ctx: null,
  radarCanvas: null,
  radarCtx: null,
  logoImg: new Image(),
  quantumTimer: 0,

  // Background starfield particles
  starfield: [],
  starfieldInitialized: false,

  // Link particle trails
  linkParticles: [],

  // Label collision avoidance
  labelRects: [],

  // Animation state
  transitionProgress: 0,
  prevFocusMode: "global",

  init: function() {
    this.canvas = document.getElementById("graph-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.radarCanvas = document.getElementById("radar-canvas");
    this.radarCtx = this.radarCanvas.getContext("2d");
    this.logoImg.src = BRAND_LOGO_SRC;

    this.initStarfield();
    this.resize();
  },

  initStarfield: function() {
    const count = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    this.starfield = [];
    for (let i = 0; i < count; i++) {
      this.starfield.push({
        x: Math.random() * 4000 - 2000,
        y: Math.random() * 4000 - 2000,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        twinkleSpeed: Math.random() * 0.002 + 0.0005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: this.getStarColor()
      });
    }
    this.starfieldInitialized = true;
  },

  getStarColor: function() {
    const r = Math.random();
    if (r < 0.4) return "#ffffff";
    if (r < 0.6) return "#d4af37";
    if (r < 0.8) return "#00d2ff";
    return "#ff6b52";
  },

  resize: function() {
    AppState.width = window.innerWidth;
    AppState.height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = AppState.width * dpr;
    this.canvas.height = AppState.height * dpr;
    this.canvas.style.width = AppState.width + "px";
    this.canvas.style.height = AppState.height + "px";
    this.ctx.scale(dpr, dpr);

    this.radarCanvas.width = 140 * dpr;
    this.radarCanvas.height = 95 * dpr;
    this.radarCtx.scale(dpr, dpr);

    // Reinitialize starfield if significantly resized
    if (this.starfieldInitialized && Math.abs(this.canvas.width / dpr - AppState.width) > 100) {
      this.initStarfield();
    }
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

    // Track focus mode transitions for smooth animations
    if (this.prevFocusMode !== AppState.focusMode) {
      this.transitionProgress = 0;
      this.prevFocusMode = AppState.focusMode;
    }
    this.transitionProgress = Math.min(1, this.transitionProgress + 0.03);

    // Smooth direct camera follow without overshoot
    AppState.camX += (AppState.targetCamX - AppState.camX) * PhysicsEngine.CONFIG.CAMERA_SMOOTH;
    AppState.camY += (AppState.targetCamY - AppState.camY) * PhysicsEngine.CONFIG.CAMERA_SMOOTH;
    AppState.zoom += (AppState.targetZoom - AppState.zoom) * PhysicsEngine.CONFIG.ZOOM_SMOOTH;

    PhysicsEngine.step();

    const ctx = this.ctx;
    const width = AppState.width;
    const height = AppState.height;
    const cx = width / 2;
    const cy = height / 2;

    // 1. Quantum Vacuum Background with Starfield
    this.renderBackground(ctx, width, height);

    // 2. World Coordinate Transform
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(AppState.zoom, AppState.zoom);
    ctx.translate(-AppState.camX, -AppState.camY);

    // 3. Draw Atomic Structure (Bohr Shells & Rutherford Elliptical Orbits)
    if (AppState.focusMode === "global") {
      this.drawAtomicOrbits(ctx, cx, cy);
    }

    // 4. Update and draw link particles (trails)
    this.updateLinkParticles();

    // 5. Draw Subatomic Particle Links (Feixes Quânticos)
    this.drawLinks(ctx);

    // 6. Draw Link Particles (animated trails)
    this.drawLinkParticles(ctx);

    // 7. Draw Electrons & Nucleus Particles with Bold Typography
    this.labelRects = []; // Reset for collision detection
    this.drawNodes(ctx);

    ctx.restore();

    // 8. Draw Radar Minimap (Sensor de Orbitais)
    this.renderMinimap();

    requestAnimationFrame(() => this.render());
  },

  // Background with animated starfield
  renderBackground: function(ctx, width, height) {
    // Guard against invalid dimensions
    if (!width || !height || !isFinite(width) || !isFinite(height)) return;
    const cx = width / 2;
    const cy = height / 2;
    // Deep space base
    ctx.fillStyle = "#07080d";
    ctx.fillRect(0, 0, width, height);

    // Radiant Central Core Gradient
    const coreGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, width * 0.9);
    coreGrad.addColorStop(0, "rgba(224, 49, 21, 0.06)");
    coreGrad.addColorStop(0.35, "rgba(14, 16, 26, 0.65)");
    coreGrad.addColorStop(1, "rgba(7, 8, 13, 0.98)");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, width, height);

    // Animated Starfield
    ctx.save();
    const scale = AppState.zoom;
    const offsetX = (AppState.camX - width / 2) * 0.15;
    const offsetY = (AppState.camY - height / 2) * 0.15;

    this.starfield.forEach(star => {
      const twinkle = Math.sin(this.quantumTimer * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
      const alpha = star.alpha * twinkle;

      const sx = width / 2 + (star.x - offsetX) / scale;
      const sy = height / 2 + (star.y - offsetY) / scale;

      // Wrap around
      if (sx < -10) star.x += 4000 * scale;
      if (sx > width + 10) star.x -= 4000 * scale;
      if (sy < -10) star.y += 4000 * scale;
      if (sy > height + 10) star.y -= 4000 * scale;

      if (sx > -5 && sx < width + 5 && sy > -5 && sy < height + 5) {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size / scale, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();

    // Subtle vignette
    const vignette = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(7,8,13,0.4)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  },

  // Draw the iconic Atomic Orbitals (Ellipses & Bohr Energy Levels)
  drawAtomicOrbits: function(ctx, cx, cy) {
    ctx.save();

    const C = PhysicsEngine.CONFIG;
    const zoom = AppState.zoom;

    // Polar Grid Reference Rings
    C.BOHR_SHELLS.forEach(s => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.lw / zoom;
      ctx.setLineDash(s.dash.map(d => d / zoom));
      ctx.beginPath();
      ctx.arc(cx, cy, s.r, 0, Math.PI * 2);
      ctx.stroke();

      // Bold Orbital Shell Indicator Tag
      if (zoom > 0.45 && s.r > 160) {
        ctx.setLineDash([]);
        const labelColor = s.color
          .replace("0.1", "0.6")
          .replace("0.14", "0.6")
          .replace("0.18", "0.75")
          .replace("0.35", "0.8");
        ctx.fillStyle = labelColor;
        ctx.font = `800 ${Math.max(9, 10.5 / zoom)}px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, cx + s.r + 8 / zoom, cy);
      }
    });

    // 3 Iconic Rutherford Atomic Ellipses (Inclinadas em Ângulos Quânticos)
    C.ELLIPTICAL_TRACKS.forEach((el, idx) => {
      const colors = [
        "rgba(0, 210, 255, 0.15)",
        "rgba(212, 175, 55, 0.14)",
        "rgba(224, 49, 21, 0.14)"
      ];
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(el.rot);
      ctx.strokeStyle = colors[idx];
      ctx.lineWidth = 1.2 / zoom;
      ctx.setLineDash([5, 8].map(d => d / zoom));
      ctx.beginPath();
      ctx.ellipse(0, 0, el.a, el.b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });

    // Nuclear Energy Containment Boundary (Núcleo) - Pulsing glow
    const nucRadius = C.NUCLEUS_RADIUS;
    const pulse = Math.sin(this.quantumTimer * 1.5) * 0.15 + 0.85;
    const nucGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, nucRadius + 40);
    nucGlow.addColorStop(0, `rgba(224, 49, 21, ${0.22 * pulse})`);
    nucGlow.addColorStop(0.5, `rgba(212, 175, 55, ${0.12 * pulse})`);
    nucGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = nucGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, nucRadius + 40, 0, Math.PI * 2);
    ctx.fill();

    // Inner containment ring
    ctx.strokeStyle = `rgba(224, 49, 21, ${0.4 * pulse})`;
    ctx.lineWidth = 1.5 / zoom;
    ctx.setLineDash([8, 4].map(d => d / zoom));
    ctx.beginPath();
    ctx.arc(cx, cy, nucRadius, 0, Math.PI * 2);
    ctx.stroke();

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
      ctx.globalAlpha = q.alpha * (0.7 + Math.sin(this.quantumTimer * 3 + q.r) * 0.3);
      ctx.beginPath();
      ctx.arc(qx, qy, q.size / zoom, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  },

  // Update link particles for animated trails
  updateLinkParticles: function() {
    // Spawn new particles on highlighted links
    if (Math.random() < 0.15) {
      const links = GRAPH_DATA.links;
      for (let i = 0; i < links.length; i++) {
        const l = links[i];
        const a = AppState.nodeMap.get(typeof l.source === "object" ? l.source.id : l.source);
        const b = AppState.nodeMap.get(typeof l.target === "object" ? l.target.id : l.target);
        if (!a || !b) continue;

        let isLit = false;
        if (AppState.hoveredNode && (AppState.hoveredNode.id === a.id || AppState.hoveredNode.id === b.id)) {
          isLit = true;
        } else if (AppState.focusMode === "node" && AppState.focusedNodeObj) {
          if (AppState.focusedNodeObj.id === a.id || AppState.focusedNodeObj.id === b.id) {
            isLit = true;
          }
        } else if (AppState.focusMode === "tour" && AppState.activeTour) {
          const tourIds = AppState.activeTour.steps.map(s => s.id);
          const aIdx = tourIds.indexOf(a.id);
          const bIdx = tourIds.indexOf(b.id);
          if (aIdx !== -1 && bIdx !== -1 && Math.abs(aIdx - bIdx) === 1) {
            isLit = true;
          }
        }

        if (isLit && Math.random() < 0.3) {
          this.linkParticles.push({
            sourceX: a.x,
            sourceY: a.y,
            targetX: b.x,
            targetY: b.y,
            progress: 0,
            speed: 0.015 + Math.random() * 0.01,
            size: Math.random() * 2 + 1.5,
            color: Math.random() < 0.5 ? "#00d2ff" : "#d4af37",
            alpha: 1
          });
        }
      }
    }

    // Update existing particles
    for (let i = this.linkParticles.length - 1; i >= 0; i--) {
      const p = this.linkParticles[i];
      p.progress += p.speed;
      p.alpha = 1 - p.progress;

      if (p.progress >= 1) {
        this.linkParticles.splice(i, 1);
      }
    }

    // Limit particle count
    if (this.linkParticles.length > 50) {
      this.linkParticles = this.linkParticles.slice(-50);
    }
  },

  // Draw link particles (animated trails)
  drawLinkParticles: function(ctx) {
    this.linkParticles.forEach(p => {
      const x = p.sourceX + (p.targetX - p.sourceX) * p.progress;
      const y = p.sourceY + (p.targetY - p.sourceY) * p.progress;

      ctx.globalAlpha = p.alpha * 0.8;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
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

      // Gradient stroke for lit links
      if (isLit) {
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, a.color);
        grad.addColorStop(0.5, "#00d2ff");
        grad.addColorStop(1, b.color);
        ctx.strokeStyle = grad;
        ctx.shadowColor = "#00d2ff";
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = a.color;
      }

      ctx.globalAlpha = linkAlpha;
      ctx.lineWidth = linkWidth;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Moving energy particle on lit links
      if (isLit) {
        const p = (this.quantumTimer * 2.2) % 1;
        const px = a.x + (b.x - a.x) * p;
        const py = a.y + (b.y - a.y) * p;
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.95;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  },

  // Draw Particles & Thick Bold Typography with collision avoidance
  drawNodes: function(ctx) {
    const nodes = GRAPH_DATA.nodes;
    const zoom = AppState.zoom;

    // Sort by visibility (draw less visible first)
    const sortedNodes = [...nodes].sort((a, b) => {
      const va = this.getNodeVisibility(a);
      const vb = this.getNodeVisibility(b);
      return va.alpha - vb.alpha;
    });

    for (let i = 0; i < sortedNodes.length; i++) {
      const n = sortedNodes[i];
      const vis = this.getNodeVisibility(n);
      const isHovered = AppState.hoveredNode && AppState.hoveredNode.id === n.id;
      const isFocused = (AppState.focusMode === "node" && AppState.focusedNodeObj && AppState.focusedNodeObj.id === n.id) ||
                        (AppState.focusMode === "tour" && AppState.activeTour && AppState.activeTour.steps[AppState.tourStepIdx].id === n.id);

      let r = n.radius || 8;
      if (isHovered || isFocused) r += 3.5;

      ctx.globalAlpha = vis.alpha;

      // Quantum Particle Glow
      if (vis.isDirect || isHovered || isFocused) {
        const halo = ctx.createRadialGradient(n.x, n.y, r * 0.2, n.x, n.y, r * 2.6);
        halo.addColorStop(0, n.color);
        halo.addColorStop(0.4, n.glow);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isFocused ? 20 : 12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Central Core Engine with Barbearia DUB Emblem
      if (n.id === "hub_core") {
        // Outer glow ring
        const corePulse = Math.sin(this.quantumTimer * 2) * 0.1 + 1;
        ctx.fillStyle = "#131622";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
        ctx.fill();

        // Triple ring effect
        for (let ring = 0; ring < 3; ring++) {
          const ringRadius = r + 5 + ring * 3 + Math.sin(this.quantumTimer * 3 + ring) * 2;
          ctx.strokeStyle = ring === 0 ? "#e03115" : (ring === 1 ? "#d4af37" : "#00d2ff");
          ctx.lineWidth = ring === 0 ? 3.0 : 1.5;
          ctx.globalAlpha = 0.6 - ring * 0.15;
          ctx.setLineDash(ring === 0 ? [] : [8, 4]);
          ctx.beginPath();
          ctx.arc(n.x, n.y, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = vis.alpha;

        if (this.logoImg.complete && this.logoImg.naturalWidth > 0) {
          const imgSize = r * 1.55;
          ctx.drawImage(this.logoImg, n.x - imgSize/2, n.y - imgSize/2, imgSize, imgSize);
        }
      } else {
        // Particle body with subtle gradient
        const grad = ctx.createRadialGradient(n.x - r * 0.3, n.y - r * 0.3, 0, n.x, n.y, r);
        if (isHovered || isFocused) {
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.6, n.color);
          grad.addColorStop(1, n.color);
        } else {
          grad.addColorStop(0, n.color);
          grad.addColorStop(1, n.color);
        }
        ctx.fillStyle = grad;
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
        ctx.shadowColor = "#00d2ff";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 7 + Math.sin(this.quantumTimer * 5) * 2.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Tour Step Number Badge
      if (AppState.focusMode === "tour" && AppState.activeTour) {
        const stepIdxInTour = AppState.activeTour.steps.findIndex(s => s.id === n.id);
        if (stepIdxInTour !== -1) {
          ctx.fillStyle = "#e03115";
          ctx.shadowColor = "#e03115";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(n.x, n.y - r - 9, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = "#ffffff";
          ctx.font = '800 10px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(stepIdxInTour + 1), n.x, n.y - r - 9);
        }
      }

      // Bold, Crisp, High-Contrast Typography with collision avoidance
      const shouldShowLabel =
        isFocused ||
        isHovered ||
        (AppState.focusMode === "tour" && vis.isDirect) ||
        (AppState.focusMode === "node" && vis.isDirect) ||
        (AppState.focusMode === "cluster" && n.cluster === AppState.focusedClusterKey) ||
        (AppState.focusMode === "global" && (n.val >= 24 || zoom > 0.75));

      if (vis.isDirect && shouldShowLabel) {
        const fontSize = isFocused ? 14.5 : (isHovered ? 13.5 : 12.5);
        const fontWeight = isFocused || isHovered ? "800" : "700";
        ctx.font = `${fontWeight} ${fontSize}px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif`;

        const textMetrics = ctx.measureText(n.name);
        const textWidth = textMetrics.width;
        const textHeight = fontSize + 5;
        const labelY = n.y + r + 6;

        // Check collision with existing labels
        const pillX = n.x - textWidth/2 - 7;
        const pillY = labelY - 2;
        const pillW = textWidth + 14;
        const pillH = textHeight + 2;

        let hasCollision = false;
        for (const rect of this.labelRects) {
          if (this.rectsOverlap(pillX, pillY, pillW, pillH, rect.x, rect.y, rect.w, rect.h)) {
            hasCollision = true;
            break;
          }
        }

        // Also check collision with nearby nodes
        if (!hasCollision) {
          for (let j = 0; j < nodes.length; j++) {
            const other = nodes[j];
            if (other.id === n.id) continue;
            const dx = n.x - other.x;
            const dy = n.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < r + (other.radius || 8) + 40) {
              hasCollision = true;
              break;
            }
          }
        }

        if (!hasCollision) {
          // Dark High-Contrast Pill with Clean Border
          ctx.fillStyle = "rgba(9, 10, 16, 0.94)";
          ctx.strokeStyle = isHovered || isFocused ? "rgba(0, 210, 255, 0.5)" : "rgba(255, 255, 255, 0.16)";
          ctx.lineWidth = 1;

          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(pillX, pillY, pillW, pillH, 5);
          } else {
            this.roundRect(ctx, pillX, pillY, pillW, pillH, 5);
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = isHovered || isFocused ? "#ffffff" : "rgba(255, 255, 255, 0.95)";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(n.name, n.x, labelY);

          // Store rect for collision detection
          this.labelRects.push({ x: pillX, y: pillY, w: pillW, h: pillH });
        }
      }
    }
  },

  // Helper for rounded rect (fallback)
  roundRect: function(ctx, x, y, w, h, r) {
    const rad = Math.min(r, w/2, h/2);
    ctx.moveTo(x + rad, y);
    ctx.lineTo(x + w - rad, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
    ctx.lineTo(x + w, y + h - rad);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    ctx.lineTo(x + rad, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
    ctx.lineTo(x, y + rad);
    ctx.quadraticCurveTo(x, y, x + rad, y);
  },

  rectsOverlap: function(x1, y1, w1, h1, x2, y2, w2, h2) {
    const padding = 4;
    return !(x1 + w1 + padding < x2 || x2 + w2 + padding < x1 ||
             y1 + h1 + padding < y2 || y2 + h2 + padding < y1);
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

    // Draw elliptical tracks on minimap
    radarCtx.strokeStyle = "rgba(0, 210, 255, 0.12)";
    radarCtx.lineWidth = 0.6;
    radarCtx.setLineDash([3, 6]);
    PhysicsEngine.CONFIG.ELLIPTICAL_TRACKS.forEach(el => {
      radarCtx.save();
      radarCtx.translate(cx, cy);
      radarCtx.rotate(el.rot);
      radarCtx.beginPath();
      radarCtx.ellipse(0, 0, el.a * scale, el.b * scale, 0, 0, Math.PI * 2);
      radarCtx.stroke();
      radarCtx.restore();
    });
    radarCtx.setLineDash([]);

    // Draw particle dots
    GRAPH_DATA.nodes.forEach(n => {
      const mx = cx + (n.x - AppState.width / 2) * scale;
      const my = cy + (n.y - AppState.height / 2) * scale;
      radarCtx.fillStyle = n.color;
      radarCtx.globalAlpha = 0.8;
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

    // Center indicator
    radarCtx.fillStyle = "#00d2ff";
    radarCtx.beginPath();
    radarCtx.arc(cx, cy, 2, 0, Math.PI * 2);
    radarCtx.fill();
  }
};

// Brand logo source (embedded SVG as data URI)
const BRAND_LOGO_SRC = "data:image/svg+xml;base64," + btoa(`
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e03115"/>
      <stop offset="50%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#00d2ff"/>
    </linearGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="url(#g)" opacity="0.2"/>
  <circle cx="32" cy="32" r="26" fill="none" stroke="url(#g)" stroke-width="2.5"/>
  <path d="M32 16 L32 28 M32 36 L32 48 M16 32 L28 32 M36 32 L48 32" stroke="url(#g)" stroke-width="2" stroke-linecap="round"/>
  <circle cx="32" cy="32" r="8" fill="url(#g)"/>
  <text x="32" y="56" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="8" fill="#e03115">DUB</text>
</svg>
`);