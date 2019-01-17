exports.up = function(knex, Promise) {
  return knex.schema.alterTable("login", tbl => {
    tbl
      .timestamp("created_at")
      .defaultTo(knex.raw("now()"))
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("login", tbl => {
    tbl.dropColumn("created_at");
  });
};
