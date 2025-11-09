/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.renameTable('institution_opening_hours', 'institution_opening_days');

  await knex.schema.alterTable('institution_opening_days', (table) => {
    table.renameColumn('opening_days', 'opening_day');
  });

  await knex.schema.alterTable('institution_opening_days', (table) => {
    table.string('opening_day', 3).alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    // --- Etapa 1: Reverter a alteração do tipo de dado da coluna ---
  await knex.schema.alterTable('institution_opening_days', (table) => {
    table.integer('opening_day', 4).alter(); 
  });
  
  // --- Etapa 2: Renomear a coluna de volta ---
  await knex.schema.alterTable('institution_opening_days', (table) => {
    table.renameColumn('opening_day', 'opening_days');
  });

  // --- Etapa 3: Renomear a tabela de volta ---
  await knex.schema.renameTable('institution_opening_days', 'institution_opening_hours');
}
