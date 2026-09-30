// Navbar scroll effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('#navbar .nav-link');
const sections = document.querySelectorAll('section[id]');

const pageLoadTime = Date.now();

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? y / docHeight : 0;
  if (progressBar) progressBar.style.transform = 'scaleX(' + progress + ')';

  if (y > 50) {
    navbar.classList.add('glass', 'shadow-sm');
  } else {
    navbar.classList.remove('glass', 'shadow-sm');
  }

  if (y > 500) {
    backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    backToTop.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
  } else {
    backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    backToTop.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
  }

  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (y >= top) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active-section', href === '#' + current);
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = themeToggle?.querySelector('.sun-icon');
const moonIcon = themeToggle?.querySelector('.moon-icon');
const mobileSun = document.querySelector('.sun-icon-mobile');
const mobileMoon = document.querySelector('.moon-icon-mobile');
const mobileLabel = document.querySelector('.theme-label');
const progressBar = document.getElementById('progress-bar');

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
    mobileSun?.classList.add('hidden');
    mobileMoon?.classList.remove('hidden');
    if (mobileLabel) mobileLabel.textContent = 'Dark';
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
    mobileSun?.classList.remove('hidden');
    mobileMoon?.classList.add('hidden');
    if (mobileLabel) mobileLabel.textContent = 'Light';
  }
}

const stored = localStorage.getItem('theme');
if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

document.getElementById('theme-toggle-mobile')?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeMenuBtn = document.getElementById('close-menu-btn');

function openMobileMenu() {
  mobileMenu.classList.remove('-translate-x-full');
  mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
  mobileOverlay.classList.add('opacity-100', 'pointer-events-auto');
  menuBtn.classList.add('hamburger-active');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => mobileMenu.classList.add('drawer-open'), 300);
}

function closeMobileMenu() {
  mobileMenu.classList.add('-translate-x-full');
  mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
  mobileOverlay.classList.remove('opacity-100', 'pointer-events-auto');
  menuBtn.classList.remove('hamburger-active');
  mobileMenu.classList.remove('drawer-open');
  document.body.classList.remove('overflow-hidden');
}

menuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Modal data
const projectsData = [
  {
    title: 'BellBell E-Commerce Platform',
    tag: 'Rust Web App',
    desc: 'A personal e-commerce learning project built with Leptos, Actix Web, PostgreSQL, JWT authentication, and Midtrans payment integration. Includes product listings, cart, checkout flow, order tracking demo, and a simple admin dashboard.',
    img: 'asset/eccomerce%20project%20.png',
    tech: ['Leptos', 'Actix Web', 'PostgreSQL', 'JWT', 'Midtrans', 'Redis'],
    github: 'https://github.com/BintangDwii',
    demo: null
  },
  {
    title: 'Hotel Management System',
    tag: 'Hotel Booking Demo',
    desc: 'A demo hotel booking project with room availability, check-in/out flow, billing demo, simple reporting, and a basic admin panel for learning.',
    img: 'asset/Hotel%20project.png',
    tech: ['Leptos', 'Actix Web', 'PostgreSQL', 'JWT', 'Docker'],
    github: 'https://github.com/BintangDwii',
    demo: null
  },
  {
    title: 'Banking App Dashboard',
    tag: 'Banking UI Concept',
    desc: 'A banking UI concept with balance overview, transaction history, transfer simulation, QR payment demo, and CSV export. Built as a frontend learning project with clean components.',
    img: 'asset/Banking%20sistem%20.jpeg',
    tech: ['Leptos', 'WebAssembly', 'PostgreSQL', 'Chart.js', 'CSV Export'],
    github: 'https://github.com/BintangDwii',
    demo: null
  },
  {
    title: 'AI Agent Chat Application',
    tag: 'AI · Rust Experiment',
    desc: 'An experimental local AI chat project with simple intent detection, planning, and safe file/command actions for learning. Includes confirmation for destructive actions, path validation, and basic audit logging.',
    img: 'asset/Ai%20local%20chat%20for%20real%20project.png',
    tech: ['Rust', 'Ollama', 'TypeScript', 'Playwright', 'Cargo', 'npm'],
    github: 'https://github.com/BintangDwii',
    demo: null
  },
  {
    title: 'Restaurant Ordering Platform',
    tag: 'Rust Project',
    desc: 'A restaurant ordering learning project built with Leptos for frontend and Actix Web for backend. Features menu browsing, order flow, account management, Midtrans payment demo, and a simple admin panel. Uses PostgreSQL, JWT auth, Tailwind CSS, and Playwright for learning E2E testing.',
    img: 'asset/Restaurant%20ordering%20sistem.png',
    tech: ['Leptos', 'Actix Web', 'Diesel', 'PostgreSQL', 'JWT', 'Bcrypt', 'WASM', 'Midtrans', 'Tailwind CSS', 'Playwright'],
    github: 'https://github.com/BintangDwii',
    demo: null
  }
];

