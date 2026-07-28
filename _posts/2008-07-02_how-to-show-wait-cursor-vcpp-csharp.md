---
title: "How to Show a wait cursor - VC++, C#"
category: tips
date: 2008-07-02
excerpt: "Several ways to show an hourglass wait cursor during long operations in MFC (CWaitCursor, CCmdTarget, DoWaitCursor) and C# Windows Forms."
readTime: 5
---

# How to Show a wait cursor - VC++, C#

When my project mate (Omar) asked me about wait cursor (for a search process), I suddenly started implementing using `LoadCursor` and `SetCursor`.

In main frame I loaded wait cursor:

```cpp
HCURSOR m_hWaitCursor = ::LoadCursor(NULL, IDC_WAIT);
```

After this I added a message map for `WM_SETCURSOR` in the main frame:

```cpp
BOOL CMainFrame::OnSetCursor(CWnd* pWnd, UINT nHitTest, UINT message)
{
    if (NULL != m_hWaitCursor && true == m_bShowWaitCursor)
    {
        m_hPreviousCursor = ::SetCursor(m_hWaitCursor);
        return TRUE;
    }
    else
    {
        return CDialog::OnSetCursor(pWnd, nHitTest, message);
    }
}
```

Finally I felt it was hard to manage this, and thought about building a custom singleton class which can be called from anywhere. After a short time Omar got some information about `CWaitCursor`, and I stopped writing a custom class.

I got following information from MSDN: Good Windows programming practices require that you display a wait cursor whenever you're performing an operation that takes a noticeable amount of time.

## Method 1: Using CWaitCursor class

Provides a one-line way to show a wait cursor, which is usually displayed as an hourglass, while you're doing a lengthy operation.

When the object goes out of scope (at the end of the block in which the `CWaitCursor` object is declared), its destructor sets the cursor to the previous cursor. In other words, the object performs the necessary clean-up automatically.

```cpp
void SomeLengthyProcess()
{
    CWaitCursor wait;
    // Do the lengthy processing.
    Sleep(1000);
    AfxMessageBox(_T("Some result")); // This changes the cursor.
    wait.Restore(); // Restore the Wait cursor.
    // Continue lengthy processing.
    Sleep(1000);
    // The destructor changes the cursor back to Regular cursor.
}
```

## Method 2: Using CCmdTarget class

```cpp
void CwaitTestDlg::SomeLengthyProcess()
{
    CCmdTarget::BeginWaitCursor(); // display the hourglass cursor
    Sleep(1000);
    CCmdTarget::RestoreWaitCursor();
    CCmdTarget::EndWaitCursor(); // remove the hourglass cursor
}
```

## Method 3: Using CWinApp::DoWaitCursor

```cpp
virtual void DoWaitCursor(int nCode);

void SomeLengthyProcess()
{
    AfxGetApp()->DoWaitCursor(1); // display the hourglass cursor
    // do some lengthy processing
    Sleep(1000);
    // The message box will normally change the cursor to
    // the standard arrow cursor, and leave the cursor in
    // as the standard arrow cursor when the message box is
    // closed.
    AfxMessageBox(_T("DoWaitCursor Sample"));
    // Call DoWaitCursor with parameter 0 to restore
    // the cursor back to the hourglass cursor.
    AfxGetApp()->DoWaitCursor(0);
    // do some more lengthy processing
    Sleep(1000);
    AfxGetApp()->DoWaitCursor(-1); // remove the hourglass cursor
}
```

## Show a wait cursor in C#

### Example 1: Using UseWaitCursor property in System.Windows.Forms.Control

```csharp
// method in Form derived class.
private void SomeLengthyProcess() // not working.
{
    this.UseWaitCursor = true;
    System.Threading.Thread.Sleep(1000); // Alternative for Sleep() in VC++
    this.UseWaitCursor = false;
}
```

But the above code is not working. So I started searching and found another method.

### Example 2: Using Cursor property in System.Windows.Forms.Control

```csharp
private void SomeLengthyProcess() // working.
{
    Cursor currentCursor = this.Cursor;
    this.Cursor = Cursors.WaitCursor;
    System.Threading.Thread.Sleep(1000);
    this.Cursor = currentCursor;
}
```

### Example 3: Using UseWaitCursor property in System.Windows.Forms.Application

```csharp
private void SomeLengthyProcess() // not working.
{
    Application.UseWaitCursor = true;
    System.Threading.Thread.Sleep(1000);
    Application.UseWaitCursor = false;
}
```

*Originally published on [Sen API](https://senapi.blogspot.com/2008/07/how-to-show-wait-cursor-vc-c_02.html).*
