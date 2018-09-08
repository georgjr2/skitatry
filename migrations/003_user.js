export const up = async (knex) => {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.string('mail').notNullable().unique()
    table.string('password').notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('user')
}
