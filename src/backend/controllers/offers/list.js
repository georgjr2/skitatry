import Offer from '../../models/offer'


export const handler = async (ctx) => {
  const offers = await Offer
    .query()
    .whereNotDeleted()
    .eager('[region, category, company, applications]')

  ctx.render('offers/list', {offers})
}
