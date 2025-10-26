/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('institutions', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('cnpj', 14).notNullable().unique();
        table.string('street', 255);
        table.string('number', 50);
        table.string('complement', 255);
        table.string('neighborhood', 255);
        table.string('city', 255);
        table.string('state', 2);
        table.string('zip_code', 8);
        table.decimal('latitude', 10, 8);
        table.decimal('longitude', 11, 8);
        table.string('contact_number', 20);

        // Chave Estrangeira
        table.integer('user')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')

        // created_at e updated_at
        table.timestamps(true, true); // Adiciona created_at e updated_at
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('institutions');
}