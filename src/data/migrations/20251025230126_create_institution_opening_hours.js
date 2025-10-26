/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable("institution_opening_hours", (table) => {
        table.increments('id').primary();
        table.time("opening_hours", 0).notNullable();
        table.time("closing_hours", 0).notNullable();
        table.integer("opening_days", 1).notNullable();

        // Chave Estrangeira
        table.integer('institution')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('institutions')
        .onUpdate('CASCADE')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("institution_opening_hours");  
};