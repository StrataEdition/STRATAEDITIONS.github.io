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
