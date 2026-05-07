const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const sections = document.querySelectorAll('section[id]:not(#hero)');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' });
sections.forEach(s => sectionObserver.observe(s));

document.querySelectorAll('.about-card, .review-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});
const revealTargets = document.querySelectorAll(
  '.about-grid, .gallery-grid, .reviews-grid, .insta-grid, .gallery-header, .menu-header, .reviews-header, .insta-top'
);
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); obs.unobserve(entry.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
[...revealTargets, ...document.querySelectorAll('.about-card, .review-card')].forEach(el => {
  if (el.getBoundingClientRect().top >= window.innerHeight) {
    el.classList.add('will-reveal');
    revealObs.observe(el);
  }
});

const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

let cur = 0;
const slides = document.querySelectorAll('.slide');
const sdots = document.querySelectorAll('.sdot');
const counterEl = document.getElementById('counter-cur');

function goToSlide(n) {
  slides[cur].classList.remove('active');
  sdots[cur].classList.remove('active');
  cur = n;
  slides[cur].classList.add('active');
  sdots[cur].classList.add('active');
  counterEl.textContent = String(cur + 1).padStart(2, '0');
}

setInterval(() => { goToSlide((cur + 1) % slides.length); }, 4500);
document.querySelector('.hero-prev').addEventListener('click', () => goToSlide((cur - 1 + slides.length) % slides.length));
document.querySelector('.hero-next').addEventListener('click', () => goToSlide((cur + 1) % slides.length));

function showTab(cat, btn) {
  document.querySelectorAll('.menu-category').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('cat-' + cat).classList.add('active');
  btn.classList.add('active');
}

function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

const rezForm = document.getElementById('rez-form');
if (rezForm) {
  rezForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = rezForm.querySelector('[type=submit]');
    btn.textContent = 'Wysyłanie…'; btn.disabled = true;
    try {
      const res = await fetch(rezForm.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(rezForm) });
      if (res.ok) { rezForm.innerHTML = '<p class="form-success">Dziękujemy! Oddzwonimy wkrótce.</p>'; }
      else { throw new Error(); }
    } catch {
      btn.textContent = 'Zarezerwuj stolik'; btn.disabled = false;
      rezForm.querySelector('.form-error').style.display = 'block';
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    navbar.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});
