const CART_KEY = 'rimora_cart_v1';

let productsMap = new Map();
let cart = [];

const formatPrice = (value) => `$${value.toFixed(2)}`;
const byId = (id) => document.getElementById(id);

const createCategoryCard = (category) => `
  <article class="card">
    <img src="${category.image}" alt="${category.name}" loading="lazy" />
    <div class="card-body">
      <h3>${category.name}</h3>
      <p>Explore ${category.name.toLowerCase()} essentials</p>
    </div>
  </article>
`;

const createProductCard = (product) => `
  <article class="card">
    <img src="${product.image}" alt="${product.title}" loading="lazy" />
    <div class="card-body">
      <small>${product.category}</small>
      <h3>${product.title}</h3>
      <p><span class="price">${formatPrice(product.price)}</span><span class="old-price">${formatPrice(product.oldPrice)}</span></p>
      <p>⭐ ${product.rating}</p>
      <button class="add-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  </article>
`;

const createTestimonialCard = (item) => `
  <article class="card">
    <div class="card-body">
      <p>“${item.quote}”</p>
      <strong>— ${item.name}</strong>
    </div>
  </article>
`;

const createInstaCard = (url) => `
  <article class="card">
    <img src="${url}" alt="Rimora Threads social post" loading="lazy" />
  </article>
`;

const updateStatus = (text, type = 'info') => {
  const status = byId('status-message');
  status.textContent = text;
  status.dataset.type = type;
};

const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const loadCart = () => {
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    cart = [];
  }
};

const updateCartUI = () => {
  const cartItemsEl = byId('cart-items');
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = productsMap.get(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  byId('cart-count').textContent = String(cartCount);
  byId('cart-total').textContent = formatPrice(total);

  if (!cart.length) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartItemsEl.innerHTML = cart
    .map((item) => {
      const product = productsMap.get(item.id);
      if (!product) return '';
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.title}" />
          <div>
            <p>${product.title}</p>
            <small>${formatPrice(product.price)} each</small>
            <div class="cart-item-actions">
              <button data-action="decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
              <button data-action="remove" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
};

const addToCart = (id) => {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  updateCartUI();
};

const modifyCartItem = (id, action) => {
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;

  if (action === 'increase') item.quantity += 1;
  if (action === 'decrease') item.quantity = Math.max(1, item.quantity - 1);
  if (action === 'remove') cart = cart.filter((entry) => entry.id !== id);

  saveCart();
  updateCartUI();
};

const toggleCart = (open) => {
  const panel = byId('cart-panel');
  const backdrop = byId('cart-backdrop');
  panel.classList.toggle('open', open);
  backdrop.classList.toggle('open', open);
  panel.setAttribute('aria-hidden', String(!open));
};

async function bootstrap() {
  try {
    updateStatus('Loading storefront content...');

    const data = {
      brand: {
        name: "Rimora Threads",
        address: "Fashion Street",
        supportEmail: "support@rimora.com",
        supportPhone: "+91 9876543210"
      },
      hero: {
  badge: "LATEST COLLECTION",
  heading: "Spring Summer Effortless Chic Lifestyle",
  subheading: "A curated drop of breathable silhouettes and modern romance designed for real celebrations.",
  ctaPrimary: "Read More",
  ctaSecondary: "Shop Now"
},
   categories: [
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c"
  },
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "Luxury",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
  }
],
   products: [
  {
    id: 1,
    title: "Elegant White Gown",
    category: "Women",
    price: 199,
    oldPrice: 249,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
  },
  {
    id: 2,
    title: "Classic Black Suit",
    category: "Men",
    price: 149,
    oldPrice: 189,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
  },
  {
    id: 3,
    title: "Luxury Sherwani",
    category: "Traditional",
    price: 229,
    oldPrice: 299,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
  }
],
      testimonials: [],
      instagram: []
    };
    document.getElementById('brand-name').textContent = data.brand.name;

    byId('hero').innerHTML = `
      <div class="hero-card">
        <small>${data.hero.badge}</small>
        <h2>${data.hero.heading}</h2>
        <p>${data.hero.subheading}</p>
        <div class="hero-actions">
          <a class="btn primary" href="#products">${data.hero.ctaPrimary}</a>
          <a class="btn secondary" href="#products">${data.hero.ctaSecondary}</a>
        </div>
      </div>
    `;

    byId('categories-grid').innerHTML = data.categories.map(createCategoryCard).join('');
    byId('product-grid').innerHTML = data.products.map(createProductCard).join('');
    byId('testimonial-grid').innerHTML = data.testimonials.map(createTestimonialCard).join('');
    byId('insta-grid').innerHTML = data.instagram.map(createInstaCard).join('');

    byId('footer').innerHTML = `
      <p><strong>${data.brand.name}</strong> • ${data.brand.address}</p>
      <p>Support: ${data.brand.supportEmail} • ${data.brand.supportPhone}</p>
      <p>© ${new Date().getFullYear()} ${data.brand.name}. All rights reserved.</p>
    `;

    productsMap = new Map(data.products.map((product) => [product.id, product]));
    loadCart();
    updateCartUI();

  } catch (error) {
    updateStatus(`Storefront failed to load: ${error.message}`, 'error');
    console.error('Unable to load storefront content:', error);
  }
}

byId('product-grid').addEventListener('click', (event) => {
  const button = event.target.closest('.add-cart');
  if (!button) return;
  addToCart(Number(button.dataset.id));
});

byId('cart-items').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  modifyCartItem(Number(button.dataset.id), button.dataset.action);
});

byId('cart-button').addEventListener('click', () => toggleCart(true));
byId('close-cart').addEventListener('click', () => toggleCart(false));
byId('cart-backdrop').addEventListener('click', () => toggleCart(false));
byId('checkout-btn').addEventListener('click', () => {
  if (!cart.length) return;
  alert('Checkout flow placeholder: cart saved successfully.');
});

byId('menu-toggle').addEventListener('click', () => {
  byId('nav-links').classList.toggle('open');
});

byId('newsletter-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const emailInput = byId('email');
  const message = byId('newsletter-message');

  try {
  message.textContent = "Subscribed successfully!";
emailInput.value = '';
  } catch (error) {
    message.textContent = error.message;
  }
});

bootstrap();
