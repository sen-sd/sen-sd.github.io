---
title: "WebDav Server .Net"
category: tips
date: 2007-10-21
excerpt: "Notes on building a WebDAV server in .NET with HttpListener (no IIS), and authenticating WebDAV via an ISAPI AuthFilt-style filter."
readTime: 2
---

# WebDav Server .Net

I found a site [http://www.ithit.com/](http://www.ithit.com/) for WebDav .Net. Here he implemented server using `HttpListener` class and No IIS is required to run this server.

So we can't write an ASP.NET DAV server.

Write an ISAPI filter, very similar to the "AuthFilt" sample that comes with the IIS resource kit. This (I believe) will allow me to authenticate against any and all requests that come into the IIS server, including the WebDAV requests that I need.

*Originally published on [Sen API](https://senapi.blogspot.com/2007/10/wendav-server-net.html).*
