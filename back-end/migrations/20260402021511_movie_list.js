/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('movie_list', table => {
    table.increments();
    table.string('title');
    table.boolean('is_watched').defaultTo(false);
    table.string('genres');
    table.string('description')
    table.string('main_character');
    table.date('year_released'); //YYYY-MM-DD
    table.string('poster');

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('movie_list');
};
