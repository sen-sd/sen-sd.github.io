// Load blog preview on homepage - now using Markdown files
async function loadBlogPreview() {
    const previewContainer = document.getElementById('blogPreview');
    if (!previewContainer) return;

    // Load markdown utils first
    if (typeof fetchAllPosts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'markdown-utils.js';
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    try {
        const allPosts = await fetchAllPosts();
        const latestPosts = allPosts.slice(0, 3);

        if (latestPosts.length === 0) {
            previewContainer.innerHTML = '<p>No blog posts available yet.</p>';
            return;
        }

        previewContainer.innerHTML = latestPosts.map(post => {
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            return `
                <a href="pages/blog-post.html?file=${encodeURIComponent(post.filename)}" class="blog-card">
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

    } catch (error) {
        console.error('Error loading blog preview:', error);
        previewContainer.innerHTML = '<p>Unable to load blog posts at this time.</p>';
    }
}

// Smooth scrolling for anchor links
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPreview();
});
