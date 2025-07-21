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
  const minLen = 120; // Make the string long enough to fill the track and more
  function getRandomSymbols(len) {
    let s = '';
    for (let i = 0; i < len; i++) {
      s += lcdSymbols[Math.floor(Math.random() * lcdSymbols.length)];
    }
    return s;
  }
  document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.scrolling-symbols-track');
    if (track) {
      // Fill with a long string and repeat only the first character for seamlessness
      let str = getRandomSymbols(minLen);
      // Repeat only the first character at the end for seamless scroll
      track.textContent = str + str[0];
    }
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  const moreInfoBtn = document.getElementById('moreInfoBtn');
  if (moreInfoBtn) {
    const symbols = ['✣', '✢', '✤', '✥', '✦', '✧', '★', '☆', '✪', '✫', '✬', '✭', '✮', '✯', '✰'];
    let symbolInterval;

    function changeSymbol() {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      moreInfoBtn.textContent = randomSymbol;
    }

    moreInfoBtn.addEventListener('mouseenter', () => {
      // Start changing symbol on hover
      if (!symbolInterval) {
        changeSymbol(); // Change immediately on first hover
        symbolInterval = setInterval(changeSymbol, 500);
      }
    });

    moreInfoBtn.addEventListener('mouseleave', () => {
      // Stop changing and reset to default when not hovering
      clearInterval(symbolInterval);
      symbolInterval = null;
      moreInfoBtn.textContent = '✣'; // Reset to default symbol
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const logoImg = document.querySelector('.logo');
  if (logoImg) {
    const symbols = ['✣', '✢', '✤', '✥', '✦', '✧', '★', '☆', '✪', '✫', '✬', '✭', '✮', '✯', '✰'];
    let logoInterval;
    function symbolToSVG(symbol) {
      // SVG with centered symbol, white background, gray symbol, large font
      return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><rect width='100%' height='100%' fill='white'/><text x='50%' y='50%' font-size='120' text-anchor='middle' dominant-baseline='central' fill='%23999' font-family='Space Grotesk,Arial,sans-serif'>${symbol}</text></svg>`;
    }
    function changeLogo() {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      logoImg.src = symbolToSVG(randomSymbol);
      logoImg.alt = randomSymbol;
    }
    function startLogoChange() {
      if (!logoInterval) {
        changeLogo();
        logoImg.classList.add('logo-blur');
        logoInterval = setInterval(changeLogo, 250);
      }
    }
    function stopLogoChange() {
      clearInterval(logoInterval);
      logoInterval = null;
      logoImg.classList.remove('logo-blur');
    }
    // Start changing on load
    startLogoChange();
    logoImg.addEventListener('mouseenter', stopLogoChange);
    logoImg.addEventListener('mouseleave', startLogoChange);
  }
});
