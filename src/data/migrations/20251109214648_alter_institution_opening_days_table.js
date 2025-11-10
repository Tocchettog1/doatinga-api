/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('institution_opening_days', (table) => {
    table.string('opening_day', 3).notNullable().alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    // --- Etapa 1: Reverter a alteração do tipo de dado da coluna ---
  await knex.schema.alterTable('institution_opening_days', (table) => {
     table.string('opening_day', 3).nullable().alter();
  });
}
