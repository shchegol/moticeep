process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
const Koa = require('koa');
// const Router = require('koa-router');
const fs = require('fs');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const config = require('config');

const app = new Koa();
// const router = new Router();

app.use(favicon('public/favicon.ico'));
app.use(serve('public'));
app.use(logger());
// errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.status) {
      // could use template methods to render error page
      ctx.body = e.message;
      ctx.status = e.status;
    } else {
      ctx.body = 'Error 500';
      ctx.status = 500;
      console.error(e.message, e.stack);
    }
  }
});
app.use(bodyParser({
  jsonLimit: '56kb',
}));

app.listen(config.get('port'));
