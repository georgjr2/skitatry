export const up = async (knex) => {
  await knex.schema.createTable('order', (table) => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.string('name').notNullable().defaultTo('')
    table.string('surname').notNullable().defaultTo('')
    table.string('address').notNullable().defaultTo('')
    table.string('mail').defaultTo('')
    table.string('id_number').defaultTo('')
    table.date('birth_date')
    table.string('contact_name').notNullable().defaultTo('')
    table.string('contact_phone').notNullable().defaultTo('')
    table.string('color').defaultTo('')
    table.string('phone').defaultTo('')
    table.text('info').defaultTo('')
    table.boolean('confirmed').defaultTo('false')
    table.boolean('paid').defaultTo('false')
    table.date('from')
    table.date('to')
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('order')
}
