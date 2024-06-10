/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      // Users table
      .createTable('users', function(table) {
        table.increments('user_id').unsigned().primary();
        table.string('name', 50).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
      })
      // Trips table
      .createTable('trips', function(table) {
        table.increments('trip_id').unsigned().primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('trip_name', 255).notNullable();
        table.date('start_date').notNullable();
        table.date('end_date');
        table.foreign('user_id').references('users.user_id').onDelete('CASCADE');
      })
      // Entries table
      .createTable('entries', function(table) {
        table.increments('entry_id').unsigned().primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('trip_id').unsigned().notNullable();
        table.tinyint('status').notNullable();
        table.json('layout').notNullable();
        table.date('entry_date').notNullable();
        table.string('text_color', 7).defaultTo('#352F36').notNullable();
        table.string('border_color', 7).defaultTo('#352F36');
        table.integer('border_width').defaultTo(0);
        table.unique('entry_date');
        table.foreign('user_id').references('users.user_id').onDelete('CASCADE');
        table.foreign('trip_id').references('trips.trip_id').onDelete('CASCADE');
      })
      // Textblocks table
      .createTable('textblocks', function(table) {
        table.increments('text_id').unsigned().primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('trip_id').unsigned().notNullable();
        table.date('entry_date').notNullable();
        table.string('description', 255).notNullable();
        table.foreign('user_id').references('users.user_id').onDelete('CASCADE');
      })
      // Photos table
      .createTable('photos', function(table) {
        table.increments('photo_id').unsigned().primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('trip_id').unsigned().notNullable();
        table.date('upload_date').defaultTo(knex.fn.now());
        table.date('entry_date').notNullable();
        table.string('photo_path', 255).notNullable();
        table.integer('width').notNullable();
        table.integer('height').notNullable();
        table.string('file_type', 100).notNullable();
        table.string('public_id', 100).notNullable();
        table.foreign('user_id').references('users.user_id').onDelete('CASCADE');
      });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('photos')
      .dropTableIfExists('textblocks')
      .dropTableIfExists('entries')
      .dropTableIfExists('trips')
      .dropTableIfExists('users');
  };
