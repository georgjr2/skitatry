import Order from '../../models/order'


export const handler = async (ctx) => {
  const orders = await Order
    .query()
    .whereNotDeleted()


  const events = orders.map((order) => ({
    title: order.name,
    start: order.from,
    end: order.to,
  }))
  const calendarAttr = JSON.stringify({
    header: {
      right: 'agendaWeek month prev,next',
      center: 'custom1',
    },
    firstDay: 1,
    allDayDefault: true,
    timeFormat: 'H:mm',
    events,

  })

  await ctx.render('calendar', {titulok: 'ahoj', calendarAttr})
}
