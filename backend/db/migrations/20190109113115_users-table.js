exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    // make changes to the table using the tbl object passed as a parameter

    // primary key
    tbl.increments(); // generate and id field and make it autoincfement and the primary key

    // Firebase user id
    tbl
      .string("user-uid", 255)
      .notNullable()
      .unique();

    // other fields
    tbl.string("first-name", 255).notNullable();

    tbl.string("last-name", 255).notNullable();

    tbl
      .string("email", 128)
      .unique()
      .notNullable();

    tbl.string("company-name", 255).notNullable();

    tbl.string("summary", 500).notNullable();

    // if string is email --> mailto
    // if string is url --> redirect to new window
    tbl.string("application-method", 128).notNullable();

    tbl.blob("avatar-image");

    tbl.integer("balance").notNullable();

    tbl
      .boolean("unlimited")
      .notNullable()
      .defaultTo(false);

    tbl.timestamp("expiration");

    tbl
      .timestamp("created-at")
      .defaultTo(knex.raw("now()"))
      .notNullable();

    tbl
      .timestamp("updated-at")
      .defaultTo(knex.raw("now()"))
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
