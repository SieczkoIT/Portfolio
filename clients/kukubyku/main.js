const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); });

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
    closeCart();
  }
});

// ── CART ──
const cart = [];

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(name) {
  const idx = cart.findIndex(i => i.name === name);
  if (idx === -1) return;
  if (cart[idx].qty > 1) {
    cart[idx].qty--;
  } else {
    cart.splice(idx, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-float').style.display = count > 0 ? 'flex' : 'none';

  const itemsEl = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Koszyk jest pusty.<br>Dodaj pozycje z menu.</p>';
    footerEl.style.display = 'none';
  } else {
    itemsEl.innerHTML = cart.map(i => {
      const safeName = i.name.replace(/'/g, "\\'");
      return `<div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">${i.name}</span>
          <span class="cart-item-price">${i.price * i.qty} zł</span>
        </div>
        <div class="cart-item-qty">
          <button onclick="removeFromCart('${safeName}')">−</button>
          <span>${i.qty}</span>
          <button onclick="addToCart('${safeName}', ${i.price})">+</button>
        </div>
      </div>`;
    }).join('');
    footerEl.style.display = 'flex';
    document.getElementById('cart-total').textContent = total + ' zł';
  }
}

function openCart() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleDelivery(radio) {
  document.getElementById('delivery-fields').classList.toggle('visible', radio.value === 'dostawa');
}

function sendOrder(e) {
  e.preventDefault();
  if (cart.length === 0) return;

  const btn = e.currentTarget;
  const name = document.getElementById('customer-name').value.trim() || 'Klient';
  const type = document.querySelector('input[name="order-type"]:checked').value;
  const address = document.getElementById('delivery-address').value.trim();

  const lines = cart.map(i => `${i.name} x${i.qty} — ${i.price * i.qty} zł`).join('\n');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  let orderText = lines + `\n\nRazem: ${total} zł\nRodzaj: ${type === 'dostawa' ? 'Dostawa' : 'Na miejscu'}`;
  if (type === 'dostawa' && address) orderText += `\nAdres: ${address}`;

  btn.textContent = 'Wysyłanie...';
  btn.disabled = true;

  fetch('https://formspree.io/f/mnjwvqwo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: `Nowe zamówienie KukuByku — ${name}`,
      Imię: name,
      Zamówienie: orderText,
      Razem: total + ' zł'
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      cart.splice(0, cart.length);
      document.getElementById('cart-float').style.display = 'none';
      document.getElementById('cart-items').innerHTML = '<p class="cart-success">✓ Zamówienie wysłane!<br>Oddzwonimy wkrótce, aby potwierdzić.</p>';
      document.getElementById('cart-footer').style.display = 'none';
    } else {
      btn.textContent = 'Błąd — spróbuj ponownie';
      btn.disabled = false;
    }
  })
  .catch(() => {
    btn.textContent = 'Błąd — spróbuj ponownie';
    btn.disabled = false;
  });
}
