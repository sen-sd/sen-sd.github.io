---
title: "RDMA Data Transfer Challenges in Windows and Solution"
category: tips
date: 2023-08-18
excerpt: "Why Windows RDMA with Libfabric struggles with DMA physical memory, and how a kernel driver that maps locked contiguous buffers into user space enables fi_send()."
readTime: 5
---

# RDMA Data Transfer Challenges in Windows and Solution

## Overview

High-performance applications using RDMA (Remote Direct Memory Access) require data to be transferred directly from hardware memory with minimal CPU involvement. In Windows, this is challenging because hardware DMA buffers reside in physical memory, while RDMA libraries such as Libfabric operate on user-mode virtual memory.

## Challenges

- Windows applications cannot directly access physical memory addresses.
- Libfabric registers virtual memory, not physical memory.
- DMA buffers must remain fixed (non-pageable) during the transfer.
- Standard user-mode memory allocation is not suitable for hardware DMA-based RDMA communication.

## Solution

A Windows kernel-mode driver is required to bridge the gap between hardware DMA memory and the RDMA application.

The driver should:

- Allocate contiguous physical memory for DMA.
- Lock the memory to prevent paging.
- Map the physical memory into the application's virtual address space.
- Return the mapped virtual address to the RDMA application.
- Notify the application when the DMA transfer is complete.

This can be achieved by:

- Developing a new Windows driver, or
- Modifying the existing device driver to support DMA memory allocation and user-mode mapping.

After mapping, the RDMA application registers the virtual address with Libfabric and performs the RDMA transfer using `fi_send()`.

## Proposed Data Flow

```text
PCIe Scanner Device
        │
        ▼
Windows Driver
 • Allocate contiguous DMA memory
 • Lock physical memory
 • Map to user virtual address
        │
        ▼
RDMA Application
 • Register mapped memory with Libfabric
 • Wait for DMA completion
 • fi_send()
        │
        ▼
Libfabric
        │
        ▼
RDMA Network
        │
        ▼
Linux RDMA Server
```
