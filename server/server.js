process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

const Koa = require('koa');
const Router = require('koa-router');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const config = require('config');

const app = new Koa();
const router = new Router();

const Users = require('./models/user');

app.use(favicon('public/static/favicon.ico'));
app.use(logger());
app.use(bodyParser({jsonLimit: '56kb'}));
app.use(serve('public'));

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

router.get('/user', async function(ctx) {
  let name = ctx.request.query.name || 'World';
  ctx.body = {message: `Hello ${name}!`};
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.get('port'));
