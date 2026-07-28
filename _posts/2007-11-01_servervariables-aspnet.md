---
title: "ServerVariables ASP.Net"
category: tips
date: 2007-11-01
excerpt: "Read IIS/ASP.NET server variables such as LOGON_USER, and list every ServerVariables key and value in a simple ASPX table."
readTime: 3
---

# ServerVariables ASP.Net

For example if we want to get the logged current user:

```csharp
string UserName = Request.ServerVariables["LOGON_USER"];
```

## Server Variable names

| Server Variable |
| --- |
| ALL_HTTP |
| ALL_RAW |
| APPL_MD_PATH |
| APPL_PHYSICAL_PATH |
| AUTH_TYPE |
| AUTH_USER |
| AUTH_PASSWORD |
| LOGON_USER |
| REMOTE_USER |
| CERT_COOKIE |
| CERT_FLAGS |
| CERT_ISSUER |
| CERT_KEYSIZE |
| CERT_SECRETKEYSIZE |
| CERT_SERIALNUMBER |
| CERT_SERVER_ISSUER |
| CERT_SERVER_SUBJECT |
| CERT_SUBJECT |
| CONTENT_LENGTH |
| CONTENT_TYPE |
| GATEWAY_INTERFACE |
| HTTPS |
| HTTPS_KEYSIZE |
| HTTPS_SECRETKEYSIZE |
| HTTPS_SERVER_ISSUER |
| HTTPS_SERVER_SUBJECT |
| INSTANCE_ID |
| INSTANCE_META_PATH |
| LOCAL_ADDR |
| PATH_INFO |
| PATH_TRANSLATED |
| QUERY_STRING |
| REMOTE_ADDR |
| REMOTE_HOST |
| REMOTE_PORT |
| REQUEST_METHOD |
| SCRIPT_NAME |
| SERVER_NAME |
| SERVER_PORT |
| SERVER_PORT_SECURE |
| SERVER_PROTOCOL |
| SERVER_SOFTWARE |
| URL |
| HTTP_CONNECTION |
| HTTP_ACCEPT |
| HTTP_ACCEPT_ENCODING |
| HTTP_ACCEPT_LANGUAGE |
| HTTP_AUTHORIZATION |
| HTTP_HOST |
| HTTP_USER_AGENT |

## Example to get All Server Variables and their values (ASP.NET)

```aspx
<form id="form1" runat="server">
  <div></div>
  <table style="width: 512px; height: 51px" border="1" bordercolor="#ff3366">
    <tr>
      <td style="width: 126px; text-align: center;"><strong>Server Variable</strong></td>
      <td style="width: 143px; text-align: center;"><strong>Value</strong></td>
    </tr>
    <%
      string[] strkey = Request.ServerVariables.AllKeys;
      for (int nCount = 0; nCount < strkey.Length; ++nCount)
      {
    %>
    <tr>
      <td style="width: 126px"><%= strkey[nCount] %></td>
      <td style="width: 143px"><%= Request.ServerVariables[strkey[nCount]] %></td>
    </tr>
    <%
      }
    %>
  </table>
</form>
```

*Originally published on [Sen API](https://senapi.blogspot.com/2007/11/servervariables-aspnet_01.html).*
