// Batman Portfolio - True Centered Coverflow Carousel for Certificates

document.addEventListener('DOMContentLoaded', function () {
  const profileCard = document.getElementById('profile-card');
  const heroSection = document.querySelector('.hero');

  function checkProfileVisibility() {
    const rect = heroSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Start fading when hero is 1/3 off the top, fully hide when it's mostly off
    const fadeStart = windowHeight * 0.18;
    const fadeEnd = windowHeight * 0.45;
    if (rect.bottom < fadeStart) {
      if (rect.bottom > fadeEnd) {
        profileCard.classList.add('fading');
        profileCard.classList.remove('hide-on-scroll');
      } else {
        profileCard.classList.remove('fading');
        profileCard.classList.add('hide-on-scroll');
      }
    } else {
      profileCard.classList.remove('fading');
      profileCard.classList.remove('hide-on-scroll');
    }
  }

  window.addEventListener('scroll', checkProfileVisibility);
  checkProfileVisibility();

  // Carousel logic
  const slides = Array.from(document.querySelectorAll('.cert-slide'));
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
  let current = 1; // Start with the middle slide as active

  function updateCarousel() {
    // Always show three slides: left, center, right
    const n = slides.length;
    const leftIdx = (current - 1 + n) % n;
    const centerIdx = current;
    const rightIdx = (current + 1) % n;
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'side', 'hidden', 'left', 'right');
      slide.style.display = 'none';
      if (i === centerIdx) {
        slide.classList.add('active');
        slide.style.display = 'flex';
        slide.style.order = 2;
      } else if (i === leftIdx) {
        slide.classList.add('side', 'left');
        slide.style.display = 'flex';
        slide.style.order = 1;
      } else if (i === rightIdx) {
        slide.classList.add('side', 'right');
        slide.style.display = 'flex';
        slide.style.order = 3;
      } else {
        slide.classList.add('hidden');
        slide.style.display = 'none';
        slide.style.order = '';
      }
    });
  }

  leftBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  rightBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateCarousel();
  });

  // Initialize
  updateCarousel();
}); 