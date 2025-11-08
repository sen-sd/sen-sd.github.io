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
- `blog-data.json` - Blog posts data

## Adding New Blog Posts

To add a new blog post, edit `blog-data.json` and add a new entry to the `posts` array:

```json
{
  "id": "unique-id",
  "title": "Your Post Title",
  "category": "tips|tutorial|insights",
  "date": "YYYY-MM-DD",
  "excerpt": "Short description of the post",
  "readTime": "5",
  "content": "<p>Your HTML content here</p>"
}
```

### Categories
- `tips` - Daily technical tips
- `tutorial` - Step-by-step tutorials
- `insights` - Professional insights and experiences

### Content Formatting
The `content` field supports HTML. You can use:
- `<h2>`, `<h3>` for headings
- `<p>` for paragraphs
- `<ul>`, `<ol>`, `<li>` for lists
- `<code>` for inline code
- `<pre><code class="language-xxx">` for code blocks (supports syntax highlighting)
- `<blockquote>` for quotes

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
- GitHub API for activity feed
- Font Awesome for icons
- Prism.js for code syntax highlighting

## License

See LICENSE file for details.

---

Built with ❤️ for sharing knowledge and connecting with the developer community.

