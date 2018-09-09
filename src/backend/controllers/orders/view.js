import Joi from '../../utils/joi'
import Order from '../../models/order'


export const validate = {
  params: Joi.object({
    orderId: Joi.number().required(),
  }),
}

export const handler = async (ctx) => {
  const {orderId} = ctx.params
  const order = await Order
    .query()
    .whereNotDeleted()
    .findById(orderId)
    .eager('[region, category, company, applications]')
    .first()

  ctx.render('orders/detail', {order})
}
