import {pick} from 'lodash'
import {WritableStreamBuffer} from 'stream-buffers'
import Joi from '../../utils/joi'
import Application from '../../models/application'


export const form = async (ctx) => {
  await ctx.render('applications/add')
}

export const validate = {
  type: 'multipart',
  maxBody: '5mb',
  params: Joi.object({
    offerId: Joi.number().required(),
  }),
  parts: Joi.object({
    field: Joi.object({
      title: Joi.string().allow(''),
      name: Joi.string().allow('').required(),
      surname: Joi.string().allow('').required(),
      mail: Joi.string().email().allow(''),
      phone: Joi.string().allow(''),
      text: Joi.string().allow(''),
      cv: Joi.binary(),
    }).or('mail', 'phone'),
  }),
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
    console.log(err)
  }
  await Application.query().insert(
    pick({...parts.field, cv: myWritableStreamBuffer, ...ctx.params}, Application.fields)
  )
  ctx.redirect(`/offers/${ctx.params.offerId}`)
}
