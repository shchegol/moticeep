import Router      from 'koa-router';
import authRouter  from './auth';
import tasksRouter from './tasks';

export default app => {
  let router = new Router({
    prefix: '/api',
  });

  authRouter(router, '/auth');
  tasksRouter(router, '/tasks');

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
