
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        // make changes to the table using the tbl object passed as a parameter
    
        // primary key
        tbl.increments(); // generate and id field and make it autoincfement and the primary key
    
        // other fields
        tbl.string('first-name', 255);

        tbl.string('last-name', 255);

        tbl.string('email', 128);
        
        tbl.string('company-name', 255);
        
        tbl.string('password', 128)

        tbl.string('summary', 500);
        
        tbl.string('application-inbox', 128);
        
        tbl.blob('avatar-image');

        tbl.integer('balance');

        tbl
            .boolean('unlimited')
            .defaultTo( false )

        tbl.timestamps(true, true);
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
