import {pick} from 'lodash'


export const upsert = async (knex, table, where, fields) => {
  const existing = await knex(table).where(pick(fields, where)).first()
  if (existing) {
    await knex(table).where('id', existing.id).update(fields)
    return existing.id
  } else {
    const [id] = await knex(table).returning('id').insert(fields)
    return id
  }
}
