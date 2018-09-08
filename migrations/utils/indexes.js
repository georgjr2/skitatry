const indexName = (table, column) => `${table}_${column}_non_deleted_unique`
export const createNonDeletedUniqueIndex = async (knex, table, column) => {
  await knex.raw(
    'create unique index ?? on ?? (??) where deleted_at is null',
    [indexName(table, column), table, column]
  )
}

export const dropNonDeletedUniqueIndex = async (knex, table, column) => {
  await knex.raw('drop index ??', [indexName(table, column)])
}
