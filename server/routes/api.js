'use strict';

import Router                          from 'koa-router';
import {login, logout, register, auth} from '../controllers/user';

export default (app) => {
  let router = new Router({
    prefix: '/api',
  });

  router
    .get('/auth', auth)
    .post('/register', register)
    .post('/login', login)
    .post('/logout', logout)
    .get('/test', async ctx => {
      ctx.body = 'test success';
    });

  app
    .use(router.routes());
  // .use(router.allowedMethods());
}
