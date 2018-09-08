import {compose} from 'objection'
import {BaseModel} from '../services/db'
import {withSoftDelete} from '../utils/withSoftDelete'


const mixins = compose(
  withSoftDelete(),
)

export default class Company extends mixins(BaseModel) {
  static tableName = 'company'
  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'User',
      join: {
        from: 'company.userId',
        to: 'user.id',
      },
    },
  }
}
