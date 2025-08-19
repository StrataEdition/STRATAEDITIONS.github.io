document.addEventListener('DOMContentLoaded', function () {

  // --- Elements ---
  const sections = document.querySelectorAll('.section');
  const categories = document.querySelectorAll('.category');
  const items = document.querySelectorAll('.item');
  const artistsDrawer = document.querySelector('.artists-drawer');
  const contactButton = document.querySelector('#contactButton');
  const logo = document.querySelector('.logo');

  // --- 1. Category Switching ---
  // This handles clicking on LABEL, SHOWS, ARTISTS to show the correct content.
  // The blur effect is handled entirely by the CSS.
  if (categories.length && sections.length) {
    categories.forEach(category => {
      category.addEventListener('click', function () {
        // Set active class on titles
        categories.forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');

        // Show the correct content section by toggling the .active class
        const targetId = this.getAttribute('data-target');
        sections.forEach(section => {
          if (section.id === targetId) {
            section.classList.add('active');
          } else {
            section.classList.remove('active');
          }
        });

        // Close any open detail views when switching categories
        document.querySelectorAll('.detail-view.active').forEach(view => {
          view.classList.remove('active');
        });
      });
    });
  }

  // --- 2. Item Detail Toggling (for SHOWS) ---
  // This handles expanding the details for a show.
  if (items.length) {
    items.forEach(item => {
      // Make sure we don't interfere with links inside items (like artist links)
      if (item.tagName.toLowerCase() !== 'a') {
        item.addEventListener('click', function() {
          const detailId = 'detail-' + this.getAttribute('data-id');
          const detailView = document.getElementById(detailId);
          if (!detailView) return;

          // Close all other detail views
          document.querySelectorAll('.detail-view').forEach(view => {
            if (view.id !== detailId) {
              view.classList.remove('active');
            }
          });
          
          // Toggle current detail view
          detailView.classList.toggle('active');
        });
      }
    });
  }

  // --- 3. GSAP Blur Effect for Listings ---
  // This adds the smooth blur when hovering over any list item.
  if (items.length && window.gsap) {
    items.forEach(item => {
      const itemContent = item.querySelector('.item-content');
      if (!itemContent) return;

      const timeline = gsap.timeline({ paused: true });
      timeline.to(itemContent, {
        filter: 'blur(1px)',
        duration: 0.2,
        ease: 'power2.out'
      });

      item.addEventListener('mouseenter', () => timeline.play());
      item.addEventListener('mouseleave', () => timeline.reverse());
    });
  }

  // --- 4. Artists Drawer Toggle (Bottom Panel) ---
  if (artistsDrawer && contactButton) {
    contactButton.addEventListener('click', function () {
      const isOpen = artistsDrawer.classList.toggle('open');
      const toggleSymbol = contactButton.querySelector('.artists-toggle');
      if (toggleSymbol) {
        toggleSymbol.textContent = isOpen ? ' ▼' : ' ▲';
      }
    });
  }

  // --- 5. Splash Screen & Entry Animation ---
  if (logo && window.gsap) {
    document.body.classList.add('intro');
    const contentEls = [
        document.querySelector('.bottom-container'), 
        document.querySelector('.sections-container'), 
        document.querySelector('.categories'),
        document.querySelector('.artists-drawer')
    ].filter(el => el);
    
    gsap.set(contentEls, { autoAlpha: 0 });

    function enterSite() {
      logo.removeEventListener('click', enterSite);
      logo.style.cursor = 'default';
      
      // Get starting position
      const startRect = logo.getBoundingClientRect();
      const startTop = startRect.top;
      
      // Calculate a more moderate upward movement
      // This uses 20% of viewport height instead of 40%
      const upwardDistance = Math.min(window.innerHeight * 0.323, startTop);
      
      // Make sure we don't go higher than ~120px from the top of the viewport
      // This should be close to where the final logo position will be
      
      // Animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      
      // Animate logo to shrink and move up a moderate amount
      tl.to(logo, {
        maxWidth: 180,
        y: -upwardDistance, 
        duration: 1.1
      });
      
      // Switch to entered state and fade in content
      tl.add(() => {
        document.body.classList.remove('intro');
        document.body.classList.add('entered');
        // Clear all inline transforms to let CSS take over
        gsap.set(logo, { clearProps: "all" });
        
        // NEW CODE: Apply blur to all category titles except the active one
        // This runs after the entry animation completes
        document.querySelectorAll('.category').forEach(category => {
          if (!category.classList.contains('active')) {
            gsap.to(category, {
              filter: "blur(3px)",
              color: "#888",
              duration: 0.2,
              ease: "power2.out"
            });
          } else {
            // Make sure active category (Label) is sharp
            gsap.to(category, {
              filter: "none",
              color: "#111",
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      });
      
      // Fade in content
      tl.to(contentEls, { 
        autoAlpha: 1, 
        duration: 0.4,
        stagger: 0.05, 
        ease: 'power3.out' 
      });
    }

    logo.style.cursor = 'pointer';
    logo.addEventListener('click', enterSite);
  }

  // CATEGORY ACTIVE: only selected is black and sharp, others grey and blurred
  document.querySelectorAll('.category').forEach(cat => {
    cat.addEventListener('mouseenter', function() {
      // Unblur hovered if not active
      if (!cat.classList.contains('active')) {
        gsap.to(cat, { 
          filter: "none", 
          color: "#bbb",  // Lighter gray when hovered (not blurred)
          duration: 0.18, 
          ease: "power2.out" 
        });
      }
      
      // Blur and darken others (not hovered, not active)
      document.querySelectorAll('.category').forEach(other => {
        if (other !== cat && !other.classList.contains('active')) {
          gsap.to(other, { 
            filter: "blur(3px)", 
            color: "#666",  // Darker gray when blurred - changed from #888
            duration: 0.18, 
            ease: "power2.out" 
          });
        }
      });
    });
    
    cat.addEventListener('mouseleave', function() {
      // Restore blur if not active
      if (!cat.classList.contains('active')) {
        gsap.to(cat, { 
          filter: "blur(3px)", 
          color: "#888",  // Regular gray when not hovered
          duration: 0.18, 
          ease: "power2.out" 
        });
      }
      
      // Restore all others
      document.querySelectorAll('.category').forEach(other => {
        if (!other.classList.contains('active')) {
          gsap.to(other, { 
            color: "#888", 
            filter: "blur(3px)", 
            duration: 0.18, 
            ease: "power2.out" 
          });
        } else {
          gsap.to(other, { 
            color: "#111", 
            filter: "none", 
            duration: 0.18, 
            ease: "power2.out" 
          });
        }
      });
    });
  });
});

// Add this to ensure categories start blurred even if the page is refreshed
// or the animation is skipped
document.addEventListener('DOMContentLoaded', function() {
  // Make sure this runs after any initial category is set as active
  setTimeout(() => {
    if (document.body.classList.contains('entered')) {
      document.querySelectorAll('.category').forEach(category => {
        if (!category.classList.contains('active')) {
          gsap.to(category, {
            filter: "blur(3px)",
            color: "#888",
            duration: 0
          });
        } else {
          gsap.to(category, {
            filter: "none",
            color: "#111",
            duration: 0
          });
        }
      });
    }
  }, 100);
});
