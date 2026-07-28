---
title: "How to disable WebDAV for IIS 5.0"
category: tips
date: 2007-10-22
excerpt: "Disable WebDAV on IIS 5.0 by adding the DisableWebDAV DWORD registry value under W3SVC Parameters and restarting IIS."
readTime: 2
---

# How to disable WebDAV for IIS 5.0

1. Start Registry Editor (`Regedt32.exe`).
2. Locate and click the following key in the registry:

   `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W3SVC\Parameters`

3. On the Edit menu, click Add Value, and then add the following registry value:

   - **Value name:** `DisableWebDAV`
   - **Data type:** `DWORD`
   - **Value data:** `1`

4. Restart IIS. This change does not take effect until the IIS service or the server is restarted.

*Originally published on [Sen API](https://senapi.blogspot.com/2007/10/how-to-disable-webdav-for-iis-50.html).*
