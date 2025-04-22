// Main JavaScript for Keshf LMS
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize Swiper slider for courses
    if (document.querySelector('.course-slider') && typeof Swiper !== 'undefined') {
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
    }

    // Initialize Particles.js background in hero section
    if (document.getElementById('hero-particles') && typeof particlesJS !== 'undefined') {
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
    
    if (counterElements.length > 0) {
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
    }

    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    if (backToTopBtn) {
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
    }

    // Theme toggle functionality (dark/light mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    if (themeToggleBtn) {
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
                if (typeof gsap !== 'undefined') {
                    gsap.to("body", {backgroundColor: "#121212", color: "#fff", duration: 0.3});
                }
            } else {
                htmlEl.setAttribute("data-bs-theme", "light");
                localStorage.setItem("theme", "light");
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                
                // Run light mode animation
                if (typeof gsap !== 'undefined') {
                    gsap.to("body", {backgroundColor: "#fff", color: "#212529", duration: 0.3});
                }
            }
        });
    }

    // GSAP animations - only run if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        if (document.querySelector('.hero-content h1')) {
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
        }

        // Animate items as they scroll into view
        if (typeof ScrollTrigger !== 'undefined') {
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
        }
    }

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    if (courseCards.length > 0) {
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        y: -10,
                        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                        duration: 0.3
                    });
                } else {
                    // Fallback for when GSAP is not loaded
                    card.style.transform = 'translateY(-10px)';
                    card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1)';
                    card.style.transition = 'transform 0.3s, box-shadow 0.3s';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        y: 0,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                        duration: 0.3
                    });
                } else {
                    // Fallback for when GSAP is not loaded
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }
            });
        });
    }

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
                    if (typeof gsap !== 'undefined') {
                        gsap.from(card, {opacity: 0, y: 20, duration: 0.4});
                    }
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
    
    if (progressBars.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
    }

    // Initialize tooltips and popovers if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    // Handle user dropdown menu - FIXED
    const userDropdownToggle = document.querySelector('.user-toggle');
    if (userDropdownToggle) {
        userDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = document.querySelector('.user-dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('active');
            }
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

    // Mobile menu toggle - FIXED
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Animate menu items with stagger effect
            if (mainNav.classList.contains('active') && typeof gsap !== 'undefined') {
                const menuItems = mainNav.querySelectorAll('li');
                gsap.from(menuItems, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
        
        // Close mobile menu when clicking on a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                // Only close the menu if it's visible (on mobile)
                if (window.innerWidth < 992) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        });
        
        // Close mobile menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Initialize parallax effect
    if (document.querySelector('.parallax-section') && typeof $ !== 'undefined' && $.fn.parallax) {
        $('.parallax-section').parallax({
            imageSrc: $('.parallax-section').data('image-src'),
            speed: 0.5
        });
    }

    // Course tabs functionality - IMPROVED
    const tabLinks = document.querySelectorAll('.tab-menu li');
    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Get the target pane id
                const target = this.getAttribute('data-target');
                
                // Remove active class from all tabs
                tabLinks.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show relevant content
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });
                
                document.getElementById(target).classList.add('active');
                
                // Animate the content in
                if (typeof gsap !== 'undefined') {
                    gsap.from(`#${target} > *`, {
                        opacity: 0,
                        y: 20,
                        stagger: 0.1,
                        duration: 0.5
                    });
                }
            });
        });
    }

    // Add to cart functionality - IMPROVED
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get course data
                const courseId = this.getAttribute('data-id');
                let courseName, coursePrice, courseImage;
                
                const courseCard = this.closest('.course-card');
                if (courseCard) {
                    courseName = courseCard.querySelector('.card-title').innerText;
                    coursePrice = courseCard.querySelector('strong').innerText;
                    courseImage = courseCard.querySelector('img').src;
                }
                
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
                if (!cart) {
                    imgToFloat.remove();
                    return;
                }
                
                const cartRect = cart.getBoundingClientRect();
                
                // Animate to cart
                if (typeof gsap !== 'undefined') {
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
                                if (typeof gsap !== 'undefined') {
                                    gsap.from(cartCounter, {
                                        scale: 1.5,
                                        duration: 0.3,
                                        ease: "power1.out"
                                    });
                                }
                            }
                            
                            // Store in localStorage (simulating cart functionality)
                            let cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
                            cart.push({
                                id: courseId,
                                name: courseName,
                                price: coursePrice,
                                image: courseImage
                            });
                            localStorage.setItem('keshfCart', JSON.stringify(cart));
                            
                            // Reset button after delay
                            setTimeout(() => {
                                btn.innerHTML = 'Add to Cart';
                                btn.classList.remove('btn-success');
                            }, 2000);
                        }
                    });
                } else {
                    // Fallback animation for when GSAP is not available
                    imgToFloat.style.transition = 'all 0.8s ease-in';
                    imgToFloat.style.top = cartRect.top + 'px';
                    imgToFloat.style.left = cartRect.left + 'px';
                    imgToFloat.style.opacity = '0';
                    imgToFloat.style.transform = 'scale(0.5)';
                    
                    setTimeout(() => {
                        imgToFloat.remove();
                        
                        // Update cart counter
                        const cartCounter = document.querySelector('.cart-counter');
                        if (cartCounter) {
                            const currentCount = parseInt(cartCounter.textContent);
                            cartCounter.textContent = currentCount + 1;
                        }
                        
                        // Store in localStorage (simulating cart functionality)
                        let cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
                        cart.push({
                            id: courseId,
                            name: courseName,
                            price: coursePrice,
                            image: courseImage
                        });
                        localStorage.setItem('keshfCart', JSON.stringify(cart));
                        
                        // Reset button after delay
                        setTimeout(() => {
                            btn.innerHTML = 'Add to Cart';
                            btn.classList.remove('btn-success');
                        }, 2000);
                    }, 800);
                }
            });
        });
    }

    // Cart page functionality
    if (location.pathname.includes('cart.html')) {
        loadCartItems();
        
        // Handle quantity changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateCartTotals);
        });
        
        // Handle remove item buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const cartItem = this.closest('.cart-item');
                const courseId = cartItem.getAttribute('data-id');
                
                // Remove from UI with animation
                if (typeof gsap !== 'undefined') {
                    gsap.to(cartItem, {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        duration: 0.5,
                        onComplete: () => {
                            cartItem.remove();
                            // Remove from localStorage
                            removeCartItem(courseId);
                            // Update cart totals
                            updateCartTotals();
                            // Update cart counter
                            updateCartCounter();
                        }
                    });
                } else {
                    cartItem.style.display = 'none';
                    // Remove from localStorage
                    removeCartItem(courseId);
                    // Update cart totals
                    updateCartTotals();
                    // Update cart counter
                    updateCartCounter();
                }
            });
        });
    }

    // Load cart items from localStorage
    function loadCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items-container');
        if (!cartItemsContainer) return;
        
        const cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
        const cartItemsHTML = cart.map(item => {
            return `
                <div class="cart-item d-flex py-3 border-bottom" data-id="${item.id}">
                    <div class="cart-item-img me-3">
                        <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" class="rounded" width="120" height="80" style="object-fit: cover;">
                    </div>
                    <div class="cart-item-details flex-grow-1">
                        <div class="d-flex justify-content-between mb-2">
                            <h5 class="mb-0">${item.name}</h5>
                            <span class="text-primary fw-bold">${item.price}</span>
                        </div>
                        <div class="d-flex align-items-center mt-2">
                            <a href="#" class="text-danger small remove-item"><i class="fas fa-trash-alt me-1"></i>Remove</a>
                            <a href="#" class="text-secondary small ms-3"><i class="fas fa-heart me-1"></i>Save for later</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        cartItemsContainer.innerHTML = cartItemsHTML;
    }

    // Remove an item from the cart in localStorage
    function removeCartItem(courseId) {
        let cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
        cart = cart.filter(item => item.id !== courseId);
        localStorage.setItem('keshfCart', JSON.stringify(cart));
    }

    // Update cart totals
    function updateCartTotals() {
        const cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
        
        // Calculate subtotal
        const subtotal = cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return total + price;
        }, 0);
        
        // Apply a fixed discount for demo purposes
        const discount = subtotal > 100 ? 10 : 0;
        
        // Calculate total
        const total = subtotal - discount;
        
        // Update UI
        const subtotalElement = document.querySelector('.cart-subtotal');
        const discountElement = document.querySelector('.cart-discount');
        const totalElement = document.querySelector('.cart-total');
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Update cart counter in the header
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('keshfCart')) || [];
        const cartCounter = document.querySelector('.cart-counter');
        
        if (cartCounter) {
            cartCounter.textContent = cart.length;
        }
    }

    // Initialize cart counter on page load
    updateCartCounter();

    // Video modal handling - FIXED
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            const videoModal = document.getElementById('videoModal');
            if (!videoModal) return;
            
            const iframe = videoModal.querySelector('iframe');
            // For demo, we'll use a placeholder YouTube video
            iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
            
            if (typeof bootstrap !== 'undefined') {
                const bsModal = new bootstrap.Modal(videoModal);
                bsModal.show();
                
                // Reset iframe src when modal is closed to stop video
                videoModal.addEventListener('hidden.bs.modal', function() {
                    iframe.src = '';
                });
            }
        });
    }

    // Accordion functionality for course curriculum - IMPROVED
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const accordionContent = this.nextElementSibling;
                
                // Toggle active class
                this.classList.toggle('active');
                
                // Toggle icon rotation
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = this.classList.contains('active') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
                
                // Toggle content height
                if (this.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    // Animate lessons in
                    if (typeof gsap !== 'undefined') {
                        gsap.from(accordionContent.querySelectorAll('li'), {
                            opacity: 0,
                            y: 10,
                            stagger: 0.05,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                } else {
                    accordionContent.style.maxHeight = '0px';
                }
            });
        });
        
        // Open the first accordion item by default
        if (accordionHeaders[0]) {
            accordionHeaders[0].click();
        }
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Add validation styles on form submission
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
        
        // Real-time password validation for signup form
        const passwordInput = form.querySelector('input[type="password"]');
        const passwordConfirmInput = form.querySelector('input#confirmPassword');
        
        if (passwordInput && passwordConfirmInput) {
            // Password strength indicator
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                
                // Update password strength indicator
                if (password.length >= 8) strength++;
                if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
                if (password.match(/\d/)) strength++;
                if (password.match(/[^a-zA-Z\d]/)) strength++;
                
                const strengthIndicator = document.querySelector('.password-strength');
                if (strengthIndicator) {
                    strengthIndicator.className = 'password-strength';
                    if (strength === 0) strengthIndicator.classList.add('weak');
                    else if (strength < 3) strengthIndicator.classList.add('medium');
                    else strengthIndicator.classList.add('strong');
                }
            });
            
            // Password confirmation match
            passwordConfirmInput.addEventListener('input', function() {
                if (this.value === passwordInput.value) {
                    this.setCustomValidity('');
                } else {
                    this.setCustomValidity('Passwords do not match');
                }
            });
        }
    });

    // Initialize any Lottie animations on the page
    document.querySelectorAll('lottie-player').forEach(player => {
        if (player.hasAttribute('data-scroll-animation')) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && typeof player.play === 'function') {
                        player.play();
                    } else if (typeof player.stop === 'function') {
                        player.stop();
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(player);
        }
    });
    
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value) return;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            
            // Replace form with success message
            this.innerHTML = '';
            this.appendChild(successMessage);
            
            // Store in localStorage that user is subscribed
            localStorage.setItem('keshfNewsletterSubscribed', 'true');
        });
    });
    
    // Initialize tooltips for course information icons
    document.querySelectorAll('.info-tooltip').forEach(tooltip => {
        tooltip.addEventListener('mouseover', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            // Create tooltip element
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'custom-tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
            tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
            tooltipElement.style.opacity = '1';
            
            // Remove tooltip on mouseout
            this.addEventListener('mouseout', function() {
                tooltipElement.remove();
            });
        });
    });

    // Check if countdown timer exists and initialize it
    const courseTimer = document.querySelector('.timer');
    if (courseTimer) {
        // Set the countdown date to 3 days from now for demo purposes
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3);
        
        function updateTimer() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            if (distance < 0) {
                clearInterval(timerInterval);
                courseTimer.innerHTML = '<i class="fas fa-clock"></i> Special offer has expired';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            courseTimer.innerHTML = `<i class="fas fa-clock"></i> Special offer ends in: ${days}d ${hours}h ${minutes}m`;
        }
        
        updateTimer();
        const timerInterval = setInterval(updateTimer, 60000); // Update every minute
    }
});