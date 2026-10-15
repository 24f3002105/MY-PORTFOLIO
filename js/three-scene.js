/**
 * ABHAY SHUKLA - 3D HOLOGRAPHIC QUANTUM CORE (LIGHT QUANTUM EDITION)
 * Three.js WebGL Interactive Scene with Mouse Parallax & Dynamic Lighting
 */

class HolographicCore {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.coreMesh = null;
    this.innerMesh = null;
    this.particles = null;
    this.ringMesh = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
    this.camera.position.z = 85;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Create Cyber Geometry Objects (Tuned for light background)
    this.createQuantumCore();
    this.createFloatingParticles();
    this.createOrbitalEnergyRings();

    // 5. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x0284c7, 3.5, 160);
    cyanLight.position.set(25, 25, 40);
    this.scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x6366f1, 3.5, 160);
    violetLight.position.set(-25, -25, 40);
    this.scene.add(violetLight);

    // 6. Event listeners
    window.addEventListener('resize', () => this.onWindowResize(), false);
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), false);

    // 7. Start render loop
    this.animate();
  }

  createQuantumCore() {
    // Core Outer: Icosahedron wireframe in electric blue
    const outerGeo = new THREE.IcosahedronGeometry(18, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
      roughness: 0.2,
      metalness: 0.8
    });
    this.coreMesh = new THREE.Mesh(outerGeo, outerMat);
    this.scene.add(this.coreMesh);

    // Core Inner: Torus Knot with vivid indigo glow
    const innerGeo = new THREE.TorusKnotGeometry(9, 2.2, 120, 16);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      metalness: 0.9,
      roughness: 0.1
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.scene.add(this.innerMesh);
  }

  createOrbitalEnergyRings() {
    const ringGeo = new THREE.RingGeometry(26, 26.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22
    });
    this.ringMesh = new THREE.Mesh(ringGeo, ringMat);
    this.ringMesh.rotation.x = Math.PI / 3;
    this.scene.add(this.ringMesh);
  }

  createFloatingParticles() {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorBlue = new THREE.Color(0x0284c7);
    const colorIndigo = new THREE.Color(0x6366f1);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 150;
      positions[i3 + 2] = (Math.random() - 0.5) * 150;

      const mixedColor = Math.random() > 0.5 ? colorBlue : colorIndigo;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  onMouseMove(e) {
    this.mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    this.mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth lerp mouse tracking
    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    // Rotate core meshes
    if (this.coreMesh) {
      this.coreMesh.rotation.x += 0.004;
      this.coreMesh.rotation.y += 0.006;
      this.coreMesh.rotation.x += this.targetY * 0.5;
      this.coreMesh.rotation.y += this.targetX * 0.5;
    }

    if (this.innerMesh) {
      this.innerMesh.rotation.x -= 0.005;
      this.innerMesh.rotation.z += 0.007;
    }

    if (this.ringMesh) {
      this.ringMesh.rotation.z += 0.003;
    }

    if (this.particles) {
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;
    }

    // Parallax on camera
    if (this.camera) {
      this.camera.position.x += (this.targetX * 25 - this.camera.position.x) * 0.04;
      this.camera.position.y += (-this.targetY * 25 - this.camera.position.y) * 0.04;
      this.camera.lookAt(this.scene.position);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate once DOM loads
window.addEventListener('DOMContentLoaded', () => {
  window.holoCore = new HolographicCore('webgl-canvas-container');
});
