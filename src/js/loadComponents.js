// Navigation functions
async function loadNav() {
    try {
        const response = await fetch('../src/components/nav.html');
        const html = await response.text();
        document.getElementById('nav-placeholder').innerHTML = html;
        initializeNav();
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

function initializeNav() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!hamburgerButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Carousel functions
function initializeCarousel(carouselId, prevBtnId, nextBtnId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 160 + 24; // card width + gap

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    
    // Initialize carousels if we're on a page that has them
    if (document.getElementById('cerpen-carousel')) {
        initializeCarousel('cerpen-carousel', 'cerpen-prev-btn', 'cerpen-next-btn');
        initializeCarousel('puisi-carousel', 'puisi-prev-btn', 'puisi-next-btn');
        initializeCarousel('prosa-carousel', 'prosa-prev-btn', 'prosa-next-btn');
        initializeCarousel('esai-carousel', 'esai-prev-btn', 'esai-next-btn');
    }
}); 
function truncateText(element, maxWords) {
    let text = element.innerText;
    let words = text.split(' '); // Pisahkan teks menjadi array kata
    if (words.length > maxWords) {
        words = words.slice(0, maxWords); // Ambil hanya kata ke-30
        element.innerText = words.join(' ') + '...'; // Gabungkan kata dan tambahkan "..."
    }
}

// Terapkan fungsi pada semua elemen dengan kelas 'paragraph'
const paragraphs = document.querySelectorAll('.paragraph');
paragraphs.forEach(paragraph => {
    truncateText(paragraph, 30);
});
const cardsPerPage = 4; // Jumlah card per halaman
const cards = document.querySelectorAll('.bg-white.flex.flex-row'); // Ambil semua card
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;

function renderPage(page) {
  // Hitung indeks awal dan akhir untuk card pada halaman ini
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Tampilkan atau sembunyikan card sesuai halaman aktif
  cards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // Perbarui tombol pagination
  renderPagination();
}

function renderPagination() {
  paginationContainer.innerHTML = ''; // Kosongkan kontainer tombol

  // Hitung jumlah halaman
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.className =
      'mx-1 px-3 py-1 border rounded hover:bg-green-500 hover:text-white ' +
      (i === currentPage
        ? 'bg-green-500 text-white'
        : 'bg-white text-gray-700 border-gray-300');
    button.addEventListener('click', () => {
      currentPage = i;
      renderPage(currentPage);
    });
    paginationContainer.appendChild(button);
  }
}

// Render halaman pertama saat memuat
renderPage(currentPage);
