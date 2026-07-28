---
title: "How to create Auto Increment column in SQL Server"
category: tips
date: 2008-03-09
excerpt: "Use IDENTITY to get auto-increment columns in SQL Server, reset identity with DBCC CHECKIDENT, and insert explicit values with SET IDENTITY_INSERT."
readTime: 5
---

# How to create Auto Increment column in SQL Server

In Access and MySQL there is Auto increment data type, but in MS SQL Server there is no Auto increment data type. But we can assign a column like Auto increment.

Example:

```sql
CREATE TABLE MyTable
(
    User_ID bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED,
    UserName varchar(50) NOT NULL
)
```

`IDENTITY(Identity Seed, Identity Increment)`

- The **Identity Seed** is the value of the first entry in the table.
- The **Identity Increment** is the value that will be added to the previous row to get the next identity value.

If you are using a designer tool like **SQL Server Enterprise Manager** or **Visual Studio 2005**, then you should change Identity Property to **YES** (by default it is **NO**). Check the Identity checkbox and the Identity Seed and Identity Increment will be set to 1 automatically.

![SQL Server Identity property in Visual Studio](/assets/images/2008-03-09_auto-increment-sql-server/auto-increment-sql-server.jpg)

> Without knowing this property we are forced to calculate the **next primary** value by using **max** or any other technique.

## Problem with auto increment

- We have no idea about what is the next ID.
- Auto Increment value never resets to 1 after deleting all rows from a table (but we can reset).

## Resetting current identity value

```sql
DBCC CHECKIDENT ('TableName', RESEED, 0)
```

```sql
DBCC CHECKIDENT (
    'table_name'
    [ , { NORESEED | { RESEED [ , new_reseed_value ] } } ]
)
```

**Arguments**

- `table_name` — Is the name of the table for which to check the current identity value. Table names must conform to the rules for identifiers. The table specified must contain an identity column.
- `NORESEED` — Specifies that the current identity value should not be corrected.
- `RESEED` — Specifies that the current identity value should be corrected.
- `new_reseed_value` — Is the value to use in reseeding the identity column.

## Inserting Explicit Values into an Identity Column

If you want to insert a value into an identity column you can use the `SET IDENTITY_INSERT` statement.

```sql
SET IDENTITY_INSERT MyTable ON
INSERT INTO dbo.MyTable (User_ID, UserName) Values(1, 'Sen SD')
SET IDENTITY_INSERT MyTable OFF
```

You can only turn on `IDENTITY_INSERT` for one table per session so it's always a good idea to turn it off when you're done with it.

*Originally published on [Sen API](https://senapi.blogspot.com/2008/03/how-to-create-auto-increment-column-in_09.html).*
