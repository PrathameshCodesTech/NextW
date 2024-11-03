// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Stats Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counterElements = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let animated = false;

    // Function to animate counter
    function animateCounter(element, target) {
        let count = 0;
        const speed = 2000; // Animation duration in milliseconds
        const increment = target / (speed / 16); // Update every 16ms (60fps)
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                element.textContent = target.toString().includes('+') ? 
                    Math.floor(parseInt(target)) + '+' : 
                    Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(count);
            }
        }, 16);
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to start counter animation when stats section is in viewport
    function handleScroll() {
        if (!animated && isInViewport(statsSection)) {
            counterElements.forEach(counter => {
                const target = parseFloat(counter.textContent.replace('+', ''));
                animateCounter(counter, target);
            });
            animated = true;
            // Remove scroll listener after animation
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();
});

// Team member card hover effect
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('.team-card img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Mobile menu handling (if not already in base.js)
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.setAttribute(
            'aria-expanded',
            mobileMenu.classList.contains('active')
        );
    });
}

// Add resize observer for responsive adjustments
const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        if (entry.contentRect.width <= 768) {
            // Mobile adjustments
            document.querySelectorAll('.content-card, .value-card').forEach(card => {
                card.style.height = 'auto';
            });
        } else {
            // Desktop adjustments
            equalizeCardHeights('.content-card');
            equalizeCardHeights('.value-card');
        }
    });
});

// Function to equalize card heights in a row
function equalizeCardHeights(selector) {
    const cards = document.querySelectorAll(selector);
    let maxHeight = 0;
    
    // Reset heights
    cards.forEach(card => {
        card.style.height = 'auto';
        maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    
    // Set all cards to max height
    cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
    });
}

// Observe the body for resize events
resizeObserver.observe(document.body);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    equalizeCardHeights('.content-card');
    equalizeCardHeights('.value-card');
});