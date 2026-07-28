---
title: "Server.MapPath() / Request.MapPath() ASP.Net"
category: tips
date: 2007-10-31
excerpt: "How Server.MapPath / Request.MapPath map virtual paths like ~, ., and .. to physical filesystem paths."
readTime: 2
---

# Server.MapPath() / Request.MapPath() ASP.Net

```csharp
public string MapPath(string virtualPath);
```

Maps the specified virtual path to a physical path.

| virtualPath | Returns |
| --- | --- |
| `""` | Root Path / Application Path |
| `"~"` | Root Path / Application Path |
| `"."` | Current Request path |
| `".."` | One level back to parent path from current Request Path |
| `"..."` | Two levels back to parent path from current Request Path |

*Originally published on [Sen API](https://senapi.blogspot.com/2007/10/servermappath-requestmappath-aspnet.html).*
