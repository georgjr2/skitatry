export const up = async (knex) => {
  await knex.schema.createTable('application', (table) => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.string('title').notNullable().defaultTo('')
    table.string('name').notNullable().defaultTo('')
    table.string('surname').notNullable().defaultTo('')
    table.string('mail')
    table.string('phone')
    table.text('text').notNullable().defaultTo('')
    table.binary('cv')
    table.enum('status', ['new', 'approved', 'disapproved']).notNullable().defaultTo('new')
    table.integer('offer_id').references('offer.id').notNullable().index()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('application')
}
