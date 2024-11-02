document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll library)
    AOS.init({
        duration: 1000,   // Animation duration in milliseconds
        once: true,       // Only animate once, does not re-trigger on scroll
        offset: 100       // Trigger animations when 100px away from the viewport
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {               // If scrolled 50px down
            navbar.style.padding = '0.5rem 0';   // Reduce navbar padding
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'; // Add shadow
        } else {
            navbar.style.padding = '1rem 0';     // Original navbar padding
            navbar.style.boxShadow = 'none';     // Remove shadow when at top
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();                 // Prevent default anchor click behavior
            const target = document.querySelector(this.getAttribute('href')); // Target section
            target.scrollIntoView({
                behavior: 'smooth',             // Smooth scroll behavior
                block: 'start'                  // Aligns target section to top of viewport
            });
        });
    });
});
