import {compose} from 'objection'
import {BaseModel} from '../services/db'
import {withSoftDelete} from '../utils/withSoftDelete'


const mixins = compose(
  withSoftDelete(),
)

export default class Offer extends mixins(BaseModel) {
  static tableName = 'offer'
  static fields = [
    'title', 'salary', 'type', 'additionalInfo', 'description', 'regionId', 'companyId', 'categoryId',
  ]
  static relationMappings = {
    region: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'region',
      join: {
        from: 'offer.regionId',
        to: 'region.id',
      },
    },
    category: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'category',
      join: {
        from: 'offer.categoryId',
        to: 'category.id',
      },
    },
    company: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'company',
      join: {
        from: 'offer.companyId',
        to: 'company.id',
      },
    },
    applications: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'application',
      join: {
        from: 'offer.id',
        to: 'application.offerId',
      },
    },
  }
}
