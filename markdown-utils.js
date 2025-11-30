// Utility functions for parsing Markdown files with frontmatter

/**
 * Parse frontmatter from a Markdown file
 * @param {string} content - Raw markdown content
 * @returns {Object} - { frontmatter: Object, content: string }
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { frontmatter: {}, content: content };
    }
    
    const frontmatterText = match[1];
    const markdownContent = match[2];
    
    // Parse YAML-like frontmatter (simple parser)
    const frontmatter = {};
    frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            frontmatter[key] = value;
        }
    });
    
    return { frontmatter, content: markdownContent };
}

/**
 * Fetch and parse a Markdown blog post
 * @param {string} filename - Name of the markdown file
 * @returns {Promise<Object>} - Parsed post with frontmatter and HTML content
 */
async function fetchMarkdownPost(filename) {
    try {
        // Determine base path based on current page location
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
        const response = await fetch(`${basePath}_posts/${filename}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filename}`);
        }
        
        const markdown = await response.text();
        const { frontmatter, content } = parseFrontmatter(markdown);
        
        // Convert markdown to HTML
        let html = marked.parse(content);
        
        // Fix image paths if viewing from pages directory
        if (window.location.pathname.includes('/pages/')) {
            // Convert absolute paths starting with /assets/ to relative paths
            html = html.replace(/src="\/assets\//g, 'src="../assets/');
        }
        
        // Generate ID from filename (remove extension and date prefix)
        const id = filename.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md$/, '');
        
        return {
            id: id,
            filename: filename,
            title: frontmatter.title || 'Untitled',
            category: frontmatter.category || 'tips',
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            excerpt: frontmatter.excerpt || '',
            readTime: frontmatter.readTime || '5',
            content: html,
            rawContent: content
        };
    } catch (error) {
        console.error(`Error fetching post ${filename}:`, error);
        throw error;
    }
}

/**
 * Fetch all blog posts
 * @returns {Promise<Array>} - Array of parsed blog posts
 */
async function fetchAllPosts() {
    try {
        // Determine base path based on current page location
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
        // First, get the list of posts
        const listResponse = await fetch(`${basePath}posts-list.json`);
        if (!listResponse.ok) {
            throw new Error('Failed to fetch posts list');
        }
        
        const listData = await listResponse.json();
        const postFilenames = listData.posts || [];
        
        // Fetch all posts in parallel
        const postPromises = postFilenames.map(filename => fetchMarkdownPost(filename));
        const posts = await Promise.all(postPromises);
        
        // Sort by date (newest first)
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

