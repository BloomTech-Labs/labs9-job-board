exports.up = function(knex, Promise) {
  return knex.schema.alterTable("jobs", tbl => {
    tbl.string("category");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("jobs", tbl => {
    tbl.dropColumn("category");
  });
};
