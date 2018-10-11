import * as show from './show'
import * as Delete from './delete'


export default {
  show: {
    handler: show.handler,
  },
  delete: {
    handler: Delete.handler,
  },
}
