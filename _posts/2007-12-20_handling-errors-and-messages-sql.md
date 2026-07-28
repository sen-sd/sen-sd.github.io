---
title: "Handling Errors and Messages in Applications SQL"
category: tips
date: 2007-12-20
excerpt: "How SQL Server returns errors vs messages, SqlClient SqlException and InfoMessage handling, and a RAISERROR stored procedure example."
readTime: 4
---

# Handling Errors and Messages in Applications SQL

## MS SQL

The Database Engine can return information to the caller in one of two ways:

### 1) Errors

- The errors from `sys.messages` with a severity of 11 or higher.
- Any `RAISERROR` statement with a severity of 11 or higher.

### 2) Messages

- The output of the `PRINT` statement.
- The output of several `DBCC` statements.
- The errors from `sys.messages` with a severity of 10 or lower.
- Any `RAISERROR` statement with a severity of 10 or lower.

## SqlClient Error Handling

The SqlClient managed provider throws an `SqlException` exception when an unhandled error is raised by the SQL Server Database Engine. Through the `SqlException` class, applications can retrieve information about errors produced on the server side, including error number, error message, error severity, and other exception context information.

For processing warnings or informational messages sent by the SQL Server Database Engine, applications can create a `SqlInfoMessageEventHandler` delegate to listen for the `InfoMessage` event on the `SqlConnection` class. Similar to the exception case, message context information such as severity and state are passed as arguments to the callback.

## Raising Error message – stored procedure Example

```sql
ALTER PROCEDURE dbo.SenTest
(
    @unserId int,
    @returnValue varchar OUTPUT
)
AS
/* SET NOCOUNT ON */
RAISERROR (
    N'This is message %s %d.', -- Message text.
    11, -- Severity Levels 11 through 16
        -- These messages indicate errors that can be corrected by the user.
    1, -- State
    N'number', -- First argument.
    5); -- Second argument.
RETURN 0
```

*Originally published on [Sen API](https://senapi.blogspot.com/2007/12/handling-errors-and-messages-in.html).*
