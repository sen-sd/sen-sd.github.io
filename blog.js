// Blog listing page functionality - now using Markdown files
const POSTS_PER_PAGE = 10;

let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
let currentFilter = 'all';
let currentBlogPostPath = 'blog-post.html';

async function loadBlogPosts() {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) return;

    // Determine base path based on current page location
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    currentBlogPostPath = isInPages ? 'blog-post.html' : 'pages/blog-post.html';

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
        applyStateFromUrl();
        applyFilter(currentFilter, false);
        renderPosts();
        setupFilters();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = '<p class="loading">Unable to load blog posts at this time.</p>';
        clearPagination();
    }
}

function getTotalPages() {
    return Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
}

function clampCurrentPage() {
    const totalPages = getTotalPages();
    if (filteredPosts.length === 0) {
        currentPage = 1;
        return;
    }
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
}

function applyFilter(filter, resetPage = true) {
    currentFilter = filter || 'all';

    if (currentFilter === 'all') {
        filteredPosts = allPosts;
    } else {
        filteredPosts = allPosts.filter(post =>
            post.category.toLowerCase() === currentFilter
        );
    }

    if (resetPage) {
        currentPage = 1;
    }

    clampCurrentPage();
}

function applyStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page'), 10);
    const categoryParam = (params.get('category') || 'all').toLowerCase();

    currentFilter = categoryParam || 'all';
    currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        btn.classList.toggle('active', filter === currentFilter);
    });
}

function updateUrlState() {
    const params = new URLSearchParams();
    if (currentFilter && currentFilter !== 'all') {
        params.set('category', currentFilter);
    }
    if (currentPage > 1) {
        params.set('page', String(currentPage));
    }

    const query = params.toString();
    const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

    history.replaceState({}, '', newUrl);
}

function scrollToPosts() {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) return;
    postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getPaginationContainer() {
    let pagination = document.getElementById('blogPagination');
    if (pagination) return pagination;

    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer || !postsContainer.parentElement) return null;

    pagination = document.createElement('div');
    pagination.id = 'blogPagination';
    pagination.className = 'blog-pagination';
    pagination.setAttribute('aria-label', 'Blog pagination');
    postsContainer.insertAdjacentElement('afterend', pagination);
    return pagination;
}

function clearPagination() {
    const pagination = document.getElementById('blogPagination');
    if (pagination) {
        pagination.innerHTML = '';
    }
}

function getVisiblePageNumbers(totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    if (currentPage <= 3) {
        pages.add(2);
        pages.add(3);
        pages.add(4);
    }
    if (currentPage >= totalPages - 2) {
        pages.add(totalPages - 1);
        pages.add(totalPages - 2);
        pages.add(totalPages - 3);
    }

    return Array.from(pages)
        .filter(page => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b);
}

function renderPagination() {
    const pagination = getPaginationContainer();
    if (!pagination) return;

    if (filteredPosts.length === 0) {
        pagination.innerHTML = '';
        return;
    }

    const totalPages = getTotalPages();
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    const pageNumbers = getVisiblePageNumbers(totalPages);
    let buttonsHtml = `
        <button type="button" class="pagination-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">
            Previous
        </button>
    `;

    let previousPage = 0;
    pageNumbers.forEach(page => {
        if (previousPage && page - previousPage > 1) {
            buttonsHtml += `<span class="pagination-ellipsis" aria-hidden="true">…</span>`;
        }

        buttonsHtml += `
            <button type="button" class="pagination-btn ${page === currentPage ? 'active' : ''}" data-page="${page}" aria-label="Page ${page}" ${page === currentPage ? 'aria-current="page"' : ''}>
                ${page}
            </button>
        `;
        previousPage = page;
    });

    buttonsHtml += `
        <button type="button" class="pagination-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page">
            Next
        </button>
    `;

    pagination.innerHTML = buttonsHtml;

    pagination.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) return;
            const nextPage = parseInt(button.getAttribute('data-page'), 10);
            if (!Number.isFinite(nextPage) || nextPage === currentPage) return;

            currentPage = nextPage;
            clampCurrentPage();
            renderPosts({ scroll: true });
        });
    });
}

function renderPosts(options = {}) {
    const postsContainer = document.getElementById('blogPosts');
    if (!postsContainer) return;

    const { scroll = false } = options;
    clampCurrentPage();

    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = '<p class="loading">No posts found in this category.</p>';
        clearPagination();
        updateUrlState();
        return;
    }

    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

    postsContainer.innerHTML = pagePosts.map(post => {
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const categoryUpper = post.category.toUpperCase();
        return `
            <a href="${currentBlogPostPath}?file=${encodeURIComponent(post.filename)}" class="blog-card">
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

    renderPagination();
    updateUrlState();

    if (scroll) {
        scrollToPosts();
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return; // No filters on homepage

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            applyFilter(filter, true);
            renderPosts({ scroll: true });
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);
