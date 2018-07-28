const Koa = require('koa');
const Router = require('koa-router');
// const config = require('config');
const path = require('path');
const fs = require('fs');
const convert = require('koa-convert');

let app    = new Koa(),
    router = new Router(),
    user   = require('./controllers/user');

// let mongoose = require('./utils/mongoose');
let middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

if (process.env.NODE_ENV === 'development') {
  let webpack = require('webpack');
  let webpackConfig = require('../client/build/webpack.base.conf');
  let compiler = webpack(webpackConfig);

  app.use(require('koa-webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      noInfo: true,
    },
  }));

  app.use(convert(require('koa-webpack-hot-middleware')(compiler)));
  router.get('/', async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('client/index.html');
  });
}

middlewares.forEach(function(middleware) {
  require('./middlewares/' + middleware).init(app);
});

router
  .post('/register', user.register)
  .post('/login', user.login)
  .get('/test', async ctx => {
    ctx.body = 'test success';
  });

app
  .use(router.routes())
  .listen(3000);
