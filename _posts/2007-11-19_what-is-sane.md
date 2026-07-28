---
title: "What Is SANE?"
category: tips
date: 2007-11-19
excerpt: "SANE (Scanner Access Now Easy) is a Unix/Linux-oriented image-capture API with frontends, backends, and a C API for scanners and cameras."
readTime: 6
---

# What Is SANE?

[**SANE**](http://www.sane-project.org/), an acronym for "Scanner Access Now Easy," is an image-capture API. The API provides standardized access to any raster-image scanner, camera, or other kinds of image-acquisition devices. Version 1.03 is the current version.

An application that uses the SANE interface is called a SANE *frontend*. A driver that implements the SANE interface is called a SANE *backend*. A *meta backend* provides some means to manage one or more other backends.

```c
#include <sane/sane.h>
```

SANE was introduced a few years after [TWAIN](http://www.twain.org/) to support (and standardize) image acquisition on Unix and Linux platforms, because TWAIN could not (and still is not able to) do the job. Although SANE originated for Unix and Linux, it has been ported to Mac OS X, OS/2, and other operating systems.

## SANE API

The SANE API was written in the C language. Just as TWAIN supplies the `twain.h` header file for inclusion in TWAIN-based source code, SANE supplies the `sane.h` header file for inclusion in SANE-based source code.

The `sane.h` header file largely consists of type and function declarations. The type declarations range from simple types, such as `SANE_Bool`, `SANE_Int`, and `SANE_String`, to complex types, such as `SANE_Option_Descriptor`. A total of 14 functions compose the API:

- **`sane_init()`** — Initializes SANE and must be called before any other function.
- **`sane_get_devices()`** — Returns a list of available image-acquisition devices.
- **`sane_open()`** — Opens a named image-acquisition device and returns a handle that must be passed to other API functions used to communicate with the device.
- **`sane_get_option_descriptor()`** — Returns an option descriptor for a specific option (a device parameter). Options describe device controls (such as scan resolution) in a user-interface-independent way and control nearly all aspects of device operation. Option number 0 returns the number of available options.
- **`sane_control_option()`** — Sets/gets the value of a specified option, for the device indicated by a device handle.
- **`sane_start()`** — Initiates image acquisition from a specific device, as indicated by a device handle.
- **`sane_get_parameters()`** — Returns information on scan parameters for the device indicated by a device handle. Scan parameters include pixels per line and bytes per line.
- **`sane_set_io_mode()`** — Enables either blocking or non-blocking I/O for the device indicated by a device handle. This function can be called only after making a call to `sane_start()`.
- **`sane_get_select_fd()`** — Obtains a platform-specific file descriptor from a device handle. This function can only be called after a call has been made to `sane_start()`.
- **`sane_read()`** — Reads image data from an open image-acquisition device, as indicated by a specific device handle. This function can only be called after a call has been made to `sane_start()`.
- **`sane_cancel()`** — Cancels the current operation for the device that is indicated by a device handle.
- **`sane_close()`** — Closes the open image-acquisition device indicated by a specific device handle.
- **`sane_exit()`** — Terminates an application's communication with SANE. The application must call `sane_init()` before it can communicate once more with SANE.
- **`sane_strstatus()`** — Translates a SANE status code into a printable string. Examples of status codes include `SANE_STATUS_DEVICE_BUSY`, `SANE_STATUS_IO_ERROR`, and `SANE_STATUS_CANCELLED`.

An application calls `sane_init()` to begin interacting with SANE. The application next typically calls `sane_get_devices()` to obtain a list of accessible devices. A device will be picked from this list and its name passed to `sane_open()` to open the device. Once the device is open, its controls can be set up or queried. This occurs in a loop, where each iteration invokes `sane_get_option_descriptor()` to obtain a control's descriptor, followed by `sane_control_option()` to query or set up the control.

Device setup is followed by image acquisition. This task begins with a call to `sane_start()`, and continues with a loop where `sane_get_parameters()` and then `sane_read()` are invoked. Image acquisition continues until `sane_read()` returns end-of-file, or the user chooses to terminate image acquisition (assuming the application allows image acquisition to be cancelled), whereby the application invokes `sane_cancel()`. Following image acquisition, `sane_close()` is invoked and the open device is closed. `sane_exit()` is then called to break the application's connection with the SANE back end.

SANE is an application programming interface (API) that provides standardized access to any raster image scanner hardware. The standardized interface allows writing just one driver for each scanner device instead of one driver for each scanner and application. The reduction in the number of required drivers provides significant savings in development time. More importantly, SANE raises the level at which applications can work. As such, it will enable applications that were previously unheard of in the UNIX world. While SANE is primarily targeted at a UNIX environment, the standard has been carefully designed to make it possible to implement the API on virtually any hardware or operating system.

*Originally published on [Sen API](https://senapi.blogspot.com/2007/11/what-is-sane.html).*
