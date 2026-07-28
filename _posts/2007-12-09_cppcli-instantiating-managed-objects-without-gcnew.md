---
title: "C++/CLI: Instantiating Managed Objects without using gcnew"
category: tips
date: 2007-12-09
excerpt: "In C++/CLI you can create ref class instances with stack-like syntax—IL shows both styles still allocate on the managed heap."
readTime: 4
---

# C++/CLI: Instantiating Managed Objects without using gcnew

## Consider a Test class

```cpp
ref class Test
{
public:
    // Trivial scalar property
    property System::String^ Mail;
};
```

## Object Creation using gcnew

Handles and the `gcnew` operator can be used to create instances:

```cpp
int main(array<System::String ^> ^args)
{
    Test ^obj = gcnew Test();
    obj->Mail = "Sen@Swolutions.com";
    System::Console::WriteLine(obj->Mail);
    return 0;
}
```

## Object Creation without gcnew

And without using a handle—this looks like a value type (this is new with Visual Studio 2005 versions after Beta 1):

```cpp
int main(array<System::String ^> ^args)
{
    Test test;
    test.Mail = "Sen@Swolutions.com";
    System::Console::WriteLine(test.Mail);
    return 0;
}
```

We can check the generated IL code!! Both are the same… here both objects are created on the Heap.

```il
.method assembly static int32 main(string[] args) cil managed
{
  // Code size 36 (0x24)
  .maxstack 2
  .locals ([0] class Test test, [1] int32 V_1)
  IL_0000: ldc.i4.0
  IL_0001: stloc.1
  IL_0002: ldnull
  IL_0003: stloc.0
  IL_0004: newobj instance void Test::.ctor()
  IL_0009: stloc.0
  IL_000a: ldloc.0
  IL_000b: ldstr "Sen@Swolutions.com"
  IL_0010: call instance void Test::set_Mail(string)
  IL_0015: ldloc.0
  IL_0016: call instance string Test::get_Mail()
  IL_001b: call void [mscorlib]System.Console::WriteLine(string)
  IL_0020: ldc.i4.0
  IL_0021: stloc.1
  IL_0022: ldloc.1
  IL_0023: ret
} // end of method 'Global Functions'::main
```

*Originally published on [Sen API](https://senapi.blogspot.com/2007/12/ccli-instantiating-managed-objects-with.html).*
