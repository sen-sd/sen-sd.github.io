---
title: "Creating / Editing Icon using Visual Studio"
category: tips
date: 2008-07-07
excerpt: "Why a custom form icon may not show at runtime, how the ICO format stores multiple sizes and color depths, and how to edit icon image types in Visual Studio 2008."
readTime: 4
---

# Creating / Editing Icon using Visual Studio

Today Vivek created a C# Windows application and he created a new ICON using Visual Studio. He applied the same icon to the Form, but after running the application we can't see any change. I tried different scenarios, but no chance. So I decided to study about Icon format.

## Icon Format

The ICO file format is an image file format used for icons in Microsoft Windows. The icon files can contain more than one image with multiple sizes and colour depths. This is why it's so useful in some situations. When Windows shows the file list it checks the viewing settings and then determines which images to extract from the files' icons. When, for instance, a user looks at a file list with small icons, Windows extracts the images with the dimension 16x16 pixels from the icons. Also if Windows can show only 256 colors (8 bpp) it searches for images with 256 colors. However, if Windows can't find the appropriate image it chooses the closest one that fits the description.

## Creating / Editing Icon using Visual Studio

As earlier told, editing an Icon means edit all Images inside the icon. In the Image Menu we can select Current Icon image type, delete the current image type, and also we can insert a new image type. After selecting the current image type we can start editing. VS2008 provides a good UI for Editing Icons. There is an additional option for selecting image type, which is not in early versions of VS.

Following figure shows different **New Image Type** dialog boxes.

![Visual Studio New Image Type dialog boxes](/assets/images/2008-07-07_creating-editing-icon/visualstudio-icon-new-image-type.jpg)

*Originally published on [Sen API](https://senapi.blogspot.com/2008/07/creating-editing-icon-using-visual.html).*
