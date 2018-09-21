import {pick} from 'lodash'
import Order from '../../models/order'


export const form = async (ctx) => {
  await ctx.render('orders/add')
}

export const validate = {
  type: 'form',
}

export const handler = async (ctx) => {
  await Order.query().insert(pick(ctx.request.body, Order.fields))
  ctx.redirect('/')
}
