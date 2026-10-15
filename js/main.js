/**
 * ABHAY SHUKLA - CORE CONTROLLER & INTERACTION ENGINE
 * Manages UI animations, 3D card tilts, modals, filtering & events
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeroTypewriter();
  initAudioToggle();
  initProjectsDeck();
  initSkillsInteractions();
  init3DCardTilts();
  initContactSystem();
  initTelemetryClock();
  initLucideIcons();
  initScrollAnimations();
});

/* -------------------------------------------------------------
 * 1. Futuristic Custom Cursor
 * ----------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Hover states on clickable elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .cyber-card, .t-quick-chip, .filter-chip');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('active');
      if (window.soundEngine) window.soundEngine.playHover();
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('active');
    });
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
}

/* -------------------------------------------------------------
 * 2. Hero Animated Typewriter
 * ----------------------------------------------------------- */
function initHeroTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'IIT Madras BS Student // CGPA 8.25',
    'Python & SQL Systems Architect',
    'AI & Computer Vision Builder',
    'Event Coordinator & Tech Leader',
    'Ready for High-Impact Roles & Internships'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 40;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* -------------------------------------------------------------
 * 3. Audio Telemetry Toggle
 * ----------------------------------------------------------- */
function initAudioToggle() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!window.soundEngine) return;
    const isNowActive = window.soundEngine.toggle();
    if (isNowActive) {
      toggleBtn.classList.remove('muted');
      toggleBtn.setAttribute('title', 'Sound FX: ON');
      showToast('AUDIO TELEMETRY: ACTIVATED');
    } else {
      toggleBtn.classList.add('muted');
      toggleBtn.setAttribute('title', 'Sound FX: MUTED');
      showToast('AUDIO TELEMETRY: MUTED');
    }
  });
}

/* -------------------------------------------------------------
 * 4. Holographic Projects Deck & Deep Dive Modal
 * ----------------------------------------------------------- */
