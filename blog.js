// Blog listing page functionality - now using Markdown files
let allPosts = [];
let filteredPosts = [];

async function loadBlogPosts() {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) return;

    // Determine base path based on current page location
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    const blogPostPath = isInPages ? 'blog-post.html' : 'pages/blog-post.html';

    // Load markdown utils first
    if (typeof fetchAllPosts === 'undefined') {
        const script = document.createElement('script');
        script.src = basePath + 'markdown-utils.js';
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    try {
        allPosts = await fetchAllPosts();
        filteredPosts = allPosts;

        renderPosts(blogPostPath);
        setupFilters();

    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = '<p class="loading">Unable to load blog posts at this time.</p>';
    }
}

function renderPosts(blogPostPath = 'blog-post.html') {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) return;

    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = '<p class="loading">No posts found in this category.</p>';
        return;
    }

    postsContainer.innerHTML = filteredPosts.map(post => {
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const categoryUpper = post.category.toUpperCase();
        return `
            <a href="${blogPostPath}?file=${encodeURIComponent(post.filename)}" class="blog-card">
                <div class="blog-card-header">
                    <span class="blog-card-category">${categoryUpper}</span>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <div class="blog-card-date">${formattedDate}</div>
                </div>
                <div class="blog-card-body">
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                </div>
            </a>
        `;
    }).join('');
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return; // No filters on homepage
    
    // Determine blog post path
    const isInPages = window.location.pathname.includes('/pages/');
    const blogPostPath = isInPages ? 'blog-post.html' : 'pages/blog-post.html';
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter posts
            const filter = button.getAttribute('data-filter');
            if (filter === 'all') {
                filteredPosts = allPosts;
            } else {
                filteredPosts = allPosts.filter(post => 
                    post.category.toLowerCase() === filter
                );
            }

            renderPosts(blogPostPath);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);
