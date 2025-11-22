---
title: "How to Deploy an ASP.NET Application to Production Environment"
category: tutorial
date: 2024-10-22
excerpt: "Learn how to deploy ASP.NET applications as Windows Services for reliable, automatic startup in production environments without manual intervention."
readTime: 8
---

# 🏁 How We Can Deploy an ASP.NET Application to a Production Environment

When developing locally, it's common to start an ASP.NET application manually, like:

```cmd
set ASPNETCORE_ENVIRONMENT=Dev
ProxyClient.exe
```

But in **production**, you don't want to log into the machine and run commands manually.  
Your application should:

- ✅ Start automatically when Windows boots  
- ✅ Run even if no user logs in  
- ✅ Use the correct environment (`Dev`, `Stage`, `Prod`, etc.)  
- ✅ Restart automatically if it stops  

This guide explains how to deploy an ASP.NET application as a **Windows Service**, the most reliable method for on-premise production environments.

---

## ✅ Why Use a Windows Service?

A Windows Service provides:

- Automatic startup on boot  
- No console window or login required  
- Easy control via Windows Service Manager  
- More stable than Task Scheduler  
- Ideal for background agents and APIs  

Perfect for PC deployments, hospital systems, factories, and secure environments.

---

## 📁 Step 1 — Place Your Application in a Stable Directory

Create a permanent location such as:

```
C:\Apps\ProxyClient
```

Copy **published** output files into it:

```
ProxyClient.exe
appsettings.json
logs/
runtime files
```

> ✅ Tip: publish using  
> `dotnet publish -c Release`

---

## 🌍 Step 2 — Set the Environment Variable Permanently

Instead of using `set` (temporary), define it at the **machine level**.

Open **PowerShell as Administrator**:

```powershell
[System.Environment]::SetEnvironmentVariable(
    "ASPNETCORE_ENVIRONMENT",
    "Dev",
    "Machine"
)
```

### ✅ Benefits

- Persists after reboot  
- Automatically inherited by services  
- No manual typing required

Verify using:

```powershell
echo $Env:ASPNETCORE_ENVIRONMENT
```

---

## ⚙️ Step 3 — Create the Windows Service

Run in **PowerShell (Admin):**

```powershell
New-Service `
  -Name "ProxyClientService" `
  -BinaryPathName "C:\Apps\ProxyClient\ProxyClient.exe" `
  -DisplayName "Proxy Client Service" `
  -Description "Runs ProxyClient automatically on system startup" `
  -StartupType Automatic
```

Start the service:

```powershell
Start-Service ProxyClientService
```

### 🛠 Service Control Commands

```powershell
Stop-Service ProxyClientService
Start-Service ProxyClientService
Restart-Service ProxyClientService
```

Or using:

```
services.msc
```

---

## 🔧 Optional — Set Environment Only for This Service

### 1) Create the service

```powershell
sc.exe create ProxyClientService binPath= "C:\Apps\ProxyClient\ProxyClient.exe" start= auto
```

### 2) Add service-specific environment variable

```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Services\ProxyClientService" /v Environment /t REG_MULTI_SZ /d "ASPNETCORE_ENVIRONMENT=Dev"
```

### 3) Restart the service

```powershell
sc.exe stop ProxyClientService
sc.exe start ProxyClientService
```

Useful when multiple services require different environments.

---

## 🟡 Why Not Use Task Scheduler?

Task Scheduler *can* start apps, but:

- ❌ Not reliable for long-running background services  
- ❌ Limited recovery options  
- ❌ May depend on user login  

Use only for testing — **not production**.

---

## 📝 Summary

Deploying ASP.NET applications as Windows Services provides:

- **Reliability**: Automatic startup and recovery
- **Security**: Runs without user login
- **Maintainability**: Easy management via Service Manager
- **Production-ready**: Suitable for enterprise environments

This approach ensures your application runs continuously and automatically, making it ideal for production deployments in hospitals, factories, and other critical environments.

