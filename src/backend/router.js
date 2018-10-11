import Router from 'koa-joi-router'
import * as routes from '../../constants/routes'
import {route} from './utils/koa'
import ordersController from './controllers/orders'
import calendarController from './controllers/calendar'


const router = new Router()
export default router

router.route([
  route('get', '/', calendarController.show),
  route('get', routes.API_CALENDAR_DELETE_ORDER, calendarController.delete),
  route('post', routes.API_ORDER_CREATE, ordersController.create),
  route('get', routes.API_ORDER_CREATE, ordersController.create.show),
  route('get', routes.API_ORDER_LIST, ordersController.create.show),
  route('get', routes.API_ORDER_VIEW, ordersController.create.show),
])
