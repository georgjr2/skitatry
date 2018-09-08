export const up = async (knex) => {
  await knex.schema.createTable('region', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('region')
}
