// Theme Toggle Functionality - Shared across all pages
(function() {
    'use strict';
    
    function updateThemeIcon(theme, iconElement) {
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
    
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;
        
        if (!html) {
            console.error('HTML element not found');
            return;
        }
        
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, themeIcon);
        
        if (themeToggle) {
            // Remove any existing listeners by cloning the button
            const newToggle = themeToggle.cloneNode(true);
            themeToggle.parentNode.replaceChild(newToggle, themeToggle);
            
            // Add click event listener
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                const icon = document.getElementById('themeIcon');
                updateThemeIcon(newTheme, icon);
            });
        } else {
            console.warn('Theme toggle button not found');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        // DOM is already ready
        initTheme();
    }
})();
