---
title: "Working with GDI+"
category: tips
date: 2008-09-07
excerpt: "An overview of GDI+ for 2D graphics, imaging, and typography—covering unmanaged MFC (VC++) setup and managed .NET System.Drawing usage."
readTime: 5
---

# Working with GDI+

## About GDI+

GDI+ is the portion of the Windows XP operating system that provides two-dimensional vector graphics, imaging, and typography. GDI+ improves on GDI (the Graphics Device Interface included with earlier versions of Windows) by adding new features and by optimizing existing features. It is required as a redistributable for applications that run on the Microsoft Windows NT 4.0 SP6, Windows 2000, Windows 98, and Windows Millennium Edition (Windows Me) operating systems. GDI+ requires `GdiPlus.dll`.

## What's New In GDI+?

Microsoft Windows GDI+ is different from Windows Graphics Device Interface (GDI) in a couple of ways. First, GDI+ expands on the features of GDI by providing new capabilities, such as gradient brushes and alpha blending. Second, the programming model has been revised to make graphics programming easier and more flexible.

## I) Using GDI+ in MFC applications (unmanaged VC++)

What to include for GDI+? Header files and libraries:

```cpp
#include <gdiplus.h>                      // Base include
using namespace Gdiplus;                  // The "name space"
#pragma comment(lib, "gdiplus.lib")       // The GDI+ binary
```

If you want to initialize GDI+ for your application (by calling `GdiplusStartup` in your `InitInstance` function), you will need to suppress the GDI+ background thread. A good place to call `GdiplusStartup` and the hook notification functions is in an override of the virtual function `CWinApp::Run`, as shown below:

```cpp
int CTestApp::Run()
{
      GdiplusStartupInput gdiSI;
      GdiplusStartupOutput gdiSO;
      ULONG_PTR gdiToken;
      ULONG_PTR gdiHookToken;
      gdiSI.SuppressBackgroundThread = TRUE;
      GdiplusStartup(&gdiToken, &gdiSI, &gdiSO);
      gdiSO.NotificationHook(&gdiHookToken);

      int nRet = CWinApp::Run();

      gdiSO.NotificationUnhook(gdiHookToken);
      GdiplusShutdown(gdiToken);
      return nRet;
}
```

For drawing any shape/image, use the `Graphics` class.

### SDI Example

`CView`'s `OnDraw`:

```cpp
void CGDIPTestView::OnDraw(CDC* pDC)
{
      Graphics graphics(pDC->GetSafeHdc());
      Pen pen(Color(20, 255, 0, 0), 4.0f);
      graphics.DrawLine(&pen, Point(0, 0), Point(100, 100));
}
```

## II) Using GDI+ in managed code

The GDI+ managed class interface (a set of wrappers) is part of the .NET Framework, an environment for building, deploying, and running XML Web services and other applications.

The `System.Drawing` namespace provides access to GDI+ basic graphics functionality.

### C# code example

Paint event handler:

```csharp
private void Form1_Paint(object sender, PaintEventArgs e)
{
    // Create pen.
    Pen blackPen = new Pen(Color.Black, 4.0f);
    // Draw line to screen.
    e.Graphics.DrawLine(blackPen, new Point(0, 0), new Point(100, 100));
}
```
