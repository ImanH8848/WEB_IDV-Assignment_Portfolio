// PROJECT CAROUSEL FUNCTIONALITY

  const cards = document.querySelectorAll('.card');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const navDots = document.getElementById('navDots');

  if (cards.length > 0 && modal && navDots) {
    let current = 0;
    let autoSlide;
    let isTransitioning = false;

    function setCarousel() {
      if (isTransitioning) return;
      
      isTransitioning = true;
      
      requestAnimationFrame(() => {
        cards.forEach((card, i) => {
          const offset = i - current;
          card.style.zIndex = -Math.abs(offset);

          let transform = "";
          if (offset === 0) {
            card.classList.add('active');
            card.classList.remove('visible');
            transform = "translateX(0) scale(1)";
          } else if (Math.abs(offset) === 1) {
            card.classList.add('visible');
            card.classList.remove('active');
            transform = `translateX(${offset * 50}%) scale(0.85)`;
          } else {
            card.classList.remove('active');
            card.classList.remove('visible');
            transform = `translateX(${offset * 50}%) scale(0.75)`;
          }
          card.style.transform = transform;
        });
        updateDots();
        
        // Reset transition flag after animation
        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      });
    }

    function nextSlide() {
      if (isTransitioning) return;
      current = (current + 1) % cards.length;
      setCarousel();
    }

    function goToSlide(index) {
      if (isTransitioning || current === index) return;
      current = index;
      setCarousel();
    }

    function startAutoSlide() {
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    function createDots() {
      navDots.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        navDots.appendChild(dot);
      });
    }

    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    // Initialize carousel
    createDots();
    setCarousel();
    startAutoSlide();

    // Hover interactions
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
      carouselTrack.addEventListener('mouseenter', stopAutoSlide);
      carouselTrack.addEventListener('mouseleave', startAutoSlide);
    }

    // Enhanced Modal functionality with action buttons and images
    function createActionButton(text, url, className, icon) {
      const button = document.createElement('a');
      button.href = url;
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      button.className = `action-btn ${className}`;
      button.innerHTML = `${icon}<span>${text}</span>`;
      return button;
    }

    function getGitHubIcon() {
      return `<svg class="action-btn-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.9,2.1c-4.6,0.5 -8.3,4.2 -8.8,8.7c-0.5,4.7 2.2,8.9 6.3,10.5c0.3,0.1 0.6,-0.1 0.6,-0.5v-1.6c0,0 -0.4,0.1 -0.9,0.1c-1.4,0 -2,-1.2 -2.1,-1.9c-0.1,-0.4 -0.3,-0.7 -0.6,-1c-0.3,-0.1 -0.4,-0.1 -0.4,-0.2c0,-0.2 0.3,-0.2 0.4,-0.2c0.6,0 1.1,0.7 1.3,1c0.5,0.8 1.1,1 1.4,1c0.4,0 0.7,-0.1 0.9,-0.2c0.1,-0.7 0.4,-1.4 1,-1.8c-2.3,-0.5 -4,-1.8 -4,-4c0,-1.1 0.5,-2.2 1.2,-3c-0.1,-0.2 -0.2,-0.7 -0.2,-1.4c0,-0.4 0,-1 0.3,-1.6c0,0 1.4,0 2.8,1.3c0.5,-0.2 1.2,-0.3 1.9,-0.3c0.7,0 1.4,0.1 2,0.3c1.3,-1.3 2.8,-1.3 2.8,-1.3c0.2,0.6 0.2,1.2 0.2,1.6c0,0.8 -0.1,1.2 -0.2,1.4c0.7,0.8 1.2,1.8 1.2,3c0,2.2 -1.7,3.5 -4,4c0.6,0.5 1,1.4 1,2.3v2.6c0,0.3 0.3,0.6 0.7,0.5c3.7,-1.5 6.3,-5.1 6.3,-9.3c0,-6 -5.1,-10.7 -11.1,-10z"/>
      </svg>`;
    }

    function getDemoIcon() {
      return `<svg class="action-btn-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,4c0,0 -6.25445,-0.00003 -7.81445,0.41797c-0.861,0.23 -1.53758,0.90758 -1.76758,1.76758c-0.418,1.56 -0.41797,5.81445 -0.41797,5.81445c0,0 -0.00003,4.25445 0.41797,5.81445c0.23,0.861 0.90758,1.53758 1.76758,1.76758c1.56,0.418 7.81445,0.41797 7.81445,0.41797c0,0 6.25445,0.00003 7.81445,-0.41797c0.86,-0.23 1.53758,-0.90758 1.76758,-1.76758c0.418,-1.56 0.41797,-5.81445 0.41797,-5.81445c0,0 0.00003,-4.25445 -0.41797,-5.81445c-0.23,-0.86 -0.90758,-1.53758 -1.76758,-1.76758c-1.56,-0.418 -7.81445,-0.41797 -7.81445,-0.41797zM12,6c2.882,0 6.49087,0.13361 7.29688,0.34961c0.169,0.045 0.30752,0.18352 0.35352,0.35352c0.241,0.898 0.34961,3.63888 0.34961,5.29688c0,1.658 -0.10861,4.39787 -0.34961,5.29688c-0.045,0.169 -0.18352,0.30752 -0.35352,0.35352c-0.805,0.216 -4.41488,0.34961 -7.29687,0.34961c-2.881,0 -6.48987,-0.13361 -7.29687,-0.34961c-0.169,-0.045 -0.30752,-0.18352 -0.35352,-0.35352c-0.241,-0.898 -0.34961,-3.63888 -0.34961,-5.29687c0,-1.658 0.10861,-4.39883 0.34961,-5.29883c0.045,-0.168 0.18352,-0.30656 0.35352,-0.35156c0.805,-0.216 4.41488,-0.34961 7.29688,-0.34961zM10,8.53516v6.92969l6,-3.46484z"/>
      </svg>`;
    }

    function getLinkedInIcon() {
      return `<svg class="action-btn-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`;
    }

    function getWebsiteIcon() {
      return `<svg class="action-btn-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>`;
    }

    function openModal(title, description, techStack = [], githubUrl = null, demoUrl = null, linkedinUrl = null, websiteUrl = null, imageUrl = null) {
      const modal = document.getElementById('modal');
      const modalTitle = document.getElementById('modalTitle');
      const modalDesc = document.getElementById('modalDesc');
      const techStackEl = document.getElementById('techStack');
      const modalActions = document.getElementById('modalActions');
      
      if (!modal || !modalTitle || !modalDesc) {
        console.error('Modal elements not found');
        return;
      }
      
      // Set title and description
      modalTitle.textContent = title;
      modalDesc.textContent = description;
      
      // Clear and populate tech stack
      if (techStackEl) {
        techStackEl.innerHTML = '';
        if (techStack && techStack.length > 0) {
          techStack.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techStackEl.appendChild(techTag);
          });
        }
      }
      
      // Clear and populate action buttons and image
      if (modalActions) {
        modalActions.innerHTML = '';
        
        // Add image if provided
        if (imageUrl) {
          const imageContainer = document.createElement('div');
          imageContainer.className = 'modal-image-container';
          
          const image = document.createElement('img');
          image.src = imageUrl;
          image.alt = title + ' preview';
          image.className = 'modal-image';

          // Add error handling for missing images
          image.onerror = function() {
            imageContainer.style.display = 'none';
          };

          imageContainer.appendChild(image);
          modalActions.appendChild(imageContainer);
        }
        
        // Create buttons based on available URLs
        if (githubUrl) {
          modalActions.appendChild(createActionButton('View Code', githubUrl, 'github-btn', getGitHubIcon()));
        }
        
        if (demoUrl) {
          modalActions.appendChild(createActionButton('Live Demo', demoUrl, 'demo-btn', getDemoIcon()));
        }
        
        if (linkedinUrl) {
          modalActions.appendChild(createActionButton('LinkedIn', linkedinUrl, 'linkedin-btn', getLinkedInIcon()));
        }
        
        if (websiteUrl) {
          modalActions.appendChild(createActionButton('Website', websiteUrl, 'website-btn', getWebsiteIcon()));
        }
      }
      
      modal.style.display = "flex";
      stopAutoSlide();
    }

    // Modal functionality - Fixed click handler
    cards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Only open modal if this is the active card
        if (card.classList.contains('active')) {
          const title = card.dataset.title || card.querySelector('.card-title')?.textContent || 'Project';
          const description = card.dataset.description || card.querySelector('.card-description')?.textContent || 'No description available';
          const techStack = card.dataset.tech ? JSON.parse(card.dataset.tech) : [];
          const githubUrl = card.dataset.github || null;
          const demoUrl = card.dataset.demo || null;
          const linkedinUrl = card.dataset.linkedin || null;
          const websiteUrl = card.dataset.website || null;
          const imageUrl = card.dataset.image || null;
          
          openModal(title, description, techStack, githubUrl, demoUrl, linkedinUrl, websiteUrl, imageUrl);
        } else {
          // If not active, make it active
          const cardIndex = Array.from(cards).indexOf(card);
          goToSlide(cardIndex);
        }
      });
    });

    // Close modal function - make it global
    window.closeModal = function() {
      if (modal) {
        modal.style.display = "none";
        startAutoSlide();
      }
    }

    // Close modal when clicking outside
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (modal.style.display !== 'flex') {
          nextSlide();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (modal.style.display !== 'flex') {
          current = (current - 1 + cards.length) % cards.length;
          setCarousel();
        }
      } else if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      } else if (e.key === 'Enter' || e.key === ' ') {
        const activeCard = document.querySelector('.card.active');
        if (activeCard && modal.style.display !== 'flex') {
          e.preventDefault();
          activeCard.click();
        }
      }
    });
  }