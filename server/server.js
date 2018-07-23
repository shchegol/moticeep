const Koa = require('koa');
const Router = require('koa-router');
// const config = require('config');
const path = require('path');
const fs = require('fs');

let app = new Koa();
let router = new Router();

// let mongoose = require('./utils/mongoose');
let middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

// todo write if else for dew way
// koa-webpack-hot-middleware
let webpack = require('webpack');
let webpackConfig = require('../client/build/webpack.base.conf');
let compiler = webpack(webpackConfig);
app.use(require("koa-webpack-hot-middleware")(compiler));


let user = require('./controllers/user');

middlewares.forEach(function(middleware) {
  require('./middlewares/' + middleware).init(app);
});

router
  .post('/register', user.register)
  .post('/login', user.login);

app
  .use(router.routes())
  .listen(3000);
