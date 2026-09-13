/* ===== CAFE STARDA — script.js ===== */

/* --- Navbar scroll effect --- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* --- Mobile nav toggle --- */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  toggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* --- Active nav link --- */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* --- Intersection Observer animations --- */
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));

/* --- Menu tab filtering --- */
const tabs = document.querySelectorAll('.menu-tab');
const categories = document.querySelectorAll('.menu-category');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    categories.forEach(cat => {
      cat.style.display = (filter === 'all' || cat.dataset.cat === filter) ? '' : 'none';
    });
  });
});

/* --- Contact form validation --- */
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id: 'name',    msg: 'Please enter your name.' },
    { id: 'email',   msg: 'Please enter a valid email.', type: 'email' },
    { id: 'message', msg: 'Please write a message.' },
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const err   = document.getElementById(field.id + 'Error');
    let ok = input.value.trim() !== '';
    if (ok && field.type === 'email') {
      ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    err?.classList.toggle('visible', !ok);
    if (!ok) valid = false;
  });

  if (valid) {
    const success = document.getElementById('formSuccess');
    success?.classList.add('visible');
    form.reset();
    setTimeout(() => success?.classList.remove('visible'), 5000);
  }
});

/* --- Order Now → WhatsApp --- */
document.querySelectorAll('[data-wa-order]').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.menu-card')?.querySelector('h3')?.textContent || 'an item';
    const msg  = encodeURIComponent(`Hello Cafe Starda! I'd like to order: ${item}`);
    window.open(`https://wa.me/923243495772?text=${msg}`, '_blank');
  });
});
