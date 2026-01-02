// ===================================
// Theme Toggle Functionality
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Language Toggle Functionality
// ===================================
const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');

// Check for saved language preference or default to 'vi'
let currentLang = localStorage.getItem('language') || 'vi';
updateLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    localStorage.setItem('language', currentLang);
    updateLanguage(currentLang);
});

function updateLanguage(lang) {
    langText.textContent = lang.toUpperCase();
    
    // Update all elements with data-en and data-vi attributes
    const elements = document.querySelectorAll('[data-en][data-vi]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholder texts
    const inputs = document.querySelectorAll('[data-en-placeholder][data-vi-placeholder]');
    inputs.forEach(input => {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Stats Counter Animation
// ===================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetNumber = parseInt(statNumber.getAttribute('data-number'));
            animateCounter(statNumber, targetNumber);
            statsObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

// Observe all stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// ===================================
// Fade-in Animation on Scroll
// ===================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should fade in
const fadeElements = document.querySelectorAll('.mission-card, .feature-card, .news-card, .value-card, .team-card');
fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===================================
// Newsletter Form Submission
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        // For now, we'll just show an alert
        alert(currentLang === 'en' 
            ? `Thank you for subscribing with ${email}!` 
            : `Cảm ơn bạn đã đăng ký với ${email}!`
        );
        
        newsletterForm.reset();
    });
}

// ===================================
// Active Navigation Link Highlighting
// ===================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinksAll = document.querySelectorAll('.nav-menu a');

navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});

// Initialize body visibility
document.body.style.visibility = 'visible';

// ===================================
// Carousel Functionality
// ===================================
let currentSlideIndex = 1;
let carouselTimer;

// Initialize carousel when DOM is ready
if (document.querySelector('.carousel-slide')) {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

function changeSlide(n) {
    clearInterval(carouselTimer);
    showSlide(currentSlideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(carouselTimer);
    showSlide(currentSlideIndex = n);
    startAutoSlide();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return; // Exit if no carousel on page
    
    if (n > slides.length) { currentSlideIndex = 1; }
    if (n < 1) { currentSlideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

function startAutoSlide() {
    carouselTimer = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 5000); // Change slide every 5 seconds
}

// ===================================
// Modal Functionality
// ===================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

console.log('PhdHub Website Loaded Successfully! 🚀');
