---
title: "My Experience with Cursor AI"
category: insights
date: 2026-10-26
excerpt: "After files disappeared on my Mac mini during a Cursor AI experiment, I started running those experiments inside an Ubuntu virtual machine I can restore from a snapshot."
readTime: 4
---

I use Cursor AI for my hobby projects and to experiment with new technologies. One day, I suddenly discovered that files on my Mac mini had been deleted. It was a frustrating experience and made me think about how to protect my development environment.

I usually use this computer for experiments because it does not contain important personal data. However, I started looking for a better solution.

## My Idea: Use a Virtual Machine

<figure>
  <img src="/assets/images/Virtual%20Machine%20AI%20Coding%20Workflow.png" alt="Diagram of a Mac mini running Ubuntu in a virtual machine, with snapshot, experiment, and restore steps">
  <figcaption>Run AI coding experiments inside an Ubuntu VM, then restore a snapshot if something goes wrong.</figcaption>
</figure>

Instead of running AI coding tools directly on macOS, I can create an Ubuntu virtual machine using VMware Fusion or another VM platform.

Inside the VM, I can install all my development tools and run my experiments.

The biggest advantage is that if something goes wrong, I can restore the VM from a snapshot or backup instead of rebuilding the entire environment.

## My Proposed Workflow

1. Create an Ubuntu VM.
2. Install the required development tools and AI coding assistant.
3. Take a snapshot before starting risky experiments.
4. Run the AI coding experiments inside the VM.
5. If files are deleted or the environment breaks, restore the snapshot.

I will also avoid sharing important macOS folders with the VM, so the AI tools cannot easily access my personal files through shared folders.

Snapshots are useful for quick recovery, but I will still keep separate backups of important projects.

## Conclusion

AI coding assistants are powerful tools, but they can also make unexpected changes when executing commands or modifying files.

Rather than avoiding these tools, I believe we should use them in a safer environment.

For my Mac mini M4, an Ubuntu ARM64 VM running on VMware Fusion looks like a practical option.

My approach: Experiment freely, isolate the environment, and restore it whenever something goes wrong.
