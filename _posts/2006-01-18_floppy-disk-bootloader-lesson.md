---
title: "When a Floppy Disk Taught Me About Bootloaders"
category: insights
date: 2006-01-18
excerpt: "A throwback to my college-day experiment with Windows 98 that taught me about boot sectors, system-level programming, and the ethics of responsible experimentation."
readTime: 6
---

*A throwback to my college-day experiment with Windows 98*

During my college days, curiosity was my strongest programming language.  

Back then, computers still had floppy drives, Windows 98 was everywhere, and the **boot sector** felt like a mysterious doorway into how a PC actually started.

## 🧪 The Experiment

I created a small program (we jokingly called it a "virus") that behaved in a very unusual way:

- When the system booted from the floppy disk,
- It copied the **Windows 98 boot sector** from the hard disk into the floppy,
- And then wrote an invalid boot signature back to the hard-disk boot sector.

The result?

✅ The PC would **not boot normally**  
❗ It looked like the OS had disappeared  
💿 But if I inserted the same floppy again and rebooted…

The program restored the boot sector back to its original state — and **Windows 98 booted perfectly**.

It was like a reversible prank, but for me, it became a deep technical lesson.

## 🧠 What I Actually Learned

Even though it started as experimentation, it opened the door to understanding:

### 🔹 1. How the boot process really works

- BIOS → reads first 512 bytes (MBR/boot sector)
- Boot signature validation
- Jump instructions to OS loader

### 🔹 2. Why low-level access is powerful — and dangerous

Modifying a boot sector can:

- lock a system from starting
- corrupt disk partitions
- require complete OS reinstall

It taught me *respect* for system-level programming.

### 🔹 3. The ethics of experimentation

At that time, it was a closed-environment learning project, but today we recognize:

> **Cybersecurity and responsible research are crucial.**

Modern systems have:

- Secure Boot
- TPM validation
- Signed bootloaders
- Disk encryption

What was possible with a floppy in the 90s is no longer acceptable or safe today.

## 🚀 How That Experience Shaped Me

That tiny experiment sparked my interest in:

- operating systems
- cybersecurity fundamentals
- low-level programming
- system recovery and troubleshooting

It also taught me that **knowledge should be used to build and protect systems**, not break them.

## 🔚 Looking Back

Today, we laugh about floppy disks and Windows 98 boot sounds —  
but that experience became a milestone in my journey as an engineer.

Sometimes, the smallest projects leave the biggest impact.

---

*Have a similar retro tech memory?  
Share it — the 90s were full of magic we didn't realize at the time.*

