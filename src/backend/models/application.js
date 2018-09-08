import {compose} from 'objection'
import {BaseModel} from '../services/db'
import {withSoftDelete} from '../utils/withSoftDelete'


const mixins = compose(
  withSoftDelete(),
)

export default class Application extends mixins(BaseModel) {
  static tableName = 'application'
  static fields = ['title', 'name', 'surname', 'mail', 'phone', 'text', 'cv', 'offerId']
  static relationMappings = {
    offer: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'offer',
      join: {
        from: 'application.offerId',
        to: 'offer.id',
      },
    },
  }
}
