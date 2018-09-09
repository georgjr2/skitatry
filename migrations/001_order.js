export const up = async (knex) => {
  await knex.schema.createTable('order', (table) => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.string('name').notNullable().defaultTo('')
    table.string('surname').notNullable().defaultTo('')
    table.string('address').notNullable().defaultTo('')
    table.string('id_number')
    table.integer('age')
    table.string('contact_name').notNullable().defaultTo('')
    table.string('contact_phone').notNullable().defaultTo('')
    table.string('phone')
    table.text('info')
    table.boolean('confirmed').defaultTo('false')
    table.timestamp('from')
    table.timestamp('to')
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('order')
}
