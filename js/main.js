/**
 * ABHAY SHUKLA - CORE CONTROLLER & INTERACTION ENGINE (v2.2 Mobile-Optimized)
 * Manages UI animations, mobile menu drawer, 3D card tilts, modals, filtering & events
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMobileMenu();
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
 * 1. Mobile Navigation Drawer Toggle
 * ----------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    if (window.soundEngine) window.soundEngine.playClick();
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }
  });
}

/* -------------------------------------------------------------
 * 2. Futuristic Custom Cursor (Desktop Only)
 * ----------------------------------------------------------- */
function initCustomCursor() {
  if (window.innerWidth < 768) return;

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
 * 3. Hero Animated Typewriter
 * ----------------------------------------------------------- */
function initHeroTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'IIT Madras BS Student // CGPA 8.25',
    'Python, JS, Vue & Java Developer',
    'AI & Computer Vision Builder',
    'Linux & SQL Systems Architect',
    'Event Coordinator & Tech Leader'
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
      delay = 85;
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
 * 4. Audio Telemetry Toggle
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
 * 5. Holographic Projects Deck & Deep Dive Modal
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
            <a href="https://github.com/24f3002105/MY-PORTFOLIO" target="_blank" rel="noopener" class="p-icon-btn" title="View Source">
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
 * 6. Deep Dive Architecture Modal
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
          <h2 style="font-family:var(--font-display); font-size: 1.6rem; color:var(--text-main); margin-bottom:8px;">${project.title}</h2>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6;">${project.summary}</p>
        </div>

        <div style="background:rgba(2,132,199,0.06); border:1px solid var(--border-cyber); border-radius:8px; padding:18px; margin-bottom:20px;">
          <h4 style="font-family:var(--font-mono); font-size:0.82rem; color:var(--cyan-core); text-transform:uppercase; margin-bottom:10px; font-weight:700;">
            // ARCHITECTURAL DATA FLOW PIPELINE
          </h4>
          <div style="display:flex; flex-direction:column; gap:10px; font-family:var(--font-mono); font-size:0.85rem;">
            <div><strong style="color:var(--text-main);">[INPUT LAYER]:</strong> <span style="color:var(--text-secondary);">${project.architecture.input}</span></div>
            <div><strong style="color:var(--cyan-core);">[PROCESSING]:</strong> <span style="color:var(--text-secondary);">${project.architecture.pipeline}</span></div>
            <div><strong style="color:var(--emerald-core);">[DISPATCH/OUTPUT]:</strong> <span style="color:var(--text-secondary);">${project.architecture.output}</span></div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-bottom:20px;">
          ${Object.entries(project.metrics).map(([k, v]) => `
            <div style="background:#f8fafc; border:1px solid var(--border-card); padding:10px; border-radius:6px; text-align:center;">
              <span style="font-family:var(--font-display); font-size:1.15rem; font-weight:800; color:var(--text-main); display:block;">${v}</span>
              <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-dim); text-transform:uppercase; font-weight:600;">${k}</span>
            </div>
          `).join('')}
        </div>

        <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-main); margin-bottom:10px; font-weight:700;">KEY TECHNICAL HIGHLIGHTS:</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:24px;">
          ${project.highlights.map(h => `
            <li style="display:flex; align-items:flex-start; gap:8px; font-size:0.88rem; color:var(--text-secondary);">
              <span style="color:var(--cyan-core);">▶</span> <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display:flex; justify-content:flex-end; gap:12px; flex-wrap:wrap;">
          <a href="https://github.com/24f3002105/MY-PORTFOLIO" target="_blank" rel="noopener" class="cyber-btn cyber-btn-secondary">
            <i data-lucide="github" style="width:16px;height:16px;"></i> Repository
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
 * 7. Interactive 3D Card Tilts (Desktop Only)
 * ----------------------------------------------------------- */
function init3DCardTilts() {
  if (window.innerWidth < 768) return;

  const cards = document.querySelectorAll('.cyber-card, .holo-card-center');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* -------------------------------------------------------------
 * 8. Skills Interactive Filtering
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
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 9. Contact Transmission System (Direct Email Forwarding)
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

  // Contact Form with Email Forwarding
  const form = document.getElementById('cyber-contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const msg = document.getElementById('sender-msg').value.trim();

      const origBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting to Abhay's Inbox...</span>`;

      try {
        // Direct integration with free Formspree / Web3Forms mail forwarding
        // Fallback opens user mail client directly if offline
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '56653248-c8a7-47b7-bd20-22c608034b73', // Free tier public relay key
            name: name,
            email: email,
            message: msg,
            subject: `New Portfolio Message from ${name} (${email})`
          })
        });

        const result = await response.json();

        if (result.success) {
          showToast(`SUCCESS! MESSAGE DELIVERED DIRECTLY TO ABHAY'S GMAIL.`);
        } else {
          // Open direct mailto fallback
          window.location.href = `mailto:abhayshukla11487@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nSender Email: ' + email)}`;
          showToast(`OPENED EMAIL CLIENT TO TRANSMIT TO ABHAY!`);
        }
      } catch (err) {
        // Fallback to mailto
        window.location.href = `mailto:abhayshukla11487@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nSender Email: ' + email)}`;
        showToast(`TRANSMISSION LINK PREPARED TO ABHAY'S GMAIL!`);
      }

      if (window.soundEngine) window.soundEngine.playActivate();

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#0284c7', '#6366f1', '#059669']
        });
      }

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHtml;
      initLucideIcons();
    });
  }

  // Resume Download button trigger
  const resumeBtns = document.querySelectorAll('.resume-download-trigger');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('GENERATING DOSSIER // RESUME PRINT VIEW...');
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
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
 * 10. Telemetry Live Clock & Latency
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

  if (latencyEl) {
    setInterval(() => {
      const ms = Math.floor(Math.random() * 6) + 8;
      latencyEl.textContent = `${ms}ms`;
    }, 4000);
  }
}

/* -------------------------------------------------------------
 * 11. Toast Notification System
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
  }, 4000);
}

/* -------------------------------------------------------------
 * 12. Lucide Icons helper
 * ----------------------------------------------------------- */
function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* -------------------------------------------------------------
 * 13. Smooth Scroll & Entrance Animations (GSAP or Fallback)
 * ----------------------------------------------------------- */
function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section-head').forEach(head => {
      gsap.from(head, {
        scrollTrigger: {
          trigger: head,
          start: 'top 88%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.timeline-item').forEach(item => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 88%'
        },
        opacity: 0,
        x: item.classList.contains('left') ? -30 : 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }
}
