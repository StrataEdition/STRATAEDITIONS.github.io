// Category switching
document.addEventListener('DOMContentLoaded', function () {
  // Hide all sections initially
  var sections = document.querySelectorAll('.section');
  sections.forEach(function (section) {
    section.classList.remove('active');
  });

  // Navigation click handler
  var categories = document.querySelectorAll('.category');
  categories.forEach(function (cat) {
    cat.addEventListener('click', function () {
      // Remove active from all
      categories.forEach(function (c) { c.classList.remove('active'); });
      sections.forEach(function (section) { section.classList.remove('active'); });
      // Add active to clicked
      cat.classList.add('active');
      var target = cat.getAttribute('data-target');
      var section = document.getElementById(target);
      if (section) {
        section.classList.add('active');
      }
    });
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

// Scrolling symbols effect
(function() {
  // LCD-like symbols
  const lcdSymbols = ['✶','✷','✸','✹','✺','✻','✼','✽','✾','❂','•','◦','⁂','⁑','⁕','*','+','~','^','°','·',' '];
  const lcdWord = '<span class="lcd-strata">STRATA</span>';
  const repeatCount = 8; // How many times to repeat the pattern
  function buildLCDString() {
    let s = '';
    for (let i = 0; i < repeatCount; i++) {
      s += lcdWord;
      s += lcdSymbols[Math.floor(Math.random() * (lcdSymbols.length))];
    }
    return s;
  }
  document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.scrolling-symbols-track');
    if (track) {
      // Fill with enough pattern to scroll smoothly and repeat
      const str = buildLCDString();
      // Repeat to ensure seamless scroll
      track.innerHTML = str + str;
    }
  });
})();
