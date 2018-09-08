import {createNonDeletedUniqueIndex, dropNonDeletedUniqueIndex} from './utils/indexes'


export const up = async (knex) => {
  await knex.schema.createTable('company', (table) => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.string('name').notNullable().defaultTo('')
    table.string('ico').notNullable()
    table.string('ic_dph')
    table.string('address').notNullable().defaultTo('')
    table.string('city').notNullable().defaultTo('')
    table.string('postal_code').notNullable().defaultTo('')
    table.string('phone')
    table.string('web_address')
    table.text('info').notNullable().defaultTo('')
    table.binary('logo')
    table.timestamp('accepted_at')
    table.integer('region_id').references('region.id').notNullable()
    table.integer('user_id').references('user.id').notNullable()
  })
  await createNonDeletedUniqueIndex(knex, 'company', 'ico')
  await createNonDeletedUniqueIndex(knex, 'company', 'user_id')
}

export const down = async (knex) => {
  await dropNonDeletedUniqueIndex(knex, 'company', 'user_id')
  await dropNonDeletedUniqueIndex(knex, 'company', 'ico')
  await knex.schema.dropTable('company')
}
