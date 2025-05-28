// Modal functionality
const modals = document.querySelectorAll('.modal-overlay');
const openButtons = document.querySelectorAll('.release-cover');
const closeButtons = document.querySelectorAll('.close-btn');

// Open modal when clicking release cover
openButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const modalId = e.target.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'flex';
  });
});

// Close modal when clicking X button
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-overlay');
    modal.style.display = 'none';
  });
});

// Close when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});
