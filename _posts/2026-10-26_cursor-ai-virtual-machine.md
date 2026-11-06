---
title: "AI Agents Are Powerful — But Be Careful!"
category: insights
date: 2026-10-26
excerpt: "An AI coding agent deleted project files on my Mac Mini. The lesson was to experiment inside a virtual machine, with snapshots and backups, instead of on the main operating system."
readTime: 5
---

AI agents are amazing. They can write code, automate tasks, manage files, and significantly improve our productivity.

But are we using them safely?

Recently, I had a real experience that taught me an important lesson.

## 📖 The Story

<figure>
  <img src="/assets/images/AI_Agent/1.my-work-from-home-envionment.PNG" alt="Home office desk with a Mac Mini, a monitor running Visual Studio Code, keyboard, and mouse">
  <figcaption>Working from home on the Mac Mini, where the AI coding experiment started.</figcaption>
</figure>

I was working from home on my Mac Mini, experimenting with an AI coding agent.

<figure>
  <img src="/assets/images/AI_Agent/2.AI_Coding%20Post_Icon.png" alt="Comic of an AI coding session: folder access denied, a reset confirmation, and an empty project folder">
  <figcaption>The AI helped write code and run tests. A later reset confirmation deleted the project files.</figcaption>
</figure>

Initially, everything was smooth. The AI was helping me write code, run tests, and build, and I was impressed by its capabilities.

During the process, the AI requested access to certain folders. I denied access because I wanted to protect my files.

Later, I asked the AI to perform some operations directly on my project folders.

Things became confusing. The AI struggled to complete the task, and I eventually asked it to reset the project and start again.

Unfortunately, I didn't notice the implications of one confirmation prompt.

**The result? My project files and documents were deleted.**

It was a painful experience, especially because I was experimenting on my primary operating system.

## 💡 What Did I Learn?

The problem wasn't simply the AI. It was also the environment in which I was using it.

AI agents can perform powerful operations, including deleting files, modifying configurations, and executing commands.

We should never assume that an AI agent will always understand our intentions correctly.

## 🛡️ My Solution: Use a Virtual Machine

<figure>
  <img src="/assets/images/AI_Agent/3.AI%20Coding%20Safely%20with%20Virtual%20Machines.png" alt="Four-panel story from happy AI coding, to deleted files, to experimenting safely inside a virtual machine">
  <figcaption>Experiment inside a virtual machine so a mistake can be restored instead of deleting files on the main computer.</figcaption>
</figure>

Instead of experimenting directly on your primary operating system, consider creating an isolated development environment.

For example:

- **Mac:** VMware Fusion or another compatible virtualization solution running Ubuntu or Linux.
- **Windows:** Hyper-V with Ubuntu or another development OS.
- Take VM snapshots before major experiments.
- Keep personal files outside the VM.
- Avoid unnecessary shared folders and permissions.
- Maintain Git repositories and independent backups.

<figure>
  <img src="/assets/images/AI_Agent/4.windows-hyper-v-architecture.jpg" alt="Windows Hyper-V architecture with a Windows host parent partition and an Ubuntu virtual machine child partition above the hypervisor">
  <figcaption>On Windows, Hyper-V runs the Ubuntu VM beside the host, above the hypervisor. Personal files stay on the host.</figcaption>
</figure>

If something goes wrong, you can restore the VM snapshot and continue your experiments.

Remember, a VM is an additional layer of protection, not a complete security guarantee. Proper isolation and backups are still essential.

## 🚀 Final Thoughts

AI agents are transforming software development.

They can make us faster, more productive, and more creative.

But as AI capabilities increase, responsible usage becomes even more important.

**Give AI only the permissions it needs. Protect your data. Experiment in an isolated environment.**

AI is powerful — but being careful is even more powerful!

**Tags:** #AI #AIAgents #SoftwareDevelopment #VirtualMachine #CyberSecurity #DevOps #Automation #DeveloperExperience #MacMini
