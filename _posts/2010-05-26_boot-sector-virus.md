---
title: "Boot Sector virus!!"
category: tips
date: 2010-05-26
excerpt: "What a boot sector is, how boot-sector viruses gain control, how to inspect sector code with DEBUG, and a careful floppy-only experiment using INT 19."
readTime: 5
---

# Boot Sector virus!!

## What is Boot Sector?

The boot sector on a disk is always the first sector (Sector is a size of 512 bytes) on the first track on the first head. When the computer is powered on (or reset), the BIOS starts up and does the POST. It initializes all of its data, then it looks for a valid boot sector. A valid boot sector (to the BIOS) is one that has `0AA55h` at offset 510 in the boot sector. When the BIOS finds the boot sector, it reads that sector (512 bytes) off of the disk and into memory at `0:7C00h`. Then it jumps to `0:7C00h` and the boot sector code gets control. At this point, all that has been initialized is the BIOS data area (`40h:0`) and the BIOS interrupts (`10h` - `1Ah`).

The boot sector of a floppy disk is located at cylinder 0, head 0, and sector 1.

## What is Boot Sector virus?

Boot sectors are one mechanism by which computer viruses gain control of a system. Boot sector infector viruses replace the bootstrap code in the boot sectors (of floppy disks, hard disks, or both) with viral code. Boot-sector viruses infect computer systems by copying code either to the boot sector on a floppy disk or the partition table on a hard disk. During startup, the virus is loaded into memory. Once in memory, the virus will infect any non-infected disks accessed by the system. Examples of boot-sector viruses are Michelangelo and Stoned.

## How can I see Boot sector Code of a Disk?

We can see Unassembled code with the help of Debug utility from Microsoft.

```text
-L 2000 0 0 1
```

will load 0th drive (floppy) started with 0th sector, with a count of 1, into memory location `2000`.

```text
-U 2000
```

will display assembly code.

## Easy step to write Virus / code into Disk?

For easy updating of your Sector code, load data into any location as shown above.

After the unassembled command you can find that the first is a jump command. Don't change that code because after this jump code there will be some information about FAT. If any changes in FAT occur then the drive will not read. You can change code where the JUMP command pointed to.

After this, insert the floppy disk and restart your computer. `INT 19` is a BIOS interrupt for Boot strap loader. After inserting the above floppy disk you will see that the system is continuously blinking and boots only after removing the floppy disk.

This is not a virus..

## Warning!!

Don't write code into Hard disk. Try your experiment in Floppy disk.
