// Modal functionality for BOTH buttons
document.addEventListener('DOMContentLoaded', function() {
  // More Info Button
  const moreInfoBtn = document.getElementById('moreInfoBtn');
  const moreInfoModal = document.getElementById('modal');
  const closeBtns = document.querySelectorAll('.close-btn');

  // Release Cover Modals
  const releaseCovers = document.querySelectorAll('.release-cover');
  
  // Open More Info Modal
  moreInfoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moreInfoModal.style.display = 'flex';
  });

  // Open Release Card Modals
  releaseCovers.forEach(cover => {
    cover.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'flex';
    });
  });

  // Close Any Modal
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal-overlay').style.display = 'none';
    });
  });

  // Close When Clicking Outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.style.display = 'none';
    }
  });
});
