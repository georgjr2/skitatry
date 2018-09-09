import Order from '../../models/order'


export const handler = async (ctx) => {
  const orders = await Order
    .query()
    .whereNotDeleted()
    .eager('[region, category, company, applications]')

  ctx.render('orders/list', {orders})
}
