exports.up = function(knex, Promise) {
  return knex.schema.createTable("jobs", function(tbl) {
    // make changes to the table using the tbl object passed as a parameter

    // primary key
    tbl.increments(); // generate and id field and make it autoincfement and the primary key

    // other fields
    tbl.string("title", 255).notNullable();

    tbl.string("salary").notNullable();

    tbl.string("topSkills", 128);

    tbl.string("addSkills", 203);

    tbl.string("familiar", 128);

    tbl.string("description", 4000).notNullable();

    tbl.string("requirements", 5000);

    tbl.boolean("active").defaultTo(true);

    tbl.boolean("college_Degree").defaultTo(false);

    tbl
      .timestamp("created_at")
      .defaultTo(knex.raw("now()"))
      .notNullable();

    //foreign key to users DB
    tbl
      .integer("users_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("jobs");
};
