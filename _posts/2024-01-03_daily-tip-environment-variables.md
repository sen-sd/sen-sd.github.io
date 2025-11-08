---
title: "Daily Tip: Use Environment Variables for Configuration"
category: tips
date: 2024-01-03
excerpt: "Why hardcoding configuration values is a mistake, and how environment variables can save you from production disasters."
readTime: 3
---

I've seen too many production incidents caused by hardcoded configuration values. Here's a simple daily tip that can save you headaches:

## The Problem

Hardcoding values like API keys, database URLs, or feature flags directly in your code creates several issues:

- Security risks if sensitive data is committed to version control
- Different behavior between environments
- Requires code changes to update configuration
- Makes testing difficult

## The Solution

Use environment variables for all configuration:

```javascript
// Instead of this:
const apiKey = 'sk_live_1234567890';
const dbUrl = 'mongodb://localhost:27017/myapp';

// Do this:
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;

// With validation:
if (!apiKey) {
  throw new Error('API_KEY environment variable is required');
}
```

## Best Practices

- Use a `.env` file for local development (and add it to `.gitignore`)
- Document all required environment variables in your README
- Validate that required variables are set at startup
- Use different values for different environments
- Never commit secrets to version control

This simple practice will make your applications more secure, flexible, and easier to deploy.

