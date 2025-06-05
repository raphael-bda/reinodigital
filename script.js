document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav .nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-links'); // Renamed to avoid conflict with navLinks nodeList
    const allNavLinks = document.querySelectorAll('#nav-links .nav-link');

    // Update the year in the footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Lógica para o Menu Hambúrguer
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Shows/hides the menu
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            document.body.classList.toggle('no-scroll', isExpanded); // Prevents scroll when menu is open
        });

        // Close menu when a link is clicked (useful for mobile)
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // Highlight the active link based on the current page URL
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Optional: Auto-scroll to top of main content when page loads (useful for multi-page)
    document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
});