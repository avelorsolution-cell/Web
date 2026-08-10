/* =========================================================================
   AVELOR — Motion Engine
   Drives: staggered scroll reveals, magnetic buttons, tilt cards, cursor
   glow, scroll progress, hero particles, ripple clicks, header hide/show.
   Everything degrades gracefully and respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Lazy image fade ---------- */
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.addEventListener('load', () => img.classList.add('is-loaded'));
  });

  /* ---------- Scroll progress bar ---------- */
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Header hide-on-scroll-down / show-on-scroll-up ---------- */
  (function headerAutoHide() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    function onScroll() {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 6) {
        if (y > lastY && y > 200) header.classList.add('nav-hidden');
        else header.classList.remove('nav-hidden');
        lastY = y;
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ---------- Staggered scroll reveal ---------- */
  (function staggerReveal() {
    const groups = [
      '.services-grid', '.why-grid', '.portfolio-grid', '.process-track',
      '.stat-grid', '.fact-grid'
    ];
    groups.forEach((sel) => {
      document.querySelectorAll(sel).forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          child.style.setProperty('--d', String(i));
        });
      });
    });

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .process-track, .stat-grid, .fact-grid, .cta-section');
    if (!revealEls.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
    }
  })();

  if (reduceMotion) return; // Skip everything below for reduced-motion users.

  /* ---------- Cursor glow + dot (fine pointers only) ---------- */
  if (isFinePointer) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(glow);
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    let rafId = null;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      dot.classList.add('is-active');
      glow.classList.add('is-active');
      if (!rafId) rafId = requestAnimationFrame(animateGlow);
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      dot.classList.remove('is-active');
      glow.classList.remove('is-active');
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.14;
      glowY += (mouseY - glowY) * 0.14;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
        rafId = requestAnimationFrame(animateGlow);
      } else {
        rafId = null;
      }
    }

    const hoverables = document.querySelectorAll('a, button, .btn, .service-card, .why-card, .portfolio-card');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => dot.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => dot.classList.remove('is-hover'));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (isFinePointer) {
    document.querySelectorAll('.btn').forEach((btn) => {
      let raf = null;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          btn.style.transform = `translate(${x * 0.18}px, ${y * 0.32}px)`;
        });
      });
      btn.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        btn.style.transform = '';
      });
    });
  }

  /* ---------- Button ripple on click ---------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.className = 'btn-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ---------- Tilt + cursor-follow sheen for cards ---------- */
  if (isFinePointer) {
    const tiltCards = document.querySelectorAll('.service-card, .why-card, .portfolio-card');
    tiltCards.forEach((card) => {
      let raf = null;
      card.addEventListener('mouseenter', () => card.classList.add('tilt-active'));
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (px - 0.5) * 10;
        const ry = (py - 0.5) * -10;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
          card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Hero parallax on mousemove + floating gold particles ---------- */
  (function heroFX() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const field = document.createElement('div');
    field.className = 'gold-particle-field';
    hero.appendChild(field);
    const count = window.innerWidth < 700 ? 8 : 16;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'gold-particle';
      const size = (2 + Math.random() * 3).toFixed(1);
      const left = (Math.random() * 100).toFixed(1);
      const dur = (7 + Math.random() * 7).toFixed(1);
      const delay = (Math.random() * 9).toFixed(1);
      const drift = (Math.random() * 60 - 30).toFixed(0);
      p.style.left = left + '%';
      p.style.setProperty('--size', size + 'px');
      p.style.setProperty('--dur', dur + 's');
      p.style.setProperty('--delay', delay + 's');
      p.style.setProperty('--drift', drift + 'px');
      field.appendChild(p);
    }

    if (!isFinePointer) return;
    const visual = document.querySelector('.hero-visual');
    if (!visual) return;
    // The entrance keyframe (rise, fill-mode forwards) would otherwise keep
    // overriding any inline transform we set for parallax — release it once
    // the one-time entrance animation has finished playing.
    setTimeout(() => { visual.style.animation = 'none'; }, 1700);
    let raf = null;
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        visual.style.transform = `translate(${px * 14}px, ${py * 14}px)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      visual.style.transform = '';
    });
  })();

})();
