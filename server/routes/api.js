'use strict';

import Router from 'koa-router';
import user   from '../controllers/user';

export default (app) => {
  let router = new Router({
    prefix: '/api',
  });

  router
    .post('/register', user.register)
    .post('/login', user.login)
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
