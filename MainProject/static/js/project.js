document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll library)
    AOS.init({
        duration: 1000,   // Animation duration in milliseconds
        once: true,       // Only animate once, does not re-trigger on scroll
        offset: 100       // Trigger animations when 100px away from the viewport
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };

    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 50) {               // If scrolled 50px down
            navbar.style.padding = '0.5rem 0';   // Reduce navbar padding
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'; // Add shadow
        } else {
            navbar.style.padding = '1rem 0';     // Original navbar padding
            navbar.style.boxShadow = 'none';     // Remove shadow when at top
        }
    }, 100));

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

    // Initialize testimonial carousel with custom options
    const testimonialCarouselElement = document.getElementById('testimonialCarousel');
    if (testimonialCarouselElement) {
        const testimonialCarousel = new bootstrap.Carousel(testimonialCarouselElement, {
            interval: 5000,
            touch: true,
            keyboard: true, // Allow keyboard navigation
            wrap: true // Loop back to the start
        });
    }

    // Add smooth transition effect for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Add animation when testimonial comes into view
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.testimonial-card').forEach(card => {
        observer.observe(card);
    });
});
