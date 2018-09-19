import path from 'path'
import hbs from 'koa-hbs'
import Koa from 'koa'
import koaStatic from 'koa-serve-static'
import $ from 'jquery'
import router from './router'
import {atomic} from './services/db'
import html from './views/html.hbs'
import calendar from './controllers/calendar'


const app = new Koa()
export default app

app.use(hbs.middleware({viewPath: path.join(__dirname, 'views')}))
hbs.registerPartial('html', html)
hbs.registerHelper('calendar', () => ({
  selectable: true,
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay',
  },
  dayClick: (date) => {
    console.log(`clicked ${date.format()}`)
  },
  // Events,
}))
app.use(atomic)
app.use(router.middleware())
app.use(koaStatic('public'))
