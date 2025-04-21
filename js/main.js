// Main JavaScript for Keshf LMS
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Swiper slider for courses
    const courseSwiper = new Swiper('.course-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        },
        autoplay: {
            delay: 5000,
        },
        loop: true,
    });

    // Initialize Particles.js background in hero section
    if (document.getElementById('hero-particles')) {
        particlesJS('hero-particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4f46e5'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 4,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4f46e5',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Counter animation for stats
    const counterElements = document.querySelectorAll('.counter-value');
    
    counterElements.forEach(counter => {
        counter.innerText = '0';
        
        const updateCounter = () => {
            const target = +counter.getAttribute('data-val');
            const c = +counter.innerText;
            
            const increment = target / 100;
            
            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });

    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Theme toggle functionality (dark/light mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
        htmlEl.setAttribute("data-bs-theme", "dark");
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlEl.setAttribute("data-bs-theme", "light");
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggleBtn.addEventListener("click", function() {
        let theme = htmlEl.getAttribute("data-bs-theme");
        
        if (theme === "light") {
            htmlEl.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            
            // Run dark mode animation
            gsap.to("body", {backgroundColor: "#121212", color: "#fff", duration: 0.3});
        } else {
            htmlEl.setAttribute("data-bs-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            
            // Run light mode animation
            gsap.to("body", {backgroundColor: "#fff", color: "#212529", duration: 0.3});
        }
    });

    // GSAP animations
    // Hero section animations
    gsap.from(".hero-content h1", {
        duration: 1.2,
        opacity: 0,
        y: 50,
        ease: "power3.out"
    });
    
    gsap.from(".hero-content p", {
        duration: 1.2,
        opacity: 0,
        y: 50,
        ease: "power3.out",
        delay: 0.3
    });
    
    gsap.from(".hero-content .btn", {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });

    gsap.from(".hero-image-wrapper", {
        duration: 1.5,
        opacity: 0,
        x: 50,
        ease: "power3.out",
        delay: 0.2
    });

    // Animate items as they scroll into view
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                duration: 0.3
            });
        });
    });

    // Handle course search and filtering
    const searchInput = document.querySelector('.course-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const cardTitle = card.querySelector('.card-title').innerText.toLowerCase();
                const cardCategory = card.querySelector('.badge').innerText.toLowerCase();
                
                if (cardTitle.includes(searchTerm) || cardCategory.includes(searchTerm)) {
                    card.style.display = 'block';
                    gsap.from(card, {opacity: 0, y: 20, duration: 0.4});
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    }

    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize course progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        gsap.to(bar, {
            width: value + '%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%'
            }
        });
    });

    // Initialize tooltips and popovers
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Handle user dropdown menu
    const userDropdownToggle = document.querySelector('.user-toggle');
    if (userDropdownToggle) {
        userDropdownToggle.addEventListener('click', function() {
            document.querySelector('.user-dropdown-menu').classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-dropdown')) {
                const dropdown = document.querySelector('.user-dropdown-menu');
                if (dropdown && dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                }
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.main-nav').classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Initialize parallax effect
    if (document.querySelector('.parallax-section')) {
        $('.parallax-section').parallax({
            imageSrc: $('.parallax-section').data('image-src'),
            speed: 0.5
        });
    }

    // Course tabs functionality if on course details page
    const tabLinks = document.querySelectorAll('.tab-menu li');
    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all tabs
                tabLinks.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show relevant content
                const contentId = this.getAttribute('data-tab');
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                document.getElementById(contentId).classList.add('active');
            });
        });
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get course data
            const courseCard = this.closest('.course-card');
            const courseId = this.getAttribute('data-id');
            const courseName = courseCard.querySelector('.card-title').innerText;
            const coursePrice = courseCard.querySelector('strong').innerText;
            
            // Add animation
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.classList.add('btn-success');
            
            // Create a floating element for animation
            const imgToFloat = document.createElement('div');
            imgToFloat.classList.add('floating-cart-item');
            imgToFloat.innerHTML = '<i class="fas fa-graduation-cap"></i>';
            document.body.appendChild(imgToFloat);
            
            // Position the element at the button
            const btnRect = this.getBoundingClientRect();
            imgToFloat.style.top = btnRect.top + 'px';
            imgToFloat.style.left = btnRect.left + 'px';
            
            // Get cart icon position
            const cart = document.querySelector('.cart-icon');
            const cartRect = cart.getBoundingClientRect();
            
            // Animate to cart
            gsap.to(imgToFloat, {
                top: cartRect.top,
                left: cartRect.left,
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                ease: "power1.in",
                onComplete: function() {
                    imgToFloat.remove();
                    
                    // Update cart counter
                    const cartCounter = document.querySelector('.cart-counter');
                    if (cartCounter) {
                        const currentCount = parseInt(cartCounter.textContent);
                        cartCounter.textContent = currentCount + 1;
                        
                        // Animate cart counter
                        gsap.from(cartCounter, {
                            scale: 1.5,
                            duration: 0.3,
                            ease: "power1.out"
                        });
                    }
                    
                    // Store in localStorage (simulating cart functionality)
                    let cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
                    cart.push({
                        id: courseId,
                        name: courseName,
                        price: coursePrice
                    });
                    localStorage.setItem('keshfCart', JSON.stringify(cart));
                    
                    // Reset button after delay
                    setTimeout(() => {
                        btn.innerHTML = 'Add to Cart';
                        btn.classList.remove('btn-success');
                    }, 2000);
                }
            });
        });
    });

    // Handle video modal
    const videoButtons = document.querySelectorAll('.video-btn');
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
            document.querySelector('#videoModal iframe').setAttribute('src', videoSrc);
            videoModal.show();
            
            document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
                document.querySelector('#videoModal iframe').setAttribute('src', '');
            });
        });
    });

    // Check if the user has completed the course to show a certificate
    const progressValue = document.querySelector('.course-progress')?.getAttribute('data-progress');
    if (progressValue && parseInt(progressValue) === 100) {
        document.querySelector('.certificate-container')?.classList.remove('d-none');
    }

    // Initialize any Lottie animations on the page
    document.querySelectorAll('lottie-player').forEach(player => {
        player.addEventListener('ready', () => {
            if (player.hasAttribute('data-scroll-animation')) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            player.play();
                        } else {
                            player.stop();
                        }
                    });
                }, { threshold: 0.2 });
                
                observer.observe(player);
            }
        });
    });
});