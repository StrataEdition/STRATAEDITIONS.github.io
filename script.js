// Category switching
document.addEventListener('DOMContentLoaded', function () {
  // Always show label section as active on load
  var sections = document.querySelectorAll('.section');
  var categories = document.querySelectorAll('.category');
  sections.forEach(function (section) {
    section.classList.remove('active');
  });
  categories.forEach(function (cat) {
    cat.classList.remove('active');
  });
  var labelSection = document.getElementById('label');
  var labelCategory = document.querySelector('.category[data-target="label"]');
  if (labelSection) labelSection.classList.add('active');
  if (labelCategory) labelCategory.classList.add('active');

  // Hide all sections initially
  // var sections = document.querySelectorAll('.section');
  // sections.forEach(function (section) {
  //   section.classList.remove('active');
  // });

  // Navigation click handler
  // var categories = document.querySelectorAll('.category');
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
  // Restore logo to original
  const logoImg = document.querySelector('.logo');
  if (logoImg) {
    logoImg.src = 'images/strataLogo.png';
    logoImg.alt = 'STRATA logo';
    logoImg.classList.remove('logo-blur');
  }

  // More info button effect
  const moreInfoBtn = document.getElementById('moreInfoBtn');
  const favicon = document.querySelector("link[rel='icon']");

  if (moreInfoBtn) {
    const symbols = ['✣', '✢', '✤', '✥', '✦', '✧', '★', '☆', '✪', '✫', '✬', '✭', '✮', '✯', '✰'];
    let symbolInterval;
    let lastSymbol = '';
    function changeSymbol() {
      let randomSymbol;
      do {
        randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      } while (randomSymbol === lastSymbol);
      lastSymbol = randomSymbol;
      moreInfoBtn.textContent = randomSymbol;

      if (favicon) {
        const newFavicon = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${randomSymbol}</text></svg>`;
        favicon.href = newFavicon;
      }
    }
    function startSymbolChange() {
      if (!symbolInterval) {
        changeSymbol();
        moreInfoBtn.classList.add('logo-blur');
        symbolInterval = setInterval(changeSymbol, 125);
      }
    }
    function stopSymbolChange() {
      clearInterval(symbolInterval);
      symbolInterval = null;
      moreInfoBtn.classList.remove('logo-blur');
    }
    // Start changing on load
    startSymbolChange();
    moreInfoBtn.addEventListener('mouseenter', stopSymbolChange);
    moreInfoBtn.addEventListener('mouseleave', startSymbolChange);
  }
});
