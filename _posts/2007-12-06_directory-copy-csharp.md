---
title: "Directory Copy C#"
category: tips
date: 2007-12-06
excerpt: "A simple recursive C# utility to copy an entire directory tree—files and subfolders—using DirectoryInfo and FileInfo."
readTime: 3
---

# Directory Copy C#

A straightforward way to copy a full directory tree in C# using `DirectoryInfo` and `FileInfo`. The method creates the destination folder if needed, copies every file, then walks subdirectories recursively.

```csharp
static class MainClass
{
    static void Main(string[] args)
    {
        DirectoryInfo sourceDir = new DirectoryInfo("c:\\a");
        DirectoryInfo destinationDir = new DirectoryInfo("c:\\b");
        CopyDirectory(sourceDir, destinationDir);
    }

    static void CopyDirectory(DirectoryInfo source, DirectoryInfo destination)
    {
        if (!destination.Exists)
        {
            destination.Create();
        }

        // Copy all files.
        FileInfo[] files = source.GetFiles();
        foreach (FileInfo file in files)
        {
            file.CopyTo(Path.Combine(destination.FullName, file.Name));
        }

        // Process subdirectories.
        DirectoryInfo[] dirs = source.GetDirectories();
        foreach (DirectoryInfo dir in dirs)
        {
            // Get destination directory.
            string destinationDir = Path.Combine(destination.FullName, dir.Name);
            // Call CopyDirectory() recursively.
            CopyDirectory(dir, new DirectoryInfo(destinationDir));
        }
    }
}
```

## How it works

1. Ensure the destination directory exists (`Create()` if missing).
2. Copy each file from the source into the destination with `FileInfo.CopyTo`.
3. For every subdirectory, build the matching path under the destination and call `CopyDirectory` again.

Point `sourceDir` and `destinationDir` at the folders you need, and the recursion handles the rest of the tree.
