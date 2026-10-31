// User Interactions, Search & Tour Events
const EventManager = {
  container: null,
  panel: null,
  tooltip: null,

  init: function() {
    this.container = document.getElementById("canvas-container");
    this.panel = document.getElementById("inspector-panel");
    this.tooltip = document.getElementById("cursor-tooltip");

    this.bindMouseDrag();
    this.bindSearch();
    this.bindControls();
    this.bindTours();
  },

  toWorldCoords: function(sx, sy) {
    return {
      x: (sx - AppState.width / 2) / AppState.zoom + AppState.camX,
      y: (sy - AppState.height / 2) / AppState.zoom + AppState.camY
    };
  },

  bindMouseDrag: function() {
    const self = this;
    const container = this.container;

    container.addEventListener("mousedown", (e) => {
      AppState.isDragging = true;
      AppState.dragStartX = e.clientX;
      AppState.dragStartY = e.clientY;
      container.classList.add("grabbing");
    });

    window.addEventListener("mousemove", (e) => {
      if (AppState.isDragging) {
        const dx = (e.clientX - AppState.dragStartX) / AppState.zoom;
        const dy = (e.clientY - AppState.dragStartY) / AppState.zoom;
        AppState.camX -= dx;
        AppState.camY -= dy;
        AppState.targetCamX = AppState.camX;
        AppState.targetCamY = AppState.camY;
        AppState.dragStartX = e.clientX;
        AppState.dragStartY = e.clientY;
        return;
      }

      // Hover
      const w = self.toWorldCoords(e.clientX, e.clientY);
      let found = null;
      const nodes = GRAPH_DATA.nodes;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = w.x - n.x;
        const dy = w.y - n.y;
        if (dx * dx + dy * dy <= (n.radius + 8) * (n.radius + 8)) {
          found = n;
          break;
        }
      }

      const tipDot = document.getElementById("tip-dot");
      const tipTitle = document.getElementById("tip-title");
      const tipDesc = document.getElementById("tip-desc");

      if (found !== AppState.hoveredNode) {
        AppState.hoveredNode = found;
        if (AppState.hoveredNode) {
          tipDot.style.background = AppState.hoveredNode.color;
          tipTitle.textContent = AppState.hoveredNode.name;
          tipDesc.textContent = AppState.hoveredNode.desc;
          self.tooltip.style.left = e.clientX + "px";
          self.tooltip.style.top = e.clientY + "px";
          self.tooltip.style.display = "block";
        } else {
          self.tooltip.style.display = "none";
        }
      } else if (AppState.hoveredNode) {
        self.tooltip.style.left = e.clientX + "px";
        self.tooltip.style.top = e.clientY + "px";
      }
    });

    window.addEventListener("mouseup", () => {
      AppState.isDragging = false;
      container.classList.remove("grabbing");
    });

    // Node Click & Toggle
    container.addEventListener("click", (e) => {
      const w = self.toWorldCoords(e.clientX, e.clientY);
      let found = null;
      const nodes = GRAPH_DATA.nodes;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = w.x - n.x;
        const dy = w.y - n.y;
        if (dx * dx + dy * dy <= (n.radius + 8) * (n.radius + 8)) {
          found = n;
          break;
        }
      }

      if (found) {
        if (AppState.selectedNode && AppState.selectedNode.id === found.id) {
          self.resetToGlobal();
        } else {
          PhysicsEngine.setNodeLayout(found);
          self.openInspector(found);
        }
      } else {
        if (!e.target.closest(".top-header") && !e.target.closest(".inspector-panel") && !e.target.closest(".bottom-flow-panel")) {
          if (AppState.focusMode !== "global") {
            self.resetToGlobal();
          }
        }
      }
    });

    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 0.85;
      AppState.targetZoom = Math.max(0.2, Math.min(3.0, AppState.targetZoom * factor));
    }, { passive: false });
  },

  openInspector: function(node) {
    const self = this;
    const panel = this.panel;
    document.getElementById("panel-badge").textContent = node.category;
    document.getElementById("panel-badge").style.color = node.color;
    document.getElementById("panel-title").textContent = node.name;
    document.getElementById("panel-desc").textContent = node.desc;

    // Metadata
    const panelMeta = document.getElementById("panel-meta");
    panelMeta.innerHTML = "";
    const details = node.details || {};
    const metaEntries = Object.entries(details);

    if (metaEntries.length === 0) {
      document.getElementById("panel-meta-group").style.display = "none";
    } else {
      document.getElementById("panel-meta-group").style.display = "block";
      metaEntries.forEach(([k, v]) => {
        const row = document.createElement("div");
        row.className = "meta-row";
        const valStr = Array.isArray(v) ? (v.length > 0 ? v.join(", ") : "Nenhum") : String(v);
        const label = k.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        row.innerHTML = '<span class="meta-label">' + label + '</span><span class="meta-value">' + valStr + '</span>';
        panelMeta.appendChild(row);
      });
    }

    // Outgoing
    const panelOutgoing = document.getElementById("panel-outgoing");
    const outs = AppState.outgoingMap.get(node.id) || [];
    panelOutgoing.innerHTML = "";
    if (outs.length === 0) {
      panelOutgoing.innerHTML = '<span style="font-size:11px;color:var(--text-muted);">Nenhuma conexão direta de saída</span>';
    } else {
      outs.forEach(o => {
        const targetN = AppState.nodeMap.get(o.target);
        if (!targetN) return;
        const chip = document.createElement("div");
        chip.className = "node-link-chip";
        chip.innerHTML =
          '<span class="chip-indicator" style="background:' + targetN.color + '"></span>' +
          '<span>' + targetN.name + '</span>' +
          '<span class="chip-rel">' + (o.label || o.type) + '</span>';
        chip.onclick = () => {
          PhysicsEngine.setNodeLayout(targetN);
          self.openInspector(targetN);
        };
        panelOutgoing.appendChild(chip);
      });
    }

    // Incoming
    const panelIncoming = document.getElementById("panel-incoming");
    const incs = AppState.incomingMap.get(node.id) || [];
    panelIncoming.innerHTML = "";
    if (incs.length === 0) {
      panelIncoming.innerHTML = '<span style="font-size:11px;color:var(--text-muted);">Nenhuma conexão direta de entrada</span>';
    } else {
      incs.forEach(i => {
        const srcN = AppState.nodeMap.get(i.source);
        if (!srcN) return;
        const chip = document.createElement("div");
        chip.className = "node-link-chip";
        chip.innerHTML =
          '<span class="chip-indicator" style="background:' + srcN.color + '"></span>' +
          '<span>' + srcN.name + '</span>' +
          '<span class="chip-rel">' + (i.label || i.type) + '</span>';
        chip.onclick = () => {
          PhysicsEngine.setNodeLayout(srcN);
          self.openInspector(srcN);
        };
        panelIncoming.appendChild(chip);
      });
    }

    panel.classList.add("open");
  },

  resetToGlobal: function() {
    this.panel.classList.remove("open");
    document.querySelectorAll(".flow-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("tour-stepper-box").classList.remove("visible");
    document.querySelectorAll(".filter-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.cluster === undefined);
    });
    PhysicsEngine.setGlobalLayout();
  },

  bindSearch: function() {
    const self = this;
    const searchInput = document.getElementById("search-input");
    const searchDropdown = document.getElementById("search-dropdown");

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchDropdown.style.display = "none";
        searchDropdown.innerHTML = "";
        return;
      }

      const matches = GRAPH_DATA.nodes.filter(n =>
        n.name.toLowerCase().includes(q) ||
        n.desc.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      ).slice(0, 10);

      if (matches.length === 0) {
        searchDropdown.innerHTML = '<div style="padding:12px;font-size:12px;color:var(--text-muted);text-align:center;">Nenhum componente encontrado</div>';
        searchDropdown.style.display = "block";
        return;
      }

      searchDropdown.innerHTML = matches.map(m =>
        '<div class="search-item" data-id="' + m.id + '">' +
          '<div class="search-item-indicator" style="background:' + m.color + '"></div>' +
          '<div class="search-item-info">' +
            '<div class="search-item-title">' + m.name + '</div>' +
            '<div class="search-item-sub">' + m.category + ' — ' + m.desc.slice(0, 50) + '...</div>' +
          '</div>' +
        '</div>'
      ).join("");

      searchDropdown.style.display = "block";
    });

    searchDropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".search-item");
      if (item) {
        const n = AppState.nodeMap.get(item.dataset.id);
        if (n) {
          PhysicsEngine.setNodeLayout(n);
          self.openInspector(n);
          searchDropdown.style.display = "none";
          searchInput.value = "";
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === "Escape") {
        searchDropdown.style.display = "none";
        self.resetToGlobal();
      }
    });
  },

  bindControls: function() {
    const self = this;
    document.getElementById("panel-close").onclick = () => self.resetToGlobal();
    document.getElementById("btn-reset-view").onclick = () => self.resetToGlobal();

    const btnPhys = document.getElementById("btn-toggle-physics");
    const labelPhys = document.getElementById("label-physics");
    btnPhys.onclick = () => {
      AppState.physicsRunning = !AppState.physicsRunning;
      labelPhys.textContent = AppState.physicsRunning ? "Pausar" : "Retomar";
      btnPhys.classList.toggle("active", !AppState.physicsRunning);
    };

    document.getElementById("vp-in").onclick = () => AppState.targetZoom = Math.min(3.0, AppState.targetZoom * 1.3);
    document.getElementById("vp-out").onclick = () => AppState.targetZoom = Math.max(0.2, AppState.targetZoom * 0.7);
    document.getElementById("vp-fit").onclick = () => self.resetToGlobal();
  },

  bindTours: function() {
    const self = this;
    const tourStepperBox = document.getElementById("tour-stepper-box");
    const tourStepLabel = document.getElementById("tour-step-label");

    document.querySelectorAll(".flow-btn").forEach(btn => {
      btn.onclick = () => {
        const tKey = btn.dataset.tour;
        const tourObj = AppState.TOURS[tKey];

        // Toggle check: if already active, toggle off!
        if (AppState.focusMode === "tour" && AppState.activeTour && AppState.activeTour.key === tKey) {
          self.resetToGlobal();
          return;
        }

        document.querySelectorAll(".flow-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        PhysicsEngine.setTourLayout(tourObj, 0);
        self.updateTourStepperUI(tourObj, 0);
      };
    });

    document.getElementById("tour-step-prev").onclick = () => {
      if (!AppState.activeTour) return;
      const prevIdx = (AppState.tourStepIdx - 1 + AppState.activeTour.steps.length) % AppState.activeTour.steps.length;
      PhysicsEngine.setTourLayout(AppState.activeTour, prevIdx);
      self.updateTourStepperUI(AppState.activeTour, prevIdx);
    };

    document.getElementById("tour-step-next").onclick = () => {
      if (!AppState.activeTour) return;
      const nextIdx = (AppState.tourStepIdx + 1) % AppState.activeTour.steps.length;
      PhysicsEngine.setTourLayout(AppState.activeTour, nextIdx);
      self.updateTourStepperUI(AppState.activeTour, nextIdx);
    };

    document.getElementById("tour-step-exit").onclick = () => self.resetToGlobal();
  },

  updateTourStepperUI: function(tour, stepIdx) {
    const curStep = tour.steps[stepIdx];
    const stepNode = AppState.nodeMap.get(curStep.id);
    if (stepNode) {
      AppState.selectedNode = stepNode;
      this.openInspector(stepNode);
    }
    document.getElementById("tour-step-label").textContent = (stepIdx + 1) + " de " + tour.steps.length + ": " + curStep.title;
    document.getElementById("tour-stepper-box").classList.add("visible");
  }
};
