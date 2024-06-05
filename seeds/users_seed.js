/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {user_id: 1, name: 'praise praise', email:"blooop@bloop.com", password:"1234"},
    {user_id: 2, name: 'lightning', email:"mcqueen@cars.com", password:"11223344"},
    {user_id: 3, name: 'testing', email:"firsttest@test.com", password:"1234"},
  ]);
};
