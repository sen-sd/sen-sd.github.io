---
title: "Microsoft Defender on Linux and pfSense"
category: insights
date: 2026-06-01
excerpt: "Microsoft Defender for Endpoint works on Ubuntu and other supported Linux distributions, but not on pfSense (FreeBSD). Here’s how to use both together."
readTime: 4
---

## Overview

**Microsoft Defender for Endpoint** can be installed on supported Linux distributions such as **Ubuntu**.

However, it **cannot** be installed directly on **pfSense**, because pfSense is based on **FreeBSD**, not Linux. Microsoft Defender for Endpoint does not provide a supported agent for FreeBSD/pfSense.

## What This Means in Practice

| Platform | Defender for Endpoint |
| -------- | --------------------- |
| **Ubuntu / supported Linux** | ✅ Supported — agent can be installed |
| **pfSense (FreeBSD)** | ❌ Not supported — no FreeBSD/pfSense agent |

## Recommended Approach

Use both tools for what they do best:

1. **Install Microsoft Defender for Endpoint** on an **Ubuntu server** running **behind pfSense**.
2. Let **pfSense** continue to provide **firewall and network security** functions.

This way you get endpoint protection on Linux servers, while pfSense handles the network edge.

## Summary

- Defender works on **Linux** (e.g. Ubuntu).
- Defender does **not** work on **pfSense/FreeBSD**.
- Run Defender on Ubuntu behind pfSense, and keep pfSense as your firewall and network security layer.
