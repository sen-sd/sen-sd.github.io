---
title: "Understanding LD_PRELOAD: Runtime API Interception in Linux"
category: tips
date: 2023-04-18
excerpt: "How LD_PRELOAD lets you intercept dynamically linked APIs like fopen64() at runtime—with symbol resolution, an example hook, build steps, and limitations."
readTime: 8
---

# Understanding LD_PRELOAD: Runtime API Interception in Linux

**Category:** Linux | Debugging | Dynamic Linking | System Programming

## Introduction

Linux provides several powerful mechanisms for debugging and analyzing applications without modifying their source code. One of the most useful techniques is `LD_PRELOAD`, which enables developers to intercept dynamically linked library functions at runtime.

Using `LD_PRELOAD`, you can insert your own implementation of functions such as `fopen()`, `read()`, `write()`, `connect()`, and many others. This makes it an invaluable tool for debugging, performance monitoring, logging, security auditing, and runtime instrumentation.

## What is LD_PRELOAD?

`LD_PRELOAD` is an environment variable recognized by the Linux dynamic linker (`ld.so`).

When set, it instructs the dynamic linker to load one or more shared libraries before loading the standard shared libraries required by the application.

As a result, if your shared library exports a function with the same name as a library function (for example `fopen64()`), your implementation is used instead of the original one.

This technique is commonly known as:

- Runtime Function Interposition
- Symbol Interposition
- API Hooking
- Dynamic Library Interception

## Execution Flow

### Normal Execution (Without LD_PRELOAD)

```text
Application
      │
      ▼
File Open API (fopen/ifstream)
      │
      ▼
Original libc API
      │
      ▼
File System
```

**Characteristics**

- Original API executes normally.
- No interception.
- No additional logging or monitoring.

### Execution with LD_PRELOAD

```text
Application
      │
      ▼
File Open API
      │
      ▼
Custom API (libpreload.so)
      │
      ├──────────────► Original fopen()
      │
      └──────────────► Execute Custom Logic
```

The custom implementation may:

- Log function calls
- Modify parameters
- Validate requests
- Redirect execution
- Block operations
- Call another API
- Call the original implementation

## How Symbol Resolution Works

Suppose your application executes:

```cpp
std::ifstream file("sample.txt");
```

Although your application uses C++ streams, internally the C++ runtime eventually invokes low-level C library functions such as:

- `fopen64()`
- `read()`
- `close()`

When `LD_PRELOAD` is used, the dynamic linker first searches your shared library before searching the standard C library.

## Debugging Dynamic Linking

Linux provides another useful environment variable:

```bash
export LD_DEBUG=all
```

Running the application with:

```bash
LD_DEBUG=all LD_PRELOAD=./libpreload.so ./application
```

prints detailed symbol lookup information.

Example:

```text
symbol=fopen64; lookup in file=./application
symbol=fopen64; lookup in file=./libpreload.so
symbol=fopen64; lookup in file=/lib/x86_64-linux-gnu/libstdc++.so.6
symbol=fopen64; lookup in file=/lib/x86_64-linux-gnu/libgcc_s.so.1
symbol=fopen64; lookup in file=/lib/x86_64-linux-gnu/libpthread.so.0
symbol=fopen64; lookup in file=/lib/x86_64-linux-gnu/libc.so.6
```

This output shows that `libpreload.so` is searched before `libc`, allowing the custom implementation to intercept the call.

## Example Hook

```cpp
#define _GNU_SOURCE
#include <stdio.h>
#include <dlfcn.h>

extern "C"
FILE* fopen64(const char* filename, const char* mode)
{
    printf("Intercepted : %s\n", filename);

    typedef FILE* (*orig_fopen64)(const char*, const char*);

    orig_fopen64 real_fopen64 =
        (orig_fopen64)dlsym(RTLD_NEXT, "fopen64");

    return real_fopen64(filename, mode);
}
```

The important part is:

```cpp
dlsym(RTLD_NEXT, "fopen64");
```

which retrieves the next occurrence of `fopen64()` in the library search order, allowing your hook to invoke the original implementation.

## Building the Shared Library

Compile the interceptor:

```bash
g++ -shared -fPIC preload.cpp -o libpreload.so -ldl
```

Compile your application normally:

```bash
g++ main.cpp -o application
```

Run using `LD_PRELOAD`:

```bash
LD_PRELOAD=./libpreload.so ./application
```

Run with linker debugging:

```bash
LD_DEBUG=all LD_PRELOAD=./libpreload.so ./application
```

## Common Use Cases

- Debugging applications
- Monitoring file operations
- Network API interception
- Performance profiling
- Security auditing
- Reverse engineering
- Runtime instrumentation
- Logging without changing application code
- Testing alternate implementations

## Advantages

- No source code modification
- No application recompilation
- Easy to enable or disable
- Powerful runtime instrumentation
- Works with most dynamically linked applications

## Limitations

- Only works with dynamically linked libraries.
- Does not intercept statically linked binaries.
- Setuid/setgid executables typically ignore `LD_PRELOAD` for security reasons.
- Some functions may bypass libc and invoke system calls directly, making them harder to intercept with this technique.

## Summary

`LD_PRELOAD` is one of the most powerful debugging and instrumentation techniques available on Linux. By loading a custom shared library before the standard system libraries, developers can intercept dynamically linked function calls, inspect or modify behavior, and optionally forward execution to the original implementation.

When combined with `LD_DEBUG`, it also provides deep visibility into how the Linux dynamic linker resolves symbols, making it an essential tool for debugging, reverse engineering, and runtime analysis.
