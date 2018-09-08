import Knex from 'knex'
import {knexSnakeCaseMappers} from 'objection'
import config from './config'


export default Knex({...config.db, ...knexSnakeCaseMappers()})
