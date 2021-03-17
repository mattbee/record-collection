# 3. Use SQL Lite as database

## Status
Accepted

## Context
We need a datastore for the record collections data. To create a CRUD API a database makes most sense.

## Decision
The added complexity of managing storing the records information in file based storage would not be as easy as using a database and Rails Active Record features. SQLLite gives the best of both worlds, a file based database Rails can interact with. It also means that people using this app don't need Postgres installed.

## Consequences
The app using SQL Lite won't be production ready or be suitable for huge amounts of data, but this project at the moment doesn't need either.
