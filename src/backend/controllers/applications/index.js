import * as create from './create'


export default {
  create: {
    validate: create.validate,
    handler: create.handler,
    show: {
      handler: create.form,
    },
  },
}
