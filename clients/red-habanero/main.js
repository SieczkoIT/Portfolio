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

document.querySelectorAll('.feature-row, .review-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});
const revealTargets = document.querySelectorAll(
  '.about-stats, .about-features, .gallery-bento, .reviews-cards, .gallery-header, .menu-header, .reviews-lead, .heat-header'
);
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); obs.unobserve(entry.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
[...revealTargets, ...document.querySelectorAll('.feature-row, .review-card')].forEach(el => {
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

function goToSlide(n) {
  slides[cur].classList.remove('active');
  sdots[cur].classList.remove('active');
  cur = n;
  slides[cur].classList.add('active');
  sdots[cur].classList.add('active');
}

setInterval(() => { goToSlide((cur + 1) % slides.length); }, 4500);

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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    navbar.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});
