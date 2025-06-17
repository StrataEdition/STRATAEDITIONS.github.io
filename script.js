// Modal functionality
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Hide all sections
      document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
      });
      
      // Show the target section
      targetSection.style.display = 'block';
      
      // Hide all detail views
      document.querySelectorAll('.detail-view').forEach(view => {
        view.style.display = 'none';
      });
    }
  });
});

// Detail view functionality
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const detailId = item.getAttribute('data-id');
    const detailView = document.getElementById(`detail-${detailId}`);
    
    if (detailView) {
      // Hide all detail views
      document.querySelectorAll('.detail-view').forEach(view => {
        view.style.display = 'none';
      });
      
      // Show the selected detail view
      detailView.style.display = 'block';
      
      // Initialize carousel if present
      setTimeout(initVideoCarousels, 100);
    }
  });
});

// Video Carousel Functionality
function initVideoCarousels() {
  const carousels = document.querySelectorAll('.video-carousel');
  
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.video-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      currentSlide = index;
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
      });
    }
  });
}

// Close detail view when clicking outside
document.addEventListener('click', (e) => {
  const detailViews = document.querySelectorAll('.detail-view');
  const items = document.querySelectorAll('.item');
  
  let clickedInsideDetail = false;
  let clickedInsideItem = false;
  
  detailViews.forEach(view => {
    if (view.contains(e.target)) {
      clickedInsideDetail = true;
    }
  });
  
  items.forEach(item => {
    if (item.contains(e.target)) {
      clickedInsideItem = true;
    }
  });
  
  if (!clickedInsideDetail && !clickedInsideItem) {
    detailViews.forEach(view => {
      view.style.display = 'none';
    });
  }
}); 
