/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.renameColumn('password_hash', 'password');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    // --- Etapa 1: Reverter a alteração do tipo de dado da coluna ---
    await knex.schema.alterTable('users', (table) => {
        table.renameColumn('password', 'password_hash');
    });
}

