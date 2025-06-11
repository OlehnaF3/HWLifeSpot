
    const buttonLeft = document.querySelector('.button_left');
    const buttonRight = document.querySelector('.button_right');
    const carousel = document.querySelector('.carousel-track');
    const slides = Array.from(carousel.children);
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = 0;
    let slideWidth = carousel.getBoundingClientRect().width;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentPointerId = null;

  // Create indicators dynamically
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('indicator');
    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    indicator.tabIndex = index === 0 ? 0 : -1;
    indicator.addEventListener('click', () => {
        moveToSlide(index);
    });
    indicatorsContainer.appendChild(indicator);
  });

  buttonRight.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
  });

  buttonLeft.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
  });

  buttonRight.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
    moveToSlide(currentIndex + 1);
    }
  });

  buttonLeft.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
    moveToSlide(currentIndex - 1);
    }
  });

    function pointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    isDragging = true;
    carousel.classList.add('dragging');
    startPos = event.clientX;
    currentPointerId = event.pointerId;
    prevTranslate = currentTranslate;
    carousel.style.transition = 'none';
    event.preventDefault();
    window.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);
    window.addEventListener('pointercancel', pointerUp);
  }

    function pointerMove(event) {
    if (!isDragging || event.pointerId !== currentPointerId) return;
    const currentPosition = event.clientX;
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    const maxTranslate = 0;
    const minTranslate = -slideWidth * (slides.length - 1);
    // Allow small resistance near edges
    currentTranslate = Math.max(Math.min(currentTranslate, maxTranslate + 50), minTranslate - 50);
    carousel.style.transform = `translateX(${currentTranslate}px)`;
  }

    function pointerUp(event) {
    if (!isDragging || event.pointerId !== currentPointerId) return;
    isDragging = false;
    carousel.classList.remove('dragging');
    const movedBy = currentTranslate - (-slideWidth * currentIndex);
    if (movedBy < -slideWidth / 4 && currentIndex < slides.length - 1) {
        currentIndex++;
    } else if (movedBy > slideWidth / 4 && currentIndex > 0) {
        currentIndex--;
    }
    currentTranslate = -slideWidth * currentIndex;
    updateSlidePosition();
    window.removeEventListener('pointermove', pointerMove);
    window.removeEventListener('pointerup', pointerUp);
    window.removeEventListener('pointercancel', pointerUp);
  }

    function moveToSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    currentTranslate = -slideWidth * currentIndex;
    updateSlidePosition();
  }

    function updateSlidePosition() {
        carousel.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
    slide.tabIndex = isActive ? 0 : -1;
    slide.setAttribute('aria-hidden', !isActive);
    });
    updateIndicators();
  }

    function updateIndicators() {
    const indicators = indicatorsContainer.children;
    Array.from(indicators).forEach((indicator, index) => {
      const isActive = index === currentIndex;
    indicator.classList.toggle('active', isActive);
    indicator.setAttribute('aria-selected', isActive ? 'true' : 'false');
    indicator.tabIndex = isActive ? 0 : -1;
    });
  }

  // Update slideWidth on window resize
  window.addEventListener('resize', () => {
        slideWidth = carousel.getBoundingClientRect().width;
    currentTranslate = -slideWidth * currentIndex;
    updateSlidePosition();
  });

    // Attach pointerdown events on carousel track and slides for dragging
    carousel.addEventListener('pointerdown', pointerDown);
  slides.forEach(slide => {
        slide.addEventListener('pointerdown', pointerDown);
    const img = slide.querySelector('img');
    if (img) {
        img.addEventListener('dragstart', e => e.preventDefault());
    }
  });

    // Initialize
    updateSlidePosition();