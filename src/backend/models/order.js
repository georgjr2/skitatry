import {compose} from 'objection'
import {BaseModel} from '../services/db'
import {withSoftDelete} from '../utils/withSoftDelete'


const mixins = compose(
  withSoftDelete(),
)

export default class Order extends mixins(BaseModel) {
  static tableName = 'order'
  static fields = [
    'name', 'surname', 'address', 'idNumber', 'age', 'contactName', 'contactPhone', 'info',
    'confirmed', 'from', 'to',
  ]
}
