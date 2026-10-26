---
title: "Security vs. Usability: A Real-World Banking Experience as an NRI"
category: insights
date: 2026-10-26
excerpt: "A year after a frustrating Canara Bank login, a missing password-visibility control was another reminder that small details decide whether secure software actually works for users."
readTime: 6
---

As a software developer, I believe that good software is not just about features and security; it is also about how easily users can accomplish their goals.

Sometimes, real-world experiences teach us more about software quality than any textbook or design principle.

## My Experience with Canara Bank

As an NRI (Non-Resident Indian) living abroad, I usually access net banking only once every two months or so.

Around a year ago, I had a frustrating experience while trying to log in to Canara Bank's net banking service. The system repeatedly asked me to provide additional details, including my IFSC code, account number, and Aadhaar number.

Even after submitting the requested information, I continued to face difficulties accessing my account. When I wanted to perform a simple task, such as opening a new fixed deposit, I couldn't complete the process smoothly.

I understand that banking security is critical. However, repeatedly going through verification steps without being able to complete basic banking activities creates a frustrating user experience.

Eventually, I decided to move my banking activities to SBI, where I found the online banking experience smoother and more convenient for my needs.

## One Year Later: Another Small UX Observation

Today, I checked the Canara Bank login screen again and noticed something else: I couldn't find a password-visibility option to show or hide the password while typing.

It might seem like a small detail, but showing or hiding a password is a simple yet useful feature, particularly when entering a long or complex password or correcting a typing mistake.

This feature is also useful when changing a password, as users can verify what they have entered before submitting it. 🙂

<figure>
  <img src="/assets/images/online-banking/CaneraBank-no-Password-View-Option.png" alt="Canara Bank net banking login screen without a visible password-visibility control">
  <figcaption>Canara Bank login — I couldn't find a show-password control on the screen I checked.</figcaption>
</figure>

<figure>
  <img src="/assets/images/online-banking/sbi-bank-password-view-option.png" alt="SBI net banking login screen showing a password-visibility control">
  <figcaption>SBI login — a password-visibility option allows users to check what they have typed.</figcaption>
</figure>

Of course, one observation does not tell us everything about a banking platform. The purpose isn't to criticize a bank over a single UI detail, but to highlight how seemingly minor design decisions can affect everyday usability.

It raises an important question:

Are we paying enough attention to the small details that matter to users?

## What Can We Learn as Software Developers?

### 1. Security and Usability Must Work Together

Strong security is essential, especially in banking. However, authentication workflows should protect legitimate users while minimizing unnecessary friction.

### 2. Understand Real User Behavior

An NRI who accesses net banking once every two months has different usage patterns from someone who logs in every day.

Good UX design considers different user scenarios, including infrequent access, forgotten passwords, and account recovery.

### 3. Small Details Matter

A password-visibility control might seem insignificant, but it can improve usability and help users avoid mistakes.

Small features can have a surprisingly large impact on the overall experience.

### 4. Test the Complete User Journey

Software testing should go beyond checking individual APIs and features. We should test the complete user journey, from entering credentials to successfully completing a transaction.

Even simple UI controls deserve functional testing across relevant browsers, devices, and screen sizes.

### 5. Customer Experience Influences Customer Loyalty

Customers don't evaluate software based only on its architecture, technology stack, or number of features. They also judge it by how easily it helps them accomplish their goals.

When everyday interactions become unnecessarily difficult, customers may eventually choose an alternative.

## My Takeaway

As software developers, architects, and product designers, we should remember that software quality isn't just about whether a system works technically. It is also about whether it works well for the people who depend on it.

Great software should be secure, reliable, intuitive, and respectful of the user's time.

And sometimes, a small UI detail can remind us of a much bigger lesson:

Users may never see the complexity behind our software, but they will always feel the quality of the experience we create.

**Tags:** #UserExperience #SoftwareDevelopment #UXDesign #SoftwareTesting #QualityAssurance #CustomerExperience #DigitalBanking
