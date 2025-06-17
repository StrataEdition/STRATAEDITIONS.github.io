// Category switching
document.querySelectorAll('.category').forEach(category => {
  category.addEventListener('click', function() {
    // Remove active class from all categories
    document.querySelectorAll('.category').forEach(cat => {
      cat.classList.remove('active');
    });
    
    // Add active class to clicked category
    this.classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show target section
    const target = this.getAttribute('data-target');
    document.getElementById(target).classList.add('active');
  });
});

// Item detail toggling
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', function() {
    const detailId = 'detail-' + this.getAttribute('data-id');
    const detailView = document.getElementById(detailId);
    
    // Close all other detail views
    document.querySelectorAll('.detail-view').forEach(view => {
      if (view.id !== detailId) {
        view.classList.remove('active');
      }
    });
    
    // Toggle current detail view
    detailView.classList.toggle('active');
  });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("moreInfoBtn");
  const closeBtn = document.getElementById("closeModal");

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
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
    const thumbnails = carousel.parentElement.querySelectorAll('.thumbnail');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      
      slides[index].classList.add('active');
      thumbnails[index].classList.add('active');
      currentSlide = index;
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
      });

      nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
      });
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => showSlide(index));
    });
  });
}

// Initialize carousels when detail views are shown
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    setTimeout(initVideoCarousels, 100); // Small delay to ensure DOM is updated
  });
}); 


