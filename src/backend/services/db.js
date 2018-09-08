import path from 'path'
import {transaction, Model} from 'objection'
import knex from '../../../knex'


export const atomic = async (ctx, next) => {
  await transaction(knex, async (trx) => {
    Model.knex(trx)
    ctx.state.trx = trx
    await next()
  })
}

export class BaseModel extends Model {
  static modelPaths = [path.normalize(path.join(__dirname, '..', 'models'))]
}
