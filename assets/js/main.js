(() => {
  let imageCarouselTimers = [];

  const INTERNSHIPS = [
    {
      images: [
        { src: 'assets/images/neolix_1.png', fit: 'cover' },
        { src: 'assets/images/neolix_2.png', fit: 'contain' },
        { src: 'assets/images/neolix_3.png', fit: 'contain' },
      ],
      imageAltKey: 'internships.item0.imageAlt',
      periodKey: 'internships.item0.period',
      titleKey: 'internships.item0.title',
      descKey: 'internships.item0.desc',
      tags: ['C++', 'PNC', 'CMPC / OSQP', 'Path iLQR'],
      links: [{ href: 'https://wcntbxip3gdr.feishu.cn/wiki/ARtPwr2uIiqKiJkMsjYc78B1nbb?from=from_copylink', labelKey: 'projects.links.onlineDoc', icon: 'fas fa-book-open' }],
    },
    {
      images: [
        { src: 'assets/images/jiwei_1.png', fit: 'cover' },
        { src: 'assets/images/jiwei_2.webp', fit: 'contain' },
        { src: 'assets/images/jiwei_3.webp', fit: 'contain' },
      ],
      imageAltKey: 'internships.item1.imageAlt',
      slideDuration: 3000,
      periodKey: 'internships.item1.period',
      titleKey: 'internships.item1.title',
      descKey: 'internships.item1.desc',
      tags: ['C++', 'PNC', 'Queue recognition', 'Detour suppression', 'TCD', 'Oncoming avoidance'],
    },
  ];

  const COMPETITIONS = [
    {
      images: [
        { src: 'assets/images/onsite.png', fit: 'cover' },
        { src: 'assets/images/onsite-national-champion.png', fit: 'contain' },
        { src: 'assets/images/onsite-beijing-champion.png', fit: 'contain' },
      ],
      imageAltKey: 'competitions.imgAlt',
      periodKey: 'competitions.item0.period',
      titleKey: 'competitions.item0.title',
      descKey: 'competitions.item0.desc',
      tags: ['CILQR', 'NMPC', 'Frenet', 'RViz'],
      links: [
        { href: 'https://www.onsite.com.cn/#/dist/newsDetail?id=netNews&menuId=52&ids=356', labelKey: 'competitions.links.official', icon: 'fas fa-arrow-up-right-from-square' },
      ],
      videos: [
        { src: 'assets/videos/sim_web.mp4', titleKey: 'competitions.videos.sim' },
        { src: 'assets/videos/real_web.mp4', titleKey: 'competitions.videos.real' },
      ],
    },
  ];

  const PROJECTS = [
    {
      img: 'assets/images/wanshan.jpg',
      imageFit: 'cover',
      periodKey: 'projects.item0.period',
      titleKey: 'projects.item0.title',
      descKey: 'projects.item0.desc',
      tags: ['SPMT', 'ROS', 'WGS84 / UTM', 'Pure Pursuit', 'PID'],
    },
  ];

  const DOCUMENTS = [
    {
      titleKey: 'documents.item0.title',
      descKey: 'documents.item0.desc',
    },
    {
      titleKey: 'documents.item1.title',
      descKey: 'documents.item1.desc',
    },
    {
      titleKey: 'documents.item2.title',
      descKey: 'documents.item2.desc',
    },
    {
      titleKey: 'documents.item3.title',
      descKey: 'documents.item3.desc',
    },
  ];

  const TIMELINE_EVENTS = [
    'timeline.event1',
    'timeline.event2',
    'timeline.event3',
    'timeline.event4',
    'timeline.event5',
    'timeline.event6',
    'timeline.event7',
  ];

  const TECH_STACK = [
    {
      category: 'skills.software',
      items: [
        { name: 'C++', icon: 'fas fa-code' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Foxglove', icon: 'fas fa-eye' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'Bazel', icon: 'fas fa-cubes' },
      ],
    },
    {
      category: 'skills.optimalControl',
      items: [
        { name: 'LQR', icon: 'fas fa-gauge-high' },
        { name: 'ILQR', icon: 'fas fa-chart-line' },
        { name: 'MPC', icon: 'fas fa-arrows-to-circle' },
        { name: 'CPMC', icon: 'fas fa-sliders' },
      ],
    },
    {
      category: 'skills.planning',
      items: [
        { name: 'BFS', icon: 'fas fa-diagram-project' },
        { name: 'Hybrid A*', icon: 'fas fa-route' },
        { name: 'Lattice', icon: 'fas fa-grip' },
      ],
    },
  ];

  const CONTACT_LINKS = [
    { icon: 'fas fa-envelope', key: 'contact.email', link: 'mailto:wangxqiang21@163.com' },
    { icon: 'fas fa-file-pdf', key: 'contact.cv', link: 'file/CV-CN.pdf' },
    { icon: 'fab fa-github', key: 'contact.github', link: 'https://github.com/wangxqiang21' },
    { icon: 'fab fa-zhihu', key: 'contact.zhihu', link: 'https://www.zhihu.com/people/gu-max-27' },
    { icon: 'fab fa-bilibili', key: 'contact.bilibili', link: 'https://space.bilibili.com/433270257' },
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clear(el) {
    if (!el) return;
    el.innerHTML = '';
  }

  function t(key) {
    return window.i18n?.get ? window.i18n.get(key) : key;
  }

  function renderSpanTags(tags, className) {
    if (!Array.isArray(tags)) return '';
    return tags.map((tag) => `<span class="${className}">${tag}</span>`).join('');
  }

  function renderProjectTags(tags) {
    if (!Array.isArray(tags)) return '';
    return `<div class="project-tags">${renderSpanTags(tags, 'project-tag')}</div>`;
  }

  function renderProjectActions(links, extraAction = '') {
    const items = (Array.isArray(links) ? links : [])
      .filter((link) => link.href)
      .map((link) => {
        const label = link.labelKey ? t(link.labelKey) : link.label;
        const icon = link.icon || 'fas fa-arrow-up-right-from-square';

        return `
          <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="project-action" aria-label="${label}">
            <i class="${icon}"></i>
            <span>${label}</span>
          </a>
        `;
      })
      .join('');

    return items || extraAction ? `<div class="project-actions">${extraAction}${items}</div>` : '';
  }

  function initThemeToggle() {
    const toggleBtn = qs('.theme-toggle');
    const htmlEl = document.documentElement;
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || htmlEl.getAttribute('data-theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      console.log(`[Theme] Switched to ${newTheme}`);
    });
  }

  function initLangToggle() {
    const toggleBtn = qs('.lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const current = window.i18n.currentLang();
      const next = current === 'en' ? 'zh' : 'en';
      console.log(`[Lang] Switching to ${next}...`);
      window.i18n.changeLang(next);
    });
  }

  function renderImageCards(selector, items) {
    const grid = qs(selector);
    if (!grid) return;
    qsa('video', grid).forEach((video) => video.pause());
    clear(grid);

    items.forEach((item, index) => {
      const tagsHtml = renderProjectTags(item.tags);
      const videoPanelId = item.videos?.length ? `competition-videos-${index}` : '';
      const videoActionHtml = videoPanelId
        ? `<button type="button" class="project-action project-video-toggle" aria-controls="${videoPanelId}" aria-expanded="false"><i class="fas fa-play" aria-hidden="true"></i><span>${t('competitions.links.video')}</span></button>`
        : '';
      const actionsHtml = renderProjectActions(item.links, videoActionHtml);
      const periodHtml = item.periodKey ? `<p class="project-period">${t(item.periodKey)}</p>` : '';
      const images = item.images || [{ src: item.img, fit: item.imageFit }];
      const imageAlt = t(item.imageAltKey || 'projects.imgAlt');
      const imageMarkup = images.length > 1
        ? (() => {
          return `
            <div class="project-image-carousel" data-slide-duration="${item.slideDuration || 2000}">
              <img src="${images[0].src}" alt="${imageAlt}" class="project-thumbnail project-carousel-image${images[0].fit === 'cover' ? ' project-thumbnail--cover' : ' project-thumbnail--contain'}">
              <div class="project-image-indicators" aria-hidden="true">
                ${images.map((image, index) => `<span data-src="${image.src}" data-fit="${image.fit || 'contain'}" class="${index === 0 ? 'is-active' : ''}"></span>`).join('')}
              </div>
            </div>
          `;
        })()
        : `<img src="${images[0].src}" alt="${imageAlt}" class="project-thumbnail${images[0].fit === 'cover' ? ' project-thumbnail--cover' : ''}">`;
      const card = document.createElement('div');
      card.className = 'card project-card';
      card.innerHTML = `
        <div class="project-thumbnail-wrapper">
          ${imageMarkup}
        </div>
        <div class="project-info">
          ${periodHtml}
          <h3>${t(item.titleKey)}</h3>
          <p>${t(item.descKey)}</p>
          ${tagsHtml}
          ${actionsHtml}
        </div>
      `;
      grid.appendChild(card);

      if (videoPanelId) {
        const panel = document.createElement('section');
        panel.id = videoPanelId;
        panel.className = 'competition-video-showcase';
        panel.hidden = true;
        panel.innerHTML = `
          <h3>${t('competitions.videos.title')}</h3>
          ${item.videos.map((video) => `
            <figure class="competition-video-item">
              <figcaption>${t(video.titleKey)}</figcaption>
              <video controls playsinline preload="metadata" data-src="${video.src}" aria-label="${t(video.titleKey)}">${t('competitions.videos.unsupported')}</video>
            </figure>
          `).join('')}
        `;
        grid.appendChild(panel);
      }
    });
  }

  function initInternships() {
    renderImageCards('.internships-grid', INTERNSHIPS);
  }

  function initCompetitions() {
    renderImageCards('.competitions-grid', COMPETITIONS);
  }

  function initCompetitionVideos() {
    qsa('.project-video-toggle').forEach((button) => {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      const videos = qsa('video', panel);

      videos.forEach((video) => {
        video.addEventListener('play', () => {
          videos.forEach((other) => { if (other !== video) other.pause(); });
        });
      });

      button.addEventListener('click', () => {
        const opening = panel.hidden;
        panel.hidden = !opening;
        button.setAttribute('aria-expanded', String(opening));
        qs('span', button).textContent = t(opening ? 'competitions.links.hideVideo' : 'competitions.links.video');

        if (opening) {
          videos.forEach((video) => {
            if (!video.hasAttribute('src')) video.src = video.dataset.src;
          });
          const playback = videos[0]?.play();
          if (playback && typeof playback.catch === 'function') playback.catch(() => {});
          panel.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start',
          });
        } else {
          videos.forEach((video) => video.pause());
        }
      });
    });
  }

  function initProjects() {
    renderImageCards('.projects-grid:not(.internships-grid):not(.competitions-grid)', PROJECTS);
  }

  function initImageCarousels() {
    imageCarouselTimers.forEach((timer) => window.clearInterval(timer));
    imageCarouselTimers = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    qsa('.project-image-carousel').forEach((carousel) => {
      const image = qs('.project-carousel-image', carousel);
      const indicators = qsa('.project-image-indicators span', carousel);
      if (!image || indicators.length < 2) return;
      const slideDuration = Number(carousel.dataset.slideDuration) || 2000;

      let current = 0;
      let switching = false;
      const preloadedImages = indicators.map((indicator) => {
        const preloaded = new Image();
        preloaded.src = indicator.dataset.src;
        return preloaded;
      });

      const timer = window.setInterval(() => {
        if (document.hidden || switching) return;
        switching = true;
        const next = (current + 1) % indicators.length;
        const nextImage = preloadedImages[next];

        const showNextImage = () => {
          if (!nextImage.naturalWidth) {
            switching = false;
            return;
          }
          image.src = nextImage.src;
          image.classList.toggle('project-thumbnail--cover', indicators[next].dataset.fit === 'cover');
          image.classList.toggle('project-thumbnail--contain', indicators[next].dataset.fit !== 'cover');
          current = next;
          indicators.forEach((indicator, index) => {
            indicator.classList.toggle('is-active', index === current);
          });
          if (!reduceMotion) {
            image.classList.remove('is-entering');
            image.offsetWidth;
            image.classList.add('is-entering');
            window.setTimeout(() => image.classList.remove('is-entering'), 420);
          }
          switching = false;
        };

        if (nextImage.complete) {
          if (typeof nextImage.decode === 'function') {
            nextImage.decode().then(showNextImage).catch(() => { switching = false; });
          } else {
            showNextImage();
          }
        } else {
          nextImage.addEventListener('load', showNextImage, { once: true });
          nextImage.addEventListener('error', () => { switching = false; }, { once: true });
        }
      }, slideDuration);
      imageCarouselTimers.push(timer);
    });
  }

  function initDocuments() {
    const grid = qs('.documents-grid');
    if (!grid) return;
    clear(grid);

    DOCUMENTS.forEach((doc) => {
      const actionsHtml = renderProjectActions(doc.links);

      const card = document.createElement('div');
      card.className = 'card project-card project-card--text-only';
      card.innerHTML = `
        <div class="project-info">
          <h3>${t(doc.titleKey)}</h3>
          <p>${t(doc.descKey)}</p>
          <div class="project-meta-row">
            ${actionsHtml}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function initTimeline() {
    const container = qs('.timeline-container');
    if (!container) return;
    clear(container);

    TIMELINE_EVENTS.forEach((key) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <span class="timeline-date">${t(`${key}.date`)}</span>
        <div class="timeline-content">
          <h3>${t(`${key}.title`)}</h3>
          <p>${t(`${key}.desc`)}</p>
        </div>
      `;
      container.appendChild(item);
    });
  }

  function initTechStack() {
    const container = qs('.skills-wrapper');
    if (!container) return;
    clear(container);

    TECH_STACK.forEach((group) => {
      const itemsHtml = group.items
        .map((s) => `<div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>`)
        .join('');

      const col = document.createElement('div');
      col.className = 'skill-category';
      col.innerHTML = `<h3>${t(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
      container.appendChild(col);
    });
  }

  function initContactLinks() {
    const container = qs('.intro-contact-links');
    if (!container) return;
    clear(container);

    CONTACT_LINKS.forEach((contact) => {
      const label = t(contact.key);
      const item = document.createElement('a');
      item.className = 'intro-contact-link';
      item.href = contact.link;
      if (!contact.link.startsWith('mailto:')) {
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
      }
      item.title = label;
      item.setAttribute('aria-label', label);
      item.innerHTML = `<span>${label}</span><i class="${contact.icon}"></i>`;
      container.appendChild(item);
    });
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        let target;
        try {
          target = qs(href);
        } catch {
          return;
        }

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  function initRevealMotion() {
    const targets = [
      ...qsa('.projects-grid .card'),
      ...qsa('.documents-grid .card'),
      ...qsa('.timeline-container .timeline-item'),
      ...qsa('.skills-wrapper .skill-category'),
    ];

    if (!targets.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((el, index) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${(index % 6) * 60}ms`);
    });

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    initSmoothScroll();
  });

  window.addEventListener('i18nLoaded', () => {
    console.log('[main] i18n loaded, rendering content...');
    initInternships();
    initCompetitions();
    initCompetitionVideos();
    initProjects();
    initDocuments();
    initTimeline();
    initTechStack();
    initContactLinks();
    initImageCarousels();
    initRevealMotion();
  });
})();
