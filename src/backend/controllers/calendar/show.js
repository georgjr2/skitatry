import $ from 'jquery'


export const handler = async (ctx) => {
  ctx.render('calendar', {$})
}
