// This file contains JavaScript functionality for the website, including interactive elements and navigation enhancements.

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Toggle dark/light mode
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const currentTheme = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'Dark') {
        document.body.classList.add('dark-mode');
    }
});