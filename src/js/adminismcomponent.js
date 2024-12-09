const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const minimizeSidebar = document.getElementById("minimize-sidebar");
const minimizeIcon = document.getElementById("minimize-icon");
const sidebarLinks = document.getElementById("sidebar-links");
const sidebarText = document.querySelectorAll('.sidebar-text');
const maincontent = document.getElementById('main-content');
const arrowfix = document.getElementById('sapukatabar');
// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full"); // Toggle sidebar visibility
  hamburger.classList.add('hidden');
  minimizeSidebar.classList.add('hidden');
  maincontent.classList.add('mt-16')
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full"); // Close sidebar when the close button is clicked
  hamburger.classList.toggle('hidden');
  maincontent.classList.remove('mt-16')
});

// Minimize/Expand Sidebar
minimizeSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('w-20'); // Minimize or expand the sidebar
  sidebar.classList.toggle('w-64');
  maincontent.classList.toggle('lg:ml-16');
  arrowfix.classList.remove('justify-between');
  // Toggle visibility of text in the sidebar
  sidebarText.forEach(text => {
    text.classList.toggle('hidden'); // Hide or show sidebar text
  });

  // Toggle logo visibility
  document.getElementById('logo').classList.toggle('hidden');
  
  // Toggle minimize icon (arrow left or right)
  if (sidebar.classList.contains('w-20')) {
    minimizeIcon.classList.remove('fa-arrow-left');
    minimizeIcon.classList.add('fa-arrow-right'); // Change to "expand" icon
  } else {
    minimizeIcon.classList.remove('fa-arrow-right');
    arrowfix.classList.add('justify-between');
    minimizeIcon.classList.add('fa-arrow-left'); // Change to "minimize" icon
  }
});

// Fungsi untuk memuat konten dari file lain ke dalam <main>
function loadContent(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));
}

// Event listener untuk menu item
document.getElementById("menu-home").addEventListener("click", function() {
  loadContent("menu.html"); // Memuat konten dari menu.html ke dalam <main>
});

document.getElementById("menu-collection").addEventListener("click", function() {
  loadContent("datamain.html"); // Memuat konten dari datamain.html ke dalam <main>
});

$(document).ready(function() {
    // Load menu.html content and initialize DataTable with styling
    $('#menu-home').on('click', function() {
      $('#main-content').load('menu.html', function() {
        // Initialize DataTable
        $('#productTable').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          responsive: true,
          pageLength: 1, // Limit rows per page
          language: {
            searchPlaceholder: "Search",
            search: "",
            paginate: {
              first: "First",
              previous: "<",
              next: ">",
              last: "Last"
            },
            entries: {
                _: 'people',
            }
          },
        });
      });
    });
  });