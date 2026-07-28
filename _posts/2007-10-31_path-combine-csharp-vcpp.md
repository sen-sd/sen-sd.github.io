---
title: "Path Combine Function C# and VC++"
category: tips
date: 2007-10-31
excerpt: "Combine path segments with System.IO.Path.Combine in C# and PathCombine from shlwapi.h in VC++."
readTime: 2
---

# Path Combine Function C# and VC++

## Path.Combine Function C#

```csharp
public static string Combine(string path1, string path2)
```

A string containing the combined paths. If one of the specified paths is a zero-length string, this method returns the other path. If `path2` contains an absolute path, this method returns `path2`.

`System.IO` Namespace

## PathCombine Function VC++

```cpp
LPTSTR PathCombine(
    LPTSTR lpszDest,
    LPCTSTR lpszDir,
    LPCTSTR lpszFile
);
```

Returns a pointer to a string with the concatenated path if successful, or `NULL` otherwise.

Header: `shlwapi.h`

*Originally published on [Sen API](https://senapi.blogspot.com/2007/10/path-combine-fucction-c-and-vc.html).*
