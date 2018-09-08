import * as list from './list'
import * as view from './view'


export default {
  list: {
    handler: list.handler,
  },
  view: {
    validate: view.validate,
    handler: view.handler,
  },
}
