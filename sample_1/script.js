// Modern JavaScript for Green Heart Foundation Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Header scroll effect
    initHeaderScroll();
    
    // Form handling
    initFormHandling();
    
    // Add scroll reveal animations
    initScrollReveal();
    
    // Fade in the page
    document.body.style.opacity = '1';
});

// Initialize animations for elements with animated class
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animated');
    
    // Add visible class when elements are in viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll effect to header
function initHeaderScroll() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.9) 0%, rgba(14, 165, 233, 0.9) 100%)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                header.style.padding = '1rem 0';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 1) 0%, rgba(14, 165, 233, 1) 100%)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.padding = '1.5rem 0';
            }
        });
    }
}

// Initialize form handling
function initFormHandling() {
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate successful submission
            emailInput.value = '';
            showNotification('Thank you for subscribing to our newsletter!', 'success');
        });
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Create and show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '5px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease'
        });
        
        // Add to body
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after a delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .value-item, .program-card, .involved-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effect to cards
    document.querySelectorAll('.feature-card, .value-item, .program-card, .involved-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.width = '1px';
            ripple.style.height = '1px';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'all 0.6s ease';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(150)';
                ripple.style.opacity = '0';
                
                setTimeout(() => {
                    this.removeChild(ripple);
                }, 600);
            }, 10);
        });
    });
}
