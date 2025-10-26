/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('donations', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('subtype', 100);
        table.text('description');
        table.integer('available_quantity').unsigned().notNullable().defaultTo(0);
        table.boolean('is_needed').notNullable();
        table.boolean('is_available').notNullable();

        // Chave Estrangeira
        table.integer('institution')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('institutions')
            .onUpdate('CASCADE');

        table.integer("type")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("donation_types")
            .onUpdate("CASCADE");

        // created_at e updated_at
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('donations');
}