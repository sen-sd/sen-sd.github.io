---
title: "Why we can't create con folder?"
category: tips
date: 2007-11-07
excerpt: "Windows reserves names like CON, PRN, and NUL as DOS devices—and how UNC tricks can still create a CON folder."
readTime: 3
---

# Why we can't create con folder?

We can't create a folder (or file) named:

`CON`, `PRN`, `AUX`, `CLOCK$`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9`.

**"CON" is for "CONSOLE", which is... the keyboard.**

## Example: Command using CON

The following `COPY` command copies what you type at the keyboard to the `OUTPUT.TXT` file:

```text
copy con output.txt
```

After you type this command and press ENTER, MS-DOS copies everything you type to the file `OUTPUT.TXT`. When you are finished typing, press `CTRL+Z` to indicate that you want to end the file. The `CTRL+Z` character will appear on the screen as `^Z`. You can also end a `COPY CON` command by pressing the `F6` key. When you press `F6`, it generates the `CTRL+Z` character, which appears on the screen as `^Z`.

The following example copies information from the keyboard to the printer connected to LPT1:

```text
copy con lpt1
```

## How to create a folder named CON?

In command prompt type:

```text
mkdir \\.\c:\con
```

This will create a folder `CON` in `c:\`. See how this works??? Now try to delete it!!

The reason this is possible is down to UNC naming conventions… by adding the `\\.\` in the statement it makes Windows ignore the old DOS command to reserve this folder name.

```text
md \\.\c:\XXX\CON
```

will create a Folder `c:\XXX\CON`.

*Originally published on [Sen API](https://senapi.blogspot.com/2007/11/why-we-cant-create-con-folder_07.html).*
