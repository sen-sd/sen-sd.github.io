// Individual blog post page functionality
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        document.getElementById('blogPostContent').innerHTML = `
            <div class="loading">
                <p>Post not found. <a href="blog.html">Return to blog</a></p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('blog-data.json');
        if (!response.ok) {
            throw new Error('Failed to load blog data');
        }

        const blogData = await response.json();
        const post = blogData.posts.find(p => p.id === postId);

        if (!post) {
            document.getElementById('blogPostContent').innerHTML = `
                <div class="loading">
                    <p>Post not found. <a href="blog.html">Return to blog</a></p>
                </div>
            `;
            return;
        }

        // Update page title and meta
        document.getElementById('postTitle').textContent = `${post.title} - Sen SD`;
        document.getElementById('postDescription').setAttribute('content', post.excerpt);

        // Format date
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Render post content
        const contentContainer = document.getElementById('blogPostContent');
        contentContainer.innerHTML = `
            <div class="blog-post-header">
                <span class="blog-post-category">${post.category}</span>
                <h1 class="blog-post-title">${post.title}</h1>
                <div class="blog-post-meta">
                    <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="fas fa-clock"></i> ${post.readTime || '5'} min read</span>
                </div>
            </div>
            <div class="blog-post-body">
                ${post.content}
            </div>
        `;

        // Highlight code blocks if Prism is loaded
        if (window.Prism) {
            Prism.highlightAll();
        }

    } catch (error) {
        console.error('Error loading blog post:', error);
        document.getElementById('blogPostContent').innerHTML = `
            <div class="loading">
                <p>Unable to load blog post at this time. <a href="blog.html">Return to blog</a></p>
            </div>
        `;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadBlogPost);

