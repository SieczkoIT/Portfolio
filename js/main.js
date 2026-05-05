// ─── THEME ────────────────────────────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
let currentTheme = 'dark';

function applyTheme(theme, animate) {
  if (animate) {
    document.body.classList.add('theme-transitioning');
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 350);
  }
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '☀';
  }
  currentTheme = theme;
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
});

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
let currentLang = 'en';

const cvFiles = { en: 'assets/Szymon_Sieczko_CV_EN.pdf', pl: 'assets/Szymon_Sieczko_CV_PL.pdf' };

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  const cvBtn = document.getElementById('cvDownloadBtn');
  if (cvBtn) cvBtn.href = cvFiles[lang];
  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
applyTheme(localStorage.getItem('theme') || 'dark', false);
applyLang(localStorage.getItem('lang') || 'en');

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .skill-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('menu-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) navbar.classList.remove('menu-open');
});

// ─── NAVBAR SCROLL ────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ─── FADE UP ON SCROLL ────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => obs.observe(el));

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
// Sign up at formspree.io, create a form, then replace YOUR_FORM_ID below.
const FORM_ENDPOINT = 'https://formspree.io/f/mnjwvqwo';

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const t = translations[currentLang];

    btn.disabled = true;
    btn.textContent = t.form_sending;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const payload = {
      name: document.getElementById('formName').value,
      email: document.getElementById('formEmail').value,
      message: document.getElementById('formMessage').value,
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      formStatus.textContent = t.form_success;
      formStatus.className = 'form-status success';
      contactForm.reset();
    } catch {
      formStatus.textContent = t.form_error;
      formStatus.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.textContent = t.form_submit;
    }
  });
}
