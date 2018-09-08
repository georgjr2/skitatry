import {omit} from 'lodash'
import {upsert} from './utils/index'


const regions = [{
  name: 'Prešovský kraj',
}]

const categories = [{
  name: 'Informatika',
}]

const users = [{
  mail: 'user1@mail.com',
  password: '$2y$12$VA67Okc77KO3s0W695NIo.MwyoLjIUhF0MLHlXrIgmz0pGisQNee2',
  company: {
    name: 'Sited, s.r.o.', ico: '50543709', ic_dph: 'SK13456789', address: 'Hviezdoslavova 193/2',
    city: 'Kežmarok', postal_code: '060 01', phone: '0912345678', web_address: 'www.sited.sk',
    info: 'sited da best',
    offer: {
      title: 'Perl programátor', salary: '1500€', type: 'full-time', additional_info: 'Dobrý job',
      description: 'Málo roboty',
    },
  },
}]

export const seed = async (knex) => {
  let regionId
  let categoryId
  for (const region of regions) {
    regionId = await upsert(knex, 'region', ['name'], region)
  }
  for (const category of categories) {
    categoryId = await upsert(knex, 'category', ['name'], category)
  }
  for (const user of users) {
    const userId = await upsert(knex, 'user', ['mail'], omit(user, 'company'))
    const companyId = await upsert(knex, 'company', ['ico'], {
      ...omit(user.company, 'offer'),
      region_id: regionId,
      user_id: userId,
    })
    await upsert(knex, 'offer', ['title', 'company_id'], {
      ...user.company.offer,
      category_id: categoryId,
      company_id: companyId,
      region_id: regionId,
    })
  }
}
