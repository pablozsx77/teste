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

    // Node Click & Toggle Deselection
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
        row.innerHTML = '<span class="meta-key">' + label + '</span><span class="meta-val">' + valStr + '</span>';
        panelMeta.appendChild(row);
      });
    }

    // Outgoing
    const outBox = document.getElementById("panel-outgoing");
    outBox.innerHTML = "";
    const outConns = AppState.outgoingMap.get(node.id) || [];
    document.getElementById("panel-out-label").textContent = "Ligações de Saída (" + outConns.length + ")";
    if (outConns.length === 0) {
      outBox.innerHTML = '<span style="font-size:11px;color:var(--text-muted);">Nenhuma conexão de saída</span>';
    } else {
      outConns.forEach(c => {
        const tNode = AppState.nodeMap.get(c.target);
        if (!tNode) return;
        const chip = document.createElement("div");
        chip.className = "conn-chip";
        chip.innerHTML = '<span class="conn-chip-dot" style="background:' + tNode.color + '"></span> ' + tNode.name;
        chip.onclick = () => {
          PhysicsEngine.setNodeLayout(tNode);
          self.openInspector(tNode);
        };
        outBox.appendChild(chip);
      });
    }

    // Incoming
    const inBox = document.getElementById("panel-incoming");
    inBox.innerHTML = "";
    const inConns = AppState.incomingMap.get(node.id) || [];
    document.getElementById("panel-in-label").textContent = "Ligações de Entrada (" + inConns.length + ")";
    if (inConns.length === 0) {
      inBox.innerHTML = '<span style="font-size:11px;color:var(--text-muted);">Nenhuma conexão de entrada</span>';
    } else {
      inConns.forEach(c => {
        const sNode = AppState.nodeMap.get(c.source);
        if (!sNode) return;
        const chip = document.createElement("div");
        chip.className = "conn-chip";
        chip.innerHTML = '<span class="conn-chip-dot" style="background:' + sNode.color + '"></span> ' + sNode.name;
        chip.onclick = () => {
          PhysicsEngine.setNodeLayout(sNode);
          self.openInspector(sNode);
        };
        inBox.appendChild(chip);
      });
    }

    panel.classList.add("open");
  },

  closeInspector: function() {
    this.panel.classList.remove("open");
  },

  resetToGlobal: function() {
    this.closeInspector();
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    const allTab = document.querySelector('.filter-tab[data-cluster="all"]') || document.querySelector('.filter-tab');
    if (allTab) allTab.classList.add("active");

    document.querySelectorAll(".flow-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("tour-stepper-box").style.display = "none";

    PhysicsEngine.setGlobalLayout();
  },

  bindSearch: function() {
    const self = this;
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.focus();
        input.select();
      }
      if (e.key === "Escape") {
        dropdown.style.display = "none";
        input.blur();
        if (AppState.focusMode !== "global") {
          self.resetToGlobal();
        }
      }
    });

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        dropdown.style.display = "none";
        return;
      }

      const matches = GRAPH_DATA.nodes.filter(n =>
        n.name.toLowerCase().includes(query) ||
        n.id.toLowerCase().includes(query) ||
        n.desc.toLowerCase().includes(query) ||
        n.category.toLowerCase().includes(query)
      ).slice(0, 10);

      if (matches.length === 0) {
        dropdown.innerHTML = '<div style="padding:12px;font-size:12px;color:var(--text-muted);text-align:center;">Nenhum componente encontrado</div>';
      } else {
        dropdown.innerHTML = "";
        matches.forEach(m => {
          const item = document.createElement("div");
          item.className = "search-item";
          item.innerHTML = '<span class="search-item-dot" style="background:' + m.color + '"></span>' +
                           '<span class="search-item-title">' + m.name + '</span>' +
                           '<span class="search-item-cat">' + m.category + '</span>';
          item.onclick = () => {
            dropdown.style.display = "none";
            input.value = "";
            PhysicsEngine.setNodeLayout(m);
            self.openInspector(m);
          };
          dropdown.appendChild(item);
        });
      }
      dropdown.style.display = "block";
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        dropdown.style.display = "none";
      }
    });
  },

  bindControls: function() {
    const self = this;
    document.getElementById("panel-close").onclick = () => {
      self.resetToGlobal();
    };

    document.getElementById("btn-reset-view").onclick = () => {
      self.resetToGlobal();
    };

    const togglePhysBtn = document.getElementById("btn-toggle-physics");
    const labelPhys = document.getElementById("label-physics");
    togglePhysBtn.onclick = () => {
      AppState.physicsRunning = !AppState.physicsRunning;
      labelPhys.textContent = AppState.physicsRunning ? "Pausar Campo" : "Retomar Campo";
    };

    document.getElementById("vp-in").onclick = () => {
      AppState.targetZoom = Math.min(3.0, AppState.targetZoom * 1.3);
    };

    document.getElementById("vp-out").onclick = () => {
      AppState.targetZoom = Math.max(0.2, AppState.targetZoom * 0.7);
    };

    document.getElementById("vp-fit").onclick = () => {
      self.resetToGlobal();
    };

    window.addEventListener("resize", () => {
      GraphRenderer.resize();
      if (AppState.focusMode === "global") {
        PhysicsEngine.setGlobalLayout();
      }
    });
  },

  bindTours: function() {
    const self = this;
    const stepperBox = document.getElementById("tour-stepper-box");
    const stepLabel = document.getElementById("tour-step-label");
    const prevBtn = document.getElementById("tour-step-prev");
    const nextBtn = document.getElementById("tour-step-next");
    const exitBtn = document.getElementById("tour-step-exit");

    document.querySelectorAll(".flow-btn").forEach(btn => {
      btn.onclick = () => {
        const tKey = btn.dataset.tour;
        const tour = AppState.TOURS[tKey];
        if (!tour) return;

        // Toggle Deselection
        if (AppState.activeTour && AppState.activeTour.key === tKey) {
          self.resetToGlobal();
          return;
        }

        document.querySelectorAll(".flow-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        stepperBox.style.display = "flex";

        PhysicsEngine.setTourLayout(tour, 0);
        self.updateTourStep(tour, 0);
      };
    });

    exitBtn.onclick = () => {
      self.resetToGlobal();
    };

    prevBtn.onclick = () => {
      if (!AppState.activeTour) return;
      const newIdx = Math.max(0, AppState.tourStepIdx - 1);
      PhysicsEngine.setTourLayout(AppState.activeTour, newIdx);
      self.updateTourStep(AppState.activeTour, newIdx);
    };

    nextBtn.onclick = () => {
      if (!AppState.activeTour) return;
      const newIdx = Math.min(AppState.activeTour.steps.length - 1, AppState.tourStepIdx + 1);
      PhysicsEngine.setTourLayout(AppState.activeTour, newIdx);
      self.updateTourStep(AppState.activeTour, newIdx);
    };
  },

  updateTourStep: function(tour, idx) {
    const stepLabel = document.getElementById("tour-step-label");
    stepLabel.textContent = "Passo " + (idx + 1) + " de " + tour.steps.length;
    const step = tour.steps[idx];
    const sNode = AppState.nodeMap.get(step.id);
    if (sNode) {
      this.openInspector(sNode);
    }
  }
};
