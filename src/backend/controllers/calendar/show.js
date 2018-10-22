import {pickBy, identity} from 'lodash'
import moment from 'moment'
import Order from '../../models/order'


export const handler = async (ctx) => {
  const orders = await Order
    .query()
    .whereNotDeleted()
  const events = orders.map((order) => pickBy({
    title: `${order.name} ${order.surname}`,
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
    start: order.fromTime,
    end: order.toTime,
    dow: [0, 1, 2, 3, 4, 5, 6],
    dowstart: order.from,
    dowend: order.to,
  }, identity))
  const calendarAttr = JSON.stringify({
    header: {
      right: 'agendaWeek month listWeek prev,next',
    },
    // ColumnHeaderFormat: 'dddd',
    selectable: false,
    firstDay: 1,
    allDayDefault: true,
    // TimeFormat: 'h:mm',
    events,
    editable: false, // Don't allow editing of events
    handleWindowResize: true,
    weekends: true, // Hide weekends
    defaultView: 'agendaWeek', // Only show week view
    // header: false, // Hide buttons/titles
    minTime: '07:30:00', // Start time for the calendar
    maxTime: '22:00:00', // End time for the calendar
    // columnFormat: {
    //   week: 'd', // Only show day of the week names
    // },
    displayEventTime: true, // Display event time
  })

  await ctx.render('calendar', {titulok: 'ahoj', calendarAttr})
}
