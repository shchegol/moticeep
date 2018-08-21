import Router      from 'koa-router';
import authRouter  from './auth';
import tasksRouter from './tasks';
import motivatorsRouter from './motivators';

export default app => {
  let router = new Router({
    prefix: '/api',
  });

  authRouter(router, '/auth');
  tasksRouter(router, '/tasks');
  motivatorsRouter(router, '/motivators');

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
