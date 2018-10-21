import {pickBy, identity} from 'lodash'
import moment from 'moment'
import Order from '../../models/order'


export const handler = async (ctx) => {
  const orders = await Order
    .query()
    .whereNotDeleted()
  const events = orders.map((order) => pickBy({
    title: `${order.name} ${order.surname}`,
    start: order.from,
    end: order.to,
    name: order.name,
    surname: order.surname,
    mail: order.mail,
    color: order.color,
    age: moment().diff(moment(order.birthDate), 'years'),
    phone: order.phone,
    confirmed: order.confirmed,
    paid: order.paid,
    info: order.info,
    id: order.id,
  }, identity))
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
