// Theme Toggle Functionality - Shared across all pages
(function() {
    'use strict';
    
    function updateThemeIcon(theme) {
        const iconElement = document.getElementById('themeIcon');
        if (iconElement) {
            if (theme === 'dark') {
                iconElement.classList.remove('fa-moon');
                iconElement.classList.add('fa-sun');
            } else {
                iconElement.classList.remove('fa-sun');
                iconElement.classList.add('fa-moon');
            }
        }
    }
    
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }
    
    function initTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Set up click handler
        if (themeToggle) {
            themeToggle.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
                return false;
            };
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
