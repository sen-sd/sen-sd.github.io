// Blog listing page functionality
let allPosts = [];
let filteredPosts = [];

async function loadBlogPosts() {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) return;

    try {
        const response = await fetch('blog-data.json');
        if (!response.ok) {
            throw new Error('Failed to load blog data');
        }

        const blogData = await response.json();
        allPosts = blogData.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        filteredPosts = allPosts;

        renderPosts();
        setupFilters();

    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = '<p class="loading">Unable to load blog posts at this time.</p>';
    }
}

function renderPosts() {
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

        return `
            <a href="blog-post.html?id=${post.id}" class="blog-card">
                <div class="blog-card-header">
                    <span class="blog-card-category">${post.category}</span>
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

            renderPosts();
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);

