import path from 'path'
import hbs from 'koa-hbs'
import Koa from 'koa'
import router from './router'
import {atomic} from './services/db'
import html from './views/html.hbs'


const app = new Koa()
export default app

app.use(hbs.middleware({viewPath: path.join(__dirname, 'views')}))
hbs.registerPartial('html', html)
app.use(atomic)
app.use(router.middleware())
