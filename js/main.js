(function () {
  const { projects, skills } = PORTFOLIO_DATA;

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Render skills
  function renderTags(containerId, items, accent = true) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items
      .map(
        (item) =>
          `<span class="skill-tag px-3 py-1.5 rounded-lg text-sm border ${
            accent
              ? 'border-accent/30 bg-accent/5 text-slate-200'
              : 'border-white/10 bg-white/5 text-muted'
          }">${item}</span>`
      )
      .join('');
  }

  renderTags('skills-core', skills.core);
  renderTags('skills-learning', skills.learning, false);
  renderTags('skills-languages', skills.languages, false);

  // Render project card
  function projectCard(project, index) {
    const storeLinks = [];
    if (project.ios) {
      storeLinks.push(
        `<a href="${project.ios}" target="_blank" rel="noopener noreferrer" class="text-xs text-accent hover:underline">App Store</a>`
      );
    }
    if (project.android) {
      storeLinks.push(
        `<a href="${project.android}" target="_blank" rel="noopener noreferrer" class="text-xs text-accent hover:underline">Play Store</a>`
      );
    }
    const linksHtml =
      storeLinks.length > 0
        ? `<div class="mt-4 flex gap-3">${storeLinks.join('<span class="text-white/20">·</span>')}</div>`
        : '<p class="mt-4 text-xs text-muted/70">Internal / in development</p>';

    const tagsHtml = project.tags
      .map((t) => `<span class="text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted">${t}</span>`)
      .join('');

    return `
      <article
        class="project-card p-6 rounded-2xl bg-card border border-white/5 hover:border-accent/30 bg-gradient-to-br ${project.gradient}"
        data-category="${project.category}"
        data-has-stores="${project.ios || project.android ? 'true' : 'false'}"
        style="transition-delay: ${(index % 6) * 0.08}s"
      >
        <div class="flex items-start justify-between gap-3">
          <span class="text-3xl" aria-hidden="true">${project.icon}</span>
          ${project.ios || project.android ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>' : ''}
        </div>
        <h3 class="mt-4 font-semibold text-lg leading-snug">${project.name}</h3>
        <p class="mt-2 text-sm text-muted leading-relaxed">${project.description}</p>
        <div class="mt-4 flex flex-wrap gap-1.5">${tagsHtml}</div>
        ${linksHtml}
      </article>
    `;
  }

  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(projectCard).join('');

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .project-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Project filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach((card) => {
        const cat = card.dataset.category;
        const hasStores = card.dataset.hasStores === 'true';
        let show = true;
        if (filter === 'live') show = hasStores;
        else if (filter === 'ai') show = cat === 'ai';
        card.classList.toggle('hidden-filter', !show);
      });
    });
  });

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
  document.querySelectorAll('.mobile-nav').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener(
    'scroll',
    () => {
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
      });
      navLinks.forEach((link) => {
        link.classList.toggle('text-accent', link.getAttribute('href') === `#${current}`);
        link.classList.toggle('text-white', link.getAttribute('href') === `#${current}`);
      });
    },
    { passive: true }
  );
})();
