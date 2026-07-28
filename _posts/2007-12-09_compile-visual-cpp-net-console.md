---
title: "To compile a Visual C++ .NET console application on the command line"
category: tips
date: 2007-12-09
excerpt: "Quick command-line examples for compiling native C++ and C++/CLI console apps with cl.exe."
readTime: 2
---

# To compile a Visual C++ .NET console application on the command line

## To compile native C++ program

On command line type:

```text
cl simple.cpp
```

The `cl.exe` compiler generates an executable program `simple.exe`. Other generated files: `.obj` file.

## To compile C++/CLI program

At the command line prompt, type:

```text
cl /clr simpleclr.cpp
```

and press Enter. The `cl.exe` compiler generates an executable program `simpleclr.exe`. Other generated files: `.obj` file, `.manifest` file.

*Originally published on [Sen API](https://senapi.blogspot.com/2007/12/to-compile-visual-c-net-console.html).*