const modalOverlay = document.getElementById('modal-overlay');
const modalCard = document.getElementById('modal-card');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openModal(data) {
  const techTags = data.tech.map(t => `<span class="pill text-xs">${t}</span>`).join('');
  modalBody.innerHTML = `
      <img src="${data.img}" alt="${data.title}" class="w-full aspect-video object-cover rounded-xl mb-6" />
      <span class="text-xs text-secondary font-medium">${data.tag}</span>
      <h3 class="text-xl font-semibold text-primary mt-1 mb-3">${data.title}</h3>
      <p class="text-sm text-secondary leading-relaxed mb-4">${data.desc}</p>
      <div class="flex flex-wrap gap-2 mb-6">${techTags}</div>
      <div class="flex flex-wrap gap-3 items-center">
        <a href="${data.github}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-sm font-medium text-primary border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white transition">View on GitHub &nearr;</a>
        <button class="demo-request-btn inline-flex items-center gap-1.5 text-sm font-medium text-white bg-primary rounded-full px-5 py-2 hover:bg-[#333] transition">Request Demo &nearr;</button>
      </div>
      <div class="demo-picker hidden mt-4 p-4 bg-soft card-rounded-sm flex flex-wrap items-center gap-3">
        <input type="date" class="demo-date-input flex-1 min-w-[160px] px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-primary focus:outline-none focus:border-primary transition" min="${new Date().toISOString().split('T')[0]}" />
        <button class="demo-send-btn inline-flex items-center gap-1.5 text-sm font-medium text-white bg-primary rounded-full px-5 py-2.5 hover:bg-[#333] transition">Send Request</button>
      </div>
    `;
    const requestBtn = modalBody.querySelector('.demo-request-btn');
    const picker = modalBody.querySelector('.demo-picker');
    const dateInput = modalBody.querySelector('.demo-date-input');
    const sendBtn = modalBody.querySelector('.demo-send-btn');
    if (requestBtn && picker) {
      requestBtn.addEventListener('click', () => picker.classList.toggle('hidden'));
    }
    if (sendBtn && dateInput) {
      sendBtn.addEventListener('click', () => {
        const date = dateInput.value;
        if (!date) { dateInput.focus(); return; }
        const subject = encodeURIComponent('Demo Request: ' + data.title);
        const body = encodeURIComponent('I would like to request a demo for ' + data.title + '.\n\nPreferred date: ' + date);
        window.location.href = 'mailto:' + 'bintangsilver925@gmail.com' + '?subject=' + subject + '&body=' + body;
        picker.classList.add('hidden');
        showToast('Demo request sent! I\'ll get back to you soon.');
      });
    }
  const openImg = modalBody.querySelector('img');
  if (openImg) {
    openImg.classList.add('cursor-pointer', 'hover:opacity-80', 'transition-opacity');
    openImg.addEventListener('click', function (e) {
      e.stopPropagation();
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('lightbox-show');
      document.body.classList.add('modal-open');
    });
  }
  modalOverlay.classList.add('modal-show');
  modalCard.classList.add('modal-show');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modalOverlay.classList.remove('modal-show');
  modalCard.classList.remove('modal-show');
  document.body.classList.remove('modal-open');
}

