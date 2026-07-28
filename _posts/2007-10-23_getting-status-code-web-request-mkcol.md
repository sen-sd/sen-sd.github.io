---
title: "Getting Status Code of a Web Request MKCOL"
category: tips
date: 2007-10-23
excerpt: "Catch WebException from an HttpWebRequest MKCOL call and inspect HttpWebResponse.StatusCode such as 405."
readTime: 2
---

# Getting Status Code of a Web Request "MKCOL"

```csharp
try
{
    System.Net.HttpWebRequest Request =
        (System.Net.HttpWebRequest)HttpWebRequest.Create(folderURI);
    Request.Method = "MKCOL";
    System.Net.HttpWebResponse Response =
        (System.Net.HttpWebResponse)Request.GetResponse();
}
catch (WebException ex)
{
    HttpWebResponse response = (HttpWebResponse)ex.Response;
    if (response.StatusCode == HttpStatusCode.MethodNotAllowed) // 405
    {
        Console.WriteLine(
            "The MKCOL method can only be performed on a deleted or non-existent resource.");
    }
}
```

*Originally published on [Sen API](https://senapi.blogspot.com/2007/10/getting-status-code-of-web-request.html).*
