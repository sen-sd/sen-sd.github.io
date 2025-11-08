# Sen SD - Professional Profile & Technical Blog

A modern GitHub Pages site showcasing 20 years of software engineering experience, technical blog posts, and GitHub activity.

## Features

- **Professional Profile**: Highlighting 20 years of software engineering experience
- **Technical Blog**: Share daily tips, tutorials, and insights
- **GitHub Activity Integration**: Real-time display of GitHub contributions
- **LinkedIn Integration**: Direct links to professional profile
- **Responsive Design**: Works beautifully on all devices
- **Modern UI**: Clean, professional design with smooth animations

## Site Structure

- `index.html` - Main profile page
- `blog.html` - Blog listing page
- `blog-post.html` - Individual blog post template
- `styles.css` - All styling
- `script.js` - Main page JavaScript (GitHub activity, blog preview)
- `blog.js` - Blog listing functionality
- `blog-post.js` - Individual post rendering
- `markdown-utils.js` - Markdown parsing utilities
- `posts-list.json` - List of blog post filenames
- `_posts/` - Directory containing all blog posts in Markdown format

## Adding New Blog Posts

**Easy workflow**: Just create a new Markdown file!

### Step 1: Create a Markdown File

Create a new file in the `_posts/` directory with this naming format:
```
YYYY-MM-DD_title-with-dashes.md
```

Example: `2024-01-20_my-daily-tip.md`

### Step 2: Add Frontmatter and Content

Each post should start with frontmatter (metadata) followed by your Markdown content:

```markdown
---
title: "Your Post Title"
category: tips
date: 2024-01-20
excerpt: "A short description that appears in the blog listing"
readTime: 5
---

Your blog post content in Markdown goes here...

## Heading

You can use all standard Markdown features:
- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks with syntax highlighting

\`\`\`javascript
const example = "code";
\`\`\`
```

### Step 3: Add to posts-list.json

Add the filename to `posts-list.json`:

```json
{
  "posts": [
    "2024-01-20_my-daily-tip.md",
    "2024-01-15_another-post.md"
  ]
}
```

### Categories
- `tips` - Daily technical tips
- `tutorial` - Step-by-step tutorials
- `insights` - Professional insights and experiences

### Markdown Features Supported
- Headings (`#`, `##`, `###`)
- Paragraphs
- Lists (ordered and unordered)
- **Bold** and *italic* text
- [Links](url)
- `Inline code`
- Code blocks with syntax highlighting (specify language)
- Blockquotes
- And more standard Markdown features!

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch (usually `main` or `master`)
4. Your site will be available at `https://sen-sd.github.io`

## Customization

### Update GitHub Username
In `script.js`, update the username variable:
```javascript
const username = 'sen-sd'; // Change to your GitHub username
```

### Update LinkedIn URL
The LinkedIn URL is already set to `https://www.linkedin.com/in/sensd/` in `index.html`. Update if needed.

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* ... */
}
```

## Technologies Used

- Pure HTML, CSS, and JavaScript (no frameworks required)
- Markdown for blog posts (using marked.js)
- GitHub API for activity feed
- Font Awesome for icons
- Prism.js for code syntax highlighting

## License

See LICENSE file for details.

---

Built with ❤️ for sharing knowledge and connecting with the developer community.

