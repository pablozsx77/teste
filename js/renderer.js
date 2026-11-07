// GraphRenderer 3D — Three.js Atomic Visualizer with Bold Typography & Quantum Glow
const GraphRenderer = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  raycaster: null,
  mouse: new THREE.Vector2(),

  nodeMeshes: new Map(),
  linkLines: null,
  linkGeometry: null,
  quantaMeshes: [],
  shellMeshes: [],

  quantumTimer: 0,
  transitionProgress: 0,
  prevFocusMode: "global",

  // Temporary vector for screen projection
  screenVector: new THREE.Vector3(),

  init: function() {
    const canvas = document.getElementById("graph-canvas");

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07080d);
    this.scene.fog = new THREE.FogExp2(0x07080d, 0.00012);

    // Camera (perspective 3D)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 12000);

    // WebGL Renderer bound to existing canvas
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // OrbitControls — drag to rotate, scroll to zoom, right-drag to pan
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = true;
    this.controls.minDistance = 150;
    this.controls.maxDistance = 12000;

    // Raycaster for hover/click detection on 3D nodes
    this.raycaster = new THREE.Raycaster();

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.22);
    this.scene.add(ambient);

    const coreLight = new THREE.PointLight(0xe03115, 1.8, 4000);
    coreLight.position.set(0, 0, 0);
    this.scene.add(coreLight);

    const fillLight = new THREE.PointLight(0x00d2ff, 0.9, 4000);
    fillLight.position.set(900, 700, 900);
    this.scene.add(fillLight);

    const goldLight = new THREE.PointLight(0xd4af37, 0.6, 4000);
    goldLight.position.set(-700, -500, 700);
    this.scene.add(goldLight);

    // Starfield background particles
    this.initStarfield();

    // 3D Bohr shells (wireframe spheres)
    this.initBohrShells();

    // Rutherford elliptical orbits (3D tilted ellipses)
    this.initEllipticalTracks();

    // Create 3D node meshes (spheres) and link lines
    this.createNodeMeshes();
    this.createLinkLines();

    // Interaction: hover + click on the 3D canvas
    this.renderer.domElement.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.renderer.domElement.addEventListener("click", (e) => this.onClick(e));

    // Initial camera framing
    this.camera.position.set(0, 0, 2200);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  },

  initStarfield: function() {
    const count = Math.min(250, Math.floor((window.innerWidth * window.innerHeight) / 12000));
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6000;

      const r = Math.random();
      colors[i * 3] = r < 0.4 ? 1 : (r < 0.6 ? 0.82 : 0);
      colors[i * 3 + 1] = r < 0.4 ? 1 : (r < 0.6 ? 0.68 : 0.82);
      colors[i * 3 + 2] = r < 0.4 ? 1 : (r < 0.6 ? 1 : 1);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  },

  initBohrShells: function() {
    const C = PhysicsEngine.CONFIG;
    C.BOHR_SHELLS.forEach(s => {
      const geometry = new THREE.RingGeometry(s.r - 0.5, s.r + 0.5, 64);
      geometry.rotateX(Math.PI / 2);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(s.color.replace("0.35", "0.25").replace("0.16", "0.12").replace("0.14", "0.10").replace("0.18", "0.14")),
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
      this.shellMeshes.push(mesh);
    });
  },

  initEllipticalTracks: function() {
    const C = PhysicsEngine.CONFIG;
    const colors = [0x00d2ff, 0xd4af37, 0xe03115];
    C.ELLIPTICAL_TRACKS.forEach((el, idx) => {
      const curve = new THREE.EllipseCurve(
        0, 0,             // center
        el.a, el.b,       // xRadius, yRadius
        0, 2 * Math.PI,   // aStartAngle, aEndAngle
        false,            // clockwise
        el.rot            // rotation
      );
      const points = curve.getPoints(128);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: colors[idx],
        transparent: true,
        opacity: 0.15
      });
      const ellipse = new THREE.Line(geometry, material);
      ellipse.rotation.x = el.tilt || 0;
      this.scene.add(ellipse);
    });
  },

  createNodeMeshes: function() {
    const nodes = GRAPH_DATA.nodes;
    nodes.forEach(n => {
      const radius = n.id === "hub_core" ? 6 : (n.radius || 4);
      const geometry = new THREE.SphereGeometry(radius, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: n.color || 0xffffff,
        emissive: n.glow || 0xffffff,
        emissiveIntensity: 0.4,
        roughness: 0.4,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { nodeId: n.id, node: n };
      mesh.position.set(n.x !== undefined ? n.x : (n.targetX || 0), n.y !== undefined ? n.y : (n.targetY || 0), n.z !== undefined ? n.z : (n.targetZ || 0));
      this.scene.add(mesh);
      this.nodeMeshes.set(n.id, mesh);
    });

    // Core engine gets an extra glow ring
    const coreMesh = this.nodeMeshes.get("hub_core");
    if (coreMesh) {
      const glowGeo = new THREE.SphereGeometry(14, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xe03115,
        transparent: true,
        opacity: 0.15
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      this.scene.add(glow);
      coreMesh.userData.glowMesh = glow;
    }
  },

  createLinkLines: function() {
    const links = GRAPH_DATA.links;
    const positions = [];
    const colors = [];

    links.forEach(l => {
      const a = AppState.nodeMap.get(typeof l.source === "object" ? l.source.id : l.source);
      const b = AppState.nodeMap.get(typeof l.target === "object" ? l.target.id : l.target);
      if (!a || !b) return;

      positions.push(a.x || 0, a.y || 0, a.z || 0);
      positions.push(b.x || 0, b.y || 0, b.z || 0);

      const ca = new THREE.Color(a.color || 0xffffff);
      const cb = new THREE.Color(b.color || 0xffffff);
      colors.push(ca.r, ca.g, ca.b, cb.r, cb.g, cb.b);
    });

    this.linkGeometry = new THREE.BufferGeometry();
    this.linkGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    this.linkGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.06
    });

    this.linkLines = new THREE.LineSegments(this.linkGeometry, material);
    this.scene.add(this.linkLines);
  },

  updateLinkLines: function() {
    if (!this.linkLines) return;
    const links = GRAPH_DATA.links;
    const positions = this.linkGeometry.attributes.position.array;
    const colors = this.linkGeometry.attributes.color.array;
    let idx = 0;
    let cIdx = 0;

    // Compute visibility alpha per link based on focus mode
    links.forEach(l => {
      const a = AppState.nodeMap.get(typeof l.source === "object" ? l.source.id : l.source);
      const b = AppState.nodeMap.get(typeof l.target === "object" ? l.target.id : l.target);
      if (!a || !b) { idx += 6; cIdx += 12; return; }

      let alpha = 0.04;
      if (AppState.hoveredNode && (AppState.hoveredNode.id === a.id || AppState.hoveredNode.id === b.id)) {
        alpha = 0.9;
      } else if (AppState.focusMode === "node" && AppState.focusedNodeObj) {
        if (AppState.focusedNodeObj.id === a.id || AppState.focusedNodeObj.id === b.id) alpha = 0.85;
        else alpha = 0.02;
      } else if (AppState.focusMode === "cluster" && AppState.focusedClusterKey) {
        if (a.cluster === AppState.focusedClusterKey || b.cluster === AppState.focusedClusterKey) alpha = 0.3;
        else alpha = 0.02;
      } else if (AppState.focusMode === "tour" && AppState.activeTour) {
        const tourIds = AppState.activeTour.steps.map(s => s.id);
        const ai = tourIds.indexOf(a.id);
        const bi = tourIds.indexOf(b.id);
        if (ai !== -1 && bi !== -1 && Math.abs(ai - bi) === 1) alpha = 0.9;
        else alpha = 0.02;
      }

      positions[idx] = a.x; positions[idx + 1] = a.y; positions[idx + 2] = a.z;
      positions[idx + 3] = b.x; positions[idx + 4] = b.y; positions[idx + 5] = b.z;

      const ca = new THREE.Color(a.color || 0xffffff);
      const cb = new THREE.Color(b.color || 0xffffff);
      colors[cIdx] = ca.r; colors[cIdx + 1] = ca.g; colors[cIdx + 2] = ca.b;
      colors[cIdx + 3] = cb.r; colors[cIdx + 4] = cb.g; colors[cIdx + 5] = cb.b;

      idx += 6;
      cIdx += 12;
    });

    this.linkGeometry.attributes.position.needsUpdate = true;
    this.linkGeometry.attributes.color.needsUpdate = true;
    this.linkLines.material.opacity = 0.12;
  },

  updateNodeMeshes: function() {
    GRAPH_DATA.nodes.forEach(n => {
      const mesh = this.nodeMeshes.get(n.id);
      if (!mesh) return;

      // Smooth interpolation toward target
      if (n.x === undefined) n.x = n.targetX || 0;
      if (n.y === undefined) n.y = n.targetY || 0;
      if (n.z === undefined) n.z = n.targetZ || 0;

      mesh.position.lerp(new THREE.Vector3(n.targetX, n.targetY, n.targetZ), PhysicsEngine.CONFIG.NODE_SMOOTH);

      // Determine visibility & scale
      let alpha = 1.0;
      let scale = 1.0;
      const isFocused = (AppState.focusMode === "node" && AppState.focusedNodeObj && AppState.focusedNodeObj.id === n.id) ||
                        (AppState.focusMode === "tour" && AppState.activeTour && AppState.activeTour.steps[AppState.tourStepIdx].id === n.id);
      const isHovered = AppState.hoveredNode && AppState.hoveredNode.id === n.id;

      if (AppState.focusMode === "node" && AppState.focusedNodeObj) {
        const nbrs = AppState.neighborsMap.get(AppState.focusedNodeObj.id) || new Set();
        if (n.id === AppState.focusedNodeObj.id) { alpha = 1.0; scale = 1.3; }
        else if (nbrs.has(n.id)) { alpha = 0.9; scale = 1.1; }
        else { alpha = 0.05; scale = 0.7; }
      } else if (AppState.focusMode === "cluster" && AppState.focusedClusterKey) {
        if (n.cluster === AppState.focusedClusterKey) { alpha = 1.0; scale = 1.1; }
        else { alpha = 0.06; scale = 0.7; }
      } else if (AppState.focusMode === "tour" && AppState.activeTour) {
        const inTour = AppState.activeTour.steps.some(s => s.id === n.id);
        const curStep = AppState.activeTour.steps[AppState.tourStepIdx];
        if (curStep && curStep.id === n.id) { alpha = 1.0; scale = 1.3; }
        else if (inTour) { alpha = 0.85; scale = 1.05; }
        else { alpha = 0.05; scale = 0.7; }
      } else if (AppState.hoveredNode && AppState.hoveredNode.id === n.id) {
        alpha = 1.0; scale = 1.2;
      } else if (AppState.focusMode === "global" && n.val >= 24) {
        alpha = 1.0; scale = 1.05;
      }

      mesh.material.opacity = alpha;
      mesh.material.transparent = alpha < 1;
      mesh.scale.setScalar(scale);

      // Core engine glow pulse
      if (n.id === "hub_core" && mesh.userData.glowMesh) {
        const pulse = Math.sin(this.quantumTimer * 2) * 0.15 + 0.85;
        mesh.userData.glowMesh.scale.setScalar(1 + pulse * 0.3);
        mesh.userData.glowMesh.material.opacity = 0.15 * pulse;
      }

      // Hover glow
      if (isHovered || isFocused) {
        mesh.material.emissiveIntensity = 0.8;
      } else {
        mesh.material.emissiveIntensity = 0.4;
      }
    });
  },

  initQuanta: function() {
    const C = PhysicsEngine.CONFIG;
    C.BOHR_SHELLS.forEach((s, i) => {
      if (i === 0) return; // skip nucleus
      const count = 12;
      for (let j = 0; j < count; j++) {
        const geometry = new THREE.SphereGeometry(1.2, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(s.color),
          transparent: true,
          opacity: 0.8
        });
        const q = new THREE.Mesh(geometry, material);
        q.userData = { r: s.r, angle: Math.random() * Math.PI * 2, speed: 0.002 + Math.random() * 0.002, offset: i };
        this.scene.add(q);
        this.quantaMeshes.push(q);
      }
    });
  },

  updateQuanta: function() {
    this.quantaMeshes.forEach(q => {
      q.userData.angle += q.userData.speed;
      const x = Math.cos(q.userData.angle) * q.userData.r;
      const y = Math.sin(q.userData.angle) * q.userData.r;
      q.position.set(x, y, 0);
      q.rotation.y += 0.02;
    });
  },

  // ===== Interaction =====
  onMouseMove: function(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(Array.from(this.nodeMeshes.values()));

    const tipDot = document.getElementById("tip-dot");
    const tipTitle = document.getElementById("tip-title");
    const tipDesc = document.getElementById("tip-desc");

    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      const nodeId = mesh.userData.nodeId;
      const node = mesh.userData.node;

      if (AppState.hoveredNode !== node) {
        AppState.hoveredNode = node;
        if (tipDot) tipDot.style.background = node.color;
        if (tipTitle) tipTitle.textContent = node.name;
        if (tipDesc) tipDesc.textContent = node.desc;
        const tooltip = document.getElementById("cursor-tooltip");
        if (tooltip) {
          tooltip.style.left = e.clientX + 14 + "px";
          tooltip.style.top = e.clientY + 14 + "px";
          tooltip.style.display = "block";
        }
      } else {
        const tooltip = document.getElementById("cursor-tooltip");
        if (tooltip) {
          tooltip.style.left = e.clientX + 14 + "px";
          tooltip.style.top = e.clientY + 14 + "px";
        }
      }
    } else {
      if (AppState.hoveredNode) {
        AppState.hoveredNode = null;
        const tooltip = document.getElementById("cursor-tooltip");
        if (tooltip) tooltip.style.display = "none";
      }
    }
  },

  onClick: function(e) {
    // Ignore clicks when UI is being interacted
    if (e.target.closest && (
      e.target.closest(".top-header") ||
      e.target.closest(".sidebar-menu") ||
      e.target.closest(".sidebar-backdrop") ||
      e.target.closest(".inspector-panel") ||
      e.target.closest(".search-dropdown") ||
      e.target.closest(".shortcuts-modal")
    )) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(Array.from(this.nodeMeshes.values()));

    if (intersects.length > 0) {
      const node = intersects[0].object.userData.node;
      if (AppState.selectedNode && AppState.selectedNode.id === node.id) {
        EventManager.resetToGlobal();
      } else {
        PhysicsEngine.setNodeLayout(node);
        EventManager.openInspector(node);
      }
    } else {
      if (AppState.focusMode !== "global") {
        EventManager.resetToGlobal();
      }
    }
  },

  // ===== Screen projection for tooltip (3D -> 2D) =====
  projectToScreen: function(x, y, z) {
    this.screenVector.set(x, y, z);
    this.screenVector.project(this.camera);
    return {
      x: (this.screenVector.x * 0.5 + 0.5) * window.innerWidth,
      y: (-(this.screenVector.y * 0.5) + 0.5) * window.innerHeight
    };
  },

  // ===== Resize =====
  resize: function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    AppState.width = width;
    AppState.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  // ===== Render loop =====
  render: function() {
    this.quantumTimer += 0.025;

    // Smooth focus transitions
    if (this.prevFocusMode !== AppState.focusMode) {
      this.transitionProgress = 0;
      this.prevFocusMode = AppState.focusMode;
    }
    this.transitionProgress = Math.min(1, this.transitionProgress + 0.03);

    PhysicsEngine.step();
    this.updateNodeMeshes();
    this.updateLinkLines();
    this.updateQuanta();

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.render());
  }
};

// Expose for debugging / testing
window.GraphRenderer = GraphRenderer;

