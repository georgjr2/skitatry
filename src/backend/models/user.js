import {compose} from 'objection'
import {BaseModel} from '../services/db'
import {withSoftDelete} from '../utils/withSoftDelete'


const mixins = compose(
  withSoftDelete(),
)

export default class User extends mixins(BaseModel) {
  static tableName = 'user'
}
