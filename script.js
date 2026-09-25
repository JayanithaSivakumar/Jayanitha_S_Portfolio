// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Get stored theme or default to light
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme on page load
        this.applyTheme(this.currentTheme);
        
        // Set up theme toggle button
        this.setupThemeToggle();
    }

    applyTheme(theme) {
        const html = document.documentElement;
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');

        if (theme === 'dark') {
            html.classList.add('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            html.classList.remove('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }

        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
        
        // Add intersection observer to handle active navigation states
        this.setupActiveNavigation();
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Use native smooth scrolling with scrollIntoView
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('text-teal-500');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('text-teal-500');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupFormValidation();
            this.setupSuccessMessage();
        }
    }

    setupSuccessMessage() {
        const successMessage = document.getElementById('contact-success-message');
        const sendAnotherButton = document.getElementById('contact-send-another');
        const nameInput = document.getElementById('name');

        if (successMessage && sendAnotherButton) {
            sendAnotherButton.addEventListener('click', () => {
                successMessage.classList.add('hidden');
                this.form.classList.remove('hidden');
                nameInput?.focus();
            });
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Validation rules
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'This field must be at least 2 characters long';
                }
                break;
            default:
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
        }

        // Handle textarea separately
        if (field.tagName.toLowerCase() === 'textarea' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-900/20');
        field.classList.remove('border-gray-300', 'dark:border-gray-600');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500', 'bg-red-50', 'dark:bg-red-900/20');
        field.classList.add('border-gray-300', 'dark:border-gray-600');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }

        // Show loading state with spinner
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            </span>
        `;
        submitButton.disabled = true;

        try {
            // Get form data
            const formData = new FormData(this.form);
            
            // Submit to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Reset form
                this.form.reset();

                const successMessage = document.getElementById('contact-success-message');
                this.form.classList.add('hidden');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
                
                // Show success message
                this.showNotification('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('✗ Failed to send message. Please email me directly at sjayanitha2006@gmail.com', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalHTML;
            submitButton.disabled = false;
        }
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full`;
        
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else {
            notification.classList.add('bg-red-500', 'text-white');
        }
        
        notification.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button onclick="this.parentNode.parentNode.remove()" class="ml-4 text-white hover:text-gray-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Recent Works horizontal scroller
class ProjectScroller {
    constructor() {
        this.scroller = document.getElementById('projects-scroller');
        this.leftButton = document.getElementById('projects-scroll-left');
        this.rightButton = document.getElementById('projects-scroll-right');
        this.init();
    }

    init() {
        if (!this.scroller || !this.leftButton || !this.rightButton) {
            return;
        }

        const scrollAmount = () => this.scroller.clientWidth * 0.8;

        this.leftButton.addEventListener('click', () => {
            this.scroller.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        this.rightButton.addEventListener('click', () => {
            this.scroller.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollToTopButton();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const elementsToObserve = document.querySelectorAll('.card-hover, .bg-white.dark\\:bg-gray-900');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    setupScrollToTopButton() {
        // Create scroll to top button
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;
        scrollToTopButton.className = 'fixed bottom-8 right-8 w-12 h-12 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 opacity-0 pointer-events-none z-50 flex items-center justify-center';
        scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
        
        document.body.appendChild(scrollToTopButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        // Scroll to top when clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        this.createMobileMenuButton();
        this.handleResize();
    }

    createMobileMenuButton() {
        const nav = document.querySelector('nav .flex');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors';
        mobileMenuButton.setAttribute('aria-label', 'Open mobile navigation menu');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;

        // Insert before theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        nav.insertBefore(mobileMenuButton, themeToggle);

        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transform -translate-y-full opacity-0 pointer-events-none transition-all duration-300';
        mobileMenu.innerHTML = `
            <div class="px-4 py-6 space-y-4">
                <a href="#home" class="block py-2 hover:text-teal-500 transition-colors">Home</a>
                <a href="#about" class="block py-2 hover:text-teal-500 transition-colors">About</a>
                <a href="#portfolio" class="block py-2 hover:text-teal-500 transition-colors">Portfolio</a>
                <a href="#services" class="block py-2 hover:text-teal-500 transition-colors">Services</a>
                <a href="#contact" class="block py-2 hover:text-teal-500 transition-colors">Contact</a>
            </div>
        `;

        nav.parentNode.appendChild(mobileMenu);

        // Toggle mobile menu
        let isMenuOpen = false;
        mobileMenuButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenuButton.setAttribute('aria-expanded', String(isMenuOpen));
            if (isMenuOpen) {
                mobileMenu.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
            } else {
                mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            }
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            });
        });
    }

    handleResize() {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                const mobileMenu = document.querySelector('nav + div');
                if (mobileMenu) {
                    mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
                }
            }
        });
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const roles = ['Web Developer', 'UI/UX Designer', 'Frontend Engineer', 'Creative Coder'];
        const roleElement = document.querySelector('.text-gray-600.dark\\:text-gray-300');
        
        if (roleElement) {
            this.typeWriter(roleElement, roles, 0, 0, true);
        }
    }

    typeWriter(element, texts, textIndex, charIndex, isDeleting) {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        let delay = typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500; // Pause before typing next
        }

        setTimeout(() => {
            this.typeWriter(element, texts, textIndex, charIndex, isDeleting);
        }, delay);
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-pattern');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new ThemeManager();
    const smoothScrolling = new SmoothScrolling();
    new ContactForm();
    new ProjectScroller();
    new ScrollAnimations();
    new MobileMenu();
    
    // Only add typing animation and parallax on larger screens for performance
    if (window.innerWidth > 768) {
        new TypingAnimation();
        new ParallaxEffect();
    }
    
    // Add additional safeguards for section positioning
    const enforceLayoutStability = () => {
        const aboutSection = document.querySelector('#about');
        const homeSection = document.querySelector('#home');
        
        if (aboutSection && homeSection) {
            // Ensure About section never moves above the Home section
            const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
            const aboutTop = aboutSection.offsetTop;
            
            // If somehow the about section is above where it should be, fix it
            if (aboutTop < homeBottom) {
                aboutSection.style.position = 'relative';
                aboutSection.style.top = '0';
                aboutSection.style.transform = 'none';
                aboutSection.style.marginTop = '0';
                aboutSection.style.paddingTop = '100px';
            }
        }
        
        // Remove any unwanted animations or transforms from sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // Prevent any CSS animations or transforms that might move sections
            if (!section.querySelector('.animate-fade-in, .animate-slide-up')) {
                section.style.transform = 'none';
                section.style.animation = 'none';
            }
        });
    };
    
    // Run immediately and on resize
    enforceLayoutStability();
    window.addEventListener('resize', enforceLayoutStability);
    
    // Also run after a small delay to catch any late-loading styles
    setTimeout(enforceLayoutStability, 100);
});

// Handle page visibility change to pause animations when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Copy Phone Number Function
function copyPhoneNumber() {
    const phoneNumber = document.getElementById('phone-number').textContent;
    const notification = document.getElementById('copy-notification');
    
    // Copy to clipboard
    navigator.clipboard.writeText(phoneNumber).then(() => {
        // Show notification
        notification.classList.remove('hidden');
        
        // Hide notification after 2 seconds
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy phone number:', err);
        alert('Click OK to copy: ' + phoneNumber);
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        ContactForm,
        SmoothScrolling,
        ScrollAnimations,
        MobileMenu
    };
}