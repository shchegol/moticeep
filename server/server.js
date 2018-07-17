const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
const path = require('path');
const fs = require('fs');

const app = new Koa();
const router = new Router();

// const User = require('./models/user');

const mongoose = require('./utils/mongoose');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

const user = require('./controllers/user');

middlewares.forEach(function(middleware) {
  require('./middlewares/' + middleware).init(app);
});

router
  .post('/register', user.register)
  .post('/login', user.login);

app
  .use(router.routes())
  .listen(3000);
