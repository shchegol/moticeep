const Koa = require('koa');
const Router = require('koa-router');
// const config = require('config');
const path = require('path');
const fs = require('fs');
const convert = require('koa-convert')

let app = new Koa();
let router = new Router();

// let mongoose = require('./utils/mongoose');
let middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

// todo write if else for dew way
// koa-webpack-hot-middleware
let webpack = require('webpack');
let webpackConfig = require('../client/build/webpack.base.conf');
let compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}));
app.use(convert(require('koa-webpack-hot-middleware')(compiler)));

let user = require('./controllers/user');

middlewares.forEach(function(middleware) {
  require('./middlewares/' + middleware).init(app);
});

router
  .get('/', async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('client/index.html');
  })
  .post('/register', user.register)
  .post('/login', user.login)
  .get('/test', async ctx => {
    ctx.body = 'test success';
  });

app
  .use(router.routes())
  .listen(3000);
