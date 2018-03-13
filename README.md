# dynamic-routes-api
A simple dynamic route,scalable api using node graphql mysql and knex tutorial

### Installation
1. Clone this to a local folder 
2. Run `npm install` in the local folder

## Configuration and database setup
1. Update database configuration on `config.js`. Set user,pass,db.
2. Log into the MySQL terminal, and ceate the database: CREATE DATABASE Bookstore;
3. knex migrate:latest

## Start
npm start || nodemon start

## Test
1. All: http://localhost:3000/api/v1/module/books (browser)
2. Get: http://localhost:3000/api/v1/module/book/2 (browser)
3. Create: curl -X POST -H "Content-Type: application/json" -d '{"name":"Lord of the Fries","isbn":"som3isbnvalu3"}' http://localhost:3000/api/v1/module/books (console)
4. Update: curl -X PUT -H "Content-Type: application/json" -d '{"name":"Lord of the Flies","isbn":"978-0-39-950148-7"}' http://localhost:3000/api/v1/module/book/4 (console)
5. Delete: curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/api/v1/module/book/2 (console)

Inspired by https://medium.com/@alexanderleon/creating-a-scalable-api-using-node-graphql-mysql-and-knex-710a1a475ff4