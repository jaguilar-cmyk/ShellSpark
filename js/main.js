document.addEventListener('DOMContentLoaded', () => {

  /* ── Typing Effect ── */
  const typedEl = document.getElementById('typedText');
  const phrases = ['ShellSpark', 'Aprende CMD', 'Domina PowerShell', 'Codifica. Ejecuta. Avanza.'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimeout;

  function typeEffect() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        typeTimeout = setTimeout(() => { isDeleting = true; typeEffect(); }, 2000);
        return;
      }
      typeTimeout = setTimeout(typeEffect, 70);
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeTimeout = setTimeout(typeEffect, 400);
        return;
      }
      typeTimeout = setTimeout(typeEffect, 35);
    }
  }

  if (typedEl) {
    typedEl.textContent = '';
    setTimeout(typeEffect, 800);
  }

  /* ── Navbar Scroll ── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── Mobile Menu ── */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ── Scroll Animations ── */
  const featureCards = document.querySelectorAll('.feature-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.15 });

  featureCards.forEach(card => observer.observe(card));

  /* ── Animated Counters ── */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el, target);
        }
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const duration = 25;

    function tick() {
      current += increment;
      if (current >= target) {
        el.textContent = target + '+';
        return;
      }
      el.textContent = current;
      setTimeout(tick, duration);
    }
    tick();
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});
