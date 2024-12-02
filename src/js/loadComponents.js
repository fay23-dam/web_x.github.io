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
