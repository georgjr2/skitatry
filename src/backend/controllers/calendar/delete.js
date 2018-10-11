import Order from '../../models/order'


export const handler = async (ctx) => {
  const {id} = ctx.params
  await Order.query().delete().where('id', id)
  ctx.redirect('/')
}
