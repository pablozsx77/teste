// User Interactions, Search & Tour Events
const EventManager = {
  container: null,
  panel: null,
  tooltip: null,
  shortcutsModal: null,
  loadingScreen: null,
  loadingProgress: 0,

  // Menu lateral (gaveta)
  sidebar: null,
  sidebarToggle: null,
  sidebarClose: null,
  sidebarBackdrop: null,

  init: function() {
    this.container = document.getElementById("canvas-container");
    this.panel = document.getElementById("inspector-panel");
    this.tooltip = document.getElementById("cursor-tooltip");
    this.shortcutsModal = document.getElementById("shortcuts-modal");
    this.loadingScreen = document.getElementById("loading-screen");

    // Menu lateral (gaveta)
    this.sidebar = document.getElementById("sidebar-menu");
    this.sidebarToggle = document.getElementById("sidebar-toggle");
    this.sidebarClose = document.getElementById("sidebar-close-btn");
    this.sidebarBackdrop = document.getElementById("sidebar-backdrop");

    this.bindMouseDrag();
    this.bindSearch();
    this.bindControls();
    this.bindTours();
    this.bindKeyboardShortcuts();
    this.bindSidebar();
    this.simulateLoading();
  },

  simulateLoading: function() {
    const self = this;
    const barFill = document.querySelector(".loading-bar-fill");
    const subtext = document.querySelector(".loading-subtext");

    const steps = [
      { progress: 15, text: "Inicializando motor quântico..." },
      { progress: 30, text: "Carregando topologia atômica..." },
      { progress: 50, text: "Mapeando 218 partículas..." },
      { progress: 70, text: "Conectando 573 ligações quânticas..." },
      { progress: 85, text: "Calibrando sensor orbital..." },
      { progress: 100, text: "Sistema pronto!" }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx >= steps.length) {
        clearInterval(interval);
        setTimeout(() => self.hideLoading(), 400);
        return;
      }
      const step = steps[stepIdx];
      self.loadingProgress = step.progress;
      if (barFill) barFill.style.width = step.progress + "%";
      if (subtext) subtext.textContent = step.text;
      stepIdx++;
    }, 300);
  },

  hideLoading: function() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");
      // Remove from DOM after transition
      setTimeout(() => {
        if (this.loadingScreen.parentNode) {
          this.loadingScreen.parentNode.removeChild(this.loadingScreen);
        }
      }, 500);
    }
  },

  toWorldCoords: function(sx, sy) {
    return {
      x: (sx - AppState.width / 2) / AppState.zoom + AppState.camX,
      y: (sy - AppState.height / 2) / AppState.zoom + AppState.camY
    };
  },

  bindMouseDrag: function() {
    // 3D interaction is handled by Three.js OrbitControls in renderer.js.
    // Canvas drag/click/wheel are intentionally NOT bound here to avoid conflicts.
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
      outBox.innerHTML = '<span class="panel-empty">Nenhuma conexão de saída</span>';
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
      inBox.innerHTML = '<span class="panel-empty">Nenhuma conexão de entrada</span>';
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
    const allTab = document.querySelector('.filter-tab[data-cluster="all"]');
    if (allTab) allTab.classList.add("active");

    document.querySelectorAll(".flow-btn").forEach(b => b.classList.remove("active"));
    const stepperBox = document.getElementById("tour-stepper-box");
    if (stepperBox) stepperBox.style.display = "none";

    PhysicsEngine.setGlobalLayout();
  },

  bindSearch: function() {
    const self = this;
    const input = document.getElementById("search-input");
    const dropdown = document.getElementById("search-dropdown");

    window.addEventListener("keydown", (e) => {
      // Ctrl+K or Cmd+K for search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (self.shortcutsModal && self.shortcutsModal.classList.contains("open")) {
          self.closeShortcuts();
        }
        input.focus();
        input.select();
      }
      // Escape to close things
      if (e.key === "Escape") {
        dropdown.style.display = "none";
        input.blur();
        if (self.sidebar && self.sidebar.classList.contains("open")) {
          self.closeSidebar();
        }
        if (self.shortcutsModal && self.shortcutsModal.classList.contains("open")) {
          self.closeShortcuts();
        }
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
      togglePhysBtn.setAttribute("aria-pressed", AppState.physicsRunning);
    };

    document.getElementById("vp-in").onclick = () => {
      AppState.targetZoom = Math.min(PhysicsEngine.CONFIG.ZOOM_MAX, AppState.targetZoom * 1.3);
    };

    document.getElementById("vp-out").onclick = () => {
      AppState.targetZoom = Math.max(PhysicsEngine.CONFIG.ZOOM_MIN, AppState.targetZoom * 0.7);
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

  bindKeyboardShortcuts: function() {
    const self = this;

    window.addEventListener("keydown", (e) => {
      // Don't trigger shortcuts when typing in input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case "?":
        case "/":
          e.preventDefault();
          self.toggleShortcuts();
          break;
        case "escape":
          if (self.shortcutsModal && self.shortcutsModal.classList.contains("open")) {
            self.closeShortcuts();
          }
          break;
        case " ":
          // Space to pause/resume physics
          if (!e.target.closest("button")) {
            e.preventDefault();
            AppState.physicsRunning = !AppState.physicsRunning;
            const labelPhys = document.getElementById("label-physics");
            if (labelPhys) labelPhys.textContent = AppState.physicsRunning ? "Pausar Campo" : "Retomar Campo";
          }
          break;
        case "r":
          // R to reset view
          e.preventDefault();
          self.resetToGlobal();
          break;
        case "f":
          // F to fit/frame
          e.preventDefault();
          self.resetToGlobal();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          // Quick orbit focus (1-4)
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const orbits = ["admin", "barber", "whatsapp", "external"];
            const orbit = orbits[parseInt(e.key) - 1];
            if (orbit) {
              const btn = document.querySelector('.filter-tab[data-cluster="' + orbit + '"]');
              if (btn) btn.click();
            }
          }
          break;
      }
    });

    // Close shortcuts modal on backdrop click
    if (this.shortcutsModal) {
      this.shortcutsModal.addEventListener("click", (e) => {
        if (e.target === this.shortcutsModal) {
          self.closeShortcuts();
        }
      });

      // Close button
      const closeBtn = this.shortcutsModal.querySelector(".shortcuts-close");
      if (closeBtn) {
        closeBtn.onclick = () => self.closeShortcuts();
      }
    }
  },

  toggleShortcuts: function() {
    if (this.shortcutsModal.classList.contains("open")) {
      this.closeShortcuts();
    } else {
      this.openShortcuts();
    }
  },

  openShortcuts: function() {
    this.shortcutsModal.classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeShortcuts: function() {
    this.shortcutsModal.classList.remove("open");
    document.body.style.overflow = "";
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

        self.closeSidebar();

        document.querySelectorAll(".flow-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        stepperBox.style.display = "flex";

        PhysicsEngine.setTourLayout(tour, 0);
        self.updateTourStep(tour, 0);
        self.updateStepperButtons();
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
      self.updateStepperButtons();
    };

    nextBtn.onclick = () => {
      if (!AppState.activeTour) return;
      const newIdx = Math.min(AppState.activeTour.steps.length - 1, AppState.tourStepIdx + 1);
      PhysicsEngine.setTourLayout(AppState.activeTour, newIdx);
      self.updateTourStep(AppState.activeTour, newIdx);
      self.updateStepperButtons();
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
  },

  updateStepperButtons: function() {
    const prevBtn = document.getElementById("tour-step-prev");
    const nextBtn = document.getElementById("tour-step-next");
    if (!AppState.activeTour) return;

    prevBtn.disabled = AppState.tourStepIdx === 0;
    nextBtn.disabled = AppState.tourStepIdx === AppState.activeTour.steps.length - 1;
  },

  /* ===== Menu Lateral (Gaveta) ===== */
  bindSidebar: function() {
    const self = this;

    if (this.sidebarToggle) {
      this.sidebarToggle.onclick = (e) => {
        e.stopPropagation();
        self.toggleSidebar();
      };
    }

    if (this.sidebarClose) {
      this.sidebarClose.onclick = () => self.closeSidebar();
    }

    if (this.sidebarBackdrop) {
      this.sidebarBackdrop.onclick = () => self.closeSidebar();
    }
  },

  openSidebar: function() {
    if (!this.sidebar) return;
    this.sidebar.classList.add("open");
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.add("open");
    if (this.sidebarToggle) this.sidebarToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  },

  closeSidebar: function() {
    if (!this.sidebar) return;
    this.sidebar.classList.remove("open");
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.remove("open");
    if (this.sidebarToggle) this.sidebarToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  },

  toggleSidebar: function() {
    if (this.sidebar && this.sidebar.classList.contains("open")) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }
};