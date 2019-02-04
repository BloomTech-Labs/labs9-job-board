// Login table
// Populated when a user signs up and is authenticated for the first time
exports.up = function(knex, Promise) {
  return knex.schema.createTable("login", function(tbl) {
    tbl.increments();

    // Firebase ID
    tbl
      .string("user_uid", 255)
      .notNullable()
      .unique();

    tbl
      .string("email", 128)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("login");
};
