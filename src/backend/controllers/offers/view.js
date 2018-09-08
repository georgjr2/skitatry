import Joi from '../../utils/joi'
import Offer from '../../models/offer'


export const validate = {
  params: Joi.object({
    offerId: Joi.number().required(),
  }),
}

export const handler = async (ctx) => {
  const {offerId} = ctx.params
  const offer = await Offer
    .query()
    .whereNotDeleted()
    .findById(offerId)
    .eager('[region, category, company, applications]')
    .first()

  ctx.render('offers/detail', {offer})
}
