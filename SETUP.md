# Quick Setup Guide for GitHub Pages

## ✅ Your site is ready for GitHub Pages!

## Step-by-Step Instructions:

### 1. Push to GitHub
If you haven't already, push all files to your GitHub repository:

```bash
git add .
git commit -m "Initial commit: GitHub Pages site"
git push origin main
```

(If your default branch is `master` instead of `main`, use `git push origin master`)

### 2. Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/sen-sd/sen-sd.github.io`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Branch**: `main` (or `master` if that's your default branch)
   - **Folder**: `/ (root)`
5. Click **Save**

### 3. View Your Site
- Your site will be live at: **https://sen-sd.github.io**
- It may take 1-2 minutes to deploy after you save the settings
- You'll see a green checkmark when it's ready

### 4. Test Locally (Optional)
Before pushing, you can test locally using a simple HTTP server:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (with http-server):**
```bash
npx http-server
```

Then open: `http://localhost:8000`

## Important Notes:

- ✅ The `.nojekyll` file is present (tells GitHub Pages to serve static files directly)
- ✅ All HTML files are in the root directory
- ✅ All assets (CSS, JS, JSON) are properly linked
- ✅ The site uses relative paths (works on GitHub Pages)

## Troubleshooting:

**Site not loading?**
- Wait 2-3 minutes after enabling Pages
- Check the Pages tab in Settings for any error messages
- Make sure your branch name matches what you selected in Settings

**GitHub activity not showing?**
- Verify your GitHub username in `script.js` (line 5)
- Make sure your GitHub profile has public activity

**Blog posts not loading?**
- Check browser console for errors (F12)
- Make sure `blog-data.json` is in the root directory

## Next Steps:

1. Customize the content in `index.html`
2. Add your own blog posts to `blog-data.json`
3. Update colors/styling in `styles.css` if desired

Your site is production-ready! 🚀

