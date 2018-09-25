import Order from '../../models/order'


export const handler = async (ctx) => {
  const orders = await Order
    .query()
    .whereNotDeleted()


  const events = orders.map((order) => ({
    title: `${order.name} ${order.surname}`,
    start: order.from,
    end: order.to,
    name: order.name,
    surname: order.surname,
    mail: order.mail,
    age: order.age,
    phone: order.phone,
    confirmed: order.confirmed,
    paid: order.paid,
  }))

  const calendarAttr = JSON.stringify({
    header: {
      right: 'agendaWeek month prev,next',
      center: 'custom1',
    },
    selectable: false,
    firstDay: 1,
    allDayDefault: true,
    timeFormat: 'H:mm',
    events,
  })

  await ctx.render('calendar', {titulok: 'ahoj', calendarAttr})
}
