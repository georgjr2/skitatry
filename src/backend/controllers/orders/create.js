import {pick} from 'lodash'
import {WritableStreamBuffer} from 'stream-buffers'
import $ from 'jquery'
import Joi from '../../utils/joi'
import Order from '../../models/order'


export const form = async (ctx) => {
  const events = [
    {
      title: 'janko',
      start: '2018-09-10',
      end: '2018-09-18',
      // Rendering: 'background',
      color: 'red',
    },
    {
      title: 'marienka',
      start: '2018-09-15',
      end: '2018-09-21',
      // Rendering: 'background',
    },
  ]
  await ctx.render('calendar', {events})
  // Await ctx.render('orders/add')
}

export const validate = {
  type: 'form',
  params: Joi.object({
    orderId: Joi.number().required(),
  }),
  body: Joi.object({
    title: Joi.string().allow(''),
    name: Joi.string().allow('').required(),
    surname: Joi.string().allow('').required(),
    mail: Joi.string().email().allow(''),
    phone: Joi.string().allow(''),
    text: Joi.string().allow(''),
    cv: Joi.binary(),
  }).or('mail', 'phone'),
}

export const handler = async (ctx) => {
  const {parts} = await ctx.request
  const myWritableStreamBuffer = new WritableStreamBuffer({
    initialSize: (100 * 1024),
    incrementAmount: (10 * 1024),
  })
  let part
  try {
    /* eslint-disable no-unmodified-loop-condition */
    while ((part = await parts)) {
      if (!part.lenght) part.pipe(myWritableStreamBuffer)
    }
  } catch (err) {
  /* eslint-disable no-console */
    console.log(err)
  }
  await Order.query().insert(
    pick({...parts.field, cv: myWritableStreamBuffer, ...ctx.params}, Order.fields)
  )
  ctx.redirect(`/orders/${ctx.params.orderId}`)
}
