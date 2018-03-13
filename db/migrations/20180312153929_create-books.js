exports.up = async db => {
    await db.schema.createTable('books', t => {
          t.increments('id').unsigned().primary();
          t.string('name').notNull();
          t.string('isbn').notNull();
    })
};

exports.down = async db => {
    await db.schema.dropTableIfExists('books');
}

