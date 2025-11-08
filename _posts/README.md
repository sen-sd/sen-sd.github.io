# Blog Posts Directory

This directory contains all your blog posts in Markdown format.

## File Naming Convention

Use this format: `YYYY-MM-DD_title-with-dashes.md`

Examples:
- `2024-01-15_my-daily-tip.md`
- `2024-01-20_understanding-react-hooks.md`
- `2024-02-01_rest-api-best-practices.md`

## Post Format

Each blog post should start with frontmatter (YAML metadata) followed by your Markdown content:

```markdown
---
title: "Your Post Title"
category: tips
date: 2024-01-15
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

## Categories

Use one of these categories:
- `tips` - Daily technical tips
- `tutorial` - Step-by-step tutorials  
- `insights` - Professional insights and experiences

## Adding a New Post

1. Create a new `.md` file in this directory with the naming format above
2. Add the frontmatter with all required fields
3. Write your content in Markdown
4. Add the filename to `posts-list.json` in the root directory
5. Commit and push to GitHub

## Updating posts-list.json

After creating a new post, add its filename to `posts-list.json`:

```json
{
  "posts": [
    "2024-01-15_my-new-post.md",
    "2024-01-10_another-post.md"
  ]
}
```

The posts will automatically appear on your blog in reverse chronological order (newest first).

