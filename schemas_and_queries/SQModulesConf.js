module.exports ={
                "books": {  
                    modulename:"books",
                    parentmodule:1,
                    Schema: //buildSchema(
            `             type Book {
                            id: ID
                            name: String
                            isbn: String
                          }
                          type Query {
                            books(id: ID): [Book]
                     }`,
                    Query: `{
                                    books {
                                            name
                                            isbn
                                         }
                                }`
                        },//bookcontents
              
                "book": {  
                    modulename:"books",
                    parentmodule:0,
                    Schema: //buildSchema( 
                       `type Book {
                            id: ID
                            name: String
                            isbn: String
                          }
                          type Query {
                            book(id: ID): Book
                          }`,
 
                    Query: `{
                                    book {
                                            name
                                            isbn
                                         }
                                }`
                        },//bookcontents
              
              
 };
 