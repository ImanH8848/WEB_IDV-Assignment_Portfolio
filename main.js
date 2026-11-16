// Main DOMContentLoaded event listener

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a, .btn');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Back to Top Button Functionality
  const backToTopBtn = document.getElementById('backToTop');
  let scrollTimeout;

  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  function handleScroll() {
    toggleBackToTop();
    
    // Add scrolling class for animation
    backToTopBtn.classList.add('scrolling');
    
    // Remove scrolling class after scroll ends
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      backToTopBtn.classList.remove('scrolling');
    }, 150);
  }

  window.addEventListener('scroll', handleScroll);
  toggleBackToTop(); // Check initial state

  // Update navigation active state based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - sectionHeight * 0.25) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Call once on load

  // ENHANCED CONTACT FORM FUNCTIONALITY
  // Initialize the enhanced form validator
  const formValidator = new FormValidator('contact-form');
  
  // Add character counter for message field
  const messageField = document.getElementById('message');
  if (messageField) {
    addCharacterCounter(messageField, 2000);
  }

  // SCROLL ANIMATIONS
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.skill-card, .contact-info, .contact-form');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // NAVBAR BACKGROUND ON SCROLL
  const nav = document.querySelector('.nav');
  
  function updateNavBackground() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(0, 0, 0, 0.8)';
      nav.style.backdropFilter = 'blur(20px)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.05)';
      nav.style.backdropFilter = 'blur(20px)';
    }
  }

  window.addEventListener('scroll', updateNavBackground);
  updateNavBackground(); // Call once on load

  // MOBILE MENU TOGGLE (if you want to add mobile menu later)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinksContainer) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });
  }

  // LOADING ANIMATION
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // PARTICLE INTERACTION (Optional enhancement)
  const particles = document.querySelectorAll('.particle');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    particles.forEach((particle, index) => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width / 2;
      const particleY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
      );
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
        const moveX = Math.cos(angle) * force * 20;
        const moveY = Math.sin(angle) * force * 20;
        
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        particle.style.opacity = Math.min(1, 0.7 + force * 0.3);
      } else {
        particle.style.transform = 'translate(0px, 0px)';
        particle.style.opacity = '';
      }
    });
  });

  // PERFORMANCE OPTIMIZATION
  let ticking = false;
  
  function updateScrollEffects() {
    updateNavBackground();
    updateActiveNav();
    ticking = false;
  }
  
  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  // Replace individual scroll listeners with optimized version
  window.removeEventListener('scroll', updateNavBackground);
  window.removeEventListener('scroll', updateActiveNav);
  window.addEventListener('scroll', requestScrollUpdate);

  // PRELOAD IMAGES
  const imageUrls = [
    'me1.jpg',
    'Untitled design (8).png',
    '13.png',
    '14.jpg',
    'download 10.jpg',
    'download (9).jpg',
    'framer.png',
    'html.png',
    'css.png',
    'javascript.png',
    'java.png',
    'python.png',
    'sql.png',
    'blender.png'
  ];

  function preloadImages() {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  preloadImages();

  // LAZY LOADING FOR IMAGES
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ERROR HANDLING FOR MISSING IMAGES
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.warn(`Failed to load image: ${this.src}`);
    });
  });

  // ACCESSIBILITY ENHANCEMENTS
  // Skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#home';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1001;
    border-radius: 4px;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Announce page changes for screen readers
  function announcePageChange(sectionName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    announcement.textContent = `Now viewing ${sectionName} section`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Update the navigation active state function to include announcements
  const originalUpdateActiveNav = updateActiveNav;
  updateActiveNav = function() {
    const previousActive = document.querySelector('.nav-links a.active');
    originalUpdateActiveNav();
    const currentActive = document.querySelector('.nav-links a.active');
    
    if (currentActive && currentActive !== previousActive) {
      const sectionName = currentActive.textContent;
      announcePageChange(sectionName);
    }
  };
});