/* ═══════════════════════════════════════════
   MAISON ATELIER — Script
   · Scroll reveal
   · Navbar shadow on scroll
   · Sacola counter
   ═══════════════════════════════════════════ */

// ── Scroll Reveal ──────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.06) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Navbar shadow on scroll ────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Sacola counter ─────────────────────────
let bagCount = 0;
const bagCountEl = document.querySelector('.bag-count');

document.querySelectorAll('.pcard-cta').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    bagCount++;
    bagCountEl.textContent = bagCount;

    // Feedback visual no botão
    const original = btn.textContent;
    btn.textContent = 'Adicionado ✓';
    btn.style.background = '#2A2520';
    btn.style.color = '#F7F4EF';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
    }, 1600);
  });
});

// ── Parallax sutil no hero ─────────────────
const heroImgs = document.querySelectorAll('.hero-img');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroImgs.forEach(img => {
    img.style.transform = `translateY(${y * 0.12}px)`;
  });
}, { passive: true });

// ── Smooth reveal para cards de produto ────
// (garante que cards em viewport já apareçam)
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});