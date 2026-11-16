// HOME SECTION - Hero section animations and interactions

document.addEventListener('DOMContentLoaded', function() {
  initProfileImageHover();
  initFloatingElements();
});

// Initialize profile image hover effect
function initProfileImageHover() {
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
      profileImg.style.transform = 'scale(1.05) rotate(5deg)';
    });
    profileImg.addEventListener('mouseleave', () => {
      profileImg.style.transform = 'scale(1) rotate(0)';
    });
  }
}

// Initialize floating elements animation
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((el, index) => {
    // Set random initial positions and animations
    const delay = index * 0.5;
    const duration = 10 + Math.random() * 10;
    const distance = 20 + Math.random() * 30;
    
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    el.style.setProperty('--float-distance', `${distance}px`);
  });
}