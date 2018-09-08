export const up = async (knex) => {
  await knex.schema.createTable('category', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.binary('logo')
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('category')
}
