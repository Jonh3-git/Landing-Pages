// ── CATEGORY TABS ──
function showCategory(cat, btn) {
  document.querySelectorAll('.menu-category').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('cat-' + cat).classList.add('active');
  btn.classList.add('active');
  // re-trigger reveals
  setTimeout(() => {
    document.querySelectorAll('#cat-' + cat + ' .reveal').forEach(el => {
      el.classList.remove('visible');
      void el.offsetWidth;
      el.classList.add('visible');
    });
  }, 50);
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// ── ADD BTN FEEDBACK ──
document.querySelectorAll('.card-add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.textContent = '✓';
    btn.style.background = '#4CAF50';
    btn.style.color = 'white';
    btn.style.borderColor = '#4CAF50';
    setTimeout(() => {
      btn.textContent = '+';
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1500);
  });
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});