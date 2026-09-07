/* =====================================================
   CERYOSTRICH — script.js
   Independent Digital Creator
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── OS CLOCK ─── */
  const osClock = document.getElementById('os-clock');
  function updateClock() {
    if (!osClock) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    osClock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ─── SMOOTH SCROLL (internal links) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─── ACTIVE NAV HIGHLIGHTING ─── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* ─── SCROLL REVEAL ─── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── STICKER BADGE MICRO-ANIMATION ─── */
  document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      const angles = [-6, -4, 4, 6, -3, 3];
      const r = angles[Math.floor(Math.random() * angles.length)];
      badge.style.transition = 'transform 0.12s, box-shadow 0.12s';
      badge.style.transform  = `rotate(${r}deg) scale(1.1)`;
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = '';
    });
  });

  /* ─── DRAGGABLE OS WINDOWS ─── */
  function makeDraggable(winEl, titlebarEl) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    titlebarEl.addEventListener('mousedown', (e) => {
      // Ignore clicks on OS buttons
      if (e.target.classList.contains('os-btn')) return;

      isDragging = true;
      winEl.classList.add('active');

      const rect = winEl.getBoundingClientRect();
      // Convert to absolute position relative to os-desktop
      const desktop    = document.getElementById('os-desktop');
      const desktopRect = desktop.getBoundingClientRect();

      startX    = e.clientX;
      startY    = e.clientY;
      startLeft = rect.left - desktopRect.left;
      startTop  = rect.top  - desktopRect.top;

      // Temporarily remove CSS transform (for win-stack which uses translateX)
      winEl.style.transform = 'none';
      winEl.style.left = `${startLeft}px`;
      winEl.style.top  = `${startTop}px`;
      winEl.style.right  = 'auto';
      winEl.style.bottom = 'auto';

      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      winEl.style.left = `${startLeft + dx}px`;
      winEl.style.top  = `${startTop  + dy}px`;
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        winEl.classList.remove('active');
      }
    });

    // Touch support
    titlebarEl.addEventListener('touchstart', (e) => {
      if (e.target.classList.contains('os-btn')) return;
      const touch = e.touches[0];
      const rect  = winEl.getBoundingClientRect();
      const desktop     = document.getElementById('os-desktop');
      const desktopRect = desktop.getBoundingClientRect();

      isDragging = true;
      startX     = touch.clientX;
      startY     = touch.clientY;
      startLeft  = rect.left - desktopRect.left;
      startTop   = rect.top  - desktopRect.top;

      winEl.style.transform = 'none';
      winEl.style.left = `${startLeft}px`;
      winEl.style.top  = `${startTop}px`;
      winEl.style.right  = 'auto';
      winEl.style.bottom = 'auto';
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const dx    = touch.clientX - startX;
      const dy    = touch.clientY - startY;
      winEl.style.left = `${startLeft + dx}px`;
      winEl.style.top  = `${startTop  + dy}px`;
    }, { passive: true });

    document.addEventListener('touchend', () => { isDragging = false; });
  }

  const winAbout   = document.getElementById('win-about');
  const winSkills  = document.getElementById('win-skills');
  const winStack   = document.getElementById('win-stack');

  if (winAbout)  makeDraggable(winAbout,  document.getElementById('titlebar-about'));
  if (winSkills) makeDraggable(winSkills, document.getElementById('titlebar-skills'));
  if (winStack)  makeDraggable(winStack,  document.getElementById('titlebar-stack'));

  /* ─── PROJECT MODAL ─── */
  const modal       = document.getElementById('project-modal');
  const modalImg    = document.getElementById('modal-img');
  const modalTitle  = document.getElementById('modal-title');
  const modalTitleB = document.getElementById('modal-title-body');
  const modalDesc   = document.getElementById('modal-desc');
  const modalStatus = document.getElementById('modal-status');
  const modalLink   = document.getElementById('modal-link');
  const closeBtn    = document.getElementById('close-modal-btn');

  function openModal(card) {
    const title  = card.dataset.title;
    const desc   = card.dataset.desc;
    const img    = card.dataset.img;
    const link   = card.dataset.link;
    const status = card.dataset.status;

    if (title) {
      modalTitle.textContent  = title;
      modalTitleB.textContent = title;
      modalDesc.textContent   = desc;
      modalImg.src            = img;
      modalImg.alt            = title;
      modalLink.href          = link;

      if (modalStatus && status) {
        modalStatus.textContent = status;
        modalStatus.setAttribute('data-status', status);
      }

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  function attachCardListeners() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openModal(card));
      // Keyboard accessible
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
      });
    });
  }

  /* ─── LOAD DATA.JSON ─── */
  fetch('data.json')
    .then(res => res.json())
    .then(data => {

      /* — Services / What I Build — */
      const servicesContainer = document.getElementById('services-container');
      if (servicesContainer && data.services) {
        servicesContainer.innerHTML = data.services.map(s => `
          <div class="service-card" role="listitem">
            <span class="service-icon">${s.icon}</span>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.description}</p>
            <div class="service-tags">
              ${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}
            </div>
          </div>
        `).join('');
      }

      /* — Design Projects — */
      const designContainer = document.getElementById('design-container');
      if (designContainer && data.projects_design) {
        designContainer.innerHTML = data.projects_design.map(p => buildProjectCard(p)).join('');
      }

      /* — Code Projects — */
      const codeContainer = document.getElementById('code-container');
      if (codeContainer && data.projects_code) {
        codeContainer.innerHTML = data.projects_code.map(p => buildProjectCard(p)).join('');
      }

      /* — Game / Asset Projects — */
      const gameContainer = document.getElementById('game-container');
      if (gameContainer && data.projects_game) {
        gameContainer.innerHTML = data.projects_game.map(p => buildProjectCard(p)).join('');
      }

      /* — Experiments — */
      const experimentsContainer = document.getElementById('experiments-container');
      if (experimentsContainer && data.experiments) {
        experimentsContainer.innerHTML = data.experiments.map((exp, i) => `
          <div class="experiment-card" role="listitem">
            <div class="experiment-num">${String(i + 1).padStart(2, '0')}</div>
            <h4 class="experiment-title">${escHtml(exp.title)}</h4>
            <p class="experiment-desc">${escHtml(exp.description)}</p>
            <span class="experiment-status" data-status="${escHtml(exp.status)}">${escHtml(exp.status)}</span>
          </div>
        `).join('');
      }

      /* — Skills (grouped capabilities) — */
      const skillsContainer = document.getElementById('skills-container');
      if (skillsContainer && data.skills) {
        const groups = Object.entries(data.skills);
        skillsContainer.innerHTML = groups.map(([groupName, items]) => `
          <div class="skill-group">
            <div class="skill-group-title">// ${escHtml(groupName)}</div>
            <div class="skill-items">
              ${items.map(item => `<span class="skill-item">${escHtml(item)}</span>`).join('')}
            </div>
          </div>
        `).join('');
      }

      attachCardListeners();
    })
    .catch(err => console.error('Failed to load data.json:', err));

  /* — Project card HTML builder — */
  function buildProjectCard(p) {
    const tags = p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('');
    const statusHtml = p.status
      ? `<span class="project-status" data-status="${escHtml(p.status)}">${escHtml(p.status)}</span>`
      : '';
    return `
      <article
        class="project-card"
        role="listitem"
        data-title="${escHtml(p.title)}"
        data-desc="${escHtml(p.description)}"
        data-img="${escHtml(p.image)}"
        data-link="${escHtml(p.link)}"
        data-status="${escHtml(p.status || '')}"
        aria-label="${escHtml(p.title)}"
      >
        <div class="project-thumb">
          <img src="${p.image}" alt="${escHtml(p.title)}" loading="lazy">
        </div>
        <div class="project-info">
          <h4>${escHtml(p.title)}</h4>
          <p>${escHtml(p.short_description)}</p>
          <div class="proj-tags">${tags}</div>
          ${statusHtml}
        </div>
      </article>
    `;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ─── NAV BACKGROUND & VISIBILITY ON SCROLL ─── */
  const nav = document.getElementById('main-nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Background border color logic
    if (currentScrollY > 20) {
      nav.style.borderBottomColor = 'var(--accent)';
    } else {
      nav.style.borderBottomColor = '#000';
    }

    // Hide/Show on scroll logic
    if (currentScrollY > lastScrollY && currentScrollY > 56) {
      // Scrolling down and past the nav height
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up or at the top
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

});
