// Streamlined Scroll Animations for Portfolio

document.addEventListener('DOMContentLoaded', function() {
  
  // SCROLL REVEAL ANIMATIONS
  const scrollRevealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, scrollRevealOptions);

  // PARALLAX SCROLLING EFFECTS
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;

    // Parallax for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      const speed = scrolled * (index % 2 === 0 ? -0.2 : -0.15);
      el.style.transform = `translateY(${speed}px) rotate(${scrolled * 0.02}deg)`;
    });

    // Parallax for decorative flower
    const flower = document.querySelector('.decorative-flower');
    if (flower) {
      flower.style.transform = `translateX(-50%) translateY(${scrolled * -0.1}px) rotate(${scrolled * 0.01}deg)`;
    }

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // STAGGER ANIMATIONS FOR SKILL CARDS
  function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      card.style.setProperty('--delay', `${index * 0.15}s`);
      scrollObserver.observe(card);
    });
  }

  // TEXT REVEAL ANIMATIONS
  function setupTextReveal() {
    const textElements = document.querySelectorAll('.hero-title, .section-title, .section-subtitle');
    textElements.forEach(el => {
      el.classList.add('text-reveal');
      scrollObserver.observe(el);
    });
  }

  // MAGICAL TEXT REVEAL FOR HERO SUBTITLE
  function magicalTextReveal() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.innerHTML = '';
    
    // Split text into spans
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'magic-word';
      wordSpan.style.animationDelay = `${wordIndex * 0.2}s`;
      
      word.split('').forEach((char, charIndex) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'magic-char';
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        charSpan.style.animationDelay = `${(wordIndex * 0.2) + (charIndex * 0.05)}s`;
        wordSpan.appendChild(charSpan);
      });
      
      subtitle.appendChild(wordSpan);
      if (wordIndex < words.length - 1) {
        subtitle.appendChild(document.createTextNode(' '));
      }
    });
    
    // Trigger animation after a short delay
    setTimeout(() => {
      subtitle.classList.add('magic-reveal');
    }, 800);
  }

  // COUNTER ANIMATION FOR SKILL PERCENTAGES
  function animateCounters() {
    const counters = document.querySelectorAll('.skill-percent');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent);
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + '%';
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + '%';
            }
          }, 16);
          
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // SCROLL PROGRESS INDICATOR
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
      const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBarFill.style.width = scrolled + '%';
    });
  }

  // CUSTOM CURSOR EFFECTS (Desktop Only)
  function createCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateCursor() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .card, .skill-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
      });
    });
  }

  // SCROLL-TRIGGERED PARTICLES
  function createScrollParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'scroll-particles';
    document.body.appendChild(particleContainer);
    
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      if (scrollDelta > 5) {
        for (let i = 0; i < 2; i++) {
          createScrollParticle(particleContainer);
        }
      }
      
      lastScrollY = currentScrollY;
    });
  }
  
  function createScrollParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'scroll-particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1500);
  }

  // SECTION TRANSITIONS
  function setupSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
          
          // Animate children elements
          const children = entry.target.querySelectorAll('.skill-card, .contact-info, .contact-form');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('reveal');
            }, index * 100);
          });
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // INITIALIZE ALL ANIMATIONS
  function initializeAnimations() {
    // Core animations
    setupTextReveal();
    animateSkillCards();
    animateCounters();
    setupSectionTransitions();
    createScrollProgress();
    
    // Desktop-only effects
    if (window.innerWidth > 768) {
      createCustomCursor();
      createScrollParticles();
    }
    
    // Delayed magical reveal
    setTimeout(magicalTextReveal, 1200);
    
    // Parallax (with reduced motion check)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', requestParallaxUpdate);
    }
  }

  // Start animations
  initializeAnimations();

});