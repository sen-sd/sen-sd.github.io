---
title: "5 Essential Git Commands Every Developer Should Know"
category: tips
date: 2024-01-15
excerpt: "Master these fundamental Git commands to streamline your development workflow and avoid common pitfalls."
readTime: 5
---

After 20 years in software development, I've seen countless developers struggle with Git. Here are the 5 commands that will make your life easier:

## 1. git stash

When you need to quickly switch branches but have uncommitted changes, `git stash` is your friend. It temporarily saves your changes so you can work on something else, then come back and apply them later with `git stash pop`.

## 2. git rebase -i

Interactive rebase allows you to clean up your commit history before pushing. Use `git rebase -i HEAD~n` where n is the number of commits you want to edit. This is invaluable for maintaining a clean, readable history.

## 3. git log --oneline --graph

This command gives you a compact, visual representation of your commit history. Add `--all` to see all branches, making it easier to understand your project's evolution.

## 4. git diff --staged

Before committing, always review what you're about to commit. `git diff --staged` shows you exactly what changes are staged, helping you catch mistakes early.

## 5. git cherry-pick

Need to apply a specific commit from another branch? `git cherry-pick <commit-hash>` copies that commit to your current branch. Perfect for hotfixes and selective backports.

These commands have saved me countless hours over the years. Master them, and you'll be a more efficient developer.

