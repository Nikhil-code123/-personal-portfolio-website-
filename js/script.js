/**
 * portfolio-website/js/script.js
 * Lightweight vanilla JS for accessibility enhancements,
 * mobile nav, theme toggle, form validation, and animations.
 */

'use strict';

/* ─── 1. MOBILE NAVIGATION ──────────────────────────────────── */
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
    // Announce state to screen readers
    toggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
  });

  // Close nav when a link is clicked (single page feel)
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
})();


/* ─── 2. THEME TOGGLE ────────────────────────────────────────── */
(function initThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  applyTheme(saved);

  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (btn) {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
})();


/* ─── 3. ACTIVE NAV LINK ─────────────────────────────────────── */
(function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();


/* ─── 4. SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Move focus to target for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});


/* ─── 5. SKILL BAR ANIMATION (Intersection Observer) ────────── */
(function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill');
  if (!bars.length) return;

  // Store the target width and set to 0 initially
  bars.forEach(bar => {
    const target = bar.style.width;
    bar.dataset.target = target;
    bar.style.width = '0';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.target;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ─── 6. CONTACT FORM VALIDATION ────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('[aria-invalid]').forEach(el => {
      el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form-error').forEach(el => {
      el.hidden = true;
    });

    // Validate each field
    const fields = [
      { id: 'name',    rule: v => v.trim().length >= 2,  msg: 'Please enter your full name (at least 2 characters).' },
      { id: 'email',   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      { id: 'subject', rule: v => v.trim().length >= 3,  msg: 'Please enter a subject (at least 3 characters).' },
      { id: 'message', rule: v => v.trim().length >= 20, msg: 'Please enter a message (at least 20 characters).' },
    ];

    fields.forEach(({ id, rule, msg }) => {
      const input  = document.getElementById(id);
      const error  = document.getElementById(`${id}-error`);
      if (!input) return;

      if (!rule(input.value)) {
        input.setAttribute('aria-invalid', 'true');
        if (error) {
          error.textContent = msg;
          error.hidden = false;
        }
        valid = false;
      }
    });

    if (!valid) {
      // Focus the first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate successful submission
    form.hidden = true;
    if (successMsg) {
      successMsg.classList.add('visible');
      successMsg.focus();
    }
  });

  // Live validation on blur
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        // Re-validate on blur
        form.dispatchEvent(new Event('submit'));
      }
    });
  });
})();


/* ─── 7. FADE-IN ANIMATION ON SCROLL ────────────────────────── */
(function initScrollAnimations() {
  const animated = document.querySelectorAll('.animate-fade-up');
  if (!animated.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animated.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
})();
