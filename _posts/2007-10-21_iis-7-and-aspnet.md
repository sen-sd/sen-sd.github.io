---
title: "IIS 7 and ASP.NET"
category: tips
date: 2007-10-21
excerpt: "IIS 7 replaces limited ISAPI extensibility with a modular request pipeline where ASP.NET plugs in as native pipeline modules."
readTime: 4
---

# IIS 7 and ASP.NET

## ASP.NET and IIS 7.0 Integration

IIS 7.0 is one of the products that my team is shipping later this year that I'm most excited about. It is the most significant release of our web-server that we've done since IIS 1.0, and introduces a huge number of improvements for both administrators and developers.

In previous versions of IIS, developers had to write ISAPI extensions/filters to extend the server. In addition to being a royal pain to write, ISAPIs were also limited in how they plugged into the server and in what they allowed developers to customize. For example, you can't implement URL Rewriting code within an ISAPI Extension (note: ASP.NET is implemented as an ISAPI extension). And you end up tying up the I/O threads of the web-server if you write long-running code as an ISAPI Filter (which is why we didn't enable managed code to run in the filter execution phase of a request).

One of the major architectural changes we made to the core IIS processing engine with IIS7 was to enable much, much richer extensibility via a new modular request pipeline architecture. You can now write code anywhere within the lifetime of any HTTP request by registering an HTTP Extensibility Module with the web-server. These extensibility modules can be written using either native C++ code or .NET managed code (you can use the existing ASP.NET `System.Web.IHttpModule` interface to implement this).

All "built-in" IIS7 functionality (authentication, authorization, static file serving, directory listing support, classic ASP, logging, etc) is now implemented using this public modular pipeline API. This means you can optionally remove any of these IIS7 "built-in" features and replace/extend them with your own implementation.

ASP.NET on IIS 7.0 has itself been changed from being implemented as an ISAPI to instead plug in directly as modules within the IIS7 pipeline.

For more information: [MSDN Magazine — IIS 7](http://msdn.microsoft.com/msdnmag/issues/07/03/IIS7/)

*Originally published on [Sen API](https://senapi.blogspot.com/2007/10/iis-7-and-aspnet.html).*
