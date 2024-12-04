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
async function loadFooter() {
    try {
        // Mengambil footer.html dengan fetch API
        const response = await fetch('../src/components/footer.html');

        // Mengecek apakah respon berhasil
        if (!response.ok) {
            throw new Error('Failed to load footer HTML');
        }

        // Mendapatkan teks HTML dari respon
        const html = await response.text();

        // Memasukkan konten HTML ke dalam elemen dengan id 'footer-placeholder'
        document.getElementById('footer-placeholder').innerHTML = html;
    } catch (error) {
        // Menangani jika ada error saat mengambil file
        console.error('Error loading footer:', error);
    }
}

// Memanggil fungsi loadFooter setelah halaman dimuat
window.addEventListener('DOMContentLoaded', loadFooter);


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
const cards = document.querySelectorAll('.bg-white.flex.flex-row'); // cards pertama
const cards1 = document.querySelectorAll('.max-w-sm.overflow-hidden.shadow-lg.bg-white.flex.flex-col'); // cards kedua
let currentPageCards = 1; // Halaman saat ini untuk cards
let currentPageCards1 = 1; // Halaman saat ini untuk cards1

// Fungsi untuk memeriksa apakah kartu bisa ditampilkan pada halaman tertentu
function isCardsPage() {
  // Misalnya, periksa URL atau ID elemen untuk memastikan apakah halaman saat ini adalah cerpen, puisi, prosa, atau esai
  const path = window.location.pathname;  // Dapatkan path URL halaman
  return path.includes('cerpen') || path.includes('puisi') || path.includes('prosa') || path.includes('esai');
}

function isCards1Page() {
  // Periksa apakah halaman saat ini adalah halaman koleksi
  const path = window.location.pathname; // Dapatkan path URL halaman
  return path.includes('koleksi');
}

// Fungsi untuk merender card pada halaman yang relevan
function renderPage(page, cardGroup, currentPage) {
  const cardsPerPage = 4; // Jumlah card per halaman
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Tampilkan atau sembunyikan card sesuai halaman aktif
  cardGroup.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  renderPagination(cardGroup, currentPage); // Update pagination
}

// Fungsi untuk merender tombol pagination
function renderPagination(cardGroup, currentPage) {
  paginationContainer.innerHTML = ''; // Kosongkan kontainer tombol

  // Hitung jumlah halaman
  const totalCards = cardGroup.length;
  const totalPages = Math.ceil(totalCards / 4);

  // Render tombol pagination
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
      renderPage(i, cardGroup, currentPage);
    });
    paginationContainer.appendChild(button);
  }
}

// Fungsi pencarian card berdasarkan judul untuk cards
function searchCards() {
  const searchTerm = searchInput.value.toLowerCase(); // Ambil kata pencarian dari input

  // Filter kartu yang sesuai dengan pencarian berdasarkan teks dalam tag <a> untuk cards
  const filteredCards = [...cards].filter(card => {
    const titleElement = card.querySelector('a'); // Ambil elemen <a> dalam card
    const title = titleElement ? titleElement.textContent.toLowerCase() : ''; // Ambil teks dalam <a>
    return title.includes(searchTerm); // Bandingkan dengan kata pencarian
  });

  // Sembunyikan semua card
  cards.forEach(card => card.style.display = 'none');

  // Tampilkan card yang sesuai
  filteredCards.forEach(card => card.style.display = 'flex');

  // Reset halaman ke halaman pertama setelah pencarian
  currentPageCards = 1;
  renderPagination(filteredCards, currentPageCards); // Update pagination
  renderPage(currentPageCards, filteredCards, currentPageCards);
}

// Fungsi pencarian card berdasarkan judul untuk cards1
function searchCards1() {
  const searchTerm = searchInput.value.toLowerCase(); // Ambil kata pencarian dari input

  // Filter kartu yang sesuai dengan pencarian berdasarkan teks dalam tag <a> untuk cards1
  const filteredCards1 = [...cards1].filter(card => {
    const titleElement = card.querySelector('a'); // Ambil elemen <a> dalam card
    const title = titleElement ? titleElement.textContent.toLowerCase() : ''; // Ambil teks dalam <a>
    return title.includes(searchTerm); // Bandingkan dengan kata pencarian
  });

  // Sembunyikan semua card
  cards1.forEach(card => card.style.display = 'none');

  // Tampilkan card yang sesuai
  filteredCards1.forEach(card => card.style.display = 'flex');

  // Reset halaman ke halaman pertama setelah pencarian
  currentPageCards1 = 1;
  renderPagination(filteredCards1, currentPageCards1); // Update pagination
  renderPage(currentPageCards1, filteredCards1, currentPageCards1);
}

// Event listener untuk input pencarian
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  if (isCardsPage()) {
    searchCards();
  }
  if (isCards1Page()) {
    searchCards1();
  }
});

// Fungsi untuk merender halaman awal
function renderInitialPages() {
  if (isCardsPage()) {
    renderPage(currentPageCards, cards, currentPageCards);
  }
  if (isCards1Page()) {
    renderPage(currentPageCards1, cards1, currentPageCards1);
  }
}

const paginationContainer = document.getElementById('pagination');
renderInitialPages();

ClassicEditor.create(document.querySelector('.ckeditor'))
.catch(error => {
  console.error(error);
});

// Event listener untuk form submit
const form = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");

form.addEventListener("submit", function (event) {
event.preventDefault();

// Ambil data form
const name = form.name.value;
const comment = form.comment.value;
const image = form.image.files[0];

// Buat elemen baru untuk komentar
const commentElement = document.createElement("div");
commentElement.classList.add("flex", "space-x-4");

// Avatar
commentElement.innerHTML = `
  <div class="flex-shrink-0">
    <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User Avatar" class="w-12 h-12 rounded-full object-cover" />
  </div>
  <div class="flex-grow">
    <p class="font-bold text-gray-800">${name}</p>
    <p class="text-gray-600">${comment}</p>
`;

// Jika ada gambar yang diunggah
if (image) {
  const imageUrl = URL.createObjectURL(image);
  commentElement.innerHTML += `<img src="${imageUrl}" alt="Uploaded Image" class="max-w-xs rounded-md mt-2" />`;
}

commentElement.innerHTML += "</div>";

// Tambahkan komentar baru ke dalam daftar
commentList.prepend(commentElement);

// Reset form setelah submit
form.reset();
});