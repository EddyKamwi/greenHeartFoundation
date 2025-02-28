// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Typed text animation
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const words = ['good nutrition', 'food security', 'sustainable solutions', 'community empowerment'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000);
    }
    
    // Theme switch functionality
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (themeSwitch) {
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(currentTheme);
        
        themeSwitch.addEventListener('click', () => {
            if (document.body.classList.contains('light')) {
                document.body.classList.replace('light', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.replace('dark', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Program filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programItems = document.querySelectorAll('.program-item');
    
    if (filterBtns.length > 0 && programItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                programItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.section-header, .about-content, .vision-mission-content, .values-grid, .program-item, .involvement-card');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('error');
            } else {
                nameInput.classList.remove('error');
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.classList.add('error');
            } else {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                // This would normally submit to a server
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
