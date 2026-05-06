const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); });

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

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
