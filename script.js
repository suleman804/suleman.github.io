/* ============================================================
   Suleman Salmani — Portfolio JavaScript
   Handles: Navigation, Scroll Reveal, Active Section Tracking,
            Mobile Menu, and Smooth Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  // NAVBAR SCROLL EFFECT
  // ─────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ─────────────────────────────────────────────
  // MOBILE MENU TOGGLE
  // ─────────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });


  // ─────────────────────────────────────────────
  // SCROLL REVEAL (Intersection Observer)
  // ─────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─────────────────────────────────────────────
  // ACTIVE SECTION TRACKING
  // ─────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px 0px 0px`
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ─────────────────────────────────────────────
  // ANIMATED STAT COUNTER
  // ─────────────────────────────────────────────
  const animateCounter = (el, target, suffix = '') => {
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 30);
  };

  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const text = stat.textContent.trim();
          const match = text.match(/^(\d+)(.*)$/);
          if (match) {
            const num = parseInt(match[1]);
            const suffix = match[2];
            stat.textContent = '0' + suffix;
            animateCounter(stat, num, suffix);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }


  // ─────────────────────────────────────────────
  // SKILL CHIPS — SUBTLE RANDOM DELAY ANIMATION
  // ─────────────────────────────────────────────
  const skillChips = document.querySelectorAll('.skill-chip');
  skillChips.forEach((chip, i) => {
    chip.style.animationDelay = `${i * 50}ms`;
  });


  // ─────────────────────────────────────────────
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ─────────────────────────────────────────────
  // TYPING EFFECT ON HERO TAGLINE (subtle)
  // ─────────────────────────────────────────────
  const heroTagline = document.querySelector('.hero-tagline');
  if (heroTagline) {
    heroTagline.style.opacity = '0';
    heroTagline.style.transform = 'translateY(10px)';
    heroTagline.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';

    requestAnimationFrame(() => {
      heroTagline.style.opacity = '1';
      heroTagline.style.transform = 'translateY(0)';
    });
  }

  // Hero name animation
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.transform = 'translateY(20px)';
    heroName.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';

    requestAnimationFrame(() => {
      heroName.style.opacity = '1';
      heroName.style.transform = 'translateY(0)';
    });
  }

  // Hero badge animation
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    heroBadge.style.opacity = '0';
    heroBadge.style.transform = 'translateY(10px)';
    heroBadge.style.transition = 'opacity 0.6s ease 0s, transform 0.6s ease 0s';

    requestAnimationFrame(() => {
      heroBadge.style.opacity = '1';
      heroBadge.style.transform = 'translateY(0)';
    });
  }

  // Hero actions animation
  const heroActions = document.querySelector('.hero-actions');
  if (heroActions) {
    heroActions.style.opacity = '0';
    heroActions.style.transform = 'translateY(10px)';
    heroActions.style.transition = 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s';

    requestAnimationFrame(() => {
      heroActions.style.opacity = '1';
      heroActions.style.transform = 'translateY(0)';
    });
  }

  // Hero stats animation
  if (heroStats) {
    heroStats.style.opacity = '0';
    heroStats.style.transform = 'translateY(10px)';
    heroStats.style.transition = 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s';

    requestAnimationFrame(() => {
      heroStats.style.opacity = '1';
      heroStats.style.transform = 'translateY(0)';
    });
  }

});


// ─────────────────────────────────────────────
// CERTIFICATE LIGHTBOX MODAL
// ─────────────────────────────────────────────
function openCertModal(imgSrc, caption) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImg');
  const modalCaption = document.getElementById('certModalCaption');

  modalImg.src = imgSrc;
  modalCaption.textContent = caption;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal(event) {
  const modal = document.getElementById('certModal');
  // Close if clicking the backdrop or the close button, not the image
  if (event.target === modal || event.target.closest('.cert-modal-close')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('certModal');
    if (modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});
