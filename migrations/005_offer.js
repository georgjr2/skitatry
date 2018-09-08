export const up = async (knex) => {
  await knex.schema.createTable('offer', (table) => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.string('title').notNullable().defaultTo('')
    table.specificType('salary', 'money').notNullable().unsigned()
    table.enum('type', ['full-time', 'part-time', 'intern']).notNullable().defaultTo('full-time')
    table.text('additional_info')
    table.text('description').notNullable().defaultTo('')
    table.integer('region_id').references('region.id').notNullable().index()
    table.integer('company_id').references('company.id').notNullable().index()
    table.integer('category_id').references('category.id').notNullable().index()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable('offer')
}
