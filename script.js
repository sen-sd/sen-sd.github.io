// GitHub Activity Loader
async function loadGitHubActivity() {
    const activityContainer = document.getElementById('githubActivity');
    if (!activityContainer) return;

    try {
        // Fetch GitHub events for the user
        const username = 'sen-sd'; // Update with your GitHub username
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub activity');
        }

        const events = await response.json();
        
        if (events.length === 0) {
            activityContainer.innerHTML = '<p class="loading">No recent GitHub activity to display.</p>';
            return;
        }

        activityContainer.innerHTML = events.map(event => {
            const date = new Date(event.created_at);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            let icon = 'fa-code';
            let title = '';
            let description = '';

            switch(event.type) {
                case 'PushEvent':
                    icon = 'fa-code-branch';
                    title = `Pushed to ${event.repo.name}`;
                    description = `${event.payload.commits?.length || 0} commit(s)`;
                    break;
                case 'CreateEvent':
                    icon = 'fa-plus-circle';
                    title = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                    description = event.payload.ref || '';
                    break;
                case 'WatchEvent':
                    icon = 'fa-star';
                    title = `Starred ${event.repo.name}`;
                    description = '';
                    break;
                case 'ForkEvent':
                    icon = 'fa-code-fork';
                    title = `Forked ${event.repo.name}`;
                    description = '';
                    break;
                case 'IssuesEvent':
                    icon = 'fa-exclamation-circle';
                    title = `${event.payload.action} issue in ${event.repo.name}`;
                    description = event.payload.issue?.title || '';
                    break;
                case 'PullRequestEvent':
                    icon = 'fa-git-alt';
                    title = `${event.payload.action} pull request in ${event.repo.name}`;
                    description = event.payload.pull_request?.title || '';
                    break;
                default:
                    icon = 'fa-code';
                    title = `Activity in ${event.repo.name}`;
                    description = event.type;
            }

            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${title}</div>
                        ${description ? `<div class="activity-description">${description}</div>` : ''}
                        <div class="activity-date">${formattedDate}</div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading GitHub activity:', error);
        activityContainer.innerHTML = `
            <div class="loading">
                <p>Unable to load GitHub activity at this time.</p>
                <p><a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View GitHub Profile</a></p>
            </div>
        `;
    }
}

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
                <a href="blog-post.html?file=${encodeURIComponent(post.filename)}" class="blog-card">
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
    loadGitHubActivity();
    loadBlogPreview();
});
