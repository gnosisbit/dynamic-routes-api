// Update with your config settings.

module.exports = {

  development: { 
      client: 'mysql',
      connection: {
 	    user     : 'root',
	    password : 'test',
	    database : 'bookstore'
	  }
   },
   devlite:{
     client: 'sqlite3',
     connection: {
	 filename: './dev.sqlite3'
     },
   },
  staging: {
   client: 'mysql',
  connection: {
    user     : 'root',
    password : 'test',
    database : 'bookstore'
  		}
  },

  production: {
  client: 'mysql',
  connection: {
    user     : 'root',
    password : 'test',
    database : 'bookstore'
  		}
  }
 }
