const orders = [
  {
    name: 'janko',
    surname: 'hrasko',
    address: 'sadova 12',
    id_number: 'EU875421',
    age: 11,
    contact_name: 'pani hraskova',
    phone: '0969696969',
  },
]

export const seed = async (knex) => await knex('order')
  .del()
  .then(() => knex('order').insert(orders))

