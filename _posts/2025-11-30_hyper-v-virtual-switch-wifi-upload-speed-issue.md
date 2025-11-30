---
title: "Hyper-V Virtual Switch – Wi-Fi Upload Speed Issue"
category: troubleshooting
date: 2025-11-30
excerpt: "Discover how a Hyper-V External Virtual Switch bound to a Wi-Fi adapter can cause upload speed to collapse to 1 Mbps, even when VMs are stopped. Learn the root cause and solutions."
readTime: 8
---

# 📝 Hyper-V Virtual Switch – Wi-Fi Upload Speed Issue

## 🔹 Background — How the issue started

During our project, we set up a Client Application that transfers data to an Azure Ubuntu VM over an Azure VPN connection.

In my PC, small files (around 5 KB) were transferred successfully.

However, even a 2 MB file could not be transferred — the upload would freeze and eventually fail.

### What made this issue confusing:

- The same application worked perfectly in offshore environment
- The same operation worked on my personal PC
- The problem occurred only on my project PC

So my initial assumptions were:

- Maybe the VPN or region was causing the issue
- Maybe my home internet provider was causing the issue

However, both assumptions were incorrect.

That led to a new question:

👉 **Could the issue be caused by Hyper-V?**

## 🔸 Precondition Before Testing

- All Hyper-V Virtual Machines were stopped
- Hyper-V still had an External Virtual Switch
- My system was connected to Wi-Fi (no LAN cable)

## ❗ Finding the Root Cause

When the Hyper-V External Virtual Switch was mapped to my Wi-Fi adapter, internet upload performance collapsed.

Even though VMs were not running, the Virtual Switch alone was enough to take over the Wi-Fi adapter and cause the upload bottleneck.

## 📷 Demonstration — Wi-Fi Virtual Switch Causing Upload Failure

## 🔧 Issue Summary

When a Hyper-V External Virtual Switch is bound to a Wi-Fi adapter, download speed remains acceptable but upload speed drops dramatically to around 1 Mbps, resulting in failed transfers for applications that need continuous upload (VPN, file transfer, cloud backup, etc.)

**Binding the Virtual Switch to a 1G / 2.5G wired Ethernet adapter, or plugging LAN cable while Wi-Fi remains active, resolves the issue completely.**

## 📊 Test Result Summary Table

| Case | Hyper-V Setup Description | Download (Mbps) | Upload (Mbps) | Result |
|------|---------------------------|-----------------|---------------|--------|
| Case 1 | No External Virtual Switch , Wi-Fi connected | 536 | 332 | ✅ No Issue |
| Case 2 | External Virtual Switch bound to Wi-Fi adapter | 402 | 1 ⚠ | ⚠ Upload speed collapse |
| Case 3 | External Virtual Switch bound to 1G Ethernet adapter | 365 | 310 | ✅ No Issue |
| Case 4 | External Virtual Switch bound to 2.5G Ethernet adapter | 626 | 352 | ✅ No Issue |
| Case 5 | Wi-Fi Virtual Switch + LAN cable (2.5G) plugged | 595 | 428 | ✅ No Issue |

## 💡 Solutions

Based on the test results, here are the recommended solutions:

1. **Bind Virtual Switch to Wired Ethernet**: If you have a wired Ethernet adapter available, bind the Hyper-V External Virtual Switch to it instead of the Wi-Fi adapter.

2. **Use Both Connections**: Keep the Wi-Fi Virtual Switch active but plug in a LAN cable. The system will use the wired connection for better performance.

3. **Remove External Virtual Switch When Not Needed**: If you're not actively using VMs, consider removing the External Virtual Switch to restore full Wi-Fi performance.

4. **Use Internal or Private Virtual Switch**: For scenarios where VMs don't need internet access, use Internal or Private Virtual Switch types instead of External.

## 🔍 Why This Happens

The Hyper-V External Virtual Switch creates a network bridge that intercepts network traffic at a low level. When bound to a Wi-Fi adapter, this bridge appears to introduce significant overhead specifically for upload operations, likely due to:

- Additional packet processing in the bridge layer
- Wi-Fi driver compatibility issues with Hyper-V's network virtualization
- Buffer management differences between Wi-Fi and wired adapters

Wired Ethernet adapters handle this bridge overhead much more efficiently, which is why the issue doesn't occur with them.

## ✨ Key Takeaways

- Hyper-V External Virtual Switches can impact network performance even when VMs are stopped
- Wi-Fi adapters are particularly susceptible to upload speed degradation
- Wired Ethernet adapters (1G/2.5G) work reliably with Hyper-V Virtual Switches
- Always test network performance after configuring Hyper-V Virtual Switches

---

*Have you encountered similar Hyper-V networking issues? Share your experience in the comments!*

