const session = require('koa-session');
const mongooseStore = require('koa-session-mongoose');
const mongoose = require('../libs/mongoose');

exports.init = app => app.use(session({
  key: 'sid',
  // touch session.updatedAt in DB & reset cookie on every visit to prolong the session
  // koa-session-mongoose resaves the session as a whole, not just a single field
  rolling: true,

  store: mongooseStore.create({
    model: 'Session',
    expires: 3600 * 4,
    connection: mongoose,
  }),
}, app));