function initProjectsDeck() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.project-filter-chip');
  if (!container || typeof PROJECTS_DATA === 'undefined') return;

  function renderProjects(filter = 'all') {
    container.innerHTML = '';

    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `cyber-card project-card ${p.featured ? 'featured' : ''}`;
      card.setAttribute('data-category', p.category);
      card.style.animationDelay = `${idx * 0.1}s`;

      const highlightsHtml = p.highlights.slice(0, 3).map(h => `
        <li>
          <i data-lucide="check-circle-2" style="width:14px;height:14px;"></i>
          <span>${h}</span>
        </li>
      `).join('');

      const tagsHtml = p.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="hud-corner-tl"></div>
        <div class="hud-corner-br"></div>
        <div class="project-header-row">
          <span class="project-badge ${p.category}">${p.badge}</span>
          <div class="project-actions-icon">
            <button class="p-icon-btn deep-dive-trigger" data-id="${p.id}" title="Deep Dive Architecture">
              <i data-lucide="scan" style="width:16px;height:16px;"></i>
            </button>
            <a href="${p.github}" target="_blank" rel="noopener" class="p-icon-btn" title="View Source">
              <i data-lucide="github" style="width:16px;height:16px;"></i>
            </a>
          </div>
        </div>

        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>

        <ul class="project-features-list">
          ${highlightsHtml}
        </ul>

        <div class="project-tech-pills">
          ${tagsHtml}
        </div>

        <button class="cyber-btn cyber-btn-secondary project-cta deep-dive-trigger" data-id="${p.id}">
          <i data-lucide="cpu" style="width:16px;height:16px;"></i>
          Inspect Architecture
        </button>
      `;

      container.appendChild(card);
    });

    initLucideIcons();
    attachModalTriggers();
    init3DCardTilts();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetCategory = btn.getAttribute('data-filter');
      renderProjects(targetCategory);
    });
  });

  renderProjects('all');
}

/* -------------------------------------------------------------
 * 5. Deep Dive Architecture Modal
 * ----------------------------------------------------------- */
function attachModalTriggers() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalBody = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalBody) return;

  document.querySelectorAll('.deep-dive-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const project = PROJECTS_DATA.find(p => p.id === id);
      if (!project) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 24px;">
          <span class="project-badge ${project.category}" style="display:inline-block; margin-bottom: 8px;">${project.badge}</span>
          <h2 style="font-family:var(--font-display); font-size: 1.8rem; color:#fff; margin-bottom:8px;">${project.title}</h2>
          <p style="color:var(--text-muted); font-size:1rem; line-height:1.6;">${project.summary}</p>
        </div>

        <div style="background:rgba(0,240,255,0.04); border:1px solid var(--border-cyber); border-radius:8px; padding:20px; margin-bottom:24px;">
          <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:var(--cyan-core); text-transform:uppercase; margin-bottom:12px;">
            // ARCHITECTURAL DATA FLOW PIPELINE
          </h4>
          <div style="display:flex; flex-direction:column; gap:12px; font-family:var(--font-mono); font-size:0.85rem;">
            <div><strong style="color:#fff;">[INPUT LAYER]:</strong> <span style="color:#cbd5e1;">${project.architecture.input}</span></div>
            <div><strong style="color:var(--cyan-core);">[PROCESSING]:</strong> <span style="color:#cbd5e1;">${project.architecture.pipeline}</span></div>
            <div><strong style="color:var(--emerald-core);">[DISPATCH/OUTPUT]:</strong> <span style="color:#cbd5e1;">${project.architecture.output}</span></div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:24px;">
          ${Object.entries(project.metrics).map(([k, v]) => `
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:6px; text-align:center;">
              <span style="font-family:var(--font-display); font-size:1.2rem; font-weight:800; color:#fff; display:block;">${v}</span>
              <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-dim); text-transform:uppercase;">${k}</span>
            </div>
          `).join('')}
        </div>

        <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:#fff; margin-bottom:12px;">KEY TECHNICAL HIGHLIGHTS:</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:28px;">
          ${project.highlights.map(h => `
            <li style="display:flex; align-items:flex-start; gap:8px; font-size:0.9rem; color:#cbd5e1;">
              <span style="color:var(--cyan-core);">▶</span> <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display:flex; justify-content:flex-end; gap:14px;">
          <a href="${project.github}" target="_blank" rel="noopener" class="cyber-btn cyber-btn-secondary">
            <i data-lucide="github" style="width:16px;height:16px;"></i> View Repository
          </a>
          <button class="cyber-btn cyber-btn-primary" onclick="document.getElementById('project-modal-overlay').classList.remove('open')">
            Close Blueprint
          </button>
        </div>
      `;

      initLucideIcons();
      modalOverlay.classList.add('open');
      if (window.soundEngine) window.soundEngine.playActivate();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}

/* -------------------------------------------------------------
 * 6. Interactive 3D Card Tilts (Gyro & Mouse)
 * ----------------------------------------------------------- */
function init3DCardTilts() {
  const cards = document.querySelectorAll('.cyber-card, .holo-card-center');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* -------------------------------------------------------------
 * 7. Skills Interactive Filtering
 * ----------------------------------------------------------- */
function initSkillsInteractions() {
  const filterChips = document.querySelectorAll('.skill-filter-chip');
  const skillCards = document.querySelectorAll('.skill-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 8. Contact Transmission System & Clipboard
 * ----------------------------------------------------------- */
function initContactSystem() {
  // Direct channel copy buttons
  document.querySelectorAll('.copy-channel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-copy');
      if (target) {
        navigator.clipboard.writeText(target).then(() => {
          showToast(`COPIED TO CLIPBOARD: ${target}`);
          if (window.soundEngine) window.soundEngine.playActivate();
        });
      }
    });
  });

  // Simulated transmission form
  const form = document.getElementById('cyber-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const messageInput = document.getElementById('sender-msg');

      const name = nameInput.value || 'Fellow Innovator';
      
      showToast(`TRANSMISSION RECEIVED FROM ${name.toUpperCase()}! RELAYING TO ABHAY...`);
      if (window.soundEngine) window.soundEngine.playActivate();

      // Confetti burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#00f0ff', '#8b5cf6', '#10b981']
        });
      }

      form.reset();
    });
  }

  // Resume Download button trigger
  const resumeBtns = document.querySelectorAll('.resume-download-trigger');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('GENERATING ENCRYPTED DOSSIER // RESUME PACKET...');
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
      setTimeout(() => {
        window.print();
      }, 700);
    });
  });
}

/* -------------------------------------------------------------
 * 9. Telemetry Live Clock & Latency
 * ----------------------------------------------------------- */
function initTelemetryClock() {
  const clockEl = document.getElementById('telemetry-clock');
  const latencyEl = document.getElementById('telemetry-latency');

  function update() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC+5.5';
    }
  }

  update();
  setInterval(update, 1000);

  // Random realistic low latency simulation (8-16ms)
  if (latencyEl) {
    setInterval(() => {
      const ms = Math.floor(Math.random() * 8) + 8;
      latencyEl.textContent = `${ms}ms`;
    }, 4000);
  }
}

/* -------------------------------------------------------------
 * 10. Toast Notification System
 * ----------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'cyber-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i data-lucide="radio" style="width:16px;height:16px;color:var(--cyan-core);"></i>
    <span>${message}</span>
  `;
  initLucideIcons();

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* -------------------------------------------------------------
 * 11. Lucide Icons helper
 * ----------------------------------------------------------- */
function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* -------------------------------------------------------------
 * 12. Smooth Scroll & Entrance Animations (GSAP or Fallback)
 * ----------------------------------------------------------- */
function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section-head').forEach(head => {
      gsap.from(head, {
        scrollTrigger: {
          trigger: head,
          start: 'top 85%'
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.timeline-item').forEach(item => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        },
        opacity: 0,
        x: item.classList.contains('left') ? -40 : 40,
        duration: 0.9,
        ease: 'power3.out'
      });
    });
  }
}
