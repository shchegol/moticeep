const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
const path = require('path');
const fs = require('fs');

const app = new Koa();
const router = new Router();

const mongoose = require('./utils/mongoose');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  require('./middlewares/' + middleware).init(app);
});

app.use(router.routes());

app.listen(3000);
