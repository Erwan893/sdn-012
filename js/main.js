/**
 * SD 012 Beringin Jaya - Main JavaScript
 * Handles navigation, slider, smooth scroll, and animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navbarToggle && mobileMenu) {
        navbarToggle.addEventListener('click', () => {
            // Toggle hidden class
            mobileMenu.classList.toggle('hidden');

            // Toggle hamburger animation
            const spans = navbarToggle.querySelectorAll('span');

            if (!mobileMenu.classList.contains('hidden')) {
                // Open state
                spans[0].classList.add('rotate-45', 'translate-y-2');
                spans[1].classList.add('opacity-0');
                spans[2].classList.add('-rotate-45', '-translate-y-2');
            } else {
                // Closed state
                spans[0].classList.remove('rotate-45', 'translate-y-2');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('-rotate-45', '-translate-y-2');
            }
        });
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-white/95');
            navbar.classList.remove('shadow-md');
        } else {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-lg');
        }
    });

    // ===================================
    // Hero Slider
    // ===================================
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    // Function to change slide
    function nextSlide() {
        // Hide all slides
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');

        // Calculate next slide index
        currentSlide = (currentSlide + 1) % slides.length;

        // Show next slide
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    }

    // Auto advance slides every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // ===================================
    // Smooth Scrolling & Active Links
    // ===================================
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    navbarToggle.click();
                }

                // Scroll to target
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ===================================
    // Gallery Filter
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));

                // Add active class to clicked button
                btn.classList.add('active', 'bg-primary', 'text-white');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.classList.remove('opacity-0', 'scale-90');
                        }, 50);
                    } else {
                        item.classList.add('opacity-0', 'scale-90');
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
    }

    // ===================================
    // Lightbox
    // ===================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox) {
        // Open lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').innerText;

                lightboxImage.src = img.src;
                lightboxCaption.innerText = title;

                lightbox.classList.remove('hidden');
                document.body.classList.add('overflow-hidden'); // Prevent scrolling

                // Fade in animation
                setTimeout(() => {
                    lightbox.classList.remove('opacity-0');
                    lightbox.classList.add('opacity-100');
                }, 10);
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('opacity-100');
            lightbox.classList.add('opacity-0');

            setTimeout(() => {
                lightbox.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🌳 SD 012 Beringin Jaya', 'color: #4A7C2C; font-size: 24px; font-weight: bold;');
    console.log('%cBerakhlak Mulia & Berprestasi', 'color: #FFC107; font-size: 16px;');
});