function closeLightbox() {
  lightbox.classList.remove('lightbox-show');
  if (!modalOverlay.classList.contains('modal-show')) {
    document.body.classList.remove('modal-open');
  }
}

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('lightbox-show')) closeLightbox();
    else closeModal();
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Carousel
const projectTrack = document.querySelector('.project-track');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

const carouselDots = document.querySelectorAll('.carousel-dot');

function scrollCarousel(dir) {
  const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
  const atStart = projectTrack.scrollLeft <= 2;
  const atEnd = projectTrack.scrollLeft >= maxScroll - 2;

  if (dir === 1 && atEnd) {
    projectTrack.scrollLeft = 0;
    return;
  }
  if (dir === -1 && atStart) {
    projectTrack.scrollLeft = maxScroll;
    return;
  }

  const card = projectTrack?.querySelector('.project-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 24;
  projectTrack.scrollBy({ left: cardWidth * dir, behavior: 'smooth' });
}

function updateCarouselDot() {
  const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
  if (maxScroll <= 0) return;
  const ratio = projectTrack.scrollLeft / maxScroll;
  const dotIdx = Math.round(ratio * 2);
  carouselDots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));
}

projectTrack?.addEventListener('scroll', updateCarouselDot);

carouselDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const dotIdx = parseInt(dot.getAttribute('data-dot'));
    const cardIdx = [0, 2, 4][dotIdx] ?? 0;
    const cards = projectTrack.querySelectorAll('.project-card');
    const target = cards[cardIdx];
    if (target) target.scrollIntoView({ inline: 'start', behavior: 'smooth', block: 'nearest' });
  });
});

prevBtn?.addEventListener('click', () => scrollCarousel(-1));
nextBtn?.addEventListener('click', () => scrollCarousel(1));

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    document.querySelectorAll('.project-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    const idx = parseInt(this.getAttribute('data-index'));
    if (projectsData[idx]) openModal(projectsData[idx]);
  });
});

// Contact form submit
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (Date.now() - pageLoadTime < 3000) return;
  const btn = this.querySelector('button[type="submit"]');
  const text = btn.innerHTML;
  btn.innerHTML = 'Sending...';
  btn.disabled = true;
  const data = new FormData(this);
  if (data.get('website')) { btn.innerHTML = text; btn.disabled = false; return; }
  const subject = data.get('subject') || 'Portfolio Contact';
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  window.location.href = `mailto:${'bintangsilver925@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setTimeout(() => {
    btn.innerHTML = text;
    btn.disabled = false;
    this.reset();
  }, 2000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection Observer for animations
const animationMap = {
  fadeInUp: 'animate-fadeInUp',
  slideLeft: 'animate-slideLeft',
  slideRight: 'animate-slideRight',
  scaleIn: 'animate-scaleIn',
  slideUpFade: 'animate-slideUpFade'
};

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const type = el.getAttribute('data-animate') || 'fadeInUp';
      const delay = parseInt(el.getAttribute('data-delay')) || 0;
      const animClass = animationMap[type] || 'animate-fadeInUp';
      el.style.opacity = '0';
      setTimeout(() => {
        el.classList.add(animClass);
        el.style.opacity = '';
      }, delay);
      animObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => {
  animObserver.observe(el);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('max-h-[300px]');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('max-h-[300px]'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));
    if (!isOpen) {
      answer.classList.add('max-h-[300px]');
      btn.classList.add('open');
    }
  });
});

// Toast notification
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
let toastTimer;

function showToast(msg) {
  if (!toast || !toastMsg) return;
  clearTimeout(toastTimer);
  toastMsg.textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
  toastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3000);
}

// Dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();
