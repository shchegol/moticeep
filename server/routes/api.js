'use strict';

import Router from 'koa-router';
import {login, logout, register, auth}   from '../controllers/user';

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
    .use(router.routes())
    .use(router.allowedMethods());
}

// module.exports = (app) => {
//   const router = new Router({
//     prefix: `/api/v1`,
//   });
//
//   // Auth
//   router.post(`/register`, auth.isAuthenticatedApiBasic(), AuthController.register);
//
//   // Me
//   router.get(`/me`, auth.isAuthenticatedAccessToken(), MeController.show);
//
//   // OAuth2
//   router.post(`/login`, auth.isAuthenticatedPassword(), OAuthController.getTokenDirectPassword);
//   router.post(`/refresh_token`, auth.isAuthenticatedApiBasic(), OAuthController.getRefreshTokenDirectPassword);
//
//   app
//     .use(router.routes())
//     .use(router.allowedMethods());
// };
