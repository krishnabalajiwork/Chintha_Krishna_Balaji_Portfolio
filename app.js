// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Mobile Navigation Toggle
  // =========================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // =====================================
  // Smooth Scrolling for Navigation Links
  // =====================================
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    });
  });

  // =====================================
  // Active Navigation Link Highlighting
  // =====================================
  const sections = document.querySelectorAll('section[id]');
  const navLinksForHighlight = document.querySelectorAll('.nav__link');

  function highlightActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksForHighlight.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink(); // Initial call

  // ====================
  // Scroll Animations
  // ====================
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.experience__card, .project__card, .certification__card, .skill__category, .reveal'
  );
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // =========================
  // Contact Form Handling
  // =========================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');

    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      // Clear previous error states
      clearErrors();

      // Validate form
      let isValid = true;

      if (!nameEl.value.trim()) {
        showError(nameEl, 'Name is required');
        isValid = false;
      }

      if (!emailEl.value.trim()) {
        showError(emailEl, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailEl.value)) {
        showError(emailEl, 'Please enter a valid email address');
        isValid = false;
      }

      if (!messageEl.value.trim()) {
        showError(messageEl, 'Message is required');
        isValid = false;
      } else if (messageEl.value.trim().length < 10) {
        showError(messageEl, 'Message must be at least 10 characters long');
        isValid = false;
      }

      if (!isValid) return;

      // Show success state
      [nameEl, emailEl, messageEl].forEach(i => i.classList.add('success'));

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
      }

      setTimeout(() => {
        if (submitButton) submitButton.textContent = 'Message Sent!';
        setTimeout(() => {
          if (submitButton) {
            submitButton.textContent = originalText || 'Send';
            submitButton.disabled = false;
          }
          contactForm.reset();
          clearErrors();
        }, 1200);
      }, 600);

      // Create mailto link as fallback
      const subject = encodeURIComponent('Contact from Portfolio Website');
      const body = encodeURIComponent(
        `Name: ${nameEl.value}\nEmail: ${emailEl.value}\n\nMessage:\n${messageEl.value}`
      );
      const mailtoLink = `mailto:krishnabalajiwork@gmail.com?subject=${subject}&body=${body}`;

      // Open email client after a short delay
      setTimeout(() => {
        window.open(mailtoLink);
      }, 500);
    });

    // Form Validation Helper Functions
    function showError(input, message) {
      input.classList.add('error');
      input.classList.remove('success');
      let errorDiv = input.parentNode.querySelector('.error-message');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentNode.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    }

    function clearErrors() {
      const inputs = contactForm.querySelectorAll('.form-control');
      const errorMessages = contactForm.querySelectorAll('.error-message');
      inputs.forEach(input => input.classList.remove('error', 'success'));
      errorMessages.forEach(err => err.classList.remove('show'));
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }

  // =================================
  // Header Background on Scroll
  // =================================
  const header = document.querySelector('.header');
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255,255,255,0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'var(--color-surface)';
      header.style.backdropFilter = 'blur(10px)';
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial call

  // ============================================
  // Typing Animation for Hero Title (Optional)
  // ============================================
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // ============================================
  // Project Cards Hover Effects Enhancement
  // ============================================
  const projectCards = document.querySelectorAll('.project__card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(-4px)';
    });
  });

  // ===============================
  // Skills Animation on Scroll
  // ===============================
  const skillItems = document.querySelectorAll('.skill__item');
  const skillsObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 50);
        }
      });
    },
    { threshold: 0.5 }
  );
  skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    skillsObserver.observe(item);
  });

  // ==================================
  // Experience Timeline Animation
  // ==================================
  const experienceItems = document.querySelectorAll('.experience__item');
  const experienceObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    },
    { threshold: 0.3 }
  );
  experienceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    experienceObserver.observe(item);
  });

  // =========================================
  // Certification Cards Stagger Animation
  // =========================================
  const certificationCards = document.querySelectorAll('.certification__card');
  const certificationObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, index * 100);
        }
      });
    },
    { threshold: 0.2 }
  );
  certificationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    certificationObserver.observe(card);
  });

  // ===============================
  // Scroll to Top Functionality
  // ===============================
  const scrollTopButton = document.createElement('button');
  scrollTopButton.innerHTML = '↑';
  scrollTopButton.className = 'scroll-top-btn';
  scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--color-primary);
    color: var(--color-btn-primary-text);
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-md);
  `;
  document.body.appendChild(scrollTopButton);

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function toggleScrollTopBtn() {
    if (window.scrollY > 300) {
      scrollTopButton.style.opacity = '1';
      scrollTopButton.style.visibility = 'visible';
    } else {
      scrollTopButton.style.opacity = '0';
      scrollTopButton.style.visibility = 'hidden';
    }
  }
  window.addEventListener('scroll', toggleScrollTopBtn);
  toggleScrollTopBtn();

  // ===========================================
  // Performance optimization: Debounce scroll
  // ===========================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedHeaderScroll = debounce(handleHeaderScroll, 10);
  const debouncedActiveLink = debounce(highlightActiveLink, 10);

  window.removeEventListener('scroll', handleHeaderScroll);
  window.removeEventListener('scroll', highlightActiveLink);
  window.addEventListener('scroll', debouncedHeaderScroll);
  window.addEventListener('scroll', debouncedActiveLink);

  // ============================
  // Loading state management
  // ============================
  document.body.classList.add('loaded');

  const loadingCSS = document.createElement('style');
  loadingCSS.textContent = `
    body:not(.loaded) { overflow: hidden; }
    body:not(.loaded) .hero { opacity: 0; }
    body.loaded .hero { opacity: 1; transition: opacity 0.5s ease; }
  `;
  document.head.appendChild(loadingCSS);
});

// =======================================
// External Link Tracking (Optional)
// =======================================
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="http"]');
  if (link && link.getAttribute('target') === '_blank') {
    // Placeholder for analytics if needed
  }
});

// =======================================
// Keyboard Navigation Enhancement
// =======================================
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// ============================
// Print Styles Enhancement
// ============================
window.addEventListener('beforeprint', function () {
  document.body.classList.add('printing');
});
window.addEventListener('afterprint', function () {
  document.body.classList.remove('printing');
});

// ===============================
// Theme Detection and Handling
// ===============================
function applyColorScheme() {
  try {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-color-scheme', prefersDark ? 'dark' : 'light');
  } catch (_) {
    document.documentElement.setAttribute('data-color-scheme', 'light');
  }
}
applyColorScheme();
try {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyColorScheme);
} catch (_) {
  // Older browsers
}

// ==============================
// Error Handling for Window
// ==============================
window.addEventListener('error', function () {
  // Silenced by default; add console.warn if debugging
});

// =======================================
// Service Worker Registration (placeholder)
// =======================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // Placeholder for future PWA features
  });
}
