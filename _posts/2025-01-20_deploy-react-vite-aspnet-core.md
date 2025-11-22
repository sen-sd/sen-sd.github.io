---
title: "Deploy React (Vite) Application with ASP.NET Core"
category: tutorial
date: 2025-01-20
excerpt: "Complete guide to deploying Vite-based React applications using npx serve, ASP.NET Core with Kestrel, and IIS + Kestrel reverse proxy setup."
readTime: 10
---

# Deploy React (Vite) Application with ASP.NET Core and `npx serve`

This guide explains how to deploy a **Vite-based React** application using:

- ✅ `npx serve dist` (simple static hosting)  
- ✅ ASP.NET Core with **Kestrel only**  
- ✅ ASP.NET Core with **IIS + Kestrel (reverse proxy)**  

---

## 1. Build the Vite React Application

```bash
cd my-vite-react-app
npm install
npm run build
```

Vite generates a **`dist/`** folder:

```text
dist/
  index.html
  assets/
```

This `dist` folder is what we deploy.

---

## 2. Option 1 – `npx serve dist` (Simple Hosting)

For quick testing or demos:

```bash
npx serve dist
```

The terminal will show something like:

```text
Serving!
- Local: http://localhost:3000
```

✅ Good for:  
- Local testing  
- Demo to team  

⚠️ Not recommended for production.

---

## 3. Option 2 – ASP.NET Core with Kestrel (No IIS)

Kestrel is the **built-in web server** for ASP.NET Core.  
This option is good for **Linux servers**, Docker, or even Windows without IIS.

### 3.1 Create ASP.NET Core project

```bash
dotnet new web -o ReactViteHost
cd ReactViteHost
```

### 3.2 Copy Vite build output

Copy **all files** from your Vite project:

```text
my-vite-react-app/dist/*
```

Into ASP.NET Core `wwwroot`:

```text
ReactViteHost/wwwroot/
```

### 3.3 Enable static hosting and SPA fallback

In `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();       // serves index.html by default
app.UseStaticFiles();        // serves files from wwwroot

// SPA fallback for React Router
app.MapFallbackToFile("/index.html");

app.Run();                   // Kestrel starts here
```

### 3.4 Run with Kestrel

```bash
dotnet run
```

By default, Kestrel listens on something like:

- `http://localhost:5000`  
- `https://localhost:5001` (if HTTPS enabled)

You can configure ports in `appsettings.json` or environment variables (e.g. `ASPNETCORE_URLS`).

✅ Good for:
- Linux servers  
- Docker containers  
- Simple Windows service hosting (no IIS)

---

## 4. Option 3 – ASP.NET Core with IIS + Kestrel

On Windows Server, the **recommended production setup** is:

> IIS (reverse proxy) ➜ Kestrel (ASP.NET Core app)

IIS handles:
- HTTPS termination  
- Logging  
- Process recycling / restart  
- Windows integrations

Kestrel runs the actual ASP.NET Core app.

### 4.1 Prerequisites

- Windows Server / Windows 10/11 with **IIS** installed  
- **ASP.NET Core Hosting Bundle** installed (so IIS can run ASP.NET Core apps)

### 4.2 Publish the ASP.NET Core app

From `ReactViteHost`:

```bash
dotnet publish -c Release -o ./publish
```

Folder structure (simplified):

```text
publish/
  wwwroot/
    index.html
    assets/
  ReactViteHost.dll
  web.config
  ...
```

> If `web.config` is not generated, you can create a basic one, but templates usually add it.

### 4.3 Create IIS Site

1. Open **IIS Manager**  
2. Right-click **Sites → Add Website…**  
3. Set:
   - **Physical path** → `publish` folder  
   - **Port** → e.g. `80` or `443`  
4. Ensure **Application Pool** is using **No Managed Code** (for ASP.NET Core).

IIS will:

- Receive HTTP/HTTPS requests  
- Forward them to Kestrel via the ASP.NET Core Module (configured in `web.config`)  
- Restart the app if it crashes

✅ Good for:
- Enterprise environments  
- When you already use IIS  
- Standard Windows Server operations

---

## 5. Summary

| Method                        | Server         | Use Case                              |
|------------------------------|----------------|---------------------------------------|
| `npx serve dist`             | Node tool      | Local testing, quick demo             |
| ASP.NET Core + Kestrel       | Kestrel        | Linux/Docker/Windows no-IIS hosting   |
| ASP.NET Core + IIS + Kestrel | IIS + Kestrel  | Production on Windows Server          |

---

## Best Practices

- **Development**: Use `npx serve dist` for quick testing
- **Linux/Docker**: Use ASP.NET Core with Kestrel only
- **Windows Production**: Use IIS + Kestrel for enterprise-grade hosting
- **SPA Routing**: Always configure `MapFallbackToFile` for React Router support
- **HTTPS**: Enable HTTPS in production for security

This approach gives you flexibility to deploy your Vite React application in various environments while leveraging ASP.NET Core's robust hosting capabilities.

