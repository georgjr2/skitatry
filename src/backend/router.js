import Router from 'koa-joi-router'
import * as routes from '../../constants/routes'
import {route} from './utils/koa'
import offersController from './controllers/offers'
import applicationsController from './controllers/applications'


const router = new Router()
export default router

router.route([
  route('post', routes.API_APPLICATION_CREATE, applicationsController.create),
  route('get', routes.API_APPLICATION_CREATE, applicationsController.create.show),
  route('get', routes.API_OFFER_VIEW, offersController.view),
  route('get', routes.API_OFFER_LIST, offersController.list),
])
