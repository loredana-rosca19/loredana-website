/* ============================================
   LOREDANA ROȘCA — script.js
   ============================================ */

(function () {
  'use strict';

  /* ---- NAV SCROLL ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- BURGER MENU ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 68;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - navH,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---- REVEAL ON SCROLL ---- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- CLOSE MOBILE MENU ON RESIZE ---- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu) {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ---- COOKIE CONSENT ---- */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieModal = document.getElementById('cookieModal');
  const CONSENT_KEY = 'lr-cookie-consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; }
  }
  function saveConsent(obj) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(obj)); } catch (e) {}
    applyConsent(obj);
  }
  function applyConsent(obj) {
    if (obj && obj.statistics) {
      /* Consimțământ pentru statistici acordat.
         Aici poți încărca scripturile de analiză (ex. Google Analytics),
         DOAR după acest consimțământ. */
    }
  }

  function showBanner() {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    requestAnimationFrame(() => cookieBanner.classList.add('show'));
  }
  function hideBanner() {
    if (!cookieBanner) return;
    cookieBanner.classList.remove('show');
    setTimeout(() => { cookieBanner.hidden = true; }, 320);
  }
  function openModal() {
    if (!cookieModal) return;
    const c = getConsent();
    const stat = document.getElementById('cookieStatistics');
    if (stat) stat.checked = !!(c && c.statistics);
    cookieModal.hidden = false;
    requestAnimationFrame(() => cookieModal.classList.add('show'));
  }
  function closeModal() {
    if (!cookieModal) return;
    cookieModal.classList.remove('show');
    setTimeout(() => { cookieModal.hidden = true; }, 280);
  }

  if (cookieBanner || cookieModal) {
    const consent = getConsent();
    if (!consent) { showBanner(); } else { applyConsent(consent); }

    const acceptAll = () => { saveConsent({ necessary: true, statistics: true }); hideBanner(); closeModal(); };
    const onlyNecessary = () => { saveConsent({ necessary: true, statistics: false }); hideBanner(); closeModal(); };

    const bind = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };

    bind('cookieAccept', acceptAll);
    bind('cookieAcceptAll2', acceptAll);
    bind('cookieReject', onlyNecessary);
    bind('cookieSettings', (e) => { e.preventDefault(); openModal(); });
    bind('cookieSettingsLink', (e) => { e.preventDefault(); openModal(); });
    bind('cookieSettingsLink2', (e) => { e.preventDefault(); openModal(); });
    bind('cookieSavePrefs', () => {
      const stat = document.getElementById('cookieStatistics');
      saveConsent({ necessary: true, statistics: !!(stat && stat.checked) });
      hideBanner(); closeModal();
    });

    document.querySelectorAll('[data-cookie-close]').forEach(el =>
      el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cookieModal && !cookieModal.hidden) closeModal();
    });
  }

})();
