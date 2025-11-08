#!/bin/bash
# Simple script to update posts-list.json with all .md files in _posts directory

echo "Updating posts-list.json..."

# Get all .md files from _posts directory, excluding README.md, sorted by name (which includes date)
POSTS=$(ls -1 _posts/*.md 2>/dev/null | grep -v README.md | xargs -n1 basename | sort -r)

# Create JSON array
JSON_POSTS=""
FIRST=true
while IFS= read -r post; do
    if [ -n "$post" ]; then
        if [ "$FIRST" = true ]; then
            JSON_POSTS="    \"$post\""
            FIRST=false
        else
            JSON_POSTS="$JSON_POSTS,
    \"$post\""
        fi
    fi
done <<< "$POSTS"

# Write to file
cat > posts-list.json << EOF
{
  "posts": [
$JSON_POSTS
  ]
}
EOF

echo "✅ Updated posts-list.json with $(echo "$POSTS" | wc -l | tr -d ' ') posts"
echo ""
echo "Don't forget to commit and push:"
echo "  git add posts-list.json"
echo "  git commit -m 'Update posts list'"
echo "  git push"
