// Theme Toggle Functionality - Shared across all pages
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }
}

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

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

