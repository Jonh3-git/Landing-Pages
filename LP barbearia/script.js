/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Scroll reveal (IntersectionObserver) ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stat-item').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});

document.querySelectorAll('.service-card').forEach((el, i) => {
  el.dataset.delay = i * 120;
  observer.observe(el);
});

document.querySelectorAll('.diff-item').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});

document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

/* ── Counter animation ── */
function animateCounter(el, target) {
  const start    = performance.now();
  const duration = 1800;
  const isLarge  = target > 100;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.floor(eased * target);

    el.textContent = isLarge
      ? current.toLocaleString('pt-BR')
      : current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isLarge
        ? target.toLocaleString('pt-BR')
        : target;
    }
  }

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target.querySelector('.stat-number');
      if (num && !num.dataset.animated) {
        num.dataset.animated = true;
        animateCounter(num, parseInt(num.dataset.target));
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));